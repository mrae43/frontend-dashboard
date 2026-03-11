import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, PieChart, Settings, Users, Menu, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { hasPermission, type Permissions } from '../schema';

export default function DashboardLayout() {
  const location = useLocation();
  const { user, loading, logout } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { name: string; path: string; icon: any; requiredPermission?: keyof Permissions }[] = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: PieChart, requiredPermission: 'canViewMargins' },
    { name: 'Customers', path: '/customers', icon: Users, requiredPermission: 'canManageUsers' },
    { name: 'Settings', path: '/settings', icon: Settings, requiredPermission: 'canEditPrice' },
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar - Important info top-left */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Menu className="w-6 h-6 mr-3 text-slate-500 cursor-pointer hover:text-slate-800 transition-colors" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FoodDash
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems
            .filter(item => !item.requiredPermission || hasPermission(user?.role, item.requiredPermission))
            .map((item) => {
              const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {item.name}
                </Link>
              );
            })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-0">
          <div className="flex items-center">
             <h1 className="text-xl font-semibold text-slate-800">
               {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
             </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications Bell */}
            <button 
              className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors relative group"
              data-testid="notification-bell"
              aria-label="Notifications"
            >
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              <Bell className="w-5 h-5" />
            </button>
            {user && (
              <span 
                data-testid="user-role"
                className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium capitalize"
                aria-label={`User role: ${user.role}`}
              >
                {user.role}
              </span>
            )}
            {/* User Dropdown */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  data-testid="user-avatar-trigger"
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 group"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-blue-600 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    role="menu"
                    aria-labelledby="user-avatar-trigger"
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 pt-2">
                      <button
                        onClick={() => { setDropdownOpen(false); logout(); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-sm font-medium"
                        role="menuitem"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
