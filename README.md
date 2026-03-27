# 💧 AquaLeakDetector

> **Système intelligent de détection de fuites d'eau par Deep Learning Hybride**  
> *Détectez, anticipez et prévenez les pertes d'eau dans les réseaux urbains grâce à l'IA.*

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Accuracy-96.3%25-success?style=flat-square"/>
  <img src="https://img.shields.io/badge/F1--Score-0.95-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/AUC-0.998-blueviolet?style=flat-square"/>
  <img src="https://img.shields.io/badge/Dataset-BattLeDIM-orange?style=flat-square"/>
</p>

---

## 📌 Présentation

**AquaLeakDetector** est une solution complète de surveillance intelligente des réseaux de distribution d'eau potable, développée dans le cadre du Master **Artificial Intelligence & Data Science (AISD)** à la **Faculté des Sciences et Techniques de Tanger (FSTT)**.

Le système combine un modèle de Deep Learning hybride (**LSTM + Topology Embedding**) avec une interface web interactive, permettant aux gestionnaires de réseau de détecter les fuites en temps réel — sans expertise technique en IA.

> 🌍 En moyenne, **20 à 50 %** de l'eau traitée est perdue avant d'atteindre les consommateurs.  
> AquaLeakDetector réduit drastiquement ces pertes grâce à une détection anticipative et fiable.

---

## 🏛️ Contexte Académique

| | |
|:---|:---|
| 🎓 **Encadrant** | Pr. Ezziyyani Mostafa |
| 🏫 **Établissement** | Faculté des Sciences et Techniques de Tanger — FSTT |
| 🏛️ **Université** | Université Abdelmalek Essaadi, Maroc |
| 📚 **Programme** | Master Artificial Intelligence & Data Science (AISD) |
| 👩‍💻 **Réalisé par** | Meriem Ibnibrahym |
| 📅 **Année** | 2025 — 2026 |

---

## ✨ Performances du Modèle

| Métrique | Résultat |
|:---|:---:|
| ✅ Précision globale | **96.3 %** |
| 🎯 F1-Score (classe fuite) | **0.95** |
| 📊 Rappel | **96 %** |
| 📈 AUC (Courbe ROC) | **0.998** |
| ⚙️ Seuil de décision optimal | **0.732** |
| 📦 Dataset d'évaluation | **BattLeDIM ** — 1 471 680 mesures |

---

## 🧠 Architecture du Modèle

Le cœur du système repose sur une architecture **hybride à deux branches** :
```
Données SCADA (pression, débit, niveau)
        │
        ▼
┌───────────────┐     ┌──────────────────────┐
│  Branche LSTM │     │  Topology Embedding  │
│  (Temporelle) │     │     (Spatiale)        │
│  64 unités    │     │  pipe_id → R⁸        │
│  Fenêtre 24h  │     │  14 tuyaux           │
└──────┬────────┘     └──────────┬───────────┘
       │                         │
       └──────────┬──────────────┘
                  ▼
          Concaténation R⁷²
                  │
          Dense (32, ReLU)
                  │
          Sortie Sigmoïde
                  │
          P(fuite | x) ∈ [0, 1]
```

**Pourquoi cette approche ?**
- Le **LSTM** capture les dépendances temporelles à long terme (cycles journaliers, signatures de fuites progressives).
- L'**Embedding topologique** encode la position de chaque tuyau dans le réseau, permettant de modéliser la propagation spatiale des anomalies.

---

## 🛠️ Stack Technique

| Couche | Technologies |
|:---|:---|
| 🤖 **IA & Modélisation** | TensorFlow · Keras · Scikit-learn |
| 📊 **Data Engineering** | Pandas · NumPy · StandardScaler |
| 🔧 **Backend API** | FastAPI · Python 3.10+ · Uvicorn |
| 🎨 **Frontend UI** | React.js · Recharts · Tailwind CSS |
| 📁 **Dataset** | BattLeDIM 2018 (SCADA : pression, débit, niveaux, fuites) |

---

## ⚙️ Installation

### Prérequis
- Python **3.10+**
- Node.js **18+**

### 1. Cloner le projet
```bash
git clone https://github.com/votre-utilisateur/AquaLeakDetector.git
cd AquaLeakDetector
```

### 2. Backend — API FastAPI
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows : venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

L'API est accessible sur : `http://localhost:8000`  
Documentation interactive : `http://localhost:8000/docs`

### 3. Frontend — Dashboard React
```bash
cd frontend
npm install
npm run dev
```

L'interface est accessible sur : `http://localhost:5173`

---

## 🖥️ Fonctionnalités de la Plateforme

| Module | Description |
|:---|:---|
| 🔐 **Authentification** | Portail sécurisé — accès protégé aux données critiques |
| 📖 **Guide technique** | Documentation intégrée du modèle et des seuils d'alerte |
| 📊 **Tableau de bord** | Métriques en temps réel · Accuracy · F1 · Recall |
| 🗺️ **Résultats par secteur** | Probabilités de fuite par tuyau avec statut *À vérifier* |

---

## 📁 Structure du Projet
```
AquaLeakDetector/
│
├── backend/                  # API FastAPI
│   ├── app/
│   │   ├── main.py           # Point d'entrée
│   │   ├── model/            # Modèle LSTM chargé
│   │   └── routes/           # Endpoints de prédiction
│   └── requirements.txt
│
├── frontend/                 # Dashboard React
│   ├── src/
│   │   ├── pages/            # Landing, Login, Dashboard, Results
│   │   └── components/       # Graphiques Recharts, cartes métriques
│   └── package.json
│
├── model/
│   ├── train.py              # Pipeline d'entraînement
│   ├── preprocess.py         # Prétraitement BattLeDIM
│   └── aqua_leak_v6.h5       # Modèle entraîné
│
└── README.md
```

---

## 📊 Dataset — BattLeDIM 

Le modèle est entraîné et évalué sur le jeu de données **BattLeDIM** (*Battle of the Leakage Detection and Isolation Methods*), une référence internationale qui simule un réseau de distribution urbain réaliste sur l'année 2018.

- **1 471 680** mesures · résolution **5 minutes**
- **14 tuyaux** instrumentés · capteurs de pression, débit, niveaux, demande
- Division : **70 % entraînement · 15 % validation · 15 % test**

---

## 📄 Rapport Scientifique

Ce projet est accompagné d'un article scientifique complet rédigé selon le format **ICPRS**, disponible dans le dossier `/docs` du dépôt, couvrant :

- Contexte & problématique
- Architecture hybride LSTM + Topology Embedding
- Pipeline de prétraitement SCADA
- Résultats expérimentaux & analyse ROC

---

<p align="center">
  <b>💧 Sauvons l'eau, une prédiction à la fois.</b><br/>
  <sub>Meriem Ibnibrahym · Master AISD · FST Tanger · 2025</sub>
</p>
