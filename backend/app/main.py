from fastapi import FastAPI, HTTPException, Depends, Request, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi_mcp import FastApiMCP
from typing import List
import os
import time
from fastapi.responses import StreamingResponse
import json
from . import models, schemas, crud
from .database import SessionLocal, engine
from .logging import setup_logging
from google.cloud import storage
from uuid import uuid4
from datetime import datetime, timedelta
from pydantic import BaseModel
import logging
import requests
from dotenv import load_dotenv
from prometheus_client import make_asgi_app
from prometheus_fastapi_instrumentator import Instrumentator

load_dotenv()
# Configure logging
sessions = {}
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MessageRequest(BaseModel):
    session_id: str
    query: str


setup_logging()

models.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
metrics_app = make_asgi_app()
include_operations_mcp = FastApiMCP(
    app,
    name="Included Operations",
    include_operations=["estiam_data"],
)

mcp = FastApiMCP(
    app,
    name="My MCP API Server",
    description="Very cool MCP server",
    describe_all_responses=True,
    describe_full_response_schema=True
)


os.makedirs("public/known", exist_ok=True)
app.mount("/known", StaticFiles(directory="public/known"), name="known")
app.mount("/metrics", metrics_app)
Instrumentator().instrument(app).expose(app)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"detail": exc.errors()})

def get_base_url(request: Request) -> str:
    return f"{request.url.scheme}://{request.url.netloc}"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/mcp/sessions/", tags=["MCP"])
async def create_session():
    session_id = str(uuid4())
    expires_at = datetime.now() + timedelta(hours=1)
    sessions[session_id] = {
        "created_at": datetime.now(),
        "expires_at": expires_at,
        "active": True
    }
    return {"session_id": session_id, "expires_at": expires_at}

@app.post("/mcp/messages/", tags=["MCP"])
async def post_message(request: MessageRequest):
    if request.session_id not in sessions or not sessions[request.session_id]["active"]:
        logger.warning(f"Invalid session attempt: {request.session_id}")
        raise HTTPException(status_code=404, detail="Invalid session ID")
    
    async def generate_stream():
        try:
            data_response = await get_context_data(Request)
            estiam_data = data_response.body.decode()
            prompt = f"""
            Vous êtes un assistant spécialisé sur l'école ESTIAM. 
            Voici les informations disponibles:
            {estiam_data}
            
            Question: {request.query}
            
            Instructions:
            1. Répondez exclusivement en vous basant sur ces informations
            2. Si la question n'est pas pertinente pour ESTIAM, expliquez que vous ne traitez que les questions sur ESTIAM
            3. Si l'information n'est pas disponible, proposez de contacter l'administration
            4. Répondez en français
            5. Soyez concis et précis
            """
            
            API_URL = "https://router.huggingface.co/novita/v3/openai/chat/completions"
            headers = {
                "Authorization": f"Bearer {os.getenv('HF_API_KEY')}",
                "Content-Type": "application/json",
                "Accept": "text/event-stream"
            }
            
            payload = {
                "messages": [{"role": "user", "content": prompt}],
                "model": "meta-llama/llama-3.2-3b-instruct",
                "max_tokens": 512,
                "temperature": 0.1,
                "stream": True
            }
            
            with requests.post(
                API_URL,
                headers=headers,
                json=payload,
                stream=True,
                timeout=30
            ) as response:
                response.raise_for_status()
                
                full_response = ""
                for line in response.iter_lines():
                    if line:
                        decoded_line = line.decode('utf-8')
                        if decoded_line.startswith('data:'):
                            try:
                                event_data = json.loads(decoded_line[5:])
                                if 'choices' in event_data and len(event_data['choices']) > 0:
                                    chunk = event_data['choices'][0].get('delta', {}).get('content', '')
                                    if chunk:
                                        full_response += chunk
                                        yield f"data: {json.dumps({'chunk': chunk, 'done': False})}\n\n"
                            except json.JSONDecodeError:
                                continue
                
                fallback_phrases = [
                    "je ne trouve pas",
                    "information non disponible",
                    "contactez l'administration",
                    "pas dans les documents"
                ]
                
                if any(phrase in full_response.lower() for phrase in fallback_phrases):
                    full_response += "\n\nPour plus d'informations, veuillez contacter l'administration ESTIAM."
                
                final_data = {
                    'full_response': full_response,
                    'session_id': request.session_id,
                    'status': 'success',
                    'source': 'estiam_data',
                    'done': True
                }
                yield f"data: {json.dumps(final_data)}\n\n"
        
        except Exception as e:
            logger.error(f"Error in streaming: {str(e)}", exc_info=True)
            error_message = "Une erreur est survenue. Veuillez contacter l'administration ESTIAM pour assistance."
            yield f"data: {json.dumps({'error': error_message, 'done': True})}\n\n"
    
    return StreamingResponse(generate_stream(), media_type="text/event-stream")
 

@app.post("/students/", response_model=schemas.StudentBase, operation_id="create_student")
@limiter.limit("5/minute")
def create_student(request: Request, student: schemas.StudentBase, db: Session = Depends(get_db)):
    logger.info(f"Received student data: {student.dict()}")
    if crud.get_student_by_email(db, student.Email):
        raise HTTPException(status_code=400, detail="L'étudiant existe déjà")
    return crud.create_student(db, student)


@app.get("/students/", response_model=list[schemas.StudentBase], operation_id="retrieve_student")
def read_students(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_students(db, skip=skip, limit=limit)

@app.post("/upload", operation_id="upload_picture")
async def upload_image(
    name: str = Form(...),
    surname: str = Form(...),
    image: UploadFile = File(...)
):
    os.makedirs("public/known", exist_ok=True)
    filename = f"{name}_{surname}_{int(time.time())}.jpg"
    file_path = f"public/known/{filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(await image.read())
    return {"filePath": f"/known/{filename}"}

@app.get("/pictures", response_model=List[str], operation_id="retrieve_picture")
async def get_uploaded_files(request: Request):
    try:
        base_url = get_base_url(request)
        files = os.listdir("public/known")
        return [
            f"{base_url}/known/{file}" 
            for file in files 
            if os.path.isfile(os.path.join("public/known", file))
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/data", operation_id="estiam_data")
async def get_context_data(request: Request):
    try:
        storage_client = storage.Client()
        bucket_name = "estiam_data_doc"
        list_files = [
            "Infos/Formations_ESTIAM.txt",
            "Infos/Liste_des_campus_ESTIAM.txt",
            "Infos/Presentation_ESTIAM.txt",
            "Infos/faq_estiam.txt",
            "Infos/Infos_pratiques.txt"
        ]
        
        bucket = storage_client.bucket(bucket_name)
        combined_content = ""
        
        for file_path in list_files:
            try:
                blob = bucket.blob(file_path)
                combined_content += blob.download_as_text() + "\n\n"
            except Exception:
                continue 
        return JSONResponse(content={"data": combined_content.strip()})
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve data: {str(e)}"
        )

mcp = FastApiMCP(
    app,
    name="Estiam data- Included Operations",
    include_operations=["estiam_data"],
)

mcp.mount(mount_path="/mcp")
