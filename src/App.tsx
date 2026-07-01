import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import AccountManager from './components/pages/AccountManager';
import MemberScraper from './components/pages/MemberScraper';
import MemberAdder from './components/pages/MemberAdder';
import RotationSystem from './components/pages/RotationSystem';
import ProxyManager from './components/pages/ProxyManager';
import MassMessaging from './components/pages/MassMessaging';
import GroupCampaigns from './components/pages/GroupCampaigns';
import Reports from './components/pages/Reports';
import SecurityTools from './components/pages/SecurityTools';
import Settings from './components/pages/Settings';
import { MenuItem } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<MenuItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <AccountManager />;
      case 'scraper':
        return <MemberScraper />;
      case 'adder':
        return <MemberAdder />;
      case 'rotation':
        return <RotationSystem />;
      case 'proxy':
        return <ProxyManager />;
      case 'messaging':
        return <MassMessaging />;
      case 'campaigns':
        return <GroupCampaigns />;
      case 'reports':
        return <Reports />;
      case 'security':
        return <SecurityTools />;
      case 'settings':
        return <Settings />;
      case 'logout':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'mr-16' : 'mr-64'}`}>
        <Header
          currentPage={currentPage}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;