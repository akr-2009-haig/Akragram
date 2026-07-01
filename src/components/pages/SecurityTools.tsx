import { useState } from 'react';
import { mockAccounts, mockProxies } from '../../data/mockData';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Smartphone,
  Lock,
  Unlock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Activity,
  Settings,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

type ModalType = 'security' | 'sessions' | '2fa' | null;

export default function SecurityTools() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const securityStats = {
    secure: mockAccounts.filter(a => a.status === 'active' && a.healthScore >= 80).length,
    atRisk: mockAccounts.filter(a => a.status === 'restricted' || (a.status === 'active' && a.healthScore < 70)).length,
    compromised: mockAccounts.filter(a => a.status === 'banned').length,
    with2FA: 4,
    totalSessions: 6
  };

  const securityChecks = [
    { name: 'جلسات التسجيل', status: 'good', detail: 'لا توجد جلسات مشبوهة' },
    { name: 'البروكسيهات', status: 'warning', detail: 'بروكسي واحد ميت' },
    { name: 'كلمات مرور 2FA', status: 'good', detail: '4 من 5 حسابات محمية' },
    { name: 'نشاط مشبوه', status: 'good', detail: 'لم يُكشف نشاط غير عادي' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">آمن</p>
              <p className="text-2xl font-bold text-emerald-600">{securityStats.secure}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <ShieldCheck size={24} className="text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">معرض للخطر</p>
              <p className="text-2xl font-bold text-amber-600">{securityStats.atRisk}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">مخترق</p>
              <p className="text-2xl font-bold text-red-600">{securityStats.compromised}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">محمي بـ 2FA</p>
              <p className="text-2xl font-bold text-blue-600">{securityStats.with2FA}/{mockAccounts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Key size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">فحص الأمان الشامل</h3>
              <p className="text-sm text-gray-500">تحقق من جميع الحسابات</p>
            </div>
          </div>
          <button
            onClick={() => setModalType('security')}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            فحص الآن
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityChecks.map((check, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                check.status === 'good' ? 'bg-emerald-50 border-emerald-200' :
                check.status === 'warning' ? 'bg-amber-50 border-amber-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {check.status === 'good' ? <CheckCircle size={20} className="text-emerald-600" /> :
                   check.status === 'warning' ? <AlertTriangle size={20} className="text-amber-600" /> :
                   <XCircle size={20} className="text-red-600" />}
                  <span className="font-medium text-gray-800">{check.name}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{check.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">الأجهزة المتصلة</h3>
            <button
              onClick={() => setModalType('sessions')}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              عرض الكل
            </button>
          </div>
          <div className="p-4 space-y-3">
            {mockAccounts.slice(0, 3).map((account) => (
              <div key={account.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Smartphone size={18} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{account.name}</p>
                  <p className="text-xs text-gray-500">{account.deviceModel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-xs text-gray-500">متصل</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">إدارة 2FA</h3>
            <button
              onClick={() => setModalType('2fa')}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              إدارة
            </button>
          </div>
          <div className="p-4 space-y-3">
            {mockAccounts.slice(0, 3).map((account) => (
              <div key={account.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Key size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{account.name}</p>
                  <p className="text-xs text-gray-500">{account.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Lock size={14} className="text-emerald-600" />
                  <span className="text-xs text-emerald-600">مفعّل</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">إعدادات الأمان</h3>
        <div className="space-y-3">
          {[
            { label: 'تقليل السرعة تلقائياً عند FloodWait', checked: true },
            { label: 'زيادة التأخير عند التقييد', checked: true },
            { label: 'إيقاف مؤقت عند تقييد أكثر من حساب', checked: false },
            { label: 'إيقاف تلقائي إذا تجاوز الفشل 30%', checked: true },
            { label: 'تنبيه عند حظر أي حساب', checked: true },
          ].map((setting, index) => (
            <label key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
              <span className="text-gray-700">{setting.label}</span>
              <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            </label>
          ))}
        </div>
        <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          حفظ الإعدادات
        </button>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <SecurityModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function SecurityModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 'sessions') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">الأجهزة المتصلة</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {mockAccounts.map((account) => (
            <div key={account.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Smartphone size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{account.name}</p>
                    <p className="text-sm text-gray-500">{account.deviceModel} | {account.os}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-sm text-gray-500">متصل</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors">
          إنهاء جميع الجلسات الأخرى
        </button>
      </div>
    );
  }

  if (type === '2fa') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">تحديث كلمة مرور 2FA</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الحساب</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
              {mockAccounts.map(a => (
                <option key={a.id}>{a.name} - {a.phone}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الحالية</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          تطبيق التغيير
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">فحص الأمان</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="text-center py-8">
        <RefreshCw size={48} className="mx-auto mb-4 text-emerald-500 animate-spin" />
        <p className="text-gray-600">جاري الفحص...</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-emerald-500 h-2 rounded-full w-3/4 transition-all" />
        </div>
      </div>
    </div>
  );
}
