import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Activity, Target, TrendingUp, Zap } from 'lucide-react';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // MISE À JOUR : Valeurs réelles issues du rapport de classification (Zone Fuite)
  const modelKPIs = [
    { 
      title: "Accuracy", 
      value: "96%", 
      subText: "Taux global de prédictions exactes",
      icon: <Target size={24} className="text-cyan-600" />, 
      bgBase: "bg-cyan-50",
    },
    { 
      title: "Precision", 
      value: "94%", 
      subText: "Fiabilité des alertes (classe Fuite)",
      icon: <TrendingUp size={24} className="text-cyan-600" />, 
      bgBase: "bg-cyan-50",
    },
    { 
      title: "Recall", 
      value: "96%", 
      subText: "Sensibilité de détection des fuites",
      icon: <Activity size={24} className="text-cyan-600" />, 
      bgBase: "bg-cyan-50",
    },
    { 
      title: "F1-Score", 
      value: "0.95", 
      subText: "Moyenne harmonique de performance",
      icon: <Zap size={24} className="text-cyan-600" />, 
      bgBase: "bg-cyan-50",
    },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier (CSV, Excel, JSON).");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de l'analyse.");
      const data = await response.json();
      
      // On passe les données au composant Results
      navigate('/results', { state: { analysisData: data } });

    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur ou fichier invalide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-12 pt-8 px-4">
      
      {/* HEADER */}
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Performances du moteur AquaLeak AI
        </h2>
        <p className="text-slate-500 text-sm mt-1">Modèle LSTM + Topology Embedding | Seuil optimal : 0.732</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modelKPIs.map((kpi, index) => (
          <div 
            key={index}
            className="
              bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm 
              transition-all duration-300 ease-out 
              hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1
              flex flex-col justify-between h-full
            "
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-semibold text-slate-700">{kpi.title}</span>
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${kpi.bgBase}`}>
                {kpi.icon}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-4xl font-bold text-slate-800 tracking-tight">
                {kpi.value}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                {kpi.subText}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION PRÉDICTION */}
      <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        
        <h2 className="text-xl font-semibold text-slate-800 mb-8 flex items-center gap-3">
          <UploadCloud className="text-cyan-500" size={28} />
          Lancer une nouvelle analyse prédictive
        </h2>

        {/* Zone Upload */}
        <div className="border-2 border-dashed border-slate-200 hover:border-cyan-400 bg-slate-50/50 rounded-3xl p-12 text-center transition-all duration-300 group cursor-pointer">
          <input 
            type="file" 
            id="fileInput" 
            className="hidden" 
            onChange={handleFileChange}
            accept=".csv, .xlsx, .json"
          />
          
          <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-6 w-full h-full">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md border border-slate-100">
              <UploadCloud size={36} className="text-cyan-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">
                {file ? file.name : "Cliquez pour uploader les données capteurs"}
              </p>
              <p className="text-sm font-medium text-slate-400">
                Formats acceptés : CSV (historique), Excel ou JSON
              </p>
            </div>
          </label>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-xl flex items-center gap-3 font-medium">
            <Activity size={20} />
            {error}
          </div>
        )}

        {/* BOUTON Lancer */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={loading || !file}
            className={`
              px-10 py-4 rounded-2xl font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center gap-3 text-lg
              ${loading 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-cyan-500 hover:bg-cyan-400 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95'
              }
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Activity size={22} />
                Prédire les fuites
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}