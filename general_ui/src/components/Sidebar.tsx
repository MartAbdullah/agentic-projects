import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ZapIcon, BrainIcon, DatabaseIcon, StethoscopeIcon, UserIcon } from '../icons';
import logoImg from '../icons/logo2.png';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      name: 'Patient Intake',
      href: '/patient-intake',
      icon: ZapIcon,
    },
    {
      name: 'Specialist Consultation',
      href: '/specialist-consultation',
      icon: BrainIcon,
    },
    {
      name: 'Clinical Document',
      href: '/clinical-document',
      icon: DatabaseIcon,
    },
    {
      name: 'Specialist Portal',
      href: '/specialist',
      icon: StethoscopeIcon,
    },
    {
      name: 'Patient Portal',
      href: '/patient',
      icon: UserIcon,
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-screen overflow-y-auto">
      {/* Logo Section */}
      <div className="p-2 border-b border-slate-700">
        <Link to="/" className="flex flex-col items-center group">
          <div className="w-full bg-transparent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all overflow-hidden px-1 py-0 mb-1">
            <img 
              src={logoImg}
              alt="Healthcare Logo"
              className="w-64 h-auto object-contain"
            />
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
          © 2026 HealthCare. Medical AI Platform.
        </p>
      </div>
    </aside>
  );
}
