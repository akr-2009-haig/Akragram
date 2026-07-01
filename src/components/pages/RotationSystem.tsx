import { useState } from 'react';
import { mockAccounts, mockAccountGroups } from '../../data/mockData';
import {
  RefreshCw,
  Clock,
  Users,
  Activity,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  X,
  Zap,
  Calendar,
  Timer
} from 'lucide-react';

type ModalType = 'settings' | 'schedule' | null;

export default function RotationSystem() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const rotationStats = {
    currentAccount: mockAccounts[0],
    nextSwitchIn: '00:45:32',
    totalSwitches: 1250,
    todaySwitches: 8,
    avgResponseTime: '1.2s'
  };

  const recentRotations = [
    { from: 'أحمد محمد', to: 'محمد علي', reason: 'FloodWait', time: '10:30' },
    { from: 'محمد علي', to: 'خالد عبدالرحمن', reason: 'حد يومي', time: '09:15' },
    { from: 'خالد عبدالرحمن', to: 'أحمد محمد', reason: 'جدولة', time: '08:00' },
    { from: 'أحمد محمد', to: 'محمد علي', reason: 'FloodWait', time: '07:45' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <RefreshCw size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">نظام التدوير</h3>
              <p className="text-sm text-gray-500">تبديل تلقائي للحسابات</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isEnabled ? 'text-emerald-600' : 'text-gray-400'}`}>
                {isEnabled ? 'مفعّل' : 'معطّل'}
              </span>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  isEnabled ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-sm ${
                    isEnabled ? 'right-1' : 'right-7'
                  }`}
                />
              </button>
            </div>
            <button
              onClick={() => setModalType('settings')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-sm text-emerald-700 mb-1">الحساب الحالي</p>
            <p className="text-lg font-bold text-emerald-800">{rotationStats.currentAccount.name}</p>
            <p className="text-sm text-emerald-600">{rotationStats.currentAccount.phone}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700 mb-1">التالي بعد</p>
            <p className="text-2xl font-bold text-blue-800 font-mono">{rotationStats.nextSwitchIn}</p>
            <p className="text-sm text-blue-600">دقيقة</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-700 mb-1">تبديلات اليوم</p>
            <p className="text-2xl font-bold text-purple-800">{rotationStats.todaySwitches}</p>
            <p className="text-sm text-purple-600">تبديل</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-amber-700 mb-1">إجمالي التبديلات</p>
            <p className="text-2xl font-bold text-amber-800">{rotationStats.totalSwitches.toLocaleString()}</p>
            <p className="text-sm text-amber-600">تبديل</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
            <Play size={18} />
            بدء التدوير
          </button>
          <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <Pause size={18} />
            إيقاف مؤقت
          </button>
          <button
            onClick={() => setModalType('schedule')}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            جدولة
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">قائمة التدوير</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {mockAccounts.filter(a => a.status === 'active').map((account, index) => (
                <div
                  key={account.id}
                  className={`p-3 rounded-xl flex items-center justify-between ${
                    index === 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">\n                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{account.name}</p>
                      <p className="text-sm text-gray-500">{account.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      account.healthScore >= 90 ? 'bg-emerald-100 text-emerald-700' :
                      account.healthScore >= 70 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {account.healthScore}% صحة
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium">
                        نشط
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">سجل التبديلات</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentRotations.map((rotation, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      rotation.reason === 'FloodWait' ? 'bg-red-50' :
                      rotation.reason === 'حد يومي' ? 'bg-amber-50' : 'bg-blue-50'
                    }`}>
                      {rotation.reason === 'FloodWait' ? <AlertTriangle size={18} className="text-red-600" /> :
                       rotation.reason === 'حد يومي' ? <Activity size={18} className="text-amber-600" /> :
                       <Clock size={18} className="text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {rotation.from} {'>'} {rotation.to}
                      </p>
                      <p className="text-xs text-gray-500">{rotation.reason}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{rotation.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">قواعد التدوير</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'عند FloodWait', value: 'انتظار + تبديل تلقائي', icon: <AlertTriangle size={20} />, color: 'red' },
            { title: 'عند الحد اليومي', value: 'تبديل فوري', icon: <Activity size={20} />, color: 'amber' },
            { title: 'جدولة زمنية', value: 'كل ساعة', icon: <Timer size={20} />, color: 'blue' },
            { title: 'أولوية الاستخدام', value: 'الأعلى صحة أولاً', icon: <Zap size={20} />, color: 'emerald' },
          ].map((rule, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                rule.color === 'red' ? 'bg-red-50 text-red-600' :
                rule.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                rule.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {rule.icon}
              </div>
              <div>
                <p className="font-medium text-gray-800">{rule.title}</p>
                <p className="text-sm text-gray-500">{rule.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <RotationModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function RotationModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (type === 'settings') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">إعدادات التدوير</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">فترة التدوير</label>
            <div className="grid grid-cols-3 gap-2">
              {['كل ساعة', 'كل ساعتين', 'كل 4 ساعات'].map((period) => (
                <button key={period} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-emerald-300 transition-colors">
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عند FloodWait</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                <option>انتظار + تبديل تلقائي</option>
                <option>تبديل فوري</option>
                <option>إيقاف + إشعار</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">أولوية الاختيار</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                <option>الأعلى صحة أولاً</option>
                <option>الأقل استخداماً</option>
                <option>عشوائي</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
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

  if (type === 'schedule') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">جدولة التدوير</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وقت البدء</label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وقت الإيقاف</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            <span className="text-sm text-gray-700">تشغيل حتى عند الإيقاف</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          حفظ الجدولة
        </button>
      </div>
    );
  }

  return null;
}
