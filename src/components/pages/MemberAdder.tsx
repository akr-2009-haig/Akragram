import { useState } from 'react';
import { mockAdderSessions, mockAccounts } from '../../data/mockData';
import {
  Upload,
  FileText,
  Link,
  Users,
  Play,
  Pause,
  Square,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Filter,
  ChevronDown,
  X,
  Ban,
  List,
  Zap
} from 'lucide-react';

type ModalType = 'new' | 'blacklist' | 'settings' | null;

export default function MemberAdder() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const stats = {
    todayAdded: 65,
    weekAdded: 520,
    totalAdded: 3420,
    activeSessions: mockAdderSessions.filter(s => s.status === 'running').length,
    skipped: 336,
    blacklistCount: 3
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">إضافة اليوم</p>
          <p className="text-2xl font-bold text-gray-800">{stats.todayAdded}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">الأسبوع</p>
          <p className="text-2xl font-bold text-gray-800">{stats.weekAdded}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">إجمالي</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalAdded.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">جلسات نشطة</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.activeSessions}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">تم تخطي</p>
          <p className="text-2xl font-bold text-amber-600">{stats.skipped}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">القائمة السوداء</p>
          <p className="text-2xl font-bold text-red-600">{stats.blacklistCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <FileText size={32} className="mx-auto mb-3 text-emerald-500" />
          <p className="font-medium text-gray-800">من ملف CSV</p>
          <p className="text-sm text-gray-500">رفع ملف الأعضاء</p>
        </button>

        <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <Link size={32} className="mx-auto mb-3 text-blue-500" />
          <p className="font-medium text-gray-800">من مجموعة</p>
          <p className="text-sm text-gray-500">جمع ثم إضافة</p>
        </button>

        <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <Zap size={32} className="mx-auto mb-3 text-amber-500" />
          <p className="font-medium text-gray-800">إضافة ذكية</p>
          <p className="text-sm text-gray-500">تجميع + إضافة</p>
        </button>

        <button className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors text-center">
          <List size={32} className="mx-auto mb-3 text-purple-500" />
          <p className="font-medium text-gray-800">من عدة مصادر</p>
          <p className="text-sm text-gray-500">دمج ملفات متعددة</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">جلسات الإضافة</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setModalType('blacklist')}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors"
            >
              <Ban size={16} />
              القائمة السوداء
            </button>
            <button
              onClick={() => setModalType('settings')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              <Settings size={16} />
              الإعدادات
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {mockAdderSessions.map((session) => (
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
                     session.status === 'paused' ? <Pause size={18} className="text-amber-600' /> :
                     <AlertTriangle size={18} className="text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{session.sourceFile}</p>
                    <p className="text-sm text-gray-500">{session.targetGroup}</p>
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
                <div className="flex items-center gap-4">
                  <span className="text-emerald-600">{session.addedCount} مضاف</span>
                  <span className="text-amber-600">{session.skippedCount} تخطي</span>
                  <span>{session.totalMembers} إجمالي</span>
                </div>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">استئناف عملية سابقة</h3>
        <div className="text-center text-gray-500 py-8">
          <RefreshCw size={48} className="mx-auto mb-4 text-gray-300" />
          <p>لا توجد عملية محفوظة للاستئناف</p>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <AdderModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function AdderModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (type === 'blacklist') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">القائمة السوداء</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {[
            { username: 'spammer_bot', reason: 'حساب بروباغاندا', date: '2024-01-10' },
            { username: 'fake_user123', reason: 'حساب وهمي', date: '2024-01-12' },
            { username: 'deleted_acc', reason: 'حساب محذوف', date: '2024-01-14' },
          ].map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">@{entry.username}</p>
                <p className="text-sm text-gray-500">{entry.reason}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{entry.date}</span>
                <button className="text-red-500 hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          إضافة مستخدم جديد
        </button>
      </div>
    );
  }

  if (type === 'settings') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">إعدادات الإضافة</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حد الإضافة اليومي/حساب</label>
            <input
              type="number"
              defaultValue={20}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التأخير بين العمليات (ثانية)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="من"
                defaultValue={60}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="number"
                placeholder="إلى"
                defaultValue={120}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عدد العمليات قبل تبديل الحساب</label>
            <input
              type="number"
              defaultValue={5}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          حفظ الإعدادات
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">إضافة جديدة</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>
      <p className="text-gray-500">اختر طريقة الإضافة من الأزرار أعلاه</p>
    </div>
  );
}
