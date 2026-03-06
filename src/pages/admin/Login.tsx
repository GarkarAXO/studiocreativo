import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white">Admin Access</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please sign in to manage Studio Creativo</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-slate-100 dark:border-white/5 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest p-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-white/5 rounded-full pl-14 pr-8 py-4 text-sm font-bold focus:bg-white dark:focus:bg-slate-700 focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="admin@studiocreativo.mx"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-white/5 rounded-full pl-14 pr-8 py-4 text-sm font-bold focus:bg-white dark:focus:bg-slate-700 focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary py-5 rounded-2xl text-white font-black uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-4 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </main>

      <footer className="py-10 text-center text-[10px] font-black tracking-widest uppercase opacity-30">
        © 2026 Studio Creativo Management
      </footer>
    </div>
  );
};

export default AdminLogin;
