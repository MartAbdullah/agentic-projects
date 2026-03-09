import { Link } from 'react-router-dom';
import { MenuIcon } from '../icons';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800 border-b border-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">Gezonheid</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-700 rounded-md">
              Home
            </Link>
            <Link to="/basic-agent" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-700 rounded-md">
              Basic Agent
            </Link>
            <Link to="/intermediate-agent" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-700 rounded-md">
              Intermediate Agent
            </Link>
            <Link to="/advanced-agent" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-700 rounded-md">
              Advanced Agent
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link to="/" className="block text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-slate-700 rounded-md">
              Home
            </Link>
            <Link to="/basic-agent" className="block text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-slate-700 rounded-md">
              Basic Agent
            </Link>
            <Link to="/intermediate-agent" className="block text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-slate-700 rounded-md">
              Intermediate Agent
            </Link>
            <Link to="/advanced-agent" className="block text-gray-300 hover:text-white px-3 py-2 text-sm font-medium hover:bg-slate-700 rounded-md">
              Advanced Agent
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
