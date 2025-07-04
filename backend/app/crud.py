from sqlalchemy.orm import Session
from . import models, schemas


def get_student_by_email(db: Session, email: str):
    return db.query(models.Student).filter(models.Student.Email == email).first()


def create_student(db: Session, student: schemas.StudentBase):
    db_student = models.Student(
        Nom=student.Nom,
        Prenom=student.Prenom,
        Email=student.Email,
        Date_de_naissance=student.Date_de_naissance,
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def get_students(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Student).offset(skip).limit(limit).all()