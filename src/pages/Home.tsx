import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { BackgroundEffect } from '../components/BackgroundEffect';
import { FloatingElements } from '../components/FloatingElements';
import { Target, Camera, Layout, Video, Globe2, Share2, ArrowRight, Rocket, TrendingUp, Check, Play, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const revealVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-primary selection:text-white overflow-x-hidden transition-colors duration-500">
      <Navbar />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen md:min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-12 bg-transparent">
          
          <BackgroundEffect />
          <FloatingElements />

          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-10"
            >
              <div className="space-y-2">
                {[t('hero.title_1'), t('hero.title_2'), t('hero.title_3')].map((line, index) => (
                  <div key={index} className="overflow-hidden">
                    <motion.h1 
                      variants={revealVariants}
                      className="text-slate-900 dark:text-white text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter uppercase italic py-1"
                    >
                      {line}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="overflow-hidden"
              >
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                  {t('hero.subtitle')}
                </p>
              </motion.div>
{/* CTAs con entrada escalonada y feedback háptico */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.7, duration: 0.8 }}
  className="flex flex-col sm:flex-row gap-6 mt-4 w-full px-10 md:px-0"
>
  <motion.div whileTap={{ scale: 0.9 }} className="w-full sm:w-auto">
    <Link to="/configurator" className="flex min-w-[200px] items-center justify-center rounded-full h-16 px-10 bg-slate-900 dark:bg-primary text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-primary dark:hover:bg-white dark:hover:text-primary active:scale-95 shadow-xl relative z-40 text-center">
      {t('hero.cta')}
    </Link>
  </motion.div>
  <motion.div whileTap={{ scale: 0.9 }} className="w-full sm:w-auto">
    <button className="flex w-full sm:min-w-[200px] items-center justify-center rounded-full h-16 px-10 border border-slate-200 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-900/10 dark:hover:bg-white/10 active:scale-95 gap-3 relative z-40">
      <Play size={14} className="fill-current" />
      Showreel 2026
    </button>
  </motion.div>
</motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-10 dark:opacity-20">
             <div className="w-[1px] h-16 bg-gradient-to-b from-slate-900 dark:from-white to-transparent"></div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-6 lg:px-20 py-32 bg-white dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5 relative z-40" id="services">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-6 mb-20 items-center text-center">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">{t('services.badge')}</span>
              <h2 className="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black tracking-tighter italic uppercase leading-none">{t('services.title')}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-[600px] font-medium leading-relaxed">{t('services.desc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceBox icon={<Target />} title={t('services.marketing')} desc={t('services.marketing_desc')} />
              <ServiceBox icon={<Camera />} title={t('services.photography')} desc={t('services.photography_desc')} />
              <ServiceBox icon={<Layout />} title={t('services.web')} desc={t('services.web_desc')} />
              <ServiceBox icon={<Video />} title={t('services.video')} desc={t('services.video_desc')} />
              <ServiceBox icon={<Globe2 />} title={t('services.content')} desc={t('services.content_desc')} />
              <ServiceBox icon={<Share2 />} title={t('services.social')} desc={t('services.social_desc')} />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-6 lg:px-20 py-32 bg-slate-50 dark:bg-slate-950 relative z-40 transition-colors" id="why-us">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="grid grid-cols-2 gap-6 order-2 lg:order-1">
                <WhyBox icon={<TrendingUp />} title="Data-Driven" desc="Decisiones respaldadas por analítica y mercado." mt="mt-0" />
                <WhyBox icon={<Rocket />} title="Expert Team" desc="Colabora con mentes creativas y veteranos." mt="mt-12" />
                <WhyBox icon={<Target />} title="Creative Edge" desc="Diseños que definen tu marca." mt="-mt-12" />
                <WhyBox icon={<Check />} title="ROI Focused" desc="Tu inversión crece con resultados reales." mt="mt-0" />
              </div>

              <div className="flex flex-col gap-10 order-1 lg:order-2 text-center lg:text-left">
                <div className="flex flex-col gap-6">
                  <h2 className="text-slate-900 dark:text-white text-4xl lg:text-6xl font-black tracking-tighter italic leading-[0.9] uppercase">
                    ¿Por qué elegir <br /> <span className="text-primary not-italic underline decoration-8 underline-offset-8">Studio Creativo</span>?
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
                    Construimos motores de crecimiento. Nuestra metodología mezcla excelencia técnica con historias creativas para asegurar que tu marca domine en el entorno digital.
                  </p>
                </div>
                <div className="flex flex-col gap-6 items-center lg:items-start text-left">
                   <WhyCheck title="Estrategias Personalizadas" desc="Nada de soluciones genéricas. Todo a tu medida." />
                   <WhyCheck title="Reportes Transparentes" desc="Dashboards en tiempo real para ver tu ROI crecer." />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 lg:px-20 py-20 relative z-40 bg-white dark:bg-slate-950 transition-colors">
          <div className="max-w-[1200px] mx-auto bg-primary rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center lg:text-left shadow-2xl shadow-primary/40 group">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex flex-col gap-6 max-w-[600px]">
                <h2 className="text-white text-4xl lg:text-6xl font-black tracking-tighter uppercase italic leading-none text-left">Ready to scale your <br /> digital presence?</h2>
                <p className="text-white/70 text-xl font-medium tracking-wide text-left">Join 500+ companies that have grown with us.</p>
              </div>
              <Link to="/configurator" className="bg-white text-primary font-black py-6 px-12 rounded-full text-xl uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-2xl text-center">
                Start Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 px-6 lg:px-20 py-20 relative z-40 text-white font-sans border-t border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          <div className="flex flex-col gap-6">
            <img src="/logo/logoalt.png" alt="Studio Creativo" className="h-8 w-auto brightness-0 invert object-contain" />
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Transformando la visión de negocios locales en realidades digitales de alto impacto en México.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="font-black italic uppercase tracking-[0.3em] text-[10px] text-primary text-left">Contacto</h4>
            <div className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-300 text-left">
              <a href="mailto:screativo.mkt@gmail.com" className="hover:text-primary transition-colors flex items-center gap-3 text-white">
                <Globe size={16} className="text-primary fill-primary/10" />
                screativo.mkt@gmail.com
              </a>
              <a href="tel:+525591877538" className="hover:text-primary transition-colors flex items-center gap-3 text-white">
                <Target size={16} className="text-primary fill-primary/10" />
                55 9187 7538
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="font-black italic uppercase tracking-[0.3em] text-[10px] text-primary text-left">Siguenos</h4>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-slate-300 text-left">
              <a href="https://www.facebook.com/share/1NpSLY1fM9/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-white">Facebook</a>
              <a href="#services" className="hover:text-primary transition-colors text-white">{t('nav.services')}</a>
              <a href="#why-us" className="hover:text-primary transition-colors text-white">{t('nav.about')}</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-widest uppercase text-slate-500">
          <p>{t('footer.rights')}</p>
          <span>México.</span>
        </div>
      </footer>
    </div>
  );
};

const ServiceBox = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="group flex flex-col gap-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-10 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10">
    <div className="size-16 rounded-2xl bg-primary/5 dark:bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 }) : icon}
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-slate-900 dark:text-white text-2xl font-black italic uppercase tracking-tighter leading-none text-left">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-left">{desc}</p>
    </div>
    <a className="mt-auto flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all" href="#">
      Learn More <ArrowRight size={16} strokeWidth={3} />
    </a>
  </div>
);

const WhyBox = ({ icon, title, desc, mt }: { icon: React.ReactNode, title: string, desc: string, mt: string }) => (
  <div className={`flex flex-col gap-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-premium ${mt} transition-colors`}>
    <div className="text-primary">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 28 }) : icon}
    </div>
    <div className="space-y-1 text-left">
      <h4 className="font-black italic uppercase text-lg dark:text-white leading-none tracking-tight">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const WhyCheck = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-5 items-start text-left">
    <div className="flex-shrink-0 size-7 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
      <Check size={14} strokeWidth={4} />
    </div>
    <div>
      <h5 className="font-black italic uppercase text-slate-900 dark:text-white leading-none mb-1 tracking-tight">{title}</h5>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Home;
