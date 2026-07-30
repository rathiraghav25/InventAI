import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { Header } from './Header';

interface AppLayoutProps {
  currentUser: {
        id: number;
        username: string;
        email: string;
    } | null;
    
  onLogout: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ currentUser, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar />
      <div className="main-content">
        <Header
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentUser={currentUser}
          onLogout={onLogout}
        />
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
