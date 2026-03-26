import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  Download, FileText, BarChart2, Database, Map, 
  Rocket, Brain, Info, MousePointerClick, CheckCircle2, AlertTriangle, Activity 
} from 'lucide-react';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('content-to-print');
    
    // Options optimisées pour corriger les bugs de rendu
    const opt = {
      margin: [10, 5, 10, 5], // Marges [haut, gauche, bas, droite]
      filename: 'AquaLeak_Technical_Doc.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollY: 0,
        windowWidth: 1200 // Fixe la largeur pour éviter les sauts de ligne imprévus
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Évite de couper les cartes en deux
    };

    // On lance le téléchargement
    html2pdf().set(opt).from(element).save();
  };

  const scadaFiles = [
    { file: '2018_SCADA_Pressures.csv', param: 'Pression (P)', role: 'Indicateur principal de rupture (chute brutale de charge).' },
    { file: '2018_SCADA_Flows.csv', param: 'Débit (Q)', role: 'Mesure le volume d\'eau. Un débit anormal sans demande associée = Fuite.' },
    { file: '2018_SCADA_Demands.csv', param: 'Demande (D)', role: 'Consommation estimée des clients. Sert à filtrer les usages normaux.' },
    { file: '2018_SCADA_Levels.csv', param: 'Niveaux (L)', role: 'Surveille les réservoirs. Aide à identifier les fuites massives de stockage.' },
    { file: '2018_Leakages.csv', param: 'Labels (Cibles)', role: 'Contient l\'historique des fuites réelles pour l\'entraînement.' },
  ];

  const topologyData = [
      { pipe: 'p31', nodes: 'n40, n42', zone: 'Quartier Nord-Ouest' },
      { pipe: 'p158', nodes: 'n232, n235', zone: 'Zone Ouest (R2)' },
      { pipe: 'p183', nodes: 'n141, n229', zone: 'Centre-Ouest' },
      { pipe: 'p232', nodes: 'n333, n334', zone: 'Zone Entrée / Pompage' },
      { pipe: 'p257', nodes: 'n342, n288', zone: 'Zone Centrale' },
      { pipe: 'p369', nodes: 'n370, n371', zone: 'Quartier Nord-Est' },
      { pipe: 'p427', nodes: 'n425, n427', zone: 'Secteur A' },
      { pipe: 'p461', nodes: 'n106, n484', zone: 'Secteur B' },
      { pipe: 'p538', nodes: 'n537, n539', zone: 'Secteur Est' },
      { pipe: 'p628', nodes: 'n627, n628', zone: 'Secteur Sud-Ouest' },
      { pipe: 'p654', nodes: 'n609, n610', zone: 'Secteur Sud-Est' },
      { pipe: 'p673', nodes: 'n183, n673', zone: 'Sud-Centrale' },
      { pipe: 'p810', nodes: 'n716, n717', zone: 'Sud Périphérique' },
      { pipe: 'p866', nodes: 'n767, n768', zone: 'Extrémité Sud' },
  ];

  const menuItems = [
      { id: 'intro', label: 'Introduction', icon: <Rocket size={20} /> },
      { id: 'arch', label: 'Architecture', icon: <Brain size={20} /> },
      { id: 'scada', label: 'Données SCADA', icon: <Database size={20} /> },
      { id: 'topo', label: 'Topologie', icon: <Map size={20} /> },
      { id: 'alert', label: 'Seuils d\'Alerte', icon: <BarChart2 size={20} /> },
      { id: 'guide', label: 'Utilisation', icon: <MousePointerClick size={20} /> },
  ];

  return (
    <div id="content-to-print" className="min-h-full pb-20 bg-[#f8fafc]">
        
        {/* --- HEADER --- */}
        {/* Ajout de la classe "data-html2canvas-ignore" pour ne pas l'avoir sur le PDF */}
        <header data-html2canvas-ignore className="sticky top-0 z-50 h-20 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-cyan-50 rounded-lg text-cyan-600">
                    <FileText size={26} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Documentation AquaLeak</h1>
            </div>
            
            <button 
                onClick={handleDownloadPDF} 
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-cyan-600 transition-all shadow-lg"
            >
                <Download size={20} />
                <span>Exporter PDF</span>
            </button>
        </header>

        {/* --- TITLE --- */}
        <div className="w-full mx-auto px-6 pt-12 pb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Documentation du Système : <br/>
                {/* Correction ici : On remplace le dégradé par une couleur solide pour le PDF afin d'éviter le rectangle bleu */}
                <span className="text-cyan-600">AquaLeak Detector</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Intelligence Artificielle au service de la préservation des ressources hydriques.
            </p>
        </div>

        {/* --- MENU --- */}
        {/* Ajout de "data-html2canvas-ignore" pour masquer le menu sur le PDF */}
        <div data-html2canvas-ignore className="sticky top-20 z-40 bg-[#f8fafc]/95 backdrop-blur-sm py-4 border-b border-slate-200/50 mb-12 shadow-sm">
            <div className="w-full max-w-full mx-auto px-4 flex flex-nowrap items-center justify-center gap-4 overflow-x-auto pb-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`
                            flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap
                            ${activeSection === item.id 
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                                : 'bg-white text-slate-500 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600'
                            }
                        `}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>
        </div>

        {/* --- CONTENU --- */}
        <div className="w-full max-w-6xl mx-auto px-6 space-y-20">

            {/* 1. INTRODUCTION */}
            <section id="intro" className="scroll-mt-48">
                <SectionHeader number="1" title="Introduction" icon={<Rocket className="text-white" size={24}/>} />
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <p className="text-lg text-slate-700 leading-loose">
                        AquaLeak est un système de monitoring avancé qui utilise le Deep Learning pour identifier les fuites d'eau en temps réel. En combinant l'analyse temporelle SCADA et la topologie physique du réseau, le système est capable de localiser les anomalies avec une précision chirurgicale sur 14 secteurs clés.
                    </p>
                </div>
            </section>

            {/* 2. ARCHITECTURE */}
            <section id="arch" className="scroll-mt-48">
                <SectionHeader number="2" title="Architecture du Modèle" icon={<Brain className="text-white" size={24}/>} />
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-lg">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Hybrid LSTM-Topology Network</h3>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-bold text-cyan-700 text-xl uppercase tracking-wide">
                                    <Activity size={20}/> A. Mémoire Temporelle (LSTM)
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Le modèle utilise des couches <strong>Long Short-Term Memory</strong> pour traiter les séries temporelles.
                                </p>
                                <ul className="list-disc list-inside text-slate-600 space-y-2 text-lg">
                                    <li><strong>Capacité :</strong> Mémorise les cycles de consommation sur 24h (288 points).</li>
                                    <li><strong>Analyse :</strong> Compare les flux actuels aux "patterns" historiques pour détecter des dérivations suspectes.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-bold text-blue-700 text-xl uppercase tracking-wide">
                                    <Map size={20}/> B. Embedding de Topologie & Fusion
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Au-delà du temps, le modèle intègre la structure spatiale du réseau :
                                </p>
                                <ul className="list-disc list-inside text-slate-600 space-y-2 text-lg">
                                    <li>Les données des <strong>14 tuyaux</strong> sont traitées simultanément.</li>
                                    <li>Le modèle apprend les corrélations naturelles entre les capteurs (ex: si la pression baisse au point A, elle doit varier proportionnellement au point B).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DONNEES SCADA */}
            <section id="scada" className="scroll-mt-48">
                <SectionHeader number="3" title="Données SCADA (Sources)" icon={<Database className="text-white" size={24}/>} />
                <div className="bg-white overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
                    <div className="p-8 pb-4">
                        <p className="text-slate-600 text-lg">Le système fusionne cinq fichiers sources pour construire une vision 360° du réseau :</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase">Fichier Source</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase">Paramètre</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase">Rôle dans la Détection</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {scadaFiles.map((item, i) => (
                                    <tr key={i} className="hover:bg-cyan-50/30 transition-colors">
                                        <td className="px-8 py-6 font-mono text-cyan-700 font-bold text-lg">{item.file}</td>
                                        <td className="px-8 py-6 font-bold text-slate-800 text-lg">{item.param}</td>
                                        <td className="px-8 py-6 text-slate-600 text-lg">{item.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 4. TOPOLOGIE */}
            <section id="topo" className="scroll-mt-48">
                <SectionHeader number="4" title="Topologie du Réseau" icon={<Map className="text-white" size={24}/>} />
                <div className="bg-white overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
                    <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-800 text-slate-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-8 py-5 text-sm font-bold uppercase">Identifiant Tuyau</th>
                                    <th className="px-8 py-5 text-sm font-bold uppercase">Nœuds de Contrôle</th>
                                    <th className="px-8 py-5 text-sm font-bold uppercase">Zone de Surveillance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {topologyData.map((row, index) => (
                                    <tr key={index} className="hover:bg-cyan-50/50">
                                        <td className="px-8 py-4 font-mono text-cyan-800 font-bold border-r border-slate-100 text-lg">{row.pipe}</td>
                                        <td className="px-8 py-4 font-mono text-slate-600 border-r border-slate-100 text-lg">{row.nodes}</td>
                                        <td className="px-8 py-4 text-slate-700 font-medium text-lg">{row.zone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5. INTERPRETATION */}
            <section id="alert" className="scroll-mt-48">
                <SectionHeader number="5" title="Interprétation & Seuils d'Alerte" icon={<BarChart2 className="text-white" size={24}/>} />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl border-2 border-emerald-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500"><CheckCircle2 size={80}/></div>
                        <h4 className="text-emerald-700 font-bold text-xl mb-4 flex items-center gap-2">
                            Score &lt; 0.73 (Normal) ✅
                        </h4>
                        <p className="text-slate-600 text-lg">Le comportement du réseau est cohérent avec les données de demande et de niveau. Aucune anomalie détectée.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border-2 border-rose-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-rose-500"><AlertTriangle size={80}/></div>
                        <h4 className="text-rose-700 font-bold text-xl mb-4 flex items-center gap-2">
                            Score ≥ 0.73 (Alerte Détectée) 🚨
                        </h4>
                        <p className="text-slate-600 text-lg mb-4"><strong>Action :</strong> Une alerte est levée immédiatement.</p>
                        <p className="text-slate-600 text-lg"><strong>Précision :</strong> Le système a une fiabilité de 96% (F1-score de 0.95 pour les fuites).</p>
                    </div>
                </div>
            </section>

            {/* 6. UTILISATION */}
            <section id="guide" className="scroll-mt-48">
                <SectionHeader number="6" title="Utilisation du Système" icon={<MousePointerClick className="text-white" size={24}/>} />
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl space-y-10">
                    <Step number="1" title="Synchronisation des Fichiers" text="Le système commence par un alignement temporel. Les fichiers de pressions, flux, demandes et niveaux sont indexés par le 'Timestamp' pour créer une matrice d'entrée unique par zone." />
                    <Step number="2" title="Monitoring en Temps Réel" text="Chaque nouvelle mesure est injectée dans le modèle. Le système calcule la probabilité de fuite pour chacun des 14 tuyaux suivis (p31, p158, etc.)." />
                    <Step number="3" title="Gestion des Alertes" text="Lorsqu'une alerte est déclenchée (Score > 0.73) : Identifiez le Pipe ID concerné, vérifiez les nœuds associés (ex: n40/n42 pour p31) et déployez une équipe acoustique." />
                </div>
            </section>

             {/* Footer */}
             <footer className="mt-20 py-12 text-center border-t border-slate-200">
                <p className="text-slate-500 text-lg">© 2026 AquaLeak AI. Documentation Officielle v2.5 - Rapport de Performance LSTM</p>
            </footer>

        </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function SectionHeader({ number, title, icon }) {
    return (
        <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg text-white font-bold">
                {icon}
            </div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <span className="text-slate-300 text-4xl font-black opacity-30">{number}.</span> 
                {title}
            </h2>
        </div>
    );
}

function Step({ number, title, text }) {
    return (
        <div className="flex gap-8 items-start">
            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 font-black text-xl flex-shrink-0 border border-cyan-100">
                {number}
            </div>
            <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide">Étape {number} : {title}</h4>
                <p className="text-slate-600 text-lg leading-relaxed">{text}</p>
            </div>
        </div>
    );
}