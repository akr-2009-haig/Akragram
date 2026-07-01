import { useState } from 'react';
import { mockScraperSessions, mockAccounts } from '../../data/mockData';
import {
  Link,
  Users,
  Filter,
  Play,
  Pause,
  Square,
  Download,
  Settings,
  Clock,
  Calendar,
  Globe,
  CheckCircle,
  AlertTriangle,
  FileText,
  Search,
  ChevronDown,
  X
} from 'lucide-react';

type ModalType = 'new' | 'templates' | 'filters' | null;

export default function MemberScraper() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [targetLink, setTargetLink] = useState('');

  const stats = {
    todayScraped: 1150,
    weekScraped: 8500,
    totalScraped: 15420,
    savedFiles: 12,
    runningSessions: mockScraperSessions.filter(s => s.status === 'running').length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">تجميع اليوم</p>
          <p className="text-2xl font-bold text-gray-800">{stats.todayScraped.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">الأسبوع</p>
          <p className="text-2xl font-bold text-gray-800">{stats.weekScraped.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">إجمالي</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalScraped.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">الملفات المحفوظة</p>
          <p className="text-2xl font-bold text-gray-800">{stats.savedFiles}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">جلسات نشطة</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.runningSessions}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">تجميع جديد</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رابط المجموعة أو القناة</label>
            <div className="relative">
              <Link className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={targetLink}
                onChange={(e) => setTargetLink(e.target.value)}
                placeholder="https://t.me/group_name أو @username"
                className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
              <Users size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">جميع الأعضاء</p>
            </button>
            <button className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
              <Search size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">النشطون فقط</p>
            </button>
            <button className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
              <Globe size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">المتواجدون</p>
            </button>
            <button className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
              <Clock size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">نطاق زمني</p>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setModalType('filters')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Filter size={18} />
              <span className="text-sm font-medium">فلاتر متقدمة</span>
            </button>
            <button
              onClick={() => setModalType('templates')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <FileText size={18} />
              <span className="text-sm font-medium">قوالب التجميع</span>
            </button>
          </div>

          <button
            onClick={() => setModalType('new')}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            بدء التجميع
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">الجلسات الحالية</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {mockScraperSessions.map((session) => (
            <div key={session.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    session.status === 'running' ? 'bg-emerald-50' :
                    session.status === 'completed' ? 'bg-blue-50' :
                    session.status === 'paused' ? 'bg-amber-50' : 'bg-red-50'
                  }`}>
                    {session.status === 'running' ? <Play size={18} className="text-emerald-600" /> :
                     session.status === 'completed' ? <CheckCircle size={18} className="text-blue-600" /> :
                     session.status === 'paused' ? <Pause size={18} className="text-amber-600" /> :
                     <AlertTriangle size={18} className="text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{session.targetGroup}</p>
                    <p className="text-sm text-gray-500">{session.targetLink}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-lg font-bold ${
                    session.status === 'running' ? 'text-emerald-600' :
                    session.status === 'completed' ? 'text-blue-600' :
                    session.status === 'paused' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {session.progress}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    session.status === 'running' ? 'bg-emerald-500' :
                    session.status === 'completed' ? 'bg-blue-500' :
                    session.status === 'paused' ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${session.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{session.scrapedCount.toLocaleString()} / {session.membersCount.toLocaleString()} عضو</span>
                <div className="flex items-center gap-2">
                  {session.status === 'running' && (
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Pause size={16} />
                    </button>
                  )}
                  {session.status === 'paused' && (
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Play size={16} />
                    </button>
                  )}
                  <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                    <Square size={16} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-emerald-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <ScraperModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ScraperModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [filters, setFilters] = useState({
    excludeBots: false,
    excludeDeleted: false,
    excludeNoUsername: false,
    hasPhoto: false,
    arabicOnly: false,
    englishOnly: false,
  });

  if (type === 'filters') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">فلاتر التجميع</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { key: 'excludeBots', label: 'استبعاد البوتات' },
            { key: 'excludeDeleted', label: 'استبعاد المحذوفة' },
            { key: 'excludeNoUsername', label: 'استبعاد بدون @username' },
            { key: 'hasPhoto', label: 'صورة شخصية فقط' },
            { key: 'arabicOnly', label: 'حسابات عربية فقط (حسب الاسم)' },
            { key: 'englishOnly', label: 'حسابات إنجليزية فقط' },
          ].map((filter) => (
            <label key={filter.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
              <span className="text-gray-700">{filter.label}</span>
              <input
                type="checkbox"
                checked={filters[filter.key as keyof typeof filters]}
                onChange={(e) => setFilters({ ...filters, [filter.key]: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          تطبيق الفلاتر
        </button>
      </div>
    );
  }

  if (type === 'templates') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">قوالب التجميع</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'قالب التسويق', filters: 3, lastUsed: 'منذ يومين' },
            { name: 'قالب التقنية', filters: 5, lastUsed: 'منذ أسبوع' },
            { name: 'قالب التجارة', filters: 2, lastUsed: 'منذ شهر' },
          ].map((template, index) => (
            <button
              key={index}
              className="w-full p-4 bg-gray-50 rounded-xl text-right hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-800">{template.name}</p>
              <p className="text-sm text-gray-500">{template.filters} فلاتير - آخر استخدام {template.lastUsed}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          إلغاء
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">بدء التجميع</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حد التجميع</label>
          <div className="grid grid-cols-4 gap-2">
            {['كل المتاح', '1,000', '5,000', '10,000'].map((limit) => (
              <button key={limit} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-emerald-300 transition-colors">
                {limit}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الحساب المستخدم</label>
          <div className="relative">
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
              <option>حساب واحد</option>
              <option>تدوير بين عدة حسابات</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">البيانات المطلوبة</label>
          <div className="grid grid-cols-2 gap-2">
            {['معرف المستخدم', 'الاسم الأول', 'اسم العائلة', '@username', 'رقم الهاتف', 'آخر ظهور'].map((field) => (
              <label key={field} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm text-gray-700">{field}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          بدء التجميع
        </button>
      </div>
    </div>
  );
}
