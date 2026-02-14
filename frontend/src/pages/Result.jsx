import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertOctagon, CheckCircle2, ArrowLeft, Activity, MapPin, Download, ChevronRight } from 'lucide-react';
// Import des composants Recharts
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.analysisData;

  // Redirection si pas de données
  useEffect(() => {
    if (!data) {
      navigate('/dashboard');
    }
  }, [data, navigate]);

  if (!data) return null;

  const { interpretation, data: tableData } = data;

  // ---------------------------------------------------------
  // CONFIGURATION DU SEUIL
  // ---------------------------------------------------------
  const THRESHOLD = 73.2;

  // Préparation des données pour Recharts
  const chartData = useMemo(() => {
    return tableData.map(row => {
      const rawProb = parseFloat(row.Probability);
      const prob = rawProb > 1 ? rawProb : rawProb * 100;
      return {
        timestamp: row.Timestamp,
        probability: prob,
        pipe: row.Pipe,
        zone: row.Zone
      };
    });
  }, [tableData]);

  // Détection d'alerte
  const leakData = chartData.find(d => d.probability > THRESHOLD);
  const isAlert = !!leakData || interpretation.status === 'ALERT';

  // Fonction pour télécharger le tableau en CSV
  const downloadCSV = () => {
    if (!tableData || tableData.length === 0) return;

    const headers = ["Timestamp", "Tuyau", "Zone", "Noeuds Impactés", "Probabilité", "Niveau de Risque"];
    const rows = tableData.map(row => [
      row.Timestamp,
      row.Pipe,
      row.Zone,
      row.Noeuds_Impactes,
      row.Probability,
      row.Risk_Level
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "resultats_analyse_aqualeak.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Tooltip pour le graphique
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-100 text-sm">
          <p className="font-semibold text-slate-800 mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-slate-500 text-xs">Tuyau: <span className="text-slate-700 font-medium">{dataPoint.pipe}</span></p>
            <p className="text-slate-500 text-xs">Zone: <span className="text-slate-700 font-medium">{dataPoint.zone}</span></p>
            <div className="pt-1 border-t border-slate-50 mt-1">
              <span className={`font-bold ${dataPoint.probability > THRESHOLD ? 'text-rose-500' : 'text-emerald-500'}`}>
                {dataPoint.probability.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* EN-TÊTE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center text-slate-400 hover:text-slate-800 transition-colors text-sm font-medium mb-3"
            >
              <ArrowLeft size={16} className="mr-2" /> Retour au tableau de bord
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Rapport d'Analyse
            </h1>
            <p className="text-slate-500 mt-1">Détails de l'inspection hydraulique récente</p>
          </div>

          <button 
            onClick={downloadCSV}
            className="group flex items-center justify-center gap-2 bg-white hover:bg-slate-800 hover:text-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl shadow-sm transition-all duration-300 font-medium"
          >
            <Download size={18} className="text-slate-400 group-hover:text-white transition-colors" />
            <span>Exporter CSV</span>
          </button>
        </div>

        {/* CARTE DE STATUT ÉLÉGANTE (Blanc dominant, icône colorée) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60 relative overflow-hidden">
          {/* Petite barre latérale de couleur décorative */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isAlert ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className={`
              flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center
              ${isAlert ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}
            `}>
              {isAlert ? <AlertOctagon size={32} /> : <CheckCircle2 size={32} />}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {isAlert ? "Anomalie détectée sur le réseau" : "Système opérationnel"}
              </h2>
              
              <p className="text-slate-500 leading-relaxed max-w-3xl">
                {isAlert ? (
                  <>
                    Une variation de pression supérieure au seuil de sécurité a été identifiée. 
                    L'analyse recommande une vérification technique au niveau de la 
                    <strong className="text-slate-800 ml-1">{leakData ? leakData.zone : "Zone critique"}</strong>.
                  </>
                ) : (
                  "L'ensemble des capteurs rapporte des valeurs conformes aux normes d'exploitation. Aucune fuite ni chute de pression anormale n'a été détectée sur la période analysée."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* GRAPHIQUE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Évolution de la Probabilité</h3>
            </div>
            {/* Légende discrète */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Probabilité
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> Seuil {THRESHOLD}%
               </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#cbd5e1" 
                  tick={{fontSize: 11, fill: '#64748b'}} 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#cbd5e1" 
                  tick={{fontSize: 11, fill: '#64748b'}} 
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                
                <ReferenceLine 
                  y={THRESHOLD} 
                  stroke="#fb7185" 
                  strokeDasharray="3 3" 
                  strokeWidth={1.5}
                />
                
                <Area 
                  type="monotone" 
                  dataKey="probability" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorProb)" 
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#0891b2' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLEAU */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <MapPin size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Données détaillées par secteur</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="p-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Heure</th>
                  <th className="p-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Identifiant Tuyau</th>
                  <th className="p-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Zone</th>
                  <th className="p-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Probabilité de fuite</th>
                  <th className="p-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {chartData.map((row, index) => {
                  const isHighProb = row.probability > THRESHOLD;

                  return (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-6 text-sm text-slate-500 whitespace-nowrap">
                        {row.timestamp}
                      </td>
                      <td className="p-6 text-sm font-medium text-slate-800">
                        {row.pipe}
                      </td>
                      <td className="p-6 text-sm text-slate-600">
                        {row.zone}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${
                                isHighProb ? 'bg-rose-500' : 'bg-emerald-500'
                              }`} 
                              style={{ width: `${Math.min(row.probability, 100)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold w-12 text-right ${
                            isHighProb ? "text-rose-600" : "text-emerald-600"
                          }`}>
                            {row.probability.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        {/* Statut "Couleur normale" : Un badge neutre et élégant */}
                        <span className={`
                          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                          ${isHighProb 
                            ? 'bg-white border-rose-200 text-rose-700' 
                            : 'bg-white border-slate-200 text-slate-600'
                          }
                        `}>
                          {isHighProb ? "À vérifier" : "Conforme"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {chartData.length === 0 && (
            <div className="p-12 text-center text-slate-400">
               Aucune donnée disponible.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}