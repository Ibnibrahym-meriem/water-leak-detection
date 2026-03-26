# 💧 AquaLeakDetector: Deep Learning for Water Loss Detection

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Recharts-222222?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts">
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow">
</p>

---

## 📝 Présentation du Projet
Ce projet fait partie intégrante du programme de **Master Artificial Intelligence & Data Science (AISD)** de la Faculté des Sciences et Techniques de Tanger (FSTT). Il a été conçu et développé par la **Team Meriem Ibnibrahym**.

**AquaLeakDetector** est un système intelligent de détection de fuites d'eau conçu pour les réseaux de distribution urbains. Le projet repose sur une architecture de Deep Learning hybride combinant l'analyse temporelle (LSTM) et spatiale (Topology Embedding).

---

## 🚀 Fonctionnalités Clés
* ✅ **Précision Haute Performance :** Taux de détection de **96.3%**.
* ⏱️ **Analyse Temps Réel :** Traitement fluide des données SCADA via **Pandas** et **NumPy**.
* 📊 **Visualisation Dynamique :** Graphiques interactifs de pression et débit intégrés avec **Recharts**.
* 🗺️ **Alertes Géographiques :** Localisation immédiate des anomalies sur le réseau.

---

## 🛠️ Stack Technique

| Composant | Technologies |
| :--- | :--- |
| **Intelligence Artificielle** | TensorFlow, Keras, Scikit-learn |
| **Data Processing** | **Pandas, NumPy** (Analyse de séries temporelles) |
| **Backend API** | FastAPI, Python 3.10+ |
| **Frontend UI** | React.js, **Recharts** (Data Viz), Tailwind CSS |
| **Dataset** | BattLeDIM (1.4M+ mesures de capteurs) |

---

## ⚙️ Installation et Configuration

### 1. Configuration du Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
2. Configuration du Frontend
Bash
cd frontend
npm install
npm run dev
L'interface sera accessible sur : http://localhost:5173

🧠 Méthodologie du Modèle
Le modèle traite des séquences de 24 heures (échantillonnage toutes les 5 min) :

Branche LSTM (64 unités) : Capture les motifs de consommation et les chutes de pression.

Branche Topologique : Apprend les relations entre les 14 capteurs stratégiques.

Fusion : Concaténation des vecteurs pour une classification binaire (Fuite vs Normal).

👤 Auteure & Équipe
Meriem Ibnibrahym 🎓 Étudiante en Master AI & Data Science (AISD) 📍 Faculté des Sciences et Techniques de Tanger (FSTT)

<p align="center">
<b>Projet Académique - FST Tanger - Team Meriem Ibnibrahym !!</b>
</p>
