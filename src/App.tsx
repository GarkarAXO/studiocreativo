import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import './i18n/i18n';

// Simple Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-2xl font-black uppercase text-primary italic">Algo salió mal</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No pudimos cargar esta sección. Por favor, recarga la página.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Configurator = lazy(() => import('./pages/Configurator'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

// Loading component
const PageLoader = () => (
  <div className="fixed inset-0 bg-white dark:bg-slate-950 flex items-center justify-center z-[500]">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-full focus:shadow-xl focus:font-bold focus:uppercase focus:text-xs focus:tracking-widest">
          Saltar al contenido principal
        </a>
        <CustomCursor />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/configurator" element={<Configurator />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
