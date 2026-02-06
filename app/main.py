from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(title="Water Leak Detection")

# Monter le dossier static pour le CSS/JS/Images
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Configurer les templates HTML
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
async def read_dashboard(request: Request):
    # Simulation de données
    context = {
        "request": request,
        "system_status": "Actif",
        "pressure": "4.5 Bar",
        "leaks_detected": 0
    }
    return templates.TemplateResponse("index.html", context)