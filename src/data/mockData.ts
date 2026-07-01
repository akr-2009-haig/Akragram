import { Account, Proxy, ScraperSession, AdderSession, MessageCampaign, GroupCampaign, ActivityLog, AccountGroup, BlacklistEntry } from '../types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    phone: '+966501234567',
    name: 'أحمد محمد',
    username: 'ahmed_mohammed',
    status: 'active',
    category: 'primary',
    healthScore: 95,
    proxyId: '1',
    group: 'المجموعة الرئيسية',
    lastUsed: '2024-01-15T10:30:00',
    createdAt: '2023-06-15',
    deviceModel: 'Samsung Galaxy S21',
    os: 'Android 12',
    dc: 'DC2',
    stats: {
      totalScraped: 15420,
      totalAdded: 3420,
      totalMessages: 12500,
      todayScraped: 450,
      todayAdded: 25,
      todayMessages: 35,
      floodWaits: 2,
      groupsJoined: 45
    }
  },
  {
    id: '2',
    phone: '+966507654321',
    name: 'محمد علي',
    username: 'mohammed_ali',
    status: 'active',
    category: 'backup',
    healthScore: 88,
    proxyId: '2',
    group: 'المجموعة الرئيسية',
    lastUsed: '2024-01-15T09:15:00',
    createdAt: '2023-08-20',
    deviceModel: 'iPhone 13 Pro',
    os: 'iOS 16',
    dc: 'DC1',
    stats: {
      totalScraped: 8500,
      totalAdded: 2100,
      totalMessages: 6200,
      todayScraped: 320,
      todayAdded: 18,
      todayMessages: 28,
      floodWaits: 5,
      groupsJoined: 32
    }
  },
  {
    id: '3',
    phone: '+966552345678',
    name: 'عبدالله سعد',
    username: 'abdullah_saad',
    status: 'restricted',
    category: 'scraper',
    healthScore: 65,
    proxyId: '3',
    group: 'مجموعة التجميع',
    lastUsed: '2024-01-14T18:45:00',
    createdAt: '2023-10-05',
    deviceModel: 'Xiaomi Redmi Note 11',
    os: 'Android 11',
    dc: 'DC4',
    stats: {
      totalScraped: 5200,
      totalAdded: 0,
      totalMessages: 0,
      todayScraped: 0,
      todayAdded: 0,
      todayMessages: 0,
      floodWaits: 12,
      groupsJoined: 18
    }
  },
  {
    id: '4',
    phone: '+966563456789',
    name: 'فهد ناصر',
    username: 'fahad_nasser',
    status: 'banned',
    category: 'adder',
    healthScore: 0,
    proxyId: undefined,
    group: 'مجموعة الإضافة',
    lastUsed: '2024-01-10T14:20:00',
    createdAt: '2023-11-12',
    deviceModel: 'Huawei P40',
    os: 'Android 10',
    dc: 'DC3',
    stats: {
      totalScraped: 0,
      totalAdded: 850,
      totalMessages: 0,
      todayScraped: 0,
      todayAdded: 0,
      todayMessages: 0,
      floodWaits: 25,
      groupsJoined: 15
    }
  },
  {
    id: '5',
    phone: '+966584567890',
    name: 'خالد عبدالرحمن',
    username: 'khaled_abdulrahman',
    status: 'active',
    category: 'multi',
    healthScore: 92,
    proxyId: '4',
    group: 'المجموعة الرئيسية',
    lastUsed: '2024-01-15T11:00:00',
    createdAt: '2023-05-01',
    deviceModel: 'Google Pixel 6',
    os: 'Android 13',
    dc: 'DC5',
    stats: {
      totalScraped: 12000,
      totalAdded: 2800,
      totalMessages: 8500,
      todayScraped: 380,
      todayAdded: 22,
      todayMessages: 30,
      floodWaits: 3,
      groupsJoined: 52
    }
  },
  {
    id: '6',
    phone: '+966596789012',
    name: 'سعود محمد',
    username: 'saud_mohammed',
    status: 'pending',
    category: 'primary',
    healthScore: 78,
    proxyId: undefined,
    group: undefined,
    lastUsed: '2024-01-15T08:00:00',
    createdAt: '2024-01-14',
    deviceModel: 'OnePlus 9',
    os: 'Android 12',
    dc: 'DC2',
    stats: {
      totalScraped: 0,
      totalAdded: 0,
      totalMessages: 0,
      todayScraped: 0,
      todayAdded: 0,
      todayMessages: 0,
      floodWaits: 0,
      groupsJoined: 0
    }
  }
];

export const mockProxies: Proxy[] = [
  {
    id: '1',
    ip: '192.168.1.100',
    port: 1080,
    type: 'SOCKS5',
    username: 'user1',
    password: 'pass123',
    status: 'active',
    speed: 45,
    location: 'السعودية',
    linkedAccountId: '1',
    group: 'مجموعة البروكسي الرئيسية',
    lastChecked: '2024-01-15T10:00:00',
    createdAt: '2023-06-15',
    usageCount: 1250,
    successRate: 98
  },
  {
    id: '2',
    ip: '10.0.0.50',
    port: 9050,
    type: 'SOCKS5',
    username: 'user2',
    password: 'pass456',
    status: 'active',
    speed: 78,
    location: 'الإمارات',
    linkedAccountId: '2',
    group: 'مجموعة البروكسي الرئيسية',
    lastChecked: '2024-01-15T09:30:00',
    createdAt: '2023-07-20',
    usageCount: 850,
    successRate: 95
  },
  {
    id: '3',
    ip: '172.16.0.25',
    port: 8080,
    type: 'HTTP',
    username: 'user3',
    password: 'pass789',
    status: 'slow',
    speed: 250,
    location: 'مصر',
    linkedAccountId: '3',
    group: 'مجموعة البروكسي الاحتياطية',
    lastChecked: '2024-01-15T08:45:00',
    createdAt: '2023-09-10',
    usageCount: 420,
    successRate: 75
  },
  {
    id: '4',
    ip: '203.0.113.15',
    port: 443,
    type: 'MTProto',
    username: undefined,
    password: undefined,
    status: 'active',
    speed: 35,
    location: 'ألمانيا',
    linkedAccountId: '5',
    group: 'مجموعة البروكسي الرئيسية',
    lastChecked: '2024-01-15T11:00:00',
    createdAt: '2023-05-01',
    usageCount: 2100,
    successRate: 99
  },
  {
    id: '5',
    ip: '198.51.100.200',
    port: 1080,
    type: 'SOCKS4',
    username: undefined,
    password: undefined,
    status: 'dead',
    speed: 0,
    location: 'الولايات المتحدة',
    linkedAccountId: undefined,
    group: undefined,
    lastChecked: '2024-01-14T15:30:00',
    createdAt: '2023-11-05',
    usageCount: 150,
    successRate: 45
  },
  {
    id: '6',
    ip: '185.199.108.133',
    port: 9050,
    type: 'SOCKS5',
    username: 'user6',
    password: 'pass000',
    status: 'active',
    speed: 55,
    location: 'هولندا',
    linkedAccountId: undefined,
    group: 'مجموعة البروكسي الاحتياطية',
    lastChecked: '2024-01-15T07:00:00',
    createdAt: '2024-01-10',
    usageCount: 85,
    successRate: 97
  }
];

export const mockScraperSessions: ScraperSession[] = [
  {
    id: '1',
    targetGroup: 'مجموعة التسويق الرقمي',
    targetLink: 'https://t.me/marketing_group',
    membersCount: 15340,
    scrapedCount: 9971,
    status: 'running',
    accountId: '1',
    filters: ['استبعاد البوتات', 'بدون @username', 'صورة شخصية فقط'],
    createdAt: '2024-01-15T08:00:00',
    progress: 65
  },
  {
    id: '2',
    targetGroup: 'قناة التقنية العربية',
    targetLink: 'https://t.me/tech_arabic',
    membersCount: 8500,
    scrapedCount: 8500,
    status: 'completed',
    accountId: '2',
    filters: ['النشطون فقط', 'آخر 7 أيام'],
    createdAt: '2024-01-14T14:30:00',
    progress: 100
  },
  {
    id: '3',
    targetGroup: 'مجموعة التجارة الإلكترونية',
    targetLink: 'https://t.me/ecommerce_sa',
    membersCount: 25000,
    scrapedCount: 12500,
    status: 'paused',
    accountId: '3',
    filters: ['حسابات عربية فقط'],
    createdAt: '2024-01-13T10:15:00',
    progress: 50
  }
];

export const mockAdderSessions: AdderSession[] = [
  {
    id: '1',
    sourceFile: 'members_marketing.csv',
    targetGroup: 'https://t.me/my_group',
    totalMembers: 5000,
    addedCount: 2340,
    skippedCount: 156,
    status: 'running',
    accountId: '1',
    createdAt: '2024-01-15T09:00:00',
    progress: 47
  },
  {
    id: '2',
    sourceFile: 'tech_members.csv',
    targetGroup: 'https://t.me/new_project',
    totalMembers: 3200,
    addedCount: 3200,
    skippedCount: 180,
    status: 'completed',
    accountId: '2',
    createdAt: '2024-01-14T16:00:00',
    progress: 100
  }
];

export const mockMessageCampaigns: MessageCampaign[] = [
  {
    id: '1',
    name: 'حملة ترحيب العملاء',
    message: 'مرحباً! نرحب بكم في مجموعتنا الجديدة...',
    targetsCount: 1000,
    sentCount: 450,
    status: 'running',
    accounts: ['1', '2'],
    createdAt: '2024-01-15T10:00:00',
    progress: 45
  },
  {
    id: '2',
    name: 'حملة ترويج المنتج',
    message: 'عرض خاص لفترة محدودة...',
    targetsCount: 5000,
    sentCount: 5000,
    status: 'completed',
    accounts: ['1', '5'],
    createdAt: '2024-01-10T12:00:00',
    progress: 100
  }
];

export const mockGroupCampaigns: GroupCampaign[] = [
  {
    id: '1',
    name: 'حملة النشر اليومي',
    groupId: 'my_channel',
    message: 'محتوى يومي جديد...',
    scheduledTime: '2024-01-16T18:00:00',
    status: 'scheduled',
    accountIds: ['1', '5'],
    createdAt: '2024-01-15T11:00:00'
  },
  {
    id: '2',
    name: 'حملة الإعلانات',
    groupId: 'ads_channel',
    message: 'إعلان مميز...',
    status: 'completed',
    accountIds: ['2'],
    createdAt: '2024-01-12T09:00:00'
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    accountId: '1',
    accountName: 'أحمد محمد',
    type: 'scrape',
    details: 'تجميع من مجموعة: marketing_group',
    result: 'تم تجميع 450 عضو',
    timestamp: '2024-01-15T10:30:00'
  },
  {
    id: '2',
    accountId: '1',
    accountName: 'أحمد محمد',
    type: 'add',
    details: 'إضافة لمجموعة: my_group',
    result: 'تمت إضافة 25 عضو',
    timestamp: '2024-01-15T11:00:00'
  },
  {
    id: '3',
    accountId: '3',
    accountName: 'عبدالله سعد',
    type: 'warning',
    details: 'FloodWait لمدة 5 دقائق',
    result: 'تبديل إلى حساب بديل',
    timestamp: '2024-01-14T18:45:00'
  },
  {
    id: '4',
    accountId: '4',
    accountName: 'فهد ناصر',
    type: 'error',
    details: 'محاولة إضافة عضو',
    result: 'الحساب محظور',
    timestamp: '2024-01-10T14:20:00'
  },
  {
    id: '5',
    accountId: '2',
    accountName: 'محمد علي',
    type: 'message',
    details: 'إرسال رسالة جماعية',
    result: 'تم إرسال 35 رسالة',
    timestamp: '2024-01-15T09:15:00'
  }
];

export const mockAccountGroups: AccountGroup[] = [
  {
    id: '1',
    name: 'المجموعة الرئيسية',
    description: 'الحسابات الرئيسية للعمليات اليومية',
    purpose: 'multi',
    accountsCount: 3,
    activeCount: 3
  },
  {
    id: '2',
    name: 'مجموعة التجميع',
    description: 'مخصصة لتجميع الأعضاء فقط',
    purpose: 'scraping',
    accountsCount: 2,
    activeCount: 1
  },
  {
    id: '3',
    name: 'مجموعة الإضافة',
    description: 'مخصصة لإضافة الأعضاء',
    purpose: 'adding',
    accountsCount: 1,
    activeCount: 0
  },
  {
    id: '4',
    name: 'مجموعة الرسائل',
    description: 'مخصصة للرسائل الجماعية',
    purpose: 'messaging',
    accountsCount: 2,
    activeCount: 2
  }
];

export const mockBlacklist: BlacklistEntry[] = [
  {
    id: '1',
    username: 'spammer_bot',
    reason: 'حساب بروباغاندا',
    addedAt: '2024-01-10'
  },
  {
    id: '2',
    username: 'fake_user123',
    reason: 'حساب وهمي',
    addedAt: '2024-01-12'
  },
  {
    id: '3',
    username: 'deleted_acc',
    reason: 'حساب محذوف',
    addedAt: '2024-01-14'
  }
];
