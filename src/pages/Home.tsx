import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { BackgroundEffect } from '../components/BackgroundEffect';
import { FloatingElements } from '../components/FloatingElements';
import { Target, Camera, Layout, Video, Globe2, Share2, ArrowRight, Users, TrendingUp, Check, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden transition-colors duration-500">
      <SEO 
        title="Agencia Digital" 
        description="En Studio Creativo elevamos experiencias digitales con diseño y estrategia de alto nivel. Expertos en Marketing, Web y Video en México."
      />
      <Navbar />

      <main id="main-content" className="flex flex-col">
        {/* Unificado: Hero + Services con Fondo Continuo */}
        <div className="relative isolate">
          {/* Fondo Continuo */}
          <div className="absolute inset-0 -z-10 bg-white dark:bg-background-dark">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,white_10%,#f0f7ff_40%,#0E0E55_100%)] dark:bg-[linear-gradient(to_right,#05070a_10%,#0a0d14_40%,#0E0E55_100%)]"></div>
          </div>
          
          {/* Estrellas Continuas en Mitad Derecha */}
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-10 pointer-events-none overflow-hidden">
            <BackgroundEffect id="hero-particles" />
          </div>

          {/* Hero Section */}
          <section className="relative w-full min-h-screen md:min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-12 bg-transparent">
            <FloatingElements />

            <div className="relative z-20 max-w-5xl mx-auto px-6 text-left w-full">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-100px" }}
                className="flex flex-col items-start gap-10 w-full"
              >
                {/* Título - Negro Profundo */}
                <div className="space-y-2">
                  <h1 className="sr-only">{t('hero.title_1')} {t('hero.title_2')} {t('hero.title_3')}</h1>
                  {[t('hero.title_1'), t('hero.title_2'), t('hero.title_3')].map((line, index) => (
                    <motion.div 
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-slate-950 dark:text-white text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter uppercase italic py-1"
                      aria-hidden="true"
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>

                {/* Subtítulo - Negro Profundo */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-900 dark:text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    {t('hero.subtitle')}
                  </p>
                </motion.div>

                {/* CTA Único */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/configurator" className="flex min-w-[240px] items-center justify-center rounded-full h-16 px-12 bg-primary text-white text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 relative z-40 text-center">
                      {t('hero.cta')}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-10 dark:opacity-20">
               <div className="w-[1px] h-16 bg-gradient-to-b from-slate-900 dark:from-white to-transparent"></div>
            </div>
          </section>

          {/* Services Section - Alto Completo */}
          <section className="px-6 lg:px-20 py-20 min-h-screen flex items-center justify-center relative z-40" id="services">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-6 mb-16 items-center text-center"
              >
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">{t('services.badge')}</span>
                <h2 className="text-slate-900 dark:text-white text-4xl lg:text-6xl font-black tracking-tighter italic uppercase leading-none">{t('services.title')}</h2>
                <p className="text-slate-700 dark:text-slate-300 text-lg max-w-[600px] font-medium leading-relaxed">{t('services.desc')}</p>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                <ServiceBox icon={<Target />} title={t('services.marketing')} desc={t('services.marketing_desc')} />
                <ServiceBox icon={<Camera />} title={t('services.photography')} desc={t('services.photography_desc')} />
                <ServiceBox icon={<Layout />} title={t('services.web')} desc={t('services.web_desc')} />
                <ServiceBox icon={<Video />} title={t('services.video')} desc={t('services.video_desc')} />
                <ServiceBox icon={<Globe2 />} title={t('services.content')} desc={t('services.content_desc')} />
                <ServiceBox icon={<Share2 />} title={t('services.social')} desc={t('services.social_desc')} />
              </motion.div>
            </div>
          </section>
        </div>

        {/* Why Choose Us Section - Alto Completo / Ancho Equilibrado */}
        <section className="px-6 lg:px-20 py-20 bg-slate-50 dark:bg-background-dark relative z-40 transition-colors w-full min-h-screen flex items-center justify-center border-y border-slate-200/50 dark:border-white/5" id="why-us">
          {/* Líneas Divisorias de Diseño - Efecto de Luz (Glow) */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[linear-gradient(to_right,transparent_0%,#1a57a4_50%,transparent_100%)] shadow-[0_0_15px_rgba(26,87,164,0.5)] z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[linear-gradient(to_right,transparent_0%,#1a57a4_50%,transparent_100%)] shadow-[0_0_15px_rgba(26,87,164,0.5)] z-10"></div>
          
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Contenido Izquierdo: Marca y Narrativa */}
              <div className="flex flex-col gap-12 text-left">
                <div className="space-y-8">
                  <h2 className="text-slate-900 dark:text-white text-4xl lg:text-7xl font-black tracking-tightest italic leading-[0.95] uppercase flex flex-col items-start gap-6">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {t('why.title')}
                    </motion.span>
                    <motion.img 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      src="/logo/logoalt.png" 
                      alt="Studio Creativo" 
                      width="240"
                      height="60"
                      className="h-12 lg:h-16 w-auto object-contain brightness-0 dark:invert"
                    />
                  </h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
                  >
                    {t('why.desc')}
                  </motion.p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                   <WhyCheck index={0} title={t('why.check1_title')} desc={t('why.check1_desc')} />
                   <WhyCheck index={1} title={t('why.check2_title')} desc={t('why.check2_desc')} />
                </div>
              </div>

              {/* Contenido Derecho: Tarjetas Asimétricas */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl -z-10"></div>
                
                <div className="space-y-6 lg:space-y-8">
                  <WhyBox icon={<Target />} title={t('why.reason1_title')} desc={t('why.reason1_desc')} />
                  <WhyBox icon={<Check />} title={t('why.reason2_title')} desc={t('why.reason2_desc')} />
                </div>
                <div className="space-y-6 lg:space-y-8 md:pt-16">
                  <WhyBox icon={<Users />} title={t('why.reason3_title')} desc={t('why.reason3_desc')} />
                  <WhyBox icon={<TrendingUp />} title={t('why.reason4_title')} desc={t('why.reason4_desc')} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Degradado Extendido desde Esquina Derecha */}
        <section className="relative px-6 lg:px-20 min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-background-dark">
          
          {/* Fondo Radial Extendido */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0E0E55_0%,#0E0E55_10%,#f0f7ff_65%,white_100%)] dark:bg-[radial-gradient(circle_at_top_right,#0E0E55_0%,#0E0E55_10%,#0a0d14_65%,#05070a_100%)]"></div>
          </div>

          {/* Estrellas (ID único y centradas en el azul) */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <BackgroundEffect id="final-cta-vortex" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-slate-950 dark:text-white text-4xl lg:text-7xl font-black tracking-tightest uppercase italic leading-[0.95] flex flex-col items-center gap-2">
                <span className="drop-shadow-sm">{t('footer.cta_title')}</span>
                <span 
                  style={{ 
                    WebkitTextStroke: '2px #1a57a4', 
                    color: 'transparent'
                  }}
                >
                  {t('footer.cta_together')}
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                {t('footer.cta_desc')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/configurator" className="relative z-10 bg-primary text-white font-black py-5 px-10 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl flex items-center gap-4 group">
                {t('nav.configurator')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 px-6 lg:px-20 py-20 relative z-40 text-white font-sans border-t border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          <div className="flex flex-col gap-6">
            <img 
              src="/logo/logoalt.png" 
              alt="Studio Creativo" 
              width="150" 
              height="32" 
              loading="lazy" 
              decoding="async"
              className="h-8 w-auto brightness-0 invert object-contain" 
            />
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {t('footer.description')}
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
            <h4 className="font-black italic uppercase tracking-[0.3em] text-[10px] text-primary text-left">{t('footer.follow')}</h4>
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

const ServiceBox = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => {
  const { t } = useTranslation();
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      className="group relative flex flex-col gap-8 rounded-3xl p-10 transition-all text-left overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-xl shadow-black/5"
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <motion.rect
          x="0" y="0" width="100%" height="100%"
          rx="24" ry="24"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary dark:text-primary/50"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10">
        <div className="size-16 rounded-2xl bg-primary/5 dark:bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 }) : icon}
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-slate-900 dark:text-white text-2xl font-black italic uppercase tracking-tighter leading-none text-left">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-left">{desc}</p>
        </div>
        <a className="mt-10 flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all" href="#">
          {t('services.learn_more')} <ArrowRight size={16} strokeWidth={3} />
        </a>
      </div>
    </motion.div>
  );
};

const WhyBox = ({ icon, title, desc, mt }: { icon: React.ReactNode, title: string, desc: string, mt?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`flex flex-col gap-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-premium ${mt || ''} transition-colors text-left`}
  >
    <div className="text-primary">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 28 }) : icon}
    </div>
    <div className="space-y-1">
      <h4 className="font-black italic uppercase text-lg dark:text-white leading-none tracking-tight">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const WhyCheck = ({ title, desc, index }: { title: string, desc: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="flex gap-5 items-start text-left"
  >
    <div className="flex-shrink-0 size-7 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
      <Check size={14} strokeWidth={4} />
    </div>
    <div>
      <h5 className="font-black italic uppercase text-slate-900 dark:text-white leading-none mb-1 tracking-tight">{title}</h5>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default Home;
