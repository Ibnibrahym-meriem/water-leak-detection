import shutil
import os
import traceback
import io
import base64
import matplotlib.pyplot as plt
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel

# --- IMPORTS INTERNES ---
# Assurez-vous que la structure de dossiers est respectée : backend/app/...
from app.core.database import engine, get_db, Base
from app.models.user import User
from app.services.prediction_service import PredictionService
from app.core.results_analyzer import ResultsAnalyzer  # Notez le 's' à Results

# --- CONFIGURATION ---
app = FastAPI(title="AquaLeak AI Backend - V2")

# 1. Configuration CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "*" # A retirer en production pour plus de sécurité
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Base de données & Sécurité
Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 3. Initialisation des Services IA
# Chemins relatifs par rapport au dossier d'exécution (backend/)
MODEL_PATH = "app/models/leak_model_v6.keras"
SCALER_PATH = "app/models/scaler_v6.pkl"
CONFIG_PATH = "app/models/leak_config.json"

predictor = None
analyzer = None

try:
    print(f"⏳ Initialisation du moteur IA...")
    
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Modèle introuvable : {MODEL_PATH}")

    # Instanciation des services avec les chemins précis
    predictor = PredictionService(MODEL_PATH, SCALER_PATH, CONFIG_PATH)
    analyzer = ResultsAnalyzer(CONFIG_PATH)
    
    print("✅ Moteur IA chargé avec succès.")
except Exception as e:
    print(f"⚠️ ERREUR CRITIQUE IA : {e}")
    traceback.print_exc()

# --- UTILITAIRES ---
def figure_to_base64(fig):
    """Convertit une figure Matplotlib en chaîne Base64 pour l'API JSON"""
    if fig is None:
        return None
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode("utf-8")
    plt.close(fig) # Fermer pour libérer la mémoire
    return f"data:image/png;base64,{img_str}"

# --- SCHÉMAS PYDANTIC ---
class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# ==========================================
#              ROUTES AUTHENTIFICATION
# ==========================================

@app.get("/")
async def root():
    status_ia = "ACTIF" if predictor else "INACTIF"
    return {"message": "API AquaLeak AI est en ligne", "ai_status": status_ia}

@app.post("/api/register")
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Cet email est déjà utilisé")
   
    hashed_pw = pwd_context.hash(user_data.password)
    new_user = User(email=user_data.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Compte créé", "user_id": new_user.id}

@app.post("/api/login")
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not pwd_context.verify(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Identifiants incorrects")
    
    return {
        "message": "Connexion réussie",
        "user": {"email": user.email, "id": user.id},
        "token": "demo-token-jwt" 
    }

# ==========================================
#              ROUTE D'ANALYSE
# ==========================================

@app.post("/api/analyze")
async def analyze_file(file: UploadFile = File(...)):
    """
    1. Reçoit CSV/Excel
    2. Prédit les fuites
    3. Renvoie JSON avec KPIs, Tableau enrichi, et Graphes
    """
    if not predictor or not analyzer:
        raise HTTPException(status_code=503, detail="Service IA non disponible")

    # Nom fichier temporaire sécurisé
    temp_filename = f"temp_{file.filename}"
    
    try:
        # 1. Sauvegarde du fichier uploadé sur le disque
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 2. Détection du type et Prédiction
        # On extrait l'extension (csv, xlsx, json)
        file_ext = file.filename.split('.')[-1].lower()
        if 'xls' in file_ext: file_ext = 'xlsx'
        
        # Appel au service de prédiction
        raw_results = predictor.predict(temp_filename, file_type=file_ext)
        
        if raw_results.empty:
            raise HTTPException(status_code=400, detail="Le fichier ne contient pas assez de données ou le format est incorrect.")

        # 3. Enrichissement (Ajout Zones, Noeuds, Niveaux de risque)
        enriched_df = analyzer.enrich_results(raw_results)

        # 4. Génération des blocs de réponse
        
        # A. KPIs (Haut de page)
        kpis = analyzer.get_model_kpi()
        
        # B. Interprétation (Texte pour le technicien)
        interpretation = analyzer.generate_global_status(enriched_df)
        
        # C. Graphique (Conversion en Base64)
        fig = analyzer.plot_predictions(enriched_df)
        graph_b64 = figure_to_base64(fig)
        
        # D. Tableau de données (Pour le dashboard)
        # On utilise la méthode de formatage du tableau
        final_table_df = analyzer.generate_dashboard_table(enriched_df)
        
        # Conversion DataFrame -> Liste de Dictionnaires (JSON)
        # On convertit les timestamps en string pour éviter les erreurs JSON
        final_table_df['Timestamp'] = final_table_df['Timestamp'].astype(str)
        table_data = final_table_df.to_dict(orient='records')

        # 5. Construction de la réponse finale
        response_payload = {
            "status": "success",
            "kpis": kpis,                  # Accuracy, Recall, etc.
            "interpretation": interpretation, # Status ALERT/NORMAL, message text
            "graph_image": graph_b64,      # Image encodée à afficher
            "data": table_data             # Les lignes du tableau
        }

        return JSONResponse(content=response_payload)

    except HTTPException as he:
        raise he
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erreur interne lors de l'analyse : {str(e)}")
    
    finally:
        # Nettoyage du fichier temporaire
        if os.path.exists(temp_filename):
            try:
                os.remove(temp_filename)
            except:
                pass