import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Configurator from './pages/Configurator';
import { CustomCursor } from './components/CustomCursor';
import './i18n/i18n';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
