import os
import atexit
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from google.cloud.sql.connector import Connector, IPTypes
from google.oauth2 import service_account

load_dotenv()

def init_connection_engine(connector: Connector):
    ip_type = IPTypes.PRIVATE if os.getenv("PRIVATE_IP", "False").lower() == "true" else IPTypes.PUBLIC
    
    def getconn():
        return connector.connect(
            os.getenv("INSTANCE_CONNECTION_NAME"),
            driver="pymysql",
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),
            ip_type=ip_type,
        )

    engine = create_engine(
        "mysql+pymysql://",
        creator=getconn,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=2,
    )

    return engine

SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=["https://www.googleapis.com/auth/cloud-platform"]
)

connector = Connector(credentials=credentials)
engine = init_connection_engine(connector)
atexit.register(connector.close)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()