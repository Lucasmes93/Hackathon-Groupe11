from sqlalchemy import Column, String, Date
from .database import Base


class Student(Base):
    __tablename__ = "user"

    Nom = Column(String(100), primary_key=True)
    Prenom = Column(String(100), primary_key=True)
    Email = Column(String(255), nullable=False)
    Date_de_naissance = Column(Date, nullable=False)