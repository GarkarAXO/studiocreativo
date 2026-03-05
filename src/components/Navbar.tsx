import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Rocket, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="fixed top-5 left-0 w-full z-[100] px-4 md:px-10 pointer-events-none font-sans">
      <nav className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto h-20 px-8 rounded-full border border-white/20 bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        
        {/* Logo Oficial */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo/logoalt.png" 
            alt="Studio Creativo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Navegación y Acciones: Todo al lado Derecho */}
        <div className="flex items-center gap-8 md:gap-10">
          {/* Enlaces de Navegación Traducidos */}
          <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-600">
            <a href="/#services" className="hover:text-primary transition-colors">{t('nav.services')}</a>
            <a href="/#why-us" className="hover:text-primary transition-colors">{t('nav.about')}</a>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex items-center gap-4 text-slate-600">
               <button 
                  onClick={toggleLanguage}
                  className="text-[10px] font-black uppercase flex items-center gap-1.5 hover:text-primary transition-colors border-r border-slate-200 pr-4"
                  title="Change Language"
                >
                  <Globe size={14} className="text-primary fill-primary/10" />
                  {i18n.language.toUpperCase()}
                </button>
                <button className="hover:text-primary transition-colors" title="Toggle Theme">
                  <Moon size={16} />
                </button>
            </div>

            <Link 
              to="/configurator" 
              className="flex items-center justify-center h-9 px-6 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-colors hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20"
            >
              {t('nav.configurator')}
            </Link>

            <div className="lg:hidden text-slate-900">
              <Menu size={24} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
