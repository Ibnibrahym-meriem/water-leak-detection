import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, FileText, 
  Droplets, LogOut, ClipboardCheck
} from 'lucide-react';

export default function Sidebar({ activePage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: 'Invité', email: '', initials: 'I' });
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (email) {
      const namePart = email.split('@')[0];
      const displayName = namePart.split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
      const initials = displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      setUserInfo({ name: displayName, email: email, initials: initials });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_email');
    navigate('/'); 
  };

  return (
    <aside 
      className={`
        ${isSidebarOpen ? 'w-72' : 'w-24'} 
        bg-[#0B1121] text-slate-400 
        flex flex-col flex-shrink-0 transition-all duration-500 ease-in-out 
        border-r border-slate-800/60 shadow-2xl relative z-50
      `}
    >
      
      {/* --- EFFET LUMINEUX D'ARRIÈRE-PLAN --- */}
      <div className="absolute top-0 left-0 w-full h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none -translate-y-1/2" />

      {/* --- EN-TÊTE & LOGO --- */}
      <div className={`h-24 flex items-center relative z-10 transition-all duration-300 ${isSidebarOpen ? 'justify-between px-6' : 'justify-center px-0 flex-col gap-2'}`}>
          
          {/* Logo */}
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${!isSidebarOpen && 'hidden'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0 border border-white/10">
                  <Droplets className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap">
                  Aqua<span className="text-cyan-400">Leak</span>
              </span>
          </div>
          
          {/* Logo Réduit (si fermé) */}
          {!isSidebarOpen && (
               <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md animate-fade-in">
                  <Droplets className="w-6 h-6 text-white" />
              </div>
          )}

          {/* Bouton Toggle */}
          <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`
                text-slate-400 hover:text-white p-1.5 rounded-lg 
                hover:bg-white/5 transition-all focus:outline-none 
                ${!isSidebarOpen && 'mt-4'}
              `}
          >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-3 py-8 space-y-2 overflow-y-auto relative z-10 flex flex-col custom-scrollbar">
          
          {/* 1. DOCUMENTATION */}
          <SidebarItem 
              to="/documentation" 
              icon={<FileText size={22} />} 
              label="Guide Technique" 
              isOpen={isSidebarOpen} 
              isActive={activePage === 'documentation'} 
          />

          {/* 2. TABLEAU DE BORD */}
          <SidebarItem 
              to="/dashboard" 
              icon={<LayoutDashboard size={22} />} 
              label="Tableau de bord" 
              isOpen={isSidebarOpen} 
              isActive={activePage === 'dashboard'} 
          />

          {/* 3. RÉSULTATS */}
          <SidebarItem 
              to="/results" 
              icon={<ClipboardCheck size={22} />} 
              label="Résultats d'analyse" 
              isOpen={isSidebarOpen} 
              isActive={activePage === 'results'} 
          />
          
          <div className="flex-1"></div>

          {/* BOUTON DÉCONNEXION */}
          <button 
              onClick={handleLogout}
              className={`
                  relative flex items-center py-3.5 mx-auto rounded-xl transition-all duration-300 group overflow-hidden w-full text-slate-400 hover:bg-red-500/5 hover:text-red-400 cursor-pointer
                  ${isSidebarOpen ? 'px-4 justify-start' : 'px-0 justify-center'}
              `}
              title={!isSidebarOpen ? "Déconnexion" : ""}
          >
              <div className="min-w-[24px] flex justify-center group-hover:scale-110 transition-transform">
                  <LogOut size={22} />
              </div>
              <span className={`ml-3 font-medium text-sm whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  Déconnexion
              </span>
          </button>

      </nav>

      {/* --- PROFIL UTILISATEUR --- */}
      <div className={`relative z-10 border-t border-slate-800/50 transition-all duration-300 ${isSidebarOpen ? 'p-5' : 'p-2 py-5'}`}>
          <div className={`flex items-center ${isSidebarOpen ? 'gap-3' : 'justify-center'} transition-all duration-300`}>
              {/* Avatar */}
              <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-500/30 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  {userInfo.initials}
              </div>
              
              {/* Infos Texte */}
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                  <p className="text-sm font-semibold text-white truncate">{userInfo.name}</p>
                  <p className="text-xs text-slate-500 truncate max-w-[140px]">{userInfo.email}</p>
              </div>
          </div>
      </div>
    </aside>
  );
}

// --- COMPOSANT LIEN (Design Épuré) ---
function SidebarItem({ icon, label, isOpen, isActive, to }) {
    return (
        <Link 
            to={to} 
            title={!isOpen ? label : ""}
            className={`
                relative flex items-center py-3.5 rounded-xl transition-all duration-300 group overflow-hidden w-full
                ${isOpen ? 'px-4 justify-start' : 'px-0 justify-center'}
                ${isActive 
                    ? 'bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-400 shadow-[inset_2px_0_0_0_#22d3ee]' // Effet actif élégant
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]'
                }
            `}
        >
            <div className={`min-w-[24px] flex justify-center transition-transform duration-300 ${isActive ? 'scale-100' : 'group-hover:scale-110'}`}>
                {icon}
            </div>
            
            <span className={`ml-3 font-medium text-sm whitespace-nowrap transition-all duration-500 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'}`}>
                {label}
            </span>

            {/* Effet de lueur au survol pour les éléments inactifs */}
            {!isActive && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
            )}
        </Link>
    );
}