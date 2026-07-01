import { mockAccounts, mockProxies, mockScraperSessions, mockAdderSessions, mockActivityLogs } from '../../data/mockData';
import {
  Users,
  Download,
  Upload,
  MessageSquare,
  Globe,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const activeAccounts = mockAccounts.filter(a => a.status === 'active').length;
  const bannedAccounts = mockAccounts.filter(a => a.status === 'banned').length;
  const restrictedAccounts = mockAccounts.filter(a => a.status === 'restricted').length;
  const totalAccounts = mockAccounts.length;

  const activeProxies = mockProxies.filter(p => p.status === 'active').length;
  const deadProxies = mockProxies.filter(p => p.status === 'dead').length;

  const runningSessions = mockScraperSessions.filter(s => s.status === 'running').length;
  const completedSessions = mockScraperSessions.filter(s => s.status === 'completed').length;

  const statsCards = [
    {
      title: 'الحسابات النشطة',
      value: activeAccounts,
      total: totalAccounts,
      icon: <Users size={24} />,
      color: 'emerald',
      trend: '+2',
      trendUp: true
    },
    {
      title: 'الحسابات المحظورة',
      value: bannedAccounts,
      total: totalAccounts,
      icon: <AlertTriangle size={24} />,
      color: 'red',
      trend: '-1',
      trendUp: false
    },
    {
      title: 'الحسابات المقيدة',
      value: restrictedAccounts,
      total: totalAccounts,
      icon: <Activity size={24} />,
      color: 'amber',
      trend: '0',
      trendUp: true
    },
    {
      title: 'البروكسيهات النشطة',
      value: activeProxies,
      total: mockProxies.length,
      icon: <Globe size={24} />,
      color: 'blue',
      trend: '+3',
      trendUp: true
    }
  ];

  const quickStats = [
    { label: 'تجميع اليوم', value: '1,150', icon: <Download size={18} />, color: 'text-emerald-600' },
    { label: 'إضافة اليوم', value: '65', icon: <Upload size={18} />, color: 'text-blue-600' },
    { label: 'رسائل اليوم', value: '93', icon: <MessageSquare size={18} />, color: 'text-purple-600' },
    { label: 'جلسات نشطة', value: runningSessions, icon: <Zap size={18} />, color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stat.value}
                  <span className="text-sm font-normal text-gray-400">/{stat.total}</span>
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                stat.color === 'red' ? 'bg-red-50 text-red-600' :
                stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.trendUp ? (
                <TrendingUp size={16} className="text-emerald-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`text-sm ${stat.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend} اليوم
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">إحصائيات سريعة</h3>
              <span className="text-sm text-gray-500">اليوم</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color} bg-opacity-10`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">الجلسات النشطة</h3>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                {runningSessions} نشطة
              </span>
            </div>
            <div className="space-y-4">
              {mockScraperSessions.filter(s => s.status === 'running').map((session) => (
                <div key={session.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Download size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{session.targetGroup}</p>
                        <p className="text-sm text-gray-500">{session.scrapedCount.toLocaleString()} / {session.membersCount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-emerald-600">{session.progress}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${session.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">صحة الأسطول</h3>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#10b981"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${85 * 4.4} ${100 * 4.4}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800">85%</p>
                  <p className="text-sm text-gray-500">صحة عامة</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">نشط</span>
                <span className="font-medium text-emerald-600">{activeAccounts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">محظور</span>
                <span className="font-medium text-red-600">{bannedAccounts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">مقيد</span>
                <span className="font-medium text-amber-600">{restrictedAccounts}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">آخر النشاطات</h3>
            <div className="space-y-3">
              {mockActivityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    log.type === 'error' ? 'bg-red-50 text-red-600' :
                    log.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                    log.type === 'scrape' ? 'bg-emerald-50 text-emerald-600' :
                    log.type === 'add' ? 'bg-blue-50 text-blue-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {log.type === 'error' ? <AlertTriangle size={14} /> :
                     log.type === 'warning' ? <AlertTriangle size={14} /> :
                     <CheckCircle size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{log.accountName}</p>
                    <p className="text-xs text-gray-500 truncate">{log.result}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(log.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
