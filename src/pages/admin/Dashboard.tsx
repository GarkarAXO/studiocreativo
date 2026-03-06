import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Users, FileText, TrendingUp, LogOut, Loader2, Calendar, Mail, Phone, Briefcase } from 'lucide-react';

interface Quote {
  id: string;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  createdAt: string;
  selectedServices: string[];
  client: {
    fullName: string;
    email: string;
    businessName: string;
    phone: string | null;
  }
}

const AdminDashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const response = await fetch('/api/admin/quotes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else if (response.status === 401) {
          localStorage.removeItem('admin_token');
          navigate('/admin/login');
        } else {
          setError('Failed to fetch quotes');
        }
      } catch (err) {
        setError('Connection error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  // Cálculos rápidos
  const totalRevenue = quotes.reduce((acc, q) => acc + Number(q.total), 0);
  const totalLeads = quotes.length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring Studio Creativo Leads</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard 
            icon={<Users className="text-primary" />} 
            label="Total Leads" 
            value={totalLeads.toString()} 
          />
          <MetricCard 
            icon={<TrendingUp className="text-green-500" />} 
            label="Quoted Volume" 
            value={`$${totalRevenue.toLocaleString('es-MX')}`} 
          />
          <MetricCard 
            icon={<FileText className="text-blue-400" />} 
            label="Pending Quotes" 
            value={quotes.filter(q => q.status === 'pending').length.toString()} 
          />
        </div>

        {/* Quotes Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Recent Cotizations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-4">Client / Business</th>
                  <th className="px-8 py-4">Services</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm dark:text-white">{quote.client.fullName}</span>
                        <span className="text-xs text-slate-500">{quote.client.businessName}</span>
                        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a href={`mailto:${quote.client.email}`} className="text-primary hover:underline text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <Mail size={10} /> Email
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1">
                        {quote.selectedServices.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black rounded-md uppercase border border-primary/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-primary italic text-lg">
                        ${Number(quote.total).toLocaleString('es-MX')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Calendar size={14} />
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-black rounded-full uppercase tracking-widest">
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
        {icon}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <h4 className="text-3xl font-black italic tracking-tighter dark:text-white uppercase">{value}</h4>
    </div>
  </div>
);

export default AdminDashboard;
