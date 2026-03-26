# 💧 AquaLeakDetector: Deep Learning for Water Loss Detection

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

---

## 📝 Présentation du Projet
**AquaLeakDetector** est un système intelligent de détection de fuites d'eau conçu pour les réseaux de distribution urbains. Le projet repose sur une architecture de Deep Learning hybride combinant :
* **Analyse Temporelle :** Réseaux de neurones **LSTM** (Long Short-Term Memory) pour traiter les séries chronologiques de pression.
* **Intégration Spatiale :** Un **Embedding Topologique** pour représenter la structure physique et les interconnexions du réseau.

> Ce projet a été réalisé dans le cadre du **Master AI & Data Science (AISD)** à la Faculté des Sciences et Techniques de Tanger (**FSTT**).

---

## 🚀 Fonctionnalités Clés
* ✅ **Précision Haute Performance :** Taux de détection de **96.3%**.
* ⏱️ **Analyse Temps Réel :** Traitement fluide des données SCADA (Pression, Débit, Niveau).
* 🗺️ **Visualisation Géographique :** Alertes localisées par secteur pour une intervention rapide.
* 💻 **Interface Intuitive :** Dashboard moderne conçu pour les opérateurs de réseau.

---

## 🛠️ Stack Technique

| Composant | Technologies |
| :--- | :--- |
| **Intelligence Artificielle** | TensorFlow, Keras, Scikit-learn, Pandas, NumPy |
| **Backend API** | FastAPI, Python 3.10+ |
| **Frontend UI** | React.js, Vite, Tailwind CSS |
| **Dataset** | BattLeDIM (Données de capteurs réels/simulés) |

---

## ⚙️ Installation et Configuration

### 1. Prérequis
* Python 3.10+
* Node.js (v16+)

### 2. Configuration du Backend
```bash
cd backend
# Créer et activer l'environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur
uvicorn app.main:app --reload
L'API sera disponible sur : http://localhost:8000

3. Configuration du Frontend
Bash
cd frontend
# Installer les modules
npm install

# Lancer l'application
npm run dev
L'interface sera accessible sur : http://localhost:5173

🧠 Méthodologie du Modèle
Le modèle traite des séquences de 24 heures (échantillonnage toutes les 5 min) :

Branche LSTM (64 unités) : Capture les motifs de consommation et les chutes de pression anormales.

Branche Topologique : Apprend les relations entre les 14 capteurs stratégiques du réseau.

Fusion : Concaténation des vecteurs pour une classification binaire précise (Fuite vs Normal).

👤 Auteure
Ibnibrahym Meriem 🎓 Étudiante en Master Artificial Intelligence & Data Science (AISD) 📍 Faculté des Sciences et Techniques de Tanger (FSTT)

<p align="center">
Projet Académique - FST Tanger - 2026
</p>
