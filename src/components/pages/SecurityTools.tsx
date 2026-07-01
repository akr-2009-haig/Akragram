import { useState } from 'react';
import { mockAccounts, mockBlacklist } from '../../data/mockData';
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
  EyeOff,
  Ban,
  Clock,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  AlertCircle,
  Zap,
  Monitor,
  FileText,
  Database,
  Bell,
  LogOut,
  Siren
} from 'lucide-react';

type ModalType = 'security' | 'sessions' | '2fa' | 'blacklist' | 'limits' | 'audit' | 'cleanup' | 'emergency' | 'settings' | null;

export default function SecurityTools() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const securityStats = {
    secure: mockAccounts.filter(a => a.status === 'active' && a.healthScore >= 80).length,
    atRisk: mockAccounts.filter(a => a.status === 'restricted' || (a.status === 'active' && a.healthScore < 70)).length,
    compromised: mockAccounts.filter(a => a.status === 'banned').length,
    with2FA: 4,
    totalSessions: 6,
    blacklistCount: mockBlacklist.length,
    floodWaitsToday: 3,
    securityScore: 85
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
              <p className="text-sm text-gray-500 mb-1">FloodWaits</p>
              <p className="text-2xl font-bold text-orange-600">{securityStats.floodWaitsToday}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">درجة الأمان</p>
              <p className="text-2xl font-bold text-blue-600">{securityStats.securityScore}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Shield size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Blacklist */}
        <button
          onClick={() => setModalType('blacklist')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Ban size={28} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">القائمة السوداء</h3>
              <p className="text-sm text-gray-500 mb-3">إدارة المحظورين من الرسائل</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                  {securityStats.blacklistCount} محظور
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Smart Limits */}
        <button
          onClick={() => setModalType('limits')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap size={28} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">الحدود الذكية</h3>
              <p className="text-sm text-gray-500 mb-3">حماية تلقائية متكيفة</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                  متوازن
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Security Audit */}
        <button
          onClick={() => setModalType('audit')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={28} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">فحص أمان شامل</h3>
              <p className="text-sm text-gray-500 mb-3">تحقق من جميع الحسابات</p>
              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium">
                فحص الآن
              </button>
            </div>
          </div>
        </button>

        {/* Device Monitoring */}
        <button
          onClick={() => setModalType('sessions')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Monitor size={28} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">الأجهزة المتصلة</h3>
              <p className="text-sm text-gray-500 mb-3">مراقبة الجلسات النشطة</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                  {securityStats.totalSessions} أجهزة
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* 2FA Management */}
        <button
          onClick={() => setModalType('2fa')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Key size={28} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">إدارة 2FA</h3>
              <p className="text-sm text-gray-500 mb-3">كلمات مرور التحقف الثنائي</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                  {securityStats.with2FA}/{mockAccounts.length} مفعّل
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Account Cleanup */}
        <button
          onClick={() => setModalType('cleanup')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trash2 size={28} className="text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">تنظيف الحسابات</h3>
              <p className="text-sm text-gray-500 mb-3">إزالة البيانات غير الضرورية</p>
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                بدء التنظيف
              </button>
            </div>
          </div>
        </button>

        {/* Emergency Response */}
        <button
          onClick={() => setModalType('emergency')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-red-200 hover:border-red-300 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Siren size={28} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">الاستجابة للطوارئ</h3>
              <p className="text-sm text-gray-500 mb-3">إيقاف فوري وإجراءات طارئة</p>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
                للطوارئ فقط
              </span>
            </div>
          </div>
        </button>

        {/* Security Settings */}
        <button
          onClick={() => setModalType('settings')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all text-right"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Settings size={28} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">إعدادات الأمان</h3>
              <p className="text-sm text-gray-500 mb-3">تهيئة خيارات الحماية</p>
            </div>
          </div>
        </button>
      </div>

      {/* Security Checks */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">فحوصات الأمان السريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'جلسات التسجيل', status: 'good', detail: 'لا توجد جلسات مشبوهة' },
            { name: 'البروكسيهات', status: 'warning', detail: 'بروكسي واحد ميت' },
            { name: 'كلمات مرور 2FA', status: 'good', detail: '4 من 5 حسابات محمية' },
            { name: 'نشاط مشبوه', status: 'good', detail: 'لم يُكشف نشاط غير عادي' },
          ].map((check, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                check.status === 'good' ? 'bg-emerald-50 border-emerald-200' :
                check.status === 'warning' ? 'bg-amber-50 border-amber-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {check.status === 'good' ? <CheckCircle size={20} className="text-emerald-600" /> :
                 check.status === 'warning' ? <AlertTriangle size={20} className="text-amber-600" /> :
                 <XCircle size={20} className="text-red-600" />}
                <span className="font-medium text-gray-800">{check.name}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{check.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings Toggles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">إعدادات الحماية السريعة</h3>
        <div className="space-y-3">
          {[
            { label: 'تقليل السرعة تلقائياً عند FloodWait', checked: true },
            { label: 'زيادة التأخير عند التقييد', checked: true },
            { label: 'إيقاف مؤقت عند تقييد أكثر من حساب', checked: false },
            { label: 'إيقاف تلقائي إذا تجاوز الفشل 30%', checked: true },
            { label: 'تنبيه عند حظر أي حساب', checked: true },
          ].map((setting, index) => (
            <label key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">{setting.label}</span>
              <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            </label>
          ))}
        </div>
        <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          حفظ الإعدادات
        </button>
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8">
            <SecurityModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function SecurityModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [securityLevel, setSecurityLevel] = useState('balanced');

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
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-xs text-gray-500">
                <span>IP: 192.168.1.xxx</span>
                <span>آخر نشاط: منذ 5 دقائق</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
          <LogOut size={18} />
          إنهاء جميع الجلسات الأخرى
        </button>
      </div>
    );
  }

  if (type === '2fa') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">إدارة كلمات مرور 2FA</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {mockAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Key size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{account.name}</p>
                  <p className="text-xs text-gray-500">{account.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {account.status === 'active' ? (
                  <>
                    <Lock size={14} className="text-emerald-600" />
                    <span className="text-sm text-emerald-600">مفعّل</span>
                  </>
                ) : (
                  <>
                    <Unlock size={14} className="text-amber-600" />
                    <span className="text-sm text-amber-600">غير مفعّل</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-800">تحديث 2FA لحساب محدد</h4>
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

  if (type === 'blacklist') {
    const filteredBlacklist = mockBlacklist.filter(item =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">القائمة السوداء</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Filter size={16} />
            فلتر
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between">
          <span className="text-sm text-gray-600">إجمالي المحظورين:</span>
          <span className="font-bold text-red-600">{filteredBlacklist.length} مستخدم</span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredBlacklist.map((item, index) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-6">{index + 1}</span>
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <Ban size={14} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.username}</p>
                  <p className="text-xs text-gray-500">{item.reason}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <X size={16} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="py-2 bg-emerald-50 text-emerald-600 rounded-xl font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
            <Upload size={16} />
            استيراد قائمة
          </button>
          <button className="py-2 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <Download size={16} />
            تصدير القائمة
          </button>
        </div>

        <button className="w-full mt-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
          إضافة للمحظورين
        </button>
      </div>
    );
  }

  if (type === 'limits') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">الحدود الذكية</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">يراقب سلوك تيليجرام ويتكيف تلقائياً لحماية حساباتك</p>

        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-gray-800">مستوى الأمان العام</h4>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'conservative', name: 'محافظ', desc: 'تأخير: 120-180 ث، حد يومي: 10 إضافة', color: 'emerald' },
              { id: 'balanced', name: 'متوازن (موصى)', desc: 'تأخير: 60-120 ث، حد يومي: 20 إضافة', color: 'amber' },
              { id: 'aggressive', name: 'عدواني', desc: 'تأخير: 15-30 ث، حد يومي: 50 إضافة', color: 'red' },
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => setSecurityLevel(level.id)}
                className={`p-4 rounded-xl border-2 text-right transition-all ${
                  securityLevel === level.id
                    ? level.color === 'emerald' ? 'border-emerald-500 bg-emerald-50' :
                      level.color === 'amber' ? 'border-amber-500 bg-amber-50' :
                      'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-800">{level.name}</div>
                <div className="text-sm text-gray-500">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-gray-800">قواعد الحماية التلقائية</h4>
          {[
            { label: 'تقليل السرعة عند تكرار FloodWait', checked: true, subLabel: 'بعد 3 مرات' },
            { label: 'زيادة التأخير عند التقييد المؤقت', checked: true, subLabel: '50% زيادة' },
            { label: 'إيقاف مؤقت عند تقييد أكثر من حساب', checked: false, subLabel: 'بعد 3 حسابات' },
            { label: 'خفض حدود الحسابات الجديدة (<30 يوم)', checked: true, subLabel: '50% تخفيض' },
            { label: 'إيقاف تلقائي إذا تجاوز الفشل 30%', checked: true, subLabel: '' },
          ].map((setting, index) => (
            <label key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <span className="text-gray-700">{setting.label}</span>
                {setting.subLabel && <p className="text-xs text-gray-500">{setting.subLabel}</p>}
              </div>
              <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            </label>
          ))}
        </div>

        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          حفظ إعدادات الحدود الذكية
        </button>
      </div>
    );
  }

  if (type === 'audit') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">فحص أمان شامل</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
            <ShieldCheck size={40} className="text-emerald-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">درجة الأمان: 85/100</h4>
          <p className="text-gray-500 mb-6">آخر فحص: منذ ساعتين</p>

          <div className="space-y-3 text-right mb-6">
            {[
              { name: 'حالة جميع الحسابات', status: 'good' },
              { name: 'صحة ملفات الجلسة', status: 'good' },
              { name: 'حالة البروكسيهات', status: 'warning' },
              { name: 'الأجهزة المتصلة', status: 'good' },
              { name: 'نشاط مشبوه', status: 'good' },
              { name: 'معدلات FloodWait', status: 'warning' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  {item.status === 'good' ?
                    <CheckCircle size={18} className="text-emerald-600" /> :
                    <AlertTriangle size={18} className="text-amber-600" />}
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className={`text-sm ${item.status === 'good' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {item.status === 'good' ? 'سليم' : 'تحذير'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
          <RefreshCw size={18} />
          تشغيل فحص جديد
        </button>
      </div>
    );
  }

  if (type === 'cleanup') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">تنظيف الحسابات</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">إزالة البيانات غير الضرورية من حساباتك</p>

        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-gray-800">اختر عمليات التنظيف</h4>
          {[
            { label: 'مغادرة مجموعات عشوائية غير ضرورية', subLabel: 'الاحتفاظ بأحدث 50 مجموعة' },
            { label: 'حذف الرسائل المرسلة في القروبات', subLabel: 'أقدم من 24 ساعة' },
            { label: 'مسح سجل الرسائل الخاصة', subLabel: 'مع جهات الاتصال المضافة فقط' },
            { label: 'حذف جهات الاتصال المضافة آلياً', subLabel: '' },
            { label: 'إعادة ضبط الجلسات المتضررة', subLabel: '' },
          ].map((item, index) => (
            <label key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <span className="text-gray-700">{item.label}</span>
                {item.subLabel && <p className="text-xs text-gray-500">{item.subLabel}</p>}
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            </label>
          ))}
        </div>

        <div className="p-3 bg-amber-50 rounded-xl mb-6 flex items-start gap-2">
          <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">التنظيف قد يستغرق وقتاً. يمكنك إيقافه في أي وقت.</p>
        </div>

        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          بدء التنظيف
        </button>
      </div>
    );
  }

  if (type === 'emergency') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-red-600">الاستجابة للطوارئ</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-red-50 rounded-xl mb-6 flex items-start gap-3">
          <AlertTriangle size={24} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">هذه الإجراءات للطوارئ فقط. استخدمها بحذر.</p>
        </div>

        <div className="space-y-3">
          <button className="w-full p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-right">
            <div className="flex items-center gap-3">
              <XCircle size={20} className="text-red-600" />
              <div>
                <p className="font-medium text-red-700">إيقاف جميع العمليات الآن</p>
                <p className="text-sm text-red-500">يوقف كل العمليات الجارية فوراً</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors text-right">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-orange-600" />
              <div>
                <p className="font-medium text-orange-700">قفل النظام</p>
                <p className="text-sm text-orange-500">إيقاف + حفظ + منع عمليات جديدة</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors text-right">
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-amber-600" />
              <div>
                <p className="font-medium text-amber-700">حذف طارئ للجلسات الحساسة</p>
                <p className="text-sm text-amber-500">للاستخدام عند الخطر فقط</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-right">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-blue-600" />
              <div>
                <p className="font-medium text-blue-700">إرسال تنبيه طارئ</p>
                <p className="text-sm text-blue-500">إرسال رسالة تنبيه لحساب الإشعارات</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-right">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-700">إعادة تشغيل النظام</p>
                <p className="text-sm text-gray-500">إعادة تشغيل الخدمة أو السيرفر</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (type === 'settings') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">إعدادات تنبيهات الأمان</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { label: 'تنبيه فوري عند حظر أي حساب', checked: true },
            { label: 'تنبيه عند تقييد حساب', checked: true },
            { label: 'تنبيه عند FloodWait متكرر (>5)', checked: true },
            { label: 'تنبيه عند نشاط مشبوه في الجلسات', checked: false },
            { label: 'تنبيه عند موت بروكسي حساب نشط', checked: true },
            { label: 'تنبيه عند فشل اتصال حساب', checked: true },
            { label: 'تقرير أمان يومي', checked: true },
            { label: 'تقرير أمان أسبوعي', checked: false },
          ].map((setting, index) => (
            <label key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">{setting.label}</span>
              <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            </label>
          ))}
        </div>

        <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          حفظ إعدادات التنبيهات
        </button>
      </div>
    );
  }

  return null;
}
