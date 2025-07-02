from fastapi import FastAPI, HTTPException, Depends, Request, UploadFile, File
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
from . import models, schemas, crud
from .database import SessionLocal, engine
from .logging import setup_logging


setup_logging()

models.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI()

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
mcp.mount()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.post("/students/", response_model=schemas.PatientBase, operation_id="create_student")
@limiter.limit("5/minute")
def create_student(request: Request, student: schemas.PatientBase, db: Session = Depends(get_db)):
    if crud.get_student_by_email(db, student.Email):
        raise HTTPException(status_code=400, detail="L'étudiant existe déjà")
    return crud.create_student(db, student)


@app.get("/students/", response_model=list[schemas.PatientBase], operation_id="retrieve_student")
def read_students(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_students(db, skip=skip, limit=limit)

@app.post("/upload", operation_id="upload_picture")
async def upload_image(image: UploadFile = File(...)):
    os.makedirs("public/known", exist_ok=True)
    filename = f"student_{int(time.time())}.jpg"
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
async def get_context_data(request:Request):
    return {"data": None}


include_operations_mcp.mount(mount_path="/include-operations-mcp")
mcp.setup_server()