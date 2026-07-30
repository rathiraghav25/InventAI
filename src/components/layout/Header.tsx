import React, { useState, useRef, useEffect } from 'react';
import { Bell, UserCircle, Search, FileText, Package, Users, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  toggleSidebar?: () => void;

  currentUser: {
    id: number;
    username: string;
    email: string;
  } | null;

  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  currentUser,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {toggleSidebar && (
          <button className="btn btn-ghost sidebar-toggle" onClick={toggleSidebar} style={{ padding: '0.5rem', color: 'var(--color-primary)' }}>
            <Menu size={20} />
          </button>
        )}
        <div className="header-search" ref={searchRef}>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products, customers, or invoices..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
        </div>
        
        {isSearchOpen && searchQuery.trim() !== "" && (
  <div className="search-dropdown card">
    <div className="search-no-results">
      Global search will be available in a future update.
    </div>
  </div>
)}
      </div></div>
      
      <div className="header-actions">
        <div className="notification-bell" onClick={() => navigate('/notifications')}>
          <Bell size={22} className="bell-icon" />
          {0 > 0 && (
            <span className="badge-count">{0}</span>
          )}
        </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          className="user-profile"
          onClick={() => navigate("/dashboard")}
        >
          <UserCircle size={28} className="profile-icon" />
          <span className="user-name">
            {currentUser?.username.split(" ")[0]}
          </span>
        </div>

        <button
          className="btn btn-ghost"
          onClick={onLogout}
          title="Logout"
         >
          <LogOut size={20} />
        </button>
      </div>
      </div>
    </header>
  );
};
