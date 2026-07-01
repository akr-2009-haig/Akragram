import { MenuItem } from '../../types';
import {
  Users,
  Download,
  Upload,
  RefreshCw,
  Globe,
  MessageSquare,
  Megaphone,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Menu
} from 'lucide-react';

interface SidebarProps {
  currentPage: MenuItem;
  setCurrentPage: (page: MenuItem) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems: { id: MenuItem; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: <LayoutDashboard size={20} /> },
  { id: 'accounts', label: 'مدير الحسابات', icon: <Users size={20} /> },
  { id: 'scraper', label: 'تجميع الأعضاء', icon: <Download size={20} /> },
  { id: 'adder', label: 'إضافة الأعضاء', icon: <Upload size={20} /> },
  { id: 'rotation', label: 'نظام التدوير', icon: <RefreshCw size={20} /> },
  { id: 'proxy', label: 'مدير البروكسي', icon: <Globe size={20} /> },
  { id: 'messaging', label: 'الرسائل الجماعية', icon: <MessageSquare size={20} /> },
  { id: 'campaigns', label: 'حملات القروبات', icon: <Megaphone size={20} /> },
  { id: 'reports', label: 'التقارير والسجلات', icon: <BarChart3 size={20} /> },
  { id: 'security', label: 'أدوات الأمان', icon: <Shield size={20} /> },
  { id: 'settings', label: 'الإعدادات', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, setCurrentPage, collapsed, setCollapsed }: SidebarProps) {
  return (
    <aside
      className={`fixed right-0 top-0 h-screen bg-white shadow-xl border-l border-gray-200 z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-800 text-lg">AXOGRAM</h1>
                <p className="text-xs text-gray-500">ULTRA v1.0</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span className={currentPage === item.id ? 'text-emerald-500' : ''}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage('logout')}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium text-sm">تسجيل الخروج</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
