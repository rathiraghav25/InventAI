import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, FileText, Users, Bell, BarChart3, Bot, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

export const Sidebar: React.FC<{ isCollapsed?: boolean }> = ({ isCollapsed }) => {
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/invoices', label: 'Billing/Invoices', icon: FileText },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-icon">IA</div>
        <h2>InventAI</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon-wrap"><Icon size={20} /></span>
              <span className="link-text">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="icon-wrap"><Settings size={20} /></span>
          <span className="link-text">Admin / Settings</span>
        </NavLink>
        <div className="sidebar-link btn-logout" onClick={() => {
          localStorage.removeItem('inventai_auth');
          window.location.href = '/login';
        }}>
          <span className="icon-wrap"><LogOut size={20} /></span>
          <span className="link-text">Log Out</span>
        </div>
      </div>
    </aside>
  );
};
