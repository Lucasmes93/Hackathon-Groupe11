from typing import Optional
from pydantic import BaseModel
from datetime import date


class StudentBase(BaseModel):
    Nom: str
    Prenom: str
    Email: str
    Date_de_naissance: date
    Photo: Optional[str] = None

    class Config:
        orm_mode = True