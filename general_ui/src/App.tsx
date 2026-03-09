import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BasicAgentPage from './pages/BasicAgentPage';
import IntermediateAgentPage from './pages/IntermediateAgentPage';
import AdvancedAgentPage from './pages/AdvancedAgentPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-agent" element={<BasicAgentPage />} />
          <Route path="/intermediate-agent" element={<IntermediateAgentPage />} />
          <Route path="/advanced-agent" element={<AdvancedAgentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
