export type AccountStatus = 'active' | 'banned' | 'restricted' | 'pending';
export type AccountCategory = 'primary' | 'backup' | 'scraper' | 'adder' | 'multi';
export type ProxyStatus = 'active' | 'dead' | 'slow';
export type ProxyType = 'SOCKS5' | 'SOCKS4' | 'HTTP' | 'MTProto';

export interface Account {
  id: string;
  phone: string;
  name: string;
  username: string;
  status: AccountStatus;
  category: AccountCategory;
  healthScore: number;
  proxyId?: string;
  group?: string;
  lastUsed: string;
  createdAt: string;
  deviceModel: string;
  os: string;
  dc: string;
  stats: {
    totalScraped: number;
    totalAdded: number;
    totalMessages: number;
    todayScraped: number;
    todayAdded: number;
    todayMessages: number;
    floodWaits: number;
    groupsJoined: number;
  };
}

export interface Proxy {
  id: string;
  ip: string;
  port: number;
  type: ProxyType;
  username?: string;
  password?: string;
  status: ProxyStatus;
  speed: number;
  location: string;
  linkedAccountId?: string;
  group?: string;
  lastChecked: string;
  createdAt: string;
  usageCount: number;
  successRate: number;
}

export type MenuItem = 'dashboard' | 'accounts' | 'scraper' | 'adder' | 'rotation' | 'proxy' | 'messaging' | 'campaigns' | 'reports' | 'security' | 'settings' | 'logout';