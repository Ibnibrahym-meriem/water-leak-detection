import pandas as pd
import json
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64

class ResultsAnalyzer:
    def __init__(self, config_path):
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        self.topology = self.config.get("topology", {})
        self.threshold = self.config.get("threshold", 0.5)

    def get_model_kpi(self):
        """
        Retourne les KPIs statiques du modèle (basés sur votre entraînement) 
        pour affichage en haut du dashboard.
        """
        return {
            "accuracy": "97.0%",
            "f1_score": "0.97",
            "recall": "0.96 (Fuite)",
            "precision": "0.96 (Fuite)",
            "threshold_used": f"{self.threshold:.4f}"
        }

    def enrich_results(self, predictions_df):
        """
        Ajoute les infos de topologie (Zone, Noeuds) au tableau de résultats.
        """
        if predictions_df.empty:
            return predictions_df

        # Fonction pour récupérer la zone et les noeuds depuis la config JSON
        def get_topo_info(pipe_name):
            info = self.topology.get(pipe_name, {})
            return pd.Series([info.get("zone", "Inconnue"), ", ".join(info.get("nodes", []))])

        predictions_df[['Zone', 'Noeuds_Impactes']] = predictions_df['Pipe'].apply(get_topo_info)
        return predictions_df

    def generate_dashboard_table(self, enriched_df):
        """
        Prépare le tableau final pour l'affichage (filtrage des colonnes utiles).
        Trie par probabilité décroissante (les fuites en premier).
        """
        if enriched_df.empty:
            return pd.DataFrame()
            
        display_cols = ['Timestamp', 'Pipe', 'Zone', 'Noeuds_Impactes', 'Probability', 'Risk_Level']
        # On formate la probabilité en pourcentage
        df_display = enriched_df[display_cols].copy()
        df_display['Probability'] = (df_display['Probability'] * 100).round(2).astype(str) + ' %'
        
        # Tri : Les risques critiques en haut
        return df_display.sort_values(by='Probability', ascending=False)

    def generate_global_status(self, enriched_df):
        """
        Génère l'interprétation globale pour les techniciens.
        """
        if enriched_df.empty:
            return {"status": "NO_DATA", "message": "Aucune donnée analysée."}

        # On regarde la dernière prédiction (temps réel) ou le max des prédictions uploadées
        critical_leaks = enriched_df[enriched_df['Is_Leak'] == True]

        if not critical_leaks.empty:
            # Récupérer les zones uniques touchées
            zones = critical_leaks['Zone'].unique()
            pipes = critical_leaks['Pipe'].unique()
            
            message = (
                f"⚠️ ALERTE FUITE DÉTECTÉE !\n"
                f"Le modèle a identifié une anomalie critique (Prob > {self.threshold}).\n"
                f"📍 Zones concernées : {', '.join(zones)}.\n"
                f"🔧 Tuyaux à inspecter : {', '.join(pipes)}.\n"
                f"👉 Action requise : Diriger immédiatement l'équipe de maintenance vers ces secteurs pour inspection corrective."
            )
            return {"status": "ALERT", "message": message, "color": "red"}
        else:
            message = (
                "✅ SYSTÈME STABLE.\n"
                "Les capteurs indiquent un comportement hydraulique normal et habituel.\n"
                "Aucune intervention requise pour le moment."
            )
            return {"status": "NORMAL", "message": message, "color": "green"}

    def plot_predictions(self, enriched_df):
        """
        Génère un graphe des probabilités par tuyau.
        Retourne l'objet figure matplotlib pour intégration dans Streamlit/Dash.
        """
        if enriched_df.empty:
            return None

        plt.figure(figsize=(12, 6))
        
        # On trace seulement si on a des données. 
        # Si beaucoup de données, on prend les x derniers points ou on moyenne
        sns.lineplot(data=enriched_df, x='Timestamp', y='Probability', hue='Pipe', palette='tab10')
        
        # Ligne de seuil
        plt.axhline(y=self.threshold, color='r', linestyle='--', label=f'Seuil Alerte ({self.threshold})')
        
        plt.title("Évolution de la Probabilité de Fuite par Tuyau")
        plt.ylabel("Probabilité de Fuite (0-1)")
        plt.xlabel("Temps")
        plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        plt.tight_layout()
        
        return plt.gcf() # Retourne la figure courante