import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Droplets, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  
  // États du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // États de feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook de redirection
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
        if (activeTab === 'register') {
            // --- LOGIQUE D'INSCRIPTION ---
            if (password !== confirmPassword) {
                throw new Error("Les mots de passe ne correspondent pas.");
            }
            // Appel API Inscription
            await axios.post('http://127.0.0.1:8000/api/register', { email, password });
            
            setSuccess("Compte créé avec succès ! Connectez-vous.");
            setActiveTab('login'); // Basculer vers l'onglet connexion
            setEmail(''); 
            setPassword(''); 
            setConfirmPassword('');
        } else {
            // --- LOGIQUE DE CONNEXION ---
            
            // 1. Appel API Login
            await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            
            // 2. Stockage (Optionnel, selon votre logique de sécurité)
            localStorage.setItem('user_email', email);
            
            // 3. REDIRECTION VERS LA DOCUMENTATION
            navigate('/documentation'); 
        }
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.detail || err.message || "Erreur de connexion.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0f172a]">
       
       {/* Décorations d'arrière-plan */}
       <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-[#115e59] opacity-80"></div>
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06b6d4] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

       {/* --- CARTE DE CONNEXION --- */}
       <div className="relative z-10 w-full max-w-[550px] mx-4">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 pb-10">
          
              {/* En-tête */}
              <div className="flex flex-col items-center mb-8">
                 <Droplets className="w-10 h-10 text-[#06b6d4] mb-3" strokeWidth={2.5} />
                 <h1 className="text-[26px] font-bold text-slate-700 tracking-tight">AquaLeak AI</h1>
                 <p className="text-slate-400 text-[13px] mt-1 text-center font-medium">
                    {activeTab === 'login' ? 'Accéder à la documentation technique' : 'Créez votre compte maintenant'}
                 </p>
              </div>

              {/* Onglets Login / Register */}
              <div className="bg-gray-100 p-1 rounded-xl flex mb-8">
                 <button 
                    type="button"
                    onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${activeTab === 'login' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    Connexion
                 </button>
                 <button 
                    type="button"
                    onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${activeTab === 'register' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    Inscription
                 </button>
              </div>

              {/* Messages d'erreur ou succès */}
              {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2">
                      <AlertCircle size={16} /> {error}
                  </div>
              )}
              {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-600 text-xs font-bold rounded-lg flex items-center gap-2">
                      <CheckCircle2 size={16} /> {success}
                  </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                 
                 {/* Email */}
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Email</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" strokeWidth={2} />
                       </div>
                       <input 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com" 
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm font-medium text-slate-700"
                       />
                    </div>
                 </div>

                 {/* Mot de passe */}
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Mot de passe</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" strokeWidth={2} />
                       </div>
                       <input 
                          type="password" 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={activeTab === 'register' ? "Min. 6 caractères" : "••••••••"} 
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm font-medium text-slate-700"
                       />
                    </div>
                 </div>

                 {/* Confirmation Mot de passe (Inscription seulement) */}
                 {activeTab === 'register' && (
                     <div className="animate-fade-in-up">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Confirmer le mot de passe</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" strokeWidth={2} />
                           </div>
                           <input 
                              type="password" 
                              required 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Répétez le mot de passe" 
                              className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm font-medium text-slate-700"
                           />
                        </div>
                     </div>
                 )}

                 {/* Bouton d'action */}
                 <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0e5c9e] to-[#06b6d4] hover:from-[#0b4a80] hover:to-[#059ab3] text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-900/10 hover:shadow-cyan-900/20 transform active:scale-[0.98] transition-all duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                    {loading ? 'Chargement...' : (activeTab === 'login' ? 'Accéder à la Doc' : 'Créer un compte')}
                 </button>
              </form>
          </div>
       </div>
    </div>
  );
}