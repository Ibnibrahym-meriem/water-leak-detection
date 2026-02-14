# app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Le fichier de la base de données sera créé à la racine du projet
SQLALCHEMY_DATABASE_URL = "sqlite:///./water_leak.db"

# Création du moteur (connecteur)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Création de la session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# La classe de base pour nos modèles
Base = declarative_base()

# Fonction utilitaire pour récupérer la DB dans les routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()