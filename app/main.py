from fastapi import FastAPI, Request, Depends, HTTPException, status, Form
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel

# Imports de nos fichiers créés
from app.core.database import engine, get_db, Base
from app.models.user import User

# --- Configuration ---
app = FastAPI(title="Water Leak Detection")

# Créer les tables dans la base de données (si elles n'existent pas)
Base.metadata.create_all(bind=engine)

# Outil pour hacher les mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Montage des fichiers statiques et templates
# Assure-toi que les dossiers sont bien situés dans app/static et app/templates
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# --- Schémas Pydantic (Pour valider les données reçues) ---
class UserCreate(BaseModel):
    email: str
    password: str

# --- Routes d'Affichage (HTML) ---

@app.get("/", response_class=HTMLResponse)
async def read_dashboard(request: Request):
    # Page d'accueil (Tableau de bord)
    context = {
        "request": request,
        "system_status": "Actif",
        "pressure": "4.5 Bar",
        "leaks_detected": 0
    }
    return templates.TemplateResponse("index.html", context)

@app.get("/auth", response_class=HTMLResponse)
async def read_auth(request: Request):
    # Page de connexion/inscription
    return templates.TemplateResponse("auth.html", {"request": request})

# ✅ AJOUT : Route pour la documentation
@app.get("/documentation", response_class=HTMLResponse)
async def read_documentation(request: Request):
    # Page de documentation
    return templates.TemplateResponse("documentation.html", {"request": request})

# --- Routes API (Logique Backend) ---

@app.post("/api/register")
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # 1. Vérifier si l'email existe déjà
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Cet email est déjà utilisé")
   
    # 2. Hacher le mot de passe
    hashed_pw = pwd_context.hash(user_data.password)
    
    # 3. Créer l'utilisateur
    new_user = User(email=user_data.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Compte créé avec succès", "user_id": new_user.id}

@app.post("/api/login")
async def login(user_data: UserCreate, db: Session = Depends(get_db)):
    # 1. Chercher l'utilisateur
    user = db.query(User).filter(User.email == user_data.email).first()
    
    # 2. Vérifier si utilisateur existe et mot de passe correct
    if not user or not pwd_context.verify(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    # 3. Succès
    # ✅ MODIFICATION : Redirection vers la documentation
    return JSONResponse(content={
        "message": "Connexion réussie", 
        "redirect": "/documentation" 
    })