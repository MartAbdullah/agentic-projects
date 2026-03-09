import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ZapIcon, BrainIcon, DatabaseIcon, StethoscopeIcon, UserIcon } from '../icons';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      name: 'Basic Agent',
      href: '/basic-agent',
      icon: ZapIcon,
    },
    {
      name: 'Intermediate Agent',
      href: '/intermediate-agent',
      icon: BrainIcon,
    },
    {
      name: 'Advanced Agent',
      href: '/advanced-agent',
      icon: DatabaseIcon,
    },
    {
      name: 'Specialist',
      href: '/specialist',
      icon: StethoscopeIcon,
    },
    {
      name: 'Patient',
      href: '/patient',
      icon: UserIcon,
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-screen overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">Gezondheid</span>
            <span className="text-gray-400 text-xs">Agentic Ai</span>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-6 border-t border-slate-700 space-y-3">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">All systems online</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">
          © 2026 Agentic Suite. Medical AI Platform.
        </p>
      </div>
    </aside>
  );
}
