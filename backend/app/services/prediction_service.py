import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import json
import os

class PredictionService:
    def __init__(self, model_path, scaler_path, config_path):
        """
        Initialise le service de prédiction en chargeant les artefacts entraînés.
        """
        self.model_path = model_path
        self.scaler_path = scaler_path
        self.config_path = config_path
        
        # Chargement des composants
        self.model = self._load_model()
        self.scaler = self._load_scaler()
        self.config = self._load_config()
        
        # Configuration (doit correspondre à l'entraînement)
        self.seq_length = 288  # Fenêtre temporelle (ex: 24h si 1 point/5min)
        # Fallback si pipe_to_id n'est pas dans la config
        self.pipe_mapping = self.config.get("pipe_to_id", {})
        
        # Seuil par défaut (73.2% = 0.732)
        self.threshold = 0.732 

    def _load_model(self):
        try:
            return tf.keras.models.load_model(self.model_path)
        except Exception as e:
            raise RuntimeError(f"Erreur chargement modèle: {e}")

    def _load_scaler(self):
        try:
            return joblib.load(self.scaler_path)
        except Exception as e:
            raise RuntimeError(f"Erreur chargement scaler: {e}")

    def _load_config(self):
        try:
            if os.path.exists(self.config_path):
                with open(self.config_path, 'r') as f:
                    return json.load(f)
            else:
                print(f"Attention: Config path {self.config_path} introuvable.")
                return {}
        except Exception as e:
            print(f"Attention: Erreur lecture config ({e}). Utilisation config vide.")
            return {}

    def load_data(self, file_path, file_type='csv'):
        """
        Charge les données de manière robuste (gestion des erreurs Timestamp et séparateurs).
        """
        df = None
        
        # 1. Lecture du fichier selon le type
        if file_type == 'csv':
            try:
                # Essai standard (virgule)
                df = pd.read_csv(file_path)
                # Si lecture échoue (ex: tout dans 1 colonne), on tente le point-virgule
                if len(df.columns) < 2:
                    df = pd.read_csv(file_path, sep=';')
            except:
                # Fallback direct au point-virgule
                df = pd.read_csv(file_path, sep=';')
                
        elif file_type in ['xls', 'xlsx']:
            df = pd.read_excel(file_path)
        elif file_type == 'json':
            df = pd.read_json(file_path)
        else:
            raise ValueError("Format de fichier non supporté. Utilisez CSV, Excel ou JSON.")

        if df is None or df.empty:
            raise ValueError("Le fichier est vide ou illisible.")

        # 2. Nettoyage des noms de colonnes (supprime les espaces: ' Timestamp ' -> 'Timestamp')
        df.columns = df.columns.str.strip()

        # 3. Correction du nom de la colonne Temps (Timestamp / Date / Time...)
        target_col = 'Timestamp'
        possible_names = ['timestamp', 'Date', 'date', 'Time', 'time', 'Datetime', 'datetime', 'Date_Time']
        
        if target_col not in df.columns:
            found = False
            for name in possible_names:
                if name in df.columns:
                    print(f"Correction: Renommage de '{name}' en '{target_col}'")
                    df.rename(columns={name: target_col}, inplace=True)
                    found = True
                    break
            
            if not found:
                raise KeyError(f"Colonne 'Timestamp' introuvable. Colonnes détectées : {list(df.columns)}")

        # 4. Conversion des données
        # Gestion des nombres avec virgules (français) au lieu de points
        for col in df.columns:
            if col not in [target_col, 'Pipe', 'Zone', 'Is_Leak', 'Risk_Level']:
                if df[col].dtype == 'object':
                    # On remplace virgule par point uniquement si c'est une string
                    try:
                        df[col] = df[col].str.replace(',', '.', regex=False)
                    except AttributeError:
                        pass # Ce n'était pas une string
                    df[col] = pd.to_numeric(df[col], errors='coerce')

        # Conversion Timestamp
        df[target_col] = pd.to_datetime(df[target_col], errors='coerce')
        
        # Suppression des lignes vides (NaN) créées par les conversions
        df = df.dropna()
        
        # Tri par temps pour assurer l'ordre chronologique
        df = df.sort_values(by=target_col)

        return df

    def preprocess_data(self, df):
        """
        Prépare les données pour le modèle (Features Engineering + Scaling).
        """
        data = df.copy()
        
        # 1. Features Temporelles Cycliques (Sin/Cos)
        data['hour_sin'] = np.sin(2 * np.pi * data['Timestamp'].dt.hour / 24).astype(np.float32)
        data['hour_cos'] = np.cos(2 * np.pi * data['Timestamp'].dt.hour / 24).astype(np.float32)
        
        # 2. Mapping Pipe ID
        if 'Pipe' not in data.columns:
             # Si pas de colonne Pipe, on suppose un fichier mono-tuyau ou on lève une erreur
             raise ValueError("La colonne 'Pipe' est manquante dans le fichier.")
             
        # Filtrage : On garde uniquement les tuyaux présents dans le mapping
        # Si le mapping est vide, on essaie de construire un mapping temporaire ou on erreur
        if not self.pipe_mapping:
             # Tentative de récupération depuis le fichier si config vide (mode dégradé)
             unique_pipes = data['Pipe'].unique()
             self.pipe_mapping = {p: i for i, p in enumerate(unique_pipes)}

        # Filtrage strict selon la config
        data = data[data['Pipe'].isin(self.pipe_mapping.keys())]
        
        if len(data) == 0:
            raise ValueError(f"Aucun tuyau valide trouvé. Assurez-vous que les IDs (ex: p810) correspondent à l'entraînement.")

        # Conversion ID String -> ID Int
        data['pipe_id'] = data['Pipe'].map(self.pipe_mapping).astype(int)
        
        # 3. Scaling
        # Sélectionner les colonnes de features (Flow, Pressure, etc.)
        # On exclut les métadonnées et targets potentielles
        cols_excluded = ['Timestamp', 'Pipe', 'pipe_id', 'Zone', 'Leak', 'Is_Leak', 'LeakValue', 'Risk_Level', 'Probability', 'Noeuds_Impactes']
        cols_to_scale = [c for c in data.columns if c not in cols_excluded]
        
        # Application du scaler chargé
        try:
            data[cols_to_scale] = self.scaler.transform(data[cols_to_scale])
        except ValueError as e:
            # Gestion d'erreur si les colonnes ne matchent pas
            raise ValueError(f"Erreur de scaling. Vérifiez que le fichier contient bien les colonnes attendues. Détail: {e}")
        
        return data, cols_to_scale

    def create_sequences(self, df_processed, cols_features):
        """
        Crée les séquences (fenêtres glissantes) pour le LSTM.
        """
        X_seqs = []
        X_pipes = []
        timestamps = []
        original_pipes = []
        zones = [] # Pour garder l'info de zone

        # Grouper par tuyau pour ne pas mélanger les séries temporelles
        for pipe_name, group in df_processed.groupby('Pipe'):
            pipe_id = self.pipe_mapping.get(pipe_name)
            
            # Récupération des valeurs
            feature_values = group[cols_features].values
            ts_values = group['Timestamp'].values
            
            # Gestion de la zone (si colonne existe, sinon 'Inconnue')
            zone_val = group['Zone'].iloc[0] if 'Zone' in group.columns else 'Zone Inconnue'
            
            # Vérification longueur minimale
            if len(feature_values) < self.seq_length:
                continue

            # Création fenêtres glissantes
            # On prend stride=1 pour avoir une prédiction à chaque pas de temps possible
            for i in range(len(feature_values) - self.seq_length + 1):
                # Séquence de features (ex: 288 lignes, N features)
                seq = feature_values[i : i + self.seq_length]
                
                X_seqs.append(seq)
                X_pipes.append(pipe_id)
                
                # Timestamp correspondant à la DERNIÈRE mesure de la séquence (instant t)
                timestamps.append(ts_values[i + self.seq_length - 1])
                original_pipes.append(pipe_name)
                zones.append(zone_val)

        # CORRECTION ICI : On retourne un tuple contenant les numpy arrays, 
        # pour respecter la structure attendue par l'unpacking dans predict()
        if not X_seqs:
            return (np.array([]), np.array([])), [], [], []

        return (np.array(X_seqs), np.array(X_pipes)), timestamps, original_pipes, zones

    def predict(self, file_path, file_type='csv'):
        """
        Pipeline complet : Chargement -> Préparation -> Prédiction -> Formatage
        """
        # 1. Chargement robuste
        raw_df = self.load_data(file_path, file_type)
        
        # 2. Preprocessing
        processed_df, feature_cols = self.preprocess_data(raw_df)
        
        # 3. Création des séquences
        # C'est ici que l'erreur se produisait si create_sequences retournait 5 valeurs
        (X_seq, X_pipe), timestamps, pipe_names, zones = self.create_sequences(processed_df, feature_cols)
        
        # Vérification si données suffisantes
        if len(X_seq) == 0:
            # Retourner un DF vide mais avec les colonnes attendues pour éviter le crash
            return pd.DataFrame(columns=['Timestamp', 'Pipe', 'Zone', 'Probability', 'Is_Leak', 'Risk_Level', 'Noeuds_Impactes'])
        
        # 4. Prédiction avec le modèle TensorFlow
        # Le modèle attend une liste de deux entrées : [input_sequence, input_pipe_id]
        predictions = self.model.predict([X_seq, X_pipe], verbose=0)
        
        # Aplatir le résultat (tableau 1D)
        probs = predictions.flatten()
        
        # 5. Construction du résultat
        results_df = pd.DataFrame({
            'Timestamp': timestamps,
            'Pipe': pipe_names,
            'Zone': zones,
            'Probability': probs,
            'Noeuds_Impactes': ['Analyse en cours...'] * len(probs)
        })
        
        # 6. Logique de décision et CORRECTION DU BUG Is_Leak
        # Ajout explicite de la colonne Is_Leak (booléen) requise par results_analyzer.py
        results_df['Is_Leak'] = results_df['Probability'] > self.threshold
        
        # Définition du niveau de risque textuel
        results_df['Risk_Level'] = results_df['Is_Leak'].apply(
            lambda x: 'CRITIQUE' if x else 'NORMAL'
        )
        
        # Formatage du Timestamp en string lisible pour JSON
        results_df['Timestamp'] = results_df['Timestamp'].astype(str)
        
        return results_df