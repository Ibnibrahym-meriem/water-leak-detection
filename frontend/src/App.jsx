import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- IMPORTS DES PAGES ---
import AquaLeakLanding from './pages/LandingPage'; 
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import Documentation from './pages/Documentation'; 

// --- IMPORT DU SIDEBAR ---
import Sidebar from './components/Sidebar';

// --- LAYOUT PROTÉGÉ ---
// C'est lui qui affiche la Sidebar UNE SEULE FOIS + le contenu
const ProtectedLayout = ({ children, activePage }) => {
  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden text-slate-200">
      {/* 1. Sidebar Fixe à Gauche */}
      <Sidebar activePage={activePage} />
      
      {/* 2. Zone de Contenu Scrollable à Droite */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth bg-slate-50 text-slate-900">
        {/* On injecte ici la page demandée (children) */}
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        
        {/* --- ROUTES PUBLIQUES (Pas de Sidebar) --- */}
        <Route path="/" element={<AquaLeakLanding />} />
        <Route path="/login" element={<Login />} />

        {/* --- ROUTES CONNECTÉES (Avec Sidebar via Layout) --- */}
        
        {/* 1. DOCUMENTATION (Premier lien du menu) */}
        <Route 
          path="/documentation" 
          element={
            <ProtectedLayout activePage="documentation">
              <Documentation />
            </ProtectedLayout>
          } 
        />
        
        {/* 2. TABLEAU DE BORD */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedLayout activePage="dashboard">
              <Dashboard />
            </ProtectedLayout>
          } 
        />
        
        {/* Redirection pour le lien "Prédictions" vers le Dashboard */}
        <Route 
          path="/prediction" 
          element={
            <ProtectedLayout activePage="prediction">
              <Dashboard /> 
            </ProtectedLayout>
          } 
        />

        {/* 3. RÉSULTATS */}
        <Route 
          path="/results" 
          element={
            <ProtectedLayout activePage="results">
              <Result />
            </ProtectedLayout>
          } 
        />

        {/* Gestion 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;