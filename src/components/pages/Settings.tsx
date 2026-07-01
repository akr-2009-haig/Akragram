import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Key,
  Sliders,
  Folder,
  Bell,
  Shield,
  Globe,
  Database,
  FileText,
  Clock,
  Lock,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Trash2,
  RefreshCw,
  CheckCircle,
  X,
  Save,
  Eye,
  EyeOff,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

type SettingsSection = 'api' | 'limits' | 'storage' | 'notifications' | 'security' | 'language' | 'database' | 'logs' | 'schedule' | 'backup' | 'reset';

export default function Settings() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('api');
  const [showApiId, setShowApiId] = useState(false);
  const [showApiHash, setShowApiHash] = useState(false);

  const menuItems: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
    { id: 'api', label: 'API تيليجرام', icon: <Key size={18} /> },
    { id: 'limits', label: 'الحدود الافتراضية', icon: <Sliders size={18} /> },
    { id: 'storage', label: 'مسارات التخزين', icon: <Folder size={18} /> },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell size={18} /> },
    { id: 'security', label: 'الأمان والحماية', icon: <Shield size={18} /> },
    { id: 'language', label: 'اللغة والمظهر', icon: <Globe size={18} /> },
    { id: 'database', label: 'قاعدة البيانات', icon: <Database size={18} /> },
    { id: 'logs', label: 'التسجيل', icon: <FileText size={18} /> },
    { id: 'schedule', label: 'الجدولة التلقائية', icon: <Clock size={18} /> },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: <Download size={18} /> },
    { id: 'reset', label: 'إعادة الضبط', icon: <RotateCcw size={18} /> },
  ];

  const systemInfo = {
    version: 'v1.0.0',
    serverStatus: 'online',
    usedSpace: '2.5 GB',
    totalSpace: '10 GB',
    uptime: '15 يوم'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="space-y-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <SettingsIcon size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">الإصدار</p>
                <p className="font-bold text-gray-800">{systemInfo.version}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${systemInfo.serverStatus === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className="text-gray-600">السيرفر: {systemInfo.serverStatus === 'online' ? 'متصل' : 'غير متصل'}</span>
            </div>
            <p className="text-sm text-gray-500">المساحة: {systemInfo.usedSpace} / {systemInfo.totalSpace}</p>
            <p className="text-sm text-gray-500">وقت التشغيل: {systemInfo.uptime}</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={activeSection === item.id ? 'text-emerald-600' : ''}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {activeSection === 'api' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Key size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">إعدادات API تيليجرام</h3>
                  <p className="text-sm text-gray-500">بيانات التطبيق - تُضبط مرة واحدة</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API ID</label>
                  <div className="relative">
                    <input
                      type={showApiId ? 'text' : 'password'}
                      defaultValue="12345678"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiId(!showApiId)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiId ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Hash</label>
                  <div className="relative">
                    <input
                      type={showApiHash ? 'text' : 'password'}
                      defaultValue="a1b2c3d4e5f6g7h8i9j0"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiHash(!showApiHash)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiHash ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <RefreshCw size={16} />
                  اختبار صحة API
                </button>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800 font-medium mb-2">كيف تحصل على API؟</p>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>اذهب إلى my.telegram.org</li>
                    <li>سجّل دخول برقم هاتفك</li>
                    <li>اختر API Development Tools</li>
                    <li>أنشئ تطبيقاً جديداً</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'limits' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Sliders size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">الحدود الافتراضية</h3>
                  <p className="text-sm text-gray-500">تحديد حدود العمليات اليومية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حد الإضافة اليومي/حساب</label>
                  <input
                    type="number"
                    defaultValue={20}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">يُنصح: 20-30 للحسابات القديمة</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حد التجميع اليومي/حساب</label>
                  <input
                    type="number"
                    defaultValue={500}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حد رسائل DM اليومي/حساب</label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">يُنصح: لا تتجاوز 50</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التأخير الافتراضي (ثانية)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      defaultValue={60}
                      placeholder="من"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      defaultValue={120}
                      placeholder="إلى"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-800">الحدود الذكية</p>
                    <p className="text-sm text-gray-500">تحسب الحدود بناءً على عمر الحساب وصحته</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                </label>
              </div>
            </div>
          )}

          {activeSection === 'storage' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Folder size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">مسارات التخزين</h3>
                  <p className="text-sm text-gray-500">تخصيص مسارات حفظ الملفات</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'مجلد الجلسات', path: './sessions/', icon: <Key size={16} /> },
                  { label: 'مجلد الملفات المصدرة', path: './exports/', icon: <Folder size={16} /> },
                  { label: 'مجلد السجلات', path: './logs/', icon: <FileText size={16} /> },
                  { label: 'مجلد النسخ الاحتياطية', path: './backups/', icon: <Database size={16} /> },
                  { label: 'مجلد القوالب', path: './templates/', icon: <FileText size={16} /> },
                ].map((folder, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                      {folder.icon}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{folder.label}</label>
                      <input
                        type="text"
                        defaultValue={folder.path}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Bell size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">إعدادات الإشعارات</h3>
                  <p className="text-sm text-gray-500">تنبيهات الأحداث والأخطاء</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-3">إشعارات الحسابات</p>
                  <div className="space-y-2">
                    {[
                      'عند حظر أي حساب',
                      'عند تقييد أي حساب',
                      'عند استعادة حساب محظور',
                      'عند اكتمال التسخين',
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between cursor-pointer p-2">
                        <span className="text-sm text-gray-700">{item}</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-3">إشعارات الأخطاء</p>
                  <div className="space-y-2">
                    {[
                      'عند كل FloodWait',
                      'عند فشل أي عملية',
                      'عند خطأ حرج في النظام',
                      'عند موت بروكسي مرتبط بحساب',
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between cursor-pointer p-2">
                        <span className="text-sm text-gray-700">{item}</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-3">حساب/قناة الإشعارات</p>
                  <input
                    type="text"
                    placeholder="Telegram ID أو @username"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">الأمان والحماية</h3>
                  <p className="text-sm text-gray-500">إعدادات الأمان المتقدمة</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-3">الحدود الذكية</p>
                  <div className="space-y-2">
                    {[
                      'تقليل السرعة تلقائياً عند FloodWait',
                      'زيادة التأخير عند التقييد',
                      'إيقاف مؤقت عند تقييد أكثر من حساب',
                      'خفض حدود الحسابات الجديدة (<30 يوم)',
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between cursor-pointer p-2">
                        <span className="text-sm text-gray-700">{item}</span>
                        <input type="checkbox" defaultChecked={index < 2} className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-3">مستوى الأمان العام</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'محافظ', desc: 'أبطأ + أكثر أماناً', color: 'emerald' },
                      { label: 'متوازن', desc: 'موصى', color: 'amber' },
                      { label: 'عدواني', desc: 'أسرع + خطر', color: 'red' },
                    ].map((level, index) => (
                      <button
                        key={index}
                        className={`p-3 rounded-xl border text-center ${
                          index === 1
                            ? 'border-emerald-300 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-gray-800 text-sm">{level.label}</p>
                        <p className="text-xs text-gray-500">{level.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-800">تشفير الجلسات</p>
                    <p className="text-sm text-gray-500">تشفير ملفات .session</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                </label>
              </div>
            </div>
          )}

          {activeSection === 'language' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">اللغة والمظهر</h3>
                  <p className="text-sm text-gray-500">تخصيص الواجهة</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {[
                      { code: 'ar', name: 'العربية', flag: '\'ud83c\'uddf8\'ud83c\'uddf6' },
                      { code: 'en', name: 'English', flag: '\'ud83c\'uddec\'ud83c\'udde7' },
                      { code: 'tr', name: 'T\'fcrk\'e7e', flag: '\'ud83c\'uddf9\'ud83c\'uddf7' },
                      { code: 'ru', name: 'Русский', flag: '\'ud83c\'uddf7\'ud83c\'uddfa' },
                      { code: 'es', name: 'Espa\'f1ol', flag: '\'ud83c\'uddea\'ud83c\'uddf8' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        className={`p-3 rounded-xl border text-center ${
                          lang.code === 'ar'
                            ? 'border-emerald-300 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <p className="text-xs text-gray-600 mt-1">{lang.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Asia/Riyadh (UTC+3)</option>
                    <option>Asia/Dubai (UTC+4)</option>
                    <option>Europe/London (UTC+0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق الوقت</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-sm font-medium text-emerald-700">
                      24 ساعة
                    </button>
                    <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-600">
                      12 ساعة (AM/PM)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'database' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Database size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">قاعدة البيانات</h3>
                  <p className="text-sm text-gray-500">إدارة وتحسين قاعدة البيانات</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-800">الحجم الحالي</p>
                      <p className="text-sm text-gray-500">SQLite Database</p>
                    </div>
                    <span className="text-lg font-bold text-gray-800">25 MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center">
                    <RefreshCw size={20} className="mx-auto mb-2 text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">فحص السلامة</p>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center">
                    <Database size={20} className="mx-auto mb-2 text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">ضغط (VACUUM)</p>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center">
                    <FileText size={20} className="mx-auto mb-2 text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">تصدير SQL</p>
                  </button>
                  <button className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-center">
                    <Trash2 size={20} className="mx-auto mb-2 text-red-500" />
                    <p className="text-sm font-medium text-red-600">مسح السجلات</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'logs' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">التسجيل</h3>
                  <p className="text-sm text-gray-500">إعدادات نظام السجلات</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                  <span className="text-gray-700">تفعيل التسجيل التفصيلي</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مستوى التسجيل</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Error', 'Warning', 'Info', 'Debug'].map((level, index) => (
                      <button
                        key={level}
                        className={`p-3 rounded-xl border text-sm font-medium ${
                          index === 2
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حجم ملف السجل</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>10 MB</option>
                    <option selected>50 MB</option>
                    <option>100 MB</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    عرض السجل الحالي
                  </button>
                  <button className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <Trash2 size={18} />
                    مسح السجلات
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'schedule' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">الجدولة التلقائية</h3>
                  <p className="text-sm text-gray-500">مهام دورية تلقائية</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'تصفير العدادات اليومية تلقائياً', time: '00:00', checked: true },
                  { label: 'فحص الحسابات يومياً', time: '06:00', checked: true },
                  { label: 'فحص البروكسيهات تلقائياً', time: 'كل 12 ساعة', checked: true },
                  { label: 'نسخ احتياطي تلقائي', time: 'يومياً', checked: false },
                  { label: 'تنظيف الملفات القديمة تلقائياً', time: 'أقدم من 30 يوم', checked: true },
                ].map((task, index) => (
                  <label key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={task.checked} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-gray-700">{task.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">{task.time}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'backup' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Download size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">النسخ الاحتياطي</h3>
                  <p className="text-sm text-gray-500">حفظ واستعادة البيانات</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-800">آخر نسخة احتياطية</p>
                      <p className="text-sm text-gray-500">2024-01-15 14:30</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">منذ يومين</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors text-center border border-emerald-200">
                    <Download size={24} className="mx-auto mb-2 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-700">إنشاء نسخة احتياطية</p>
                    <p className="text-xs text-emerald-600 mt-1">حفظ كامل</p>
                  </button>
                  <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center border border-blue-200">
                    <Upload size={24} className="mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium text-blue-700">استعادة نسخة</p>
                    <p className="text-xs text-blue-600 mt-1">من ملف</p>
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-3">محتوى النسخة الاحتياطية</p>
                  <div className="space-y-2">
                    {[
                      { label: 'جلسات الحسابات', checked: true },
                      { label: 'إعدادات النظام', checked: true },
                      { label: 'قاعدة البيانات', checked: true },
                      { label: 'القوالب والرسائل', checked: true },
                      { label: 'سجلات العمليات', checked: false },
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between cursor-pointer p-2">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-700">النسخ الاحتياطي يحتوي على بيانات حساسة. احفظه في مكان آمن.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'reset' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <RotateCcw size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">إعادة الضبط</h3>
                  <p className="text-sm text-gray-500">إعادة النظام للحالة الافتراضية</p>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-xl mb-6 flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700 font-medium mb-1">تحذير: إجراءات غير قابلة للتراجع</p>
                  <p className="text-xs text-red-600">تأكد من إنشاء نسخة احتياطية قبل المتابعة.</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-right">
                  <p className="font-medium text-gray-800">إعادة ضبط الإعدادات</p>
                  <p className="text-sm text-gray-500">إعادة جميع الإعدادات للقيم الافتراضية</p>
                </button>

                <button className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-right">
                  <p className="font-medium text-gray-800">مسح سجلات العمليات</p>
                  <p className="text-sm text-gray-500">حذف جميع السجلات المحفوظة</p>
                </button>

                <button className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-right">
                  <p className="font-medium text-gray-800">مسح القوالب والرسائل</p>
                  <p className="text-sm text-gray-500">حذف جميع القوالب المحفوظة</p>
                </button>

                <button className="w-full p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors text-right">
                  <p className="font-medium text-orange-700">مسح جميع البيانات</p>
                  <p className="text-sm text-orange-600">حذف كامل للبيانات مع الاحتفاظ بالجلسات</p>
                </button>

                <button className="w-full p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-right">
                  <p className="font-medium text-red-700">إعادة ضبط المصنع</p>
                  <p className="text-sm text-red-600">حذف كل شيء وإعادة النظام من الصفر</p>
                </button>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              إعادة الافتراضية
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
              <Save size={18} />
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
