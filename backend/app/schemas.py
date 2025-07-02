from pydantic import BaseModel
from datetime import date


class PatientBase(BaseModel):
    Nom: str
    Prenom: str
    Email: str
    Date_de_naissance: date

    class Config:
        orm_mode = True