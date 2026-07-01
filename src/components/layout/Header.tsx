import { MenuItem } from '../../types';
import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronLeft,
  LayoutDashboard,
  Users,
  Download,
  Upload,
  RefreshCw,
  Globe,
  MessageSquare,
  Megaphone,
  BarChart3,
  Shield,
  Settings
} from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: MenuItem;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const pageTitles: Record<MenuItem, { title: string; icon: React.ReactNode }> = {
  dashboard: { title: 'لوحة التحكم', icon: <LayoutDashboard size={24} /> },
  accounts: { title: 'مدير الحسابات', icon: <Users size={24} /> },
  scraper: { title: 'تجميع الأعضاء', icon: <Download size={24} /> },
  adder: { title: 'إضافة الأعضاء', icon: <Upload size={24} /> },
  rotation: { title: 'نظام التدوير', icon: <RefreshCw size={24} /> },
  proxy: { title: 'مدير البروكسي', icon: <Globe size={24} /> },
  messaging: { title: 'الرسائل الجماعية', icon: <MessageSquare size={24} /> },
  campaigns: { title: 'حملات القروبات', icon: <Megaphone size={24} /> },
  reports: { title: 'التقارير والسجلات', icon: <BarChart3 size={24} /> },
  security: { title: 'أدوات الأمان', icon: <Shield size={24} /> },
  settings: { title: 'الإعدادات', icon: <Settings size={24} /> },
  logout: { title: 'تسجيل الخروج', icon: <LayoutDashboard size={24} /> },
};

export default function Header({ currentPage, sidebarCollapsed, setSidebarCollapsed }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              {pageTitles[currentPage].icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {pageTitles[currentPage].title}
              </h2>
              <p className="text-sm text-gray-500">AXOGRAM ULTRA</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">م</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">المدير</p>
              <p className="text-xs text-gray-500">متصل</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
