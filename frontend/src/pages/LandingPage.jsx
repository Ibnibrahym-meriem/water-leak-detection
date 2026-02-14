import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X, 
  BarChart3, 
  Cpu, 
  Map, 
  Bell,
  CheckCircle2
} from 'lucide-react';

const AquaLeakLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#16C2D5] selection:text-white bg-slate-50 overflow-x-hidden">
      
      {/* --- HEADER (Style exact de l'image) --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-slate-200/50 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-slate-50/90 backdrop-blur-sm py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo: AquaLeak AI */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <Droplets className="h-7 w-7 text-[#16C2D5]" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-[#0F5EA8] group-hover:text-[#16C2D5] transition-colors duration-300">
                AquaLeak AI
              </span>
            </div>

            {/* Desktop Menu - Centré */}
            <div className="hidden md:flex items-center space-x-10">
              {['Fonctionnalités', 'Documentation', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[15px] font-medium text-slate-600 hover:text-[#0F5EA8] transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#16C2D5] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* CTA Button Header - Style exact "Se connecter" */}
            <div className="hidden md:flex">
              <button 
                onClick={handleLoginRedirect}
                className="px-6 py-2.5 rounded-md bg-[#0F5EA8] text-white font-semibold text-sm shadow-md hover:bg-[#16C2D5] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
              >
                Se connecter
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-[#16C2D5] transition-colors p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 origin-top ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
            <div className="px-4 py-4 space-y-2">
              {['Fonctionnalités', 'Documentation', 'Contact'].map((item) => (
                <a key={item} href="#" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-[#16C2D5]/10 hover:text-[#16C2D5] hover:pl-6 font-medium transition-all duration-300">
                  {item}
                </a>
              ))}
              <button 
                onClick={handleLoginRedirect}
                className="w-full mt-4 px-6 py-3 rounded-lg bg-[#0F5EA8] hover:bg-[#16C2D5] text-white font-bold shadow-md transition-colors"
              >
                Se connecter
              </button>
            </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden bg-[#0B1F2E]">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#0B1F2E]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] mask-image-radial-gradient"></div>
        
        {/* Animated Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#0F5EA8]/20 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[10%] right-[0%] w-[500px] h-[500px] bg-[#16C2D5]/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16C2D5]/10 border border-[#16C2D5]/20 text-[#16C2D5] text-sm font-bold mb-8 animate-fade-in-up hover:bg-[#16C2D5]/20 hover:scale-105 transition-all duration-300 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C2D5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16C2D5]"></span>
            </span>
            Système de détection v2.0 disponible
          </div>

          {/* NOUVEAU TITRE */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-none drop-shadow-2xl">
            Détection Intelligente des<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C2D5] via-blue-400 to-[#0F5EA8] drop-shadow-[0_0_30px_rgba(22,194,213,0.3)] animate-gradient-x">
              Fuites d'Eau
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed font-light hover:text-slate-200 transition-colors duration-300">
            Surveillez, prédisez et prévenez les fuites d'eau urbaines grâce à notre modèle LSTM avancé. Une solution proactive pour un réseau durable.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              onClick={handleLoginRedirect}
              className="group relative px-8 py-4 rounded-full bg-white text-[#0B1F2E] font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(22,194,213,0.6)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#16C2D5] to-[#0F5EA8] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className="flex items-center gap-2">
                Démarrer l'analyse <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={handleLoginRedirect}
              className="px-8 py-4 rounded-full border border-slate-600 text-slate-300 font-semibold text-lg hover:border-[#16C2D5] hover:text-[#16C2D5] hover:bg-[#16C2D5]/5 hover:scale-105 transition-all duration-300"
            >
              Documentation technique
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (FLOATING) --- */}
      <div className="relative z-30 px-4 -mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<Activity size={32} />} 
              value="99.2%" 
              label="Précision Modèle" 
              delay="0"
            />
            <StatCard 
              icon={<Zap size={32} />} 
              value="< 500ms" 
              label="Latence Analyse" 
              delay="100"
            />
            <StatCard 
              icon={<ShieldCheck size={32} />} 
              value="24/7" 
              label="Surveillance" 
              delay="200"
            />
            <StatCard 
              icon={<Cpu size={32} />} 
              value="IoT Ready" 
              label="Compatibilité" 
              delay="300"
            />
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-[#0B1F2E] mb-6 group cursor-default">
              Technologie <span className="text-[#0F5EA8] group-hover:text-[#16C2D5] transition-colors duration-300">Avancée</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#0F5EA8] to-[#16C2D5] mx-auto rounded-full mb-6 hover:w-32 transition-all duration-500"></div>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
              Une architecture puissante combinant Big Data et Deep Learning pour une gestion de l'eau sans faille.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 />}
              title="Prédictions LSTM"
              desc="Algorithmes de réseaux de neurones récurrents capables d'apprendre les motifs temporels complexes de votre réseau."
            />
            <FeatureCard 
              icon={<Map />}
              title="Topologie Intelligente" 
              desc="Visualisation graphique des nœuds et des conduites avec identification instantanée des zones critiques."
            />
            <FeatureCard 
              icon={<Bell />}
              title="Système d'Alerte"
              desc="Notification multicanal instantanée lors de la détection d'anomalies de pression ou de débit."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Sécurité des Données"
              desc="Chiffrement de bout en bout et stockage sécurisé des données sensibles de l'infrastructure."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Performance Élevée"
              desc="Traitement de flux de données massifs en temps réel sans compromettre la réactivité."
            />
            <FeatureCard 
              icon={<CheckCircle2 />}
              title="Aide à la Décision"
              desc="Rapports détaillés et recommandations d'actions pour les équipes de maintenance sur le terrain."
            />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-28 bg-[#0B1F2E] relative overflow-hidden group">
        {/* Animated Background Effect on Hover */}
        <div className="absolute inset-0 bg-[#16C2D5] opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#0F5EA8]/20 rounded-full blur-[100px] group-hover:bg-[#16C2D5]/30 transition-colors duration-700"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#16C2D5]/20 rounded-full blur-[100px] group-hover:bg-[#0F5EA8]/30 transition-colors duration-700"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight transform group-hover:scale-105 transition-transform duration-500">
            Prêt à révolutionner votre maintenance ?
          </h2>
          <p className="text-xl text-[#9FB3C8] mb-12 font-light group-hover:text-white transition-colors duration-300">
            Rejoignez les gestionnaires de réseaux qui font confiance à AquaLeak pour sécuriser leur infrastructure.
          </p>
          
          <button 
            onClick={handleLoginRedirect} 
            className="px-12 py-5 rounded-xl bg-gradient-to-r from-[#0F5EA8] to-[#16C2D5] text-white font-bold text-lg shadow-2xl hover:shadow-[#16C2D5]/50 hover:-translate-y-2 hover:scale-105 transition-all duration-300 ring-offset-2 ring-offset-[#0B1F2E] hover:ring-2 ring-[#16C2D5]"
          >
            Accéder à la plateforme
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#081621] border-t border-slate-800 pt-16 pb-8 text-slate-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-white group cursor-pointer">
                <Droplets className="h-6 w-6 text-[#16C2D5] group-hover:animate-bounce" />
                <span className="font-bold text-xl group-hover:text-[#16C2D5] transition-colors">AquaLeak AI</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 hover:text-slate-300 transition-colors">
                Solution leader en détection de fuites par intelligence artificielle pour les réseaux urbains.
              </p>
            </div>
            
            {/* Colonnes de liens */}
            {[
              { title: "Produit", links: ["Fonctionnalités", "Intégrations", "Tarifs", "Mises à jour"] },
              { title: "Ressources", links: ["Documentation", "API", "Guide", "Communauté"] },
              { title: "Entreprise", links: ["À propos", "Carrières", "Légal", "Contact"] }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-sm">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="hover:text-[#16C2D5] hover:pl-2 transition-all duration-300 block">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="hover:text-white transition-colors">© 2026 AquaLeak AI. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#16C2D5] hover:underline transition-all">Politique de confidentialité</a>
              <a href="#" className="hover:text-[#16C2D5] hover:underline transition-all">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- STAT CARD (MODERNE & HOVER EFFECT) ---
const StatCard = ({ icon, value, label, delay }) => (
  <div 
    className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100/50 
    hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(22,194,213,0.3)] transition-all duration-500 group overflow-hidden cursor-default"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Effet de brillance au survol amélioré */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#16C2D5]/20 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#0F5EA8]/10 to-transparent rounded-tr-full transform -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

    <div className="flex flex-col items-center text-center relative z-10">
      <div className="mb-4 p-4 rounded-full bg-slate-50 text-[#0F5EA8] group-hover:bg-[#0F5EA8] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm ring-1 ring-slate-100">
        {icon}
      </div>
      <span className="text-4xl font-black text-[#0B1F2E] mb-2 tracking-tight group-hover:text-[#0F5EA8] transition-colors duration-300">{value}</span>
      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest group-hover:text-[#16C2D5] transition-colors">
        {label}
      </p>
    </div>
  </div>
);

// --- FEATURE CARD (HOVER & INTERACTION) ---
const FeatureCard = ({ icon, title, desc }) => (
  <div className="
    group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm
    hover:shadow-[0_20px_50px_-20px_rgba(15,94,168,0.2)] hover:border-[#16C2D5]/30
    hover:-translate-y-2
    transition-all duration-300 cursor-pointer relative overflow-hidden
  ">
    {/* Accent du haut */}
    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#16C2D5] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

    <div className="
      w-14 h-14 rounded-2xl bg-[#0F5EA8]/5 flex items-center justify-center mb-6 text-[#0F5EA8]
      group-hover:bg-[#16C2D5] group-hover:text-white group-hover:rotate-12 group-hover:scale-110
      transition-all duration-300 shadow-sm
    ">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    
    <h3 className="text-xl font-bold text-[#0B1F2E] mb-3 group-hover:text-[#0F5EA8] transition-colors duration-300">
      {title}
    </h3>
    
    <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-600">
      {desc}
    </p>
    
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
       <ArrowRight className="text-[#16C2D5] w-5 h-5" />
    </div>
  </div>
);

export default AquaLeakLanding;