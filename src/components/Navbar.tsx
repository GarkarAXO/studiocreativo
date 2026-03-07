import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun, Home, Layout, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useDarkMode();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* --- NAVBAR SUPERIOR --- */}
      <div className="fixed top-0 md:top-5 left-0 w-full z-[100] px-0 md:px-10 pointer-events-none font-sans">
        <nav aria-label="Navegación principal" className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto 
                        h-16 md:h-20 px-6 md:px-8 
                        rounded-none md:rounded-full 
                        border-b md:border border-slate-300/80 dark:border-white/20 
                        bg-white/40 dark:bg-studio-obsidian/40 backdrop-blur-xl shadow-lg shadow-black/5 transition-all duration-500">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Ir al inicio">
            <img 
              src="/logo/logoalt.png" 
              alt="Studio Creativo Logo" 
              width="140"
              height="36"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className={`h-8 md:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
            />
          </Link>
          
          {/* Acciones */}
          <div className="flex items-center gap-4 md:gap-10">
            {/* Links solo visibles en Desktop */}
            <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-900 dark:text-slate-200">
              <a href="/#services" className="hover:text-primary transition-colors">{t('nav.services')}</a>
              <a href="/#why-us" className="hover:text-primary transition-colors">{t('nav.about')}</a>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4 text-slate-900 dark:text-slate-200">
                 <button 
                    onClick={toggleLanguage}
                    className="text-[10px] font-black uppercase flex items-center gap-1.5 hover:text-primary transition-colors border-r border-slate-300 dark:border-white/20 pr-3 md:pr-4"
                    aria-label={`Cambiar idioma. Actual: ${i18n.language.toUpperCase()}`}
                  >
                    <Globe size={14} className="text-primary" aria-hidden="true" />
                    {i18n.language.toUpperCase()}
                  </button>
                  <button 
                    onClick={toggleTheme}
                    className="hover:text-primary transition-colors p-1" 
                    aria-label={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                    title={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                  >
                    {theme === 'dark' ? <Sun size={16} className="text-accent" aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                  </button>
              </div>
              
              <Link 
                to="/configurator" 
                className="hidden sm:flex items-center justify-center h-9 px-6 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-colors hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                {t('nav.configurator')}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* --- TAB BAR INFERIOR (Solo Mobile) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[100] px-4 pb-6 pointer-events-none">
        <nav aria-label="Navegación móvil" className="max-w-xs mx-auto flex items-center justify-around pointer-events-auto 
                        h-16 rounded-full border border-slate-200 dark:border-slate-800 
                        bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl shadow-2xl transition-all duration-500">
          
          <MobileNavLink to="/" icon={<Home size={20} aria-hidden="true" />} label={t('nav.home')} active={isActive('/')} />
          <MobileNavLink to="/#services" icon={<Layout size={20} aria-hidden="true" />} label="Servicios" active={false} isAnchor />
          <MobileNavLink to="/configurator" icon={<FileText size={20} aria-hidden="true" />} label={t('nav.configurator')} active={isActive('/configurator')} />
          
        </nav>
      </div>
    </>
  );
};

const MobileNavLink = ({ to, icon, label, active, isAnchor = false }: { to: string, icon: React.ReactNode, label: string, active: boolean, isAnchor?: boolean }) => {
  const content = (
    <div className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </div>
  );

  return (
    <div className="flex-1">
      {isAnchor ? (
        <a href={to}>{content}</a>
      ) : (
        <Link to={to}>{content}</Link>
      )}
    </div>
  );
};
