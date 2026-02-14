import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
// ❌ import Sidebar from '../components/Sidebar';  <-- SUPPRIMÉ
import { 
  Download, FileText, BarChart2, Database, Map, 
  Rocket, Brain, Info, MousePointerClick
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
    const opt = {
      margin: 10,
      filename: 'AquaLeak_Documentation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

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
      { id: 'lstm', label: 'Modèle LSTM', icon: <Brain size={20} /> },
      { id: 'scada', label: 'Données SCADA', icon: <Database size={20} /> },
      { id: 'topo', label: 'Topologie', icon: <Map size={20} /> },
      { id: 'interp', label: 'Résultats', icon: <BarChart2 size={20} /> },
      { id: 'guide', label: 'Utilisation', icon: <MousePointerClick size={20} /> },
  ];

  // NOTE : J'ai retiré le wrapper "flex h-screen" car le Layout s'en occupe
  return (
    <div id="content-to-print" className="min-h-full pb-20 bg-[#f8fafc]">
        
        {/* --- HEADER --- */}
        <header className="sticky top-0 z-50 h-20 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-cyan-50 rounded-lg text-cyan-600">
                    <FileText size={26} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Documentation Technique</h1>
            </div>
            
            <button 
                onClick={handleDownloadPDF} 
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium text-base rounded-lg hover:bg-cyan-600 transition-all shadow-lg shadow-slate-200"
            >
                <Download size={20} />
                <span>Exporter PDF</span>
            </button>
        </header>

        {/* --- TITLE --- */}
        <div className="w-full mx-auto px-6 pt-12 pb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                📘 Documentation du Système <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">de Détection de Fuites</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Référence complète pour l'architecture, la topologie et l'interprétation des analyses d'AquaLeak AI.
            </p>
        </div>

        {/* --- MENU STICKY --- */}
        <div className="sticky top-20 z-40 bg-[#f8fafc]/95 backdrop-blur-sm py-4 border-b border-slate-200/50 mb-12 shadow-sm">
            <div className="w-full max-w-full mx-auto px-4 flex flex-nowrap items-center justify-center gap-4 overflow-x-auto pb-1 custom-scrollbar-hide">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`
                            flex items-center gap-2 px-5 py-3 rounded-full text-base font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0
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
        <div className="w-full max-w-6xl mx-auto px-6 space-y-16">

            {/* 1. INTRODUCTION */}
            <section id="intro" className="scroll-mt-48">
                <SectionHeader number="1" title="Introduction" icon={<Rocket className="text-white" size={24}/>} />
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <p className="text-lg text-slate-700 leading-loose mb-8">
                        Le système <strong className="text-slate-900 font-bold">AquaLeak Detector</strong> est une solution numérique conçue pour la détection préventive des fuites dans les réseaux de distribution d'eau potable.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <InfoCard title="Objectif" text="Analyser les flux de données pour identifier des anomalies invisibles à l'œil nu." />
                        <InfoCard title="Approche" text="Utilisation d'un modèle hybride LSTM combinant l'analyse temporelle et la connaissance de la topologie physique du réseau." />
                    </div>
                </div>
            </section>

            {/* 2. MODELE LSTM */}
            <section id="lstm" className="scroll-mt-48">
                <SectionHeader number="2" title="Modèle LSTM & Architecture" icon={<Brain className="text-white" size={24}/>} />
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <p className="text-lg text-slate-700 leading-loose mb-8">
                        Le cœur de la détection repose sur un réseau de neurones <strong className="text-cyan-700 font-bold">LSTM (Long Short-Term Memory)</strong>.
                    </p>
                    <ul className="space-y-6">
                        <li className="flex gap-5 items-start">
                            <div className="mt-1 w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm flex-shrink-0">A</div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-xl mb-1">Mémoire Temporelle</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">Le modèle analyse une fenêtre de <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">288 points</span> (24h) pour comprendre les cycles de consommation habituels.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* 3. DONNEES SCADA */}
            <section id="scada" className="scroll-mt-48">
                <SectionHeader number="3" title="Données SCADA & Paramètres" icon={<Database className="text-white" size={24}/>} />
                <div className="bg-white overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="p-8 pb-4">
                        <p className="text-slate-600 text-lg mb-4">Pour un diagnostic précis, le système s'appuie sur cinq types de données fondamentales :</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Type de Donnée</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-center">Symbole</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-cyan-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-800 text-lg">Timestamp</td>
                                    <td className="px-8 py-6 text-center font-serif italic text-cyan-800 font-bold bg-slate-50/50 text-lg">T</td>
                                    <td className="px-8 py-6 text-slate-600 text-lg">Indispensable. Date et heure de la mesure.</td>
                                </tr>
                                <tr className="hover:bg-cyan-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-800 text-lg">Pression</td>
                                    <td className="px-8 py-6 text-center font-serif italic text-cyan-800 font-bold bg-slate-50/50 text-lg">P</td>
                                    <td className="px-8 py-6 text-slate-600 text-lg">Mesurée aux nœuds en mètres.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 4. TOPOLOGIE */}
            <section id="topo" className="scroll-mt-48">
                <SectionHeader number="4" title="Topologie du Réseau" icon={<Map className="text-white" size={24}/>} />
                <div className="bg-white overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-800 text-slate-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">Identifiant Tuyau</th>
                                    <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">Nœuds de Contrôle</th>
                                    <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">Zone de Surveillance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {topologyData.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-cyan-50/50' : 'bg-slate-50/50 hover:bg-cyan-50/50'}>
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
            <section id="interp" className="scroll-mt-48">
                <SectionHeader number="5" title="Interprétation des Résultats" icon={<BarChart2 className="text-white" size={24}/>} />
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex gap-6 items-start">
                        <div className="p-3 bg-slate-100 text-slate-500 rounded-full mt-1">
                            <Info size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Probabilité &lt; 0.3 (Score faible)</h3>
                            <p className="text-slate-600 text-lg">Le réseau se comporte normalement.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Footer */}
             <footer className="mt-16 py-10 text-center border-t border-slate-200">
                <p className="text-slate-500 text-lg">© 2026 AquaLeak. Documentation Officielle v2.4</p>
            </footer>

        </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function SectionHeader({ number, title, icon }) {
    return (
        <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-bold">
                {icon}
            </div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <span className="text-slate-300 text-4xl font-black opacity-30">{number}.</span> 
                {title}
            </h2>
        </div>
    );
}

function InfoCard({ title, text }) {
    return (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-cyan-200 transition-colors">
            <h4 className="text-cyan-800 font-bold mb-3 uppercase text-sm tracking-widest">{title}</h4>
            <p className="text-slate-700 text-lg leading-relaxed">{text}</p>
        </div>
    );
}