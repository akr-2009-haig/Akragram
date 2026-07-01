import { useState } from 'react';
import { mockProxies, mockAccounts } from '../../data/mockData';
import { Proxy, ProxyStatus, ProxyType } from '../../types';
import {
  Globe,
  Plus,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Link,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Download,
  MoreVertical,
  X,
  Timer,
  Settings,
  ChevronDown
} from 'lucide-react';

type ModalType = 'add' | 'import' | 'details' | 'test' | 'settings' | null;

const statusLabels: Record<ProxyStatus, string> = {
  active: 'نشط',
  dead: 'ميت',
  slow: 'بطيء'
};

const statusColors: Record<ProxyStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  dead: 'bg-red-50 text-red-700',
  slow: 'bg-amber-50 text-amber-700'
};

const typeLabels: Record<ProxyType, string> = {
  SOCKS5: 'SOCKS5',
  SOCKS4: 'SOCKS4',
  HTTP: 'HTTP',
  MTProto: 'MTProto'
};

export default function ProxyManager() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedProxy, setSelectedProxy] = useState<Proxy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProxyStatus | null>(null);

  const filteredProxies = mockProxies.filter(proxy => {
    const matchesSearch = proxy.ip.includes(searchQuery) || proxy.location.includes(searchQuery);
    const matchesStatus = !statusFilter || proxy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    active: mockProxies.filter(p => p.status === 'active').length,
    dead: mockProxies.filter(p => p.status === 'dead').length,
    slow: mockProxies.filter(p => p.status === 'slow').length,
    linked: mockProxies.filter(p => p.linkedAccountId).length,
    avgSpeed: Math.round(mockProxies.filter(p => p.status === 'active').reduce((acc, p) => acc + p.speed, 0) / mockProxies.filter(p => p.status === 'active').length)
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-emerald-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
              <p className="text-sm text-gray-500">نشط</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.dead}</p>
              <p className="text-sm text-gray-500">ميت</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-amber-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.slow}</p>
              <p className="text-sm text-gray-500">بطيء</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Link size={24} className="text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.linked}</p>
              <p className="text-sm text-gray-500">مرتبط</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Activity size={24} className="text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.avgSpeed}ms</p>
              <p className="text-sm text-gray-500">متوسط السرعة</p>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setModalType('add')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span className="font-medium">إضافة بروكسي</span>
              </button>
              <button
                onClick={() => setModalType('import')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Upload size={18} />
                <span className="font-medium">استيراد</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <RefreshCw size={18} />
                <span className="font-medium">فحص الجميع</span>
              </button>
              <button
                onClick={() => setModalType('settings')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Settings size={18} />
                <span className="font-medium">الإعدادات</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setStatusFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === null ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              الكل
            </button>
            {(['active', 'dead', 'slow'] as ProxyStatus[]).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status ? statusColors[status] : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-right text-sm font-medium text-gray-600">#</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">IP:PORT</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">النوع</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الحالة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">السرعة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الموقع</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الحساب المرتبط</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">آخر فحص</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProxies.map((proxy, index) => (
                <tr
                  key={proxy.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedProxy(proxy);
                    setModalType('details');
                  }}
                >
                  <td className="p-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="p-4 text-sm font-mono text-gray-800">{proxy.ip}:{proxy.port}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                      {typeLabels[proxy.type]}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusColors[proxy.status]}`}>
                      {proxy.status === 'active' && <CheckCircle size={12} />}
                      {proxy.status === 'dead' && <XCircle size={12} />}
                      {proxy.status === 'slow' && <AlertTriangle size={12} />}
                      {statusLabels[proxy.status]}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {proxy.speed > 0 ? `${proxy.speed}ms` : '-'}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{proxy.location}</td>
                  <td className="p-4">
                    {proxy.linkedAccountId ? (
                      <span className="text-sm text-emerald-600">
                        {mockAccounts.find(a => a.id === proxy.linkedAccountId)?.phone || 'مرتبط'}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">غير مرتبط</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(proxy.lastChecked).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="اختبار">
                        <RefreshCw size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="ربط بحساب">
                        <Link size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="المزيد">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            {modalType === 'add' && <AddProxyModal onClose={() => setModalType(null)} />}
            {modalType === 'import' && <ImportProxyModal onClose={() => setModalType(null)} />}
            {modalType === 'settings' && <ProxySettingsModal onClose={() => setModalType(null)} />}
            {modalType === 'details' && selectedProxy && (
              <ProxyDetailsModal
                proxy={selectedProxy}
                onClose={() => {
                  setModalType(null);
                  setSelectedProxy(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AddProxyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">إضافة بروكسي</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IP</label>
            <input
              type="text"
              placeholder="192.168.1.1"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PORT</label>
            <input
              type="number"
              placeholder="1080"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
          <div className="grid grid-cols-4 gap-2">
            {(['SOCKS5', 'SOCKS4', 'HTTP', 'MTProto'] as ProxyType[]).map((type) => (
              <button
                key={type}
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-emerald-300 transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">المستخدم (اختياري)</label>
            <input
              type="text"
              placeholder="username"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور (اختياري)</label>
            <input
              type="password"
              placeholder="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          إضافة البروكسي
        </button>
      </div>
    </div>
  );
}

function ImportProxyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">استيراد بروكسيهات</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
          <Upload size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">من ملف</p>
          <p className="text-sm text-gray-500">TXT أو CSV</p>
        </button>
        <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
          <Globe size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">من رابط API</p>
          <p className="text-sm text-gray-500">استيراد مباشر</p>
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600 mb-2">صيغة البروكسي:</p>
        <code className="text-xs text-gray-500">IP:PORT أو IP:PORT:USER:PASS</code>
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

function ProxySettingsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">إعدادات البروكسي</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timeout الاتصال (ثواني)</label>
          <input
            type="number"
            defaultValue={10}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">عدد محاولات إعادة الاتصال</label>
          <input
            type="number"
            defaultValue={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
          <span className="text-gray-700">تفعيل DNS عبر البروكسي</span>
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
        </label>
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
          <span className="text-gray-700">فحص تلقائي دوري</span>
          <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
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

function ProxyDetailsModal({ proxy, onClose }: { proxy: Proxy; onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">تفاصيل البروكسي</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">IP:PORT</p>
              <p className="font-medium text-gray-800 font-mono">{proxy.ip}:{proxy.port}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">النوع</p>
              <p className="font-medium text-gray-800">{typeLabels[proxy.type]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">الحالة</p>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusColors[proxy.status]}`}>
                {statusLabels[proxy.status]}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">السرعة</p>
              <p className="font-medium text-gray-800">{proxy.speed}ms</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">الموقع</p>
              <p className="font-medium text-gray-800">{proxy.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">معدل النجاح</p>
              <p className="font-medium text-gray-800">{proxy.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors">
            <RefreshCw size={16} />
            اختبار الآن
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors">
            <Link size={16} />
            تغيير الحساب
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl text-red-600 hover:bg-red-100 transition-colors">
            <Trash2 size={16} />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
