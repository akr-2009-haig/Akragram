import { useState } from 'react';
import { mockAccounts, mockAccountGroups } from '../../data/mockData';
import { Account, AccountCategory, AccountStatus } from '../../types';
import {
  Plus,
  Upload,
  Search,
  Filter,
  Trash2,
  Flame,
  RefreshCw,
  Globe,
  Tag,
  Users,
  MoreVertical,
  X,
  Phone,
  Shield,
  Activity,
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
} from 'lucide-react';

type ModalType = 'add' | 'import' | 'details' | 'verify' | 'warmup' | 'groups' | null;

const categoryLabels: Record<AccountCategory, string> = {
  primary: 'رئيسي',
  backup: 'احتياطي',
  scraper: 'تجميع',
  adder: 'إضافة',
  multi: 'متعدد'
};

const categoryColors: Record<AccountCategory, string> = {
  primary: 'bg-red-50 text-red-700 border-red-200',
  backup: 'bg-amber-50 text-amber-700 border-amber-200',
  scraper: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  adder: 'bg-blue-50 text-blue-700 border-blue-200',
  multi: 'bg-gray-50 text-gray-700 border-gray-200'
};

const statusLabels: Record<AccountStatus, string> = {
  active: 'نشط',
  banned: 'محظور',
  restricted: 'مقيد',
  pending: 'في الانتظار'
};

const statusColors: Record<AccountStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  banned: 'bg-red-50 text-red-700',
  restricted: 'bg-amber-50 text-amber-700',
  pending: 'bg-gray-50 text-gray-700'
};

export default function AccountManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AccountStatus | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<AccountCategory | null>(null);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.phone.includes(searchQuery) ||
      account.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || account.status === statusFilter;
    const matchesCategory = !categoryFilter || account.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    active: mockAccounts.filter(a => a.status === 'active').length,
    banned: mockAccounts.filter(a => a.status === 'banned').length,
    restricted: mockAccounts.filter(a => a.status === 'restricted').length,
    total: mockAccounts.length,
    avgHealth: Math.round(mockAccounts.reduce((acc, a) => acc + a.healthScore, 0) / mockAccounts.length)
  };

  const toggleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(filteredAccounts.map(a => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedAccounts.includes(id)) {
      setSelectedAccounts(selectedAccounts.filter(a => a !== id));
    } else {
      setSelectedAccounts([...selectedAccounts, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
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
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-red-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.banned}</p>
              <p className="text-sm text-gray-500">محظور</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-amber-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-amber-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.restricted}</p>
              <p className="text-sm text-gray-500">مقيد</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-gray-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-500">إجمالي</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Activity size={24} className="text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stats.avgHealth}%</p>
              <p className="text-sm text-gray-500">صحة الأسطول</p>
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
                <span className="font-medium">إضافة حساب جديد</span>
              </button>
              <button
                onClick={() => setModalType('import')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Upload size={18} />
                <span className="font-medium">استيراد جلسات</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <Flame size={18} />
                <span className="font-medium">تسخين</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <RefreshCw size={18} />
                <span className="font-medium">تحقق من الجميع</span>
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
            {(['active', 'banned', 'restricted'] as AccountStatus[]).map(status => (
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
                <th className="p-4 text-right">
                  <input
                    type="checkbox"
                    checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">#</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الهاتف</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الاسم</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">التصنيف</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الصحة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">الحالة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">البروكسي</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">المجموعة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">آخر استخدام</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account, index) => (
                <tr
                  key={account.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedAccount(account);
                    setModalType('details');
                  }}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedAccounts.includes(account.id)}
                      onChange={() => toggleSelect(account.id)}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="p-4 text-sm font-mono text-gray-800">{account.phone}</td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{account.name}</p>
                      <p className="text-xs text-gray-500">@{account.username}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium border ${categoryColors[account.category]}`}>
                      {categoryLabels[account.category]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            account.healthScore >= 90 ? 'bg-emerald-500' :
                            account.healthScore >= 70 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${account.healthScore}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${
                        account.healthScore >= 90 ? 'text-emerald-600' :
                        account.healthScore >= 70 ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {account.healthScore}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusColors[account.status]}`}>
                      {account.status === 'active' && <CheckCircle size={12} />}
                      {account.status === 'banned' && <XCircle size={12} />}
                      {account.status === 'restricted' && <AlertTriangle size={12} />}
                      {account.status === 'pending' && <Clock size={12} />}
                      {statusLabels[account.status]}
                    </span>
                  </td>
                  <td className="p-4">
                    {account.proxyId ? (
                      <span className="flex items-center gap-1 text-sm text-emerald-600">
                        <Globe size={14} />
                        مرتبط
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">غير مرتبط</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{account.group || '-'}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(account.lastUsed).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="تسخين">
                        <Flame size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="تعيين بروكسي">
                        <Globe size={16} />
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

        {selectedAccounts.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              تم تحديد {selectedAccounts.length} حساب
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors">
                <Trash2 size={16} />
                حذف
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-sm hover:bg-amber-100 transition-colors">
                <Flame size={16} />
                تسخين
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                <Globe size={16} />
                تعيين بروكسي
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                <Tag size={16} />
                تغيير التصنيف
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                <Users size={16} />
                نقل لمجموعة
              </button>
            </div>
          </div>
        )}
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            {modalType === 'add' && (
              <AddAccountModal onClose={() => setModalType(null)} />
            )}
            {modalType === 'import' && (
              <ImportSessionModal onClose={() => setModalType(null)} />
            )}
            {modalType === 'details' && selectedAccount && (
              <AccountDetailsModal
                account={selectedAccount}
                onClose={() => {
                  setModalType(null);
                  setSelectedAccount(null);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AddAccountModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [twoFA, setTwoFA] = useState('');
  const [category, setCategory] = useState<AccountCategory>('primary');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">إضافة حساب جديد</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full ${s <= step ? 'bg-emerald-500' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+9665..."
                className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            إرسال OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">اختر طريقة استلام OTP:</p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors">
              <Phone size={20} className="mx-auto mb-2" />
              <span className="text-sm">التطبيق</span>
            </button>
            <button className="flex-1 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors">
              <Shield size={20} className="mx-auto mb-2" />
              <span className="text-sm">SMS</span>
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="12345"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة مرور 2FA (إن وجدت)</label>
            <input
              type="password"
              value={twoFA}
              onChange={(e) => setTwoFA(e.target.value)}
              placeholder="اختياري"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => setStep(3)}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            تسجيل الدخول
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
            <CheckCircle size={24} />
            <span>تم تسجيل الدخول بنجاح!</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تصنيف الحساب</label>
            <div className="grid grid-cols-3 gap-2">
              {(['primary', 'backup', 'scraper', 'adder', 'multi'] as AccountCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                    category === cat ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">إضافة لمجموعة</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>بدون مجموعة</option>
              {mockAccountGroups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              تعيين بروكسي الآن
            </button>
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              بدء التسخين فوراً
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            إضافة حساب آخر
          </button>
        </div>
      )}
    </div>
  );
}

function ImportSessionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">استيراد الجلسات</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
          <Upload size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">من مجلد</p>
          <p className="text-sm text-gray-500">جميع ملفات .session</p>
        </button>
        <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
          <FileText size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">ملف واحد</p>
          <p className="text-sm text-gray-500">ملف .session</p>
        </button>
        <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
          <FileText size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">ملف نصي</p>
          <p className="text-sm text-gray-500">أرقام + جلسات</p>
        </button>
        <button className="p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors text-center">
          <Download size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">String Session</p>
          <p className="text-sm text-gray-500">جلسة نصية</p>
        </button>
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

function AccountDetailsModal({ account, onClose }: { account: Account; onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">تفاصيل الحساب</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{account.name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-800">{account.name}</h4>
            <p className="text-gray-500">@{account.username}</p>
            <p className="text-sm text-gray-500">{account.phone}</p>
          </div>
          <div className="mr-auto">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${statusColors[account.status]}`}>
              {statusLabels[account.status]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">تاريخ الإنشاء</p>
            <p className="font-medium text-gray-800">{account.createdAt}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">التصنيف</p>
            <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium border ${categoryColors[account.category]}`}>
              {categoryLabels[account.category]}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">درجة الصحة</p>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    account.healthScore >= 90 ? 'bg-emerald-500' : account.healthScore >= 70 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${account.healthScore}%` }}
                />
              </div>
              <span className="font-medium">{account.healthScore}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">المجموعة</p>
            <p className="font-medium text-gray-800">{account.group || 'غير محدد'}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-medium text-gray-800 mb-3">إحصائيات الحساب</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-emerald-600">{account.stats.totalScraped.toLocaleString()}</p>
              <p className="text-sm text-gray-600">تجميع</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{account.stats.totalAdded.toLocaleString()}</p>
              <p className="text-sm text-gray-600">إضافة</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-600">{account.stats.totalMessages.toLocaleString()}</p>
              <p className="text-sm text-gray-600">رسائل</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors">
            <Flame size={16} />
            تسخين
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors">
            <Globe size={16} />
            تغيير البروكسي
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors">
            <RefreshCw size={16} />
            تحقق الآن
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors">
            <Download size={16} />
            تصدير الجلسة
          </button>
        </div>
      </div>
    </div>
  );
}
