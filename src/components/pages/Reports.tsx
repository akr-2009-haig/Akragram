import { useState } from 'react';
import { mockActivityLogs, mockAccounts, mockScraperSessions } from '../../data/mockData';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Users,
  Globe,
  MessageSquare,
  FileText,
  TrendingUp,
  X
} from 'lucide-react';

type ModalType = 'export' | null;

export default function Reports() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [dateRange, setDateRange] = useState('today');

  const stats = {
    totalScraped: 15420,
    totalAdded: 3420,
    totalMessages: 12500,
    errors: 8,
    successRate: 98
  };

  const chartData = [
    { day: 'السبت', scraped: 1200, added: 45, messages: 150 },
    { day: 'الأحد', scraped: 980, added: 32, messages: 120 },
    { day: 'الإثنين', scraped: 1500, added: 55, messages: 180 },
    { day: 'الثلاثاء', scraped: 890, added: 28, messages: 95 },
    { day: 'الأربعاء', scraped: 1150, added: 40, messages: 130 },
    { day: 'الخميس', scraped: 1300, added: 48, messages: 160 },
    { day: 'الجمعة', scraped: 400, added: 15, messages: 40 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">تجميع</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalScraped.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">إضافة</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalAdded.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">رسائل</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMessages.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">أخطاء</p>
              <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">معدل النجاح</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.successRate}%</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">نشاط الأسبوع</h3>
            <div className="flex gap-2">
              {['today', 'week', 'month'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    dateRange === range ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range === 'today' ? 'اليوم' : range === 'week' ? 'الأسبوع' : 'الشهر'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.day}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-emerald-600">{item.scraped}</span>
                    <span className="text-blue-600">{item.added}</span>
                    <span className="text-purple-600">{item.messages}</span>
                  </div>
                </div>
                <div className="flex gap-1 h-4">
                  <div
                    className="bg-emerald-500 rounded-l"
                    style={{ width: `${(item.scraped / 1500) * 100}%` }}
                  />
                  <div
                    className="bg-blue-500"
                    style={{ width: `${(item.added / 55) * 100}%` }}
                  />
                  <div
                    className="bg-purple-500 rounded-r"
                    style={{ width: `${(item.messages / 180) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded" />
              <span className="text-gray-600">تجميع</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-gray-600">إضافة</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded" />
              <span className="text-gray-600">رسائل</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">سجل النشاطات</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                <Filter size={16} />
                فلتر
              </button>
              <button
                onClick={() => setModalType('export')}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors"
              >
                <Download size={16} />
                تصدير
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-auto">
            {mockActivityLogs.map((log) => (
              <div key={log.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    log.type === 'error' ? 'bg-red-50 text-red-600' :
                    log.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                    log.type === 'scrape' ? 'bg-emerald-50 text-emerald-600' :
                    log.type === 'add' ? 'bg-blue-50 text-blue-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {log.type === 'error' ? <XCircle size={14} /> :
                     log.type === 'warning' ? <AlertTriangle size={14} /> :
                     <CheckCircle size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800 text-sm">{log.accountName}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{log.details}</p>
                    <p className="text-xs text-gray-400">{log.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <FileText size={32} className="mx-auto mb-3 text-emerald-500" />
          <p className="font-medium text-gray-800">تقرير الحسابات</p>
          <p className="text-sm text-gray-500">تفاصيل جميع الحسابات</p>
        </button>
        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <BarChart3 size={32} className="mx-auto mb-3 text-blue-500" />
          <p className="font-medium text-gray-800">تقرير العمليات</p>
          <p className="text-sm text-gray-500">إحصائيات التجميع والإضافة</p>
        </button>
        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <Globe size={32} className="mx-auto mb-3 text-purple-500" />
          <p className="font-medium text-gray-800">تقرير البروكسي</p>
          <p className="text-sm text-gray-500">حالة وسرعة البروكسيهات</p>
        </button>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <ExportModal onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ExportModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">تصدير التقرير</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقرير</label>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-emerald-300 transition-colors">
              PDF
            </button>
            <button className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-sm font-medium text-emerald-700">
              CSV
            </button>
            <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-emerald-300 transition-colors">
              TXT
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">النطاق الزمني</label>
          <div className="relative">
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
              <option>اليوم</option>
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
              <option>كل الوقت</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
      >
        <Download size={18} />
        تصدير التقرير
      </button>
    </div>
  );
}
