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

## 📄 Article Scientifique

> L'article complet décrivant l'architecture, la méthodologie et les résultats expérimentaux est disponible ici :

<p align="center">
  <a href="https://drive.google.com/file/d/1-ZQ1UPI_Ky_LFXhm8v7u4JSuYpcjkQqT/view?usp=sharing">
    <img src="https://img.shields.io/badge/📄 Lire l'article scientifique-4285F4?style=for-the-badge&logo=google-drive&logoColor=white"/>
  </a>
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
| 📦 Dataset d'évaluation | **BattLeDIM 2018** — 1 471 680 mesures |

---

## 🧠 Architecture du Modèle

Le cœur du système repose sur une architecture **hybride à deux branches** :
```
Données SCADA (pression, débit, niveau, demande)
                    │
        ┌───────────┴────────────┐
        ▼                        ▼
┌──────────────┐      ┌──────────────────────┐
│ Branche LSTM │      │  Topology Embedding  │
│ (Temporelle) │      │     (Spatiale)       │
│  64 unités   │      │  pipe_id → R⁸        │
│ Fenêtre 24h  │      │  14 tuyaux           │
└──────┬───────┘      └──────────┬───────────┘
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

## 📁 Structure du Projet
```
AquaLeakDetector/
│
├── backend/                   # API FastAPI
│   ├── app/
│   │   ├── main.py            # Point d'entrée de l'API
│   │   ├── model/             # Modèle LSTM chargé (.h5)
│   │   └── routes/            # Endpoints /predict, /health
│   └── requirements.txt
│
├── frontend/                  # Dashboard React
│   ├── src/
│   │   ├── pages/             # Landing, Login, Dashboard, Results
│   │   └── components/        # Graphiques Recharts, cartes métriques
│   └── package.json
│
├── model/
│   ├── train.py               # Pipeline d'entraînement complet
│   ├── preprocess.py          # Prétraitement BattLeDIM
│   └── aqua_leak_v6.h5        # Modèle entraîné (poids sauvegardés)
│
└── README.md
```

---

## ⚙️ Installation Complète

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

| Outil | Version minimale | Vérification |
|:---|:---|:---|
| Python | 3.10+ | `python --version` |
| Node.js | 18+ | `node --version` |
| npm | 8+ | `npm --version` |
| Git | — | `git --version` |

---

### Étape 1 — Cloner le projet
```bash
git clone https://github.com/votre-utilisateur/AquaLeakDetector.git
cd AquaLeakDetector
```

---

### Étape 2 — Backend (API FastAPI)

#### 2.1 Créer et activer l'environnement virtuel
```bash
cd backend
python -m venv venv
```
```bash
# macOS / Linux
source venv/bin/activate

# Windows (CMD)
venv\Scripts\activate.bat

# Windows (PowerShell)
venv\Scripts\Activate.ps1
```

#### 2.2 Installer les dépendances
```bash
pip install -r requirements.txt
```

Les principales librairies installées :
```
tensorflow>=2.12
fastapi
uvicorn
pandas
numpy
scikit-learn
python-multipart
```

#### 2.3 Lancer l'API
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ L'API est accessible sur :
- Interface : `http://localhost:8000`
- Documentation Swagger : `http://localhost:8000/docs`
- Documentation ReDoc : `http://localhost:8000/redoc`

---

### Étape 3 — Frontend (Dashboard React)

> Ouvrez un **nouveau terminal** (sans fermer le backend).
```bash
cd frontend
npm install
npm run dev
```

✅ Le dashboard est accessible sur : `http://localhost:5173`

---

## 🖥️ Guide d'Utilisation

### 1️⃣ Accéder à la plateforme

Ouvrez votre navigateur et rendez-vous sur `http://localhost:5173`.  
Vous arrivez sur la **page d'accueil (Landing Page)** qui présente le système.

---

### 2️⃣ Se connecter

Cliquez sur **"Se connecter"** en haut à droite.
```
Email    : votre-email@exemple.com
Mot de passe : ••••••••
```

> Le portail d'authentification protège l'accès aux données critiques du réseau.

---

### 3️⃣ Consulter le guide technique

Dans le menu latéral gauche, cliquez sur **"Guide Technique"**.  
Cette section contient la documentation complète sur :
- L'architecture hybride LSTM + Embedding
- L'interprétation des seuils d'alerte
- Les différentes métriques du modèle

---

### 4️⃣ Lancer une analyse prédictive

Accédez à **"Tableau de bord"** dans le menu latéral.

**Étapes :**

1. Cliquez sur la zone de dépôt de fichier
2. Importez votre fichier de données capteurs  
   *(Formats acceptés : `.csv` historique, `.xlsx`, `.json`)*
3. Cliquez sur **"Prédire les fuites"**
4. Patientez quelques secondes — le modèle analyse les séquences temporelles

> 💡 Le fichier doit contenir les colonnes SCADA : `timestamp`, `pressure`, `flow`, `level`, `demand`, `pipe_id`

---

### 5️⃣ Lire les résultats

Accédez à **"Résultats d'analyse"** dans le menu latéral.

Le système affiche un tableau détaillé par secteur :

| Colonne | Signification |
|:---|:---|
| `DATE & HEURE` | Horodatage de la mesure (résolution 5 min) |
| `IDENTIFIANT TUYAU` | Code du tuyau analysé (ex : `p810`) |
| `ZONE` | Secteur géographique (ex : Sud Périphérique) |
| `PROBABILITÉ DE FUITE` | Score entre 0 et 100 % calculé par le modèle |
| `STATUT` | **✅ Normal** si < 73.2 % · **⚠️ À vérifier** si ≥ 73.2 % |

> **Règle de décision :** Le seuil optimal est fixé à **73.2 %**.  
> Tout tuyau dépassant ce seuil déclenche automatiquement une alerte **"À vérifier"**.

---

### 6️⃣ Interpréter les alertes

| Couleur de la barre | Probabilité | Action recommandée |
|:---|:---|:---|
| 🟢 Vert | < 50 % | Aucune action — réseau normal |
| 🟡 Jaune | 50 % — 73 % | Surveillance accrue recommandée |
| 🔴 Rouge | ≥ 73.2 % | **Intervention technique urgente** |

---

### 7️⃣ Exporter le rapport

Depuis la page Documentation, cliquez sur **"Exporter PDF"** pour télécharger un rapport complet de l'analyse avec les résultats par secteur.

---

## 📊 Dataset — BattLeDIM 2018

Le modèle est entraîné et évalué sur le jeu de données **BattLeDIM** (*Battle of the Leakage Detection and Isolation Methods*), une référence internationale.

| Caractéristique | Détail |
|:---|:---|
| Période couverte | Année 2018 complète |
| Résolution temporelle | 5 minutes |
| Nombre de mesures | 1 471 680 |
| Tuyaux instrumentés | 14 |
| Variables capteurs | Pression · Débit · Niveau · Demande |
| Division | 70% train · 15% validation · 15% test |

---

## ❓ Problèmes fréquents

<details>
<summary><b>Le backend ne démarre pas</b></summary>

Vérifiez que l'environnement virtuel est bien activé :
```bash
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install -r requirements.txt
```
</details>

<details>
<summary><b>Le frontend affiche une erreur de connexion API</b></summary>

Assurez-vous que le backend tourne bien sur le port 8000 avant de lancer le frontend.  
Vérifiez dans `frontend/src/config.js` que l'URL pointe vers `http://localhost:8000`.
</details>

<details>
<summary><b>Erreur lors de l'import du fichier CSV</b></summary>

Le fichier doit respecter le format BattLeDIM :
- Séparateur : virgule `,`
- Encodage : UTF-8
- Colonne obligatoire : `Timestamp` au format `YYYY-MM-DD HH:MM:SS`
</details>

---

## 📄 Article Scientifique

> Retrouvez la méthodologie complète, les équations du modèle et l'analyse des résultats dans notre article :

**[📖 Détection des Pertes d'Eau dans les Réseaux de Distribution Urbaine par Apprentissage Profond Hybride LSTM & Topology Embedding](https://drive.google.com/file/d/1-ZQ1UPI_Ky_LFXhm8v7u4JSuYpcjkQqT/view?usp=sharing)**

---

<p align="center">
  <b>💧 Sauvons l'eau, une prédiction à la fois.</b><br/>
  <sub>Meriem Ibnibrahym · Master AISD · FST Tanger · 2025</sub>
</p>
