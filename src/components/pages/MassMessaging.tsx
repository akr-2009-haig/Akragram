import { useState } from 'react';
import { mockMessageCampaigns, mockAccounts } from '../../data/mockData';
import {
  MessageSquare,
  Send,
  Users,
  FileText,
  Play,
  Pause,
  Square,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Settings,
  Plus,
  X,
  ChevronDown,
  Upload,
  Link
} from 'lucide-react';

type ModalType = 'new' | 'templates' | 'settings' | null;

export default function MassMessaging() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const stats = {
    todaySent: 93,
    weekSent: 650,
    totalSent: 12500,
    activeCampaigns: mockMessageCampaigns.filter(c => c.status === 'running').length,
    successRate: 98
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">رسائل اليوم</p>
          <p className="text-2xl font-bold text-gray-800">{stats.todaySent}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">الأسبوع</p>
          <p className="text-2xl font-bold text-gray-800">{stats.weekSent}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">إجمالي</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalSent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">حملات نشطة</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.activeCampaigns}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">معدل النجاح</p>
          <p className="text-2xl font-bold text-blue-600">{stats.successRate}%</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">حملة رسائل جديدة</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الحملة</label>
            <input
              type="text"
              placeholder="مثال: حملة ترحيب العملاء"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نص الرسالة</label>
            <textarea
              rows={4}
              placeholder="اكتب الرسالة هنا..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
              <Upload size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="font-medium text-gray-700">من ملف CSV</p>
              <p className="text-sm text-gray-500">رفع قائمة المستهدفين</p>
            </button>
            <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
              <Link size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="font-medium text-gray-700">من مجموعة</p>
              <p className="text-sm text-gray-500">تجميع ثم إرسال</p>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">الحسابات المستخدمة</label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                  <option>تدوير بين الحسابات</option>
                  <option>حساب واحد</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">التأخير (ثانية)</label>
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
          </div>

          <button
            onClick={() => setModalType('new')}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            بدء الحملة
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">الحملات الحالية</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setModalType('templates')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              <FileText size={16} />
              القوالب
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
          {mockMessageCampaigns.map((campaign) => (
            <div key={campaign.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaign.status === 'running' ? 'bg-emerald-50' :
                    campaign.status === 'completed' ? 'bg-blue-50' :
                    'bg-gray-50'
                  }`}>
                    {campaign.status === 'running' ? <Play size={18} className="text-emerald-600" /> :
                     campaign.status === 'completed' ? <CheckCircle size={18} className="text-blue-600" /> :
                     <MessageSquare size={18} className="text-gray-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{campaign.name}</p>
                    <p className="text-sm text-gray-500">
                      {campaign.sentCount.toLocaleString()} / {campaign.targetsCount.toLocaleString()} رسالة
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-lg font-bold ${
                    campaign.status === 'running' ? 'text-emerald-600' :
                    campaign.status === 'completed' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {campaign.progress}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    campaign.status === 'running' ? 'bg-emerald-500' :
                    campaign.status === 'completed' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{campaign.accounts.length} حسابات</span>
                <div className="flex items-center gap-2">
                  {campaign.status === 'running' && (
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Pause size={16} />
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

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <MessagingModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function MessagingModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (type === 'templates') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">قوالب الرسائل</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'رسالة ترحيب', text: 'مرحباً بك في قناتنا...' },
            { name: 'عرض خاص', text: 'لدينا عرض مميز لك...' },
            { name: 'تذكير', text: 'نود تذكيرك بـ...' },
          ].map((template, index) => (
            <button
              key={index}
              className="w-full p-4 bg-gray-50 rounded-xl text-right hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-800">{template.name}</p>
              <p className="text-sm text-gray-500 truncate">{template.text}</p>
            </button>
          ))}
        </div>

        <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
          <Plus size={18} />
          إنشاء قالب جديد
        </button>
      </div>
    );
  }

  if (type === 'settings') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">إعدادات الرسائل</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حد الرسائل اليومي/حساب</label>
            <input
              type="number"
              defaultValue={30}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التأخير الافتراضي (ثانية)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                defaultValue={60}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="number"
                defaultValue={120}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">تأكيد بدء الحملة</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-4">
        <p className="font-medium">الحملة جاهزة للبدء!</p>
        <p className="text-sm">سيتم إرسال الرسائل بناءً على الإعدادات المحددة</p>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
      >
        تأكيد البدء
      </button>
    </div>
  );
}
