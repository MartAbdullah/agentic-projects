import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import BasicAgentPage from './pages/BasicAgentPage';
import IntermediateAgentPage from './pages/IntermediateAgentPage';
import AdvancedAgentPage from './pages/AdvancedAgentPage';
import SpecialistPage from './pages/SpecialistPage';
import PatientPage from './pages/PatientPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/basic-agent" element={<BasicAgentPage />} />
            <Route path="/intermediate-agent" element={<IntermediateAgentPage />} />
            <Route path="/advanced-agent" element={<AdvancedAgentPage />} />
            <Route path="/specialist" element={<SpecialistPage />} />
            <Route path="/patient" element={<PatientPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
