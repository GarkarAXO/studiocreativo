import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { services, calculateTotal } from '../utils/pricing';
import { Check, Send, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Configurator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });

  useEffect(() => {
    setTotals(calculateTotal(selectedServices));
  }, [selectedServices]);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-background-light min-h-screen text-slate-900 font-sans">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="max-w-3xl mb-16 pt-10">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none uppercase italic mb-6">
              Build Your <br /> <span className="text-primary not-italic">Custom Package</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Tailor our expert services to your specific business needs. Select your options below to see a real-time investment estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Service Selection */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest border-b border-slate-200 pb-4 italic">
                {i18n.language === 'es' ? 'Selecciona tus Servicios' : 'Select Services'}
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                {services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <motion.div 
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`group relative flex flex-col md:flex-row items-stretch gap-6 rounded-3xl border-2 p-6 transition-all duration-300 cursor-pointer ${
                        isSelected 
                        ? 'border-primary bg-white shadow-xl shadow-primary/5' 
                        : 'border-slate-100 bg-white hover:border-primary/30'
                      }`}
                    >
                      <div className="w-full md:w-48 h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 relative">
                        <div className={`absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                        <div className="w-full h-full flex items-center justify-center text-primary/40 font-black italic text-4xl select-none uppercase">
                           {service.id.substring(0, 2)}
                        </div>
                      </div>
                      
                      <div className="flex grow flex-col justify-between py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`text-xl font-black uppercase italic tracking-tight ${isSelected ? 'text-primary' : 'text-slate-900'}`}>
                              {t(service.nameKey)}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                              {t(service.descriptionKey)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-primary tracking-tighter">
                              ${service.basePrice.toLocaleString('es-MX')}
                            </span>
                            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-widest mt-1">MXN</span>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                           <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                             isSelected ? 'bg-primary border-primary text-white' : 'border-slate-200'
                           }`}>
                             {isSelected && <Check size={14} strokeWidth={4} />}
                           </div>
                           <span className={`text-xs font-black uppercase tracking-widest ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
                              {isSelected ? 'Service Added' : 'Add to Package'}
                           </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 blur-3xl"></div>
                  
                  <div className="relative z-10 space-y-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Project Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest opacity-40">
                        <span>Subtotal</span>
                        <span>${totals.subtotal.toLocaleString('es-MX')}</span>
                      </div>
                      <AnimatePresence>
                        {totals.discount > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex justify-between items-center text-primary font-black uppercase italic tracking-tighter text-lg"
                          >
                            <span>Mixed Discount</span>
                            <span>-${totals.discount.toLocaleString('es-MX')}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="h-px bg-white/10"></div>
                      <div className="pt-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-2">Total Estimated</span>
                        <h4 className="text-5xl font-black tracking-tighter italic text-primary leading-none">
                          ${totals.total.toLocaleString('es-MX')}
                          <span className="text-xs ml-2 opacity-30 text-white">MXN</span>
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button 
                        className="flex items-center justify-center w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20 gap-3"
                        onClick={() => alert('Feature coming soon!')}
                      >
                        <FileText size={18} />
                        Get Formal PDF
                      </button>
                      <a href="#contact" className="flex items-center justify-center w-full h-16 border-2 border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-white hover:text-slate-900 text-center">
                        Request Discovery
                      </a>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                      <p className="text-[10px] font-bold text-center opacity-60 leading-relaxed uppercase tracking-widest">
                        Prices are estimated. Final quote provided after technical discovery session.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <section id="contact" className="mt-32 pt-24 border-t border-slate-200">
            <div className="max-w-2xl mx-auto">
               <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none">Ready to Launch?</h2>
                  <p className="text-slate-500 font-medium">Fill out the form below and our team will get back to you within 24 hours.</p>
               </div>
               
               <form className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-black/5 border border-slate-100 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput label="Full Name" placeholder="John Doe" />
                    <FormInput label="Work Email" placeholder="john@company.com" type="email" />
                  </div>
                  <FormInput label="Company Name" placeholder="Acme Inc" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Project Details</label>
                    <textarea 
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] px-8 py-6 text-sm font-bold focus:bg-white focus:border-primary outline-none transition-all resize-none text-slate-900" 
                      placeholder="Tell us about your goals..." 
                      rows={4}
                    />
                  </div>
                  <button className="w-full bg-primary py-6 rounded-2xl text-white font-black uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-4">
                     Send Package Request
                     <Send size={18} />
                  </button>
               </form>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-slate-900 py-12 px-10 text-white font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-widest uppercase opacity-40">
           <span>STUDIO CREATIVO</span>
           <div className="flex gap-10">
              <a href="https://www.facebook.com/share/1NpSLY1fM9/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
           </div>
           <span>© 2026 Mexico.</span>
        </div>
      </footer>
    </div>
  );
};

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-3 text-left">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{label}</label>
    <input 
      className="w-full bg-slate-50 border-2 border-slate-50 rounded-full px-8 py-4 text-sm font-bold focus:bg-white focus:border-primary outline-none transition-all text-slate-900" 
      placeholder={placeholder} 
      type={type} 
    />
  </div>
);

export default Configurator;
