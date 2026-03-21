import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className="main-content">
        <Header toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
