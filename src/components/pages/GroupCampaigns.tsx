import { useState } from 'react';
import { mockGroupCampaigns, mockAccounts } from '../../data/mockData';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Square,
  Clock,
  CheckCircle,
  Calendar,
  Settings,
  Users,
  Send,
  X,
  ChevronDown,
  Filter
} from 'lucide-react';

type ModalType = 'new' | 'schedule' | 'settings' | null;

export default function GroupCampaigns() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const stats = {
    totalCampaigns: mockGroupCampaigns.length,
    scheduled: mockGroupCampaigns.filter(c => c.status === 'scheduled').length,
    completed: mockGroupCampaigns.filter(c => c.status === 'completed').length,
    groupsManaged: 5
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">إجمالي الحملات</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalCampaigns}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">مجدولة</p>
          <p className="text-2xl font-bold text-amber-600">{stats.scheduled}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">مكتملة</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">القروبات المُدارة</p>
          <p className="text-2xl font-bold text-blue-600">{stats.groupsManaged}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">حملة جديدة</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الحملة</label>
            <input
              type="text"
              placeholder="مثال: حملة النشر اليومي"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">القروب/القناة الهدف</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                <option>اختر القروب...</option>
                <option>@my_channel</option>
                <option>@marketing_group</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نص المنشور</label>
            <textarea
              rows={4}
              placeholder="اكتب محتوى المنشور..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وقت النشر</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحسابات</label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                  <option>تدوير بين الحسابات</option>
                  <option>حساب واحد</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              <Send size={18} />
              نشر الآن
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">الحملات</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              <Filter size={16} />
              فلتر
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
          {mockGroupCampaigns.map((campaign) => (
            <div key={campaign.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaign.status === 'scheduled' ? 'bg-amber-50' :
                    campaign.status === 'completed' ? 'bg-emerald-50' :
                    'bg-gray-50'
                  }`}>
                    {campaign.status === 'scheduled' ? <Clock size={18} className="text-amber-600" /> :
                     campaign.status === 'completed' ? <CheckCircle size={18} className="text-emerald-600" /> :
                     <Megaphone size={18} className="text-gray-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{campaign.name}</p>
                    <p className="text-sm text-gray-500">{campaign.groupId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {campaign.scheduledTime && (
                    <span className="text-sm text-gray-500">
                      {new Date(campaign.scheduledTime).toLocaleString('ar-SA')}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    campaign.status === 'scheduled' ? 'bg-amber-50 text-amber-700' :
                    campaign.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    {campaign.status === 'scheduled' ? 'مجدولة' :
                     campaign.status === 'completed' ? 'مكتملة' : 'معلقة'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <CampaignModalContent type={modalType} onClose={() => setModalType(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignModalContent({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (type === 'schedule') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">جدولة الحملة</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوقت</label>
            <input
              type="time"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
            <span className="text-sm text-gray-700">تكرار يومي</span>
          </label>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          تأكيد الجدولة
        </button>
      </div>
    );
  }

  if (type === 'settings') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">إعدادات الحملات</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حد المنشورات اليومي</label>
            <input
              type="number"
              defaultValue={25}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
            <span className="text-gray-700">إشعار عند النشر</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          </label>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
            <span className="text-gray-700">حذف تلقائي بعد النشر</span>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          </label>
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

  return null;
}
