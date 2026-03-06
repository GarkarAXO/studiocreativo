import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { services, calculateTotal } from '../utils/pricing';
import type { Service } from '../utils/pricing';
import { Check, Send, FileText, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { QuotePDF } from '../features/quotes/QuotePDF';

const Configurator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });
  const [formData, setFormData] = useState({ fullName: '', email: '', businessName: '', details: '' });
  const [folio, setFolio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTotals(calculateTotal(selectedServices));
  }, [selectedServices]);

  useEffect(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setFolio(`SC-26-${random}`);
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedServices,
          subtotal: totals.subtotal,
          discount: totals.discount,
          total: totals.total,
          folio
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Error sending request. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedServicesObjects = (): Service[] => {
    return services.filter(s => selectedServices.includes(s.id));
  };

  const isFormValid = formData.fullName && formData.email && selectedServices.length > 0;

  return (
    <div className="bg-background-light dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="max-w-3xl mb-16 pt-10">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none uppercase italic mb-6 dark:text-white">
              Build Your <br /> <span className="text-primary not-italic">Custom Package</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
              Tailor our expert services to your specific business needs. Select your options below to see a real-time investment estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Service Selection */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest border-b border-slate-200 dark:border-white/10 pb-4 italic">
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
                        ? 'border-primary bg-white dark:bg-slate-900 shadow-xl shadow-primary/5' 
                        : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900/50 hover:border-primary/30'
                      }`}
                    >
                      <div className="w-full md:w-48 h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 relative text-primary/40 font-black italic text-4xl flex items-center justify-center uppercase">
                         {service.id.substring(0, 2)}
                      </div>
                      
                      <div className="flex grow flex-col justify-between py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`text-xl font-black uppercase italic tracking-tight ${isSelected ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                              {t(service.nameKey)}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
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
                             isSelected ? 'bg-primary border-primary text-white' : 'border-slate-200 dark:border-white/10'
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
                <div className="bg-slate-900 dark:bg-black text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden border border-white/5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 blur-3xl"></div>
                  
                  <div className="relative z-10 space-y-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Project Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest opacity-40 text-slate-300">
                        <span>Implementation</span>
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
                      {isFormValid ? (
                        <PDFDownloadLink
                          document={
                            <QuotePDF 
                              clientName={formData.fullName}
                              businessName={formData.businessName}
                              selectedServices={getSelectedServicesObjects()}
                              totals={totals}
                              folio={folio}
                            />
                          }
                          fileName={`${folio}-StudioCreativo.pdf`}
                          className="flex items-center justify-center w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20 gap-3"
                        >
                          {({ loading }) => (
                            loading ? (
                              <><Loader2 className="animate-spin" size={18} /> Generating...</>
                            ) : (
                              <><Download size={18} /> Download Quote PDF</>
                            )
                          )}
                        </PDFDownloadLink>
                      ) : (
                        <button 
                          className="flex items-center justify-center w-full h-16 bg-slate-800 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] cursor-not-allowed gap-3"
                          onClick={() => alert('Please fill in your name, email and select at least 1 service.')}
                        >
                          <FileText size={18} />
                          Fill Form to Get PDF
                        </button>
                      )}
                      
                      <a href="#contact" className="flex items-center justify-center w-full h-16 border-2 border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-white hover:text-slate-900 text-center">
                        Request Discovery
                      </a>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                      <p className="text-[10px] font-bold text-center opacity-60 leading-relaxed uppercase tracking-widest text-primary">
                        Folio: {folio} | valid for 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <section id="contact" className="mt-32 pt-24 border-t border-slate-200 dark:border-white/10">
            <div className="max-w-2xl mx-auto">
               <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none dark:text-white">
                    {submitted ? 'Thank You!' : 'Ready to Launch?'}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {submitted 
                      ? 'Your request has been received. Our team will get back to you within 24 hours.' 
                      : 'Fill out the form below and our team will get back to you within 24 hours.'}
                  </p>
               </div>
               
               {!submitted && (
                 <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl shadow-black/5 border border-slate-100 dark:border-white/5 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormInput 
                        label="Full Name" 
                        name="fullName"
                        placeholder="John Doe" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      <FormInput 
                        label="Work Email" 
                        name="email"
                        placeholder="john@company.com" 
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <FormInput 
                      label="Company Name" 
                      name="businessName"
                      placeholder="Acme Inc" 
                      value={formData.businessName}
                      onChange={handleInputChange}
                    />
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Project Details</label>
                      <textarea 
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-white/5 rounded-[2rem] px-8 py-6 text-sm font-bold focus:bg-white dark:focus:bg-slate-700 focus:border-primary outline-none transition-all resize-none text-slate-900 dark:text-white" 
                        placeholder="Tell us about your goals..." 
                        rows={4}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="w-full bg-primary py-6 rounded-2xl text-white font-black uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-4 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Send Package Request'}
                       {!isSubmitting && <Send size={18} />}
                    </button>
                 </form>
               )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-slate-900 dark:bg-black py-12 px-10 text-white font-sans transition-colors">
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
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, placeholder, type = "text", value, onChange }) => (
  <div className="space-y-3 text-left">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{label}</label>
    <input 
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-white/5 rounded-full px-8 py-4 text-sm font-bold focus:bg-white dark:focus:bg-slate-700 focus:border-primary outline-none transition-all text-slate-900 dark:text-white" 
      placeholder={placeholder} 
      type={type} 
    />
  </div>
);

export default Configurator;
