import React, { useState, useEffect } from 'react';
import { services, calculateTotal } from '../../utils/pricing';
import { Check, Plus, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export const ServiceConfigurator: React.FC = () => {
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
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Selector */}
      <div className="flex-1 space-y-3">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <motion.div 
              key={service.id}
              whileHover={{ x: 10 }}
              onClick={() => toggleService(service.id)}
              className={`group flex justify-between items-center p-6 rounded-3xl cursor-pointer border-2 transition-all duration-300 ${
                isSelected 
                ? 'bg-studio-black border-studio-black text-white shadow-xl' 
                : 'bg-studio-gray-50 border-transparent hover:border-studio-blue/30'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${isSelected ? 'text-studio-blue' : 'text-studio-gray-400'}`}>
                  Service Code: {service.id.toUpperCase()}
                </span>
                <h4 className="text-xl font-black uppercase italic tracking-tighter">
                  {service.name}
                </h4>
              </div>
              <div className="flex items-center gap-8">
                <span className={`text-sm font-bold ${isSelected ? 'text-white/40' : 'text-studio-gray-400'}`}>
                  ${service.basePrice.toLocaleString('es-MX')}
                </span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected ? 'bg-studio-blue text-white rotate-90' : 'bg-white text-studio-black shadow-sm'
                }`}>
                  {isSelected ? <Check size={20} strokeWidth={3} /> : <Plus size={20} />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Side Card */}
      <div className="lg:w-[400px]">
        <div className="sticky top-32 bg-studio-black text-white p-10 rounded-[3rem] shadow-2xl shadow-studio-blue/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-studio-blue opacity-10 blur-3xl"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-studio-blue">Order Summary</span>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest opacity-40">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toLocaleString('es-MX')}</span>
                </div>
                <AnimatePresence>
                  {totals.discount > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center text-studio-blue font-black uppercase tracking-tighter text-lg italic"
                    >
                      <span>{t('configurator.discount_label')}</span>
                      <span>-${totals.discount.toLocaleString('es-MX')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-10 border-t border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-studio-gray-400 mb-2 block">Investment</span>
              <h4 className="text-6xl font-black tracking-tighter italic">
                ${totals.total.toLocaleString('es-MX')}
                <span className="text-xs ml-2 font-bold uppercase opacity-30">MXN</span>
              </h4>
            </div>

            <button 
              className="group w-full py-6 bg-studio-blue hover:bg-white hover:text-studio-blue text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 shadow-xl shadow-studio-blue/20"
              onClick={() => alert('Generando cotización...')}
            >
              {t('hero.cta')}
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <p className="text-[9px] text-center font-black uppercase tracking-widest opacity-20">
              Prices exclude VAT. <br /> Valid for 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
