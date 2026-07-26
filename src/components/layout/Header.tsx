import React, { useState, useRef, useEffect } from 'react';
import { Bell, UserCircle, Search, FileText, Package, Users, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/MockAppStore';
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
  const { notifications, products, customers, invoices } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  // Search logic
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
  const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);
  const filteredInvoices = invoices.filter(i => i.id.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);

  const hasResults = filteredProducts.length > 0 || filteredCustomers.length > 0 || filteredInvoices.length > 0;

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
        
        {isSearchOpen && searchQuery.trim() !== '' && (
          <div className="search-dropdown card">
            {!hasResults ? (
              <div className="search-no-results">No results found for "{searchQuery}"</div>
            ) : (
              <>
                {filteredProducts.length > 0 && (
                  <div className="search-section">
                    <h4><Package size={14} /> Products</h4>
                    {filteredProducts.map(p => (
                      <div key={p.id} className="search-item" onClick={() => { setIsSearchOpen(false); navigate('/inventory'); }}>
                        <span>{p.name}</span>
                        <small>{p.sku}</small>
                      </div>
                    ))}
                  </div>
                )}
                {filteredCustomers.length > 0 && (
                  <div className="search-section">
                    <h4><Users size={14} /> Customers</h4>
                    {filteredCustomers.map(c => (
                      <div key={c.id} className="search-item" onClick={() => { setIsSearchOpen(false); navigate('/customers'); }}>
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {filteredInvoices.length > 0 && (
                  <div className="search-section">
                    <h4><FileText size={14} /> Invoices</h4>
                    {filteredInvoices.map(i => (
                      <div key={i.id} className="search-item" onClick={() => { setIsSearchOpen(false); navigate('/invoices'); }}>
                        <span>Invoice {i.id}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div></div>
      
      <div className="header-actions">
        <div className="notification-bell" onClick={() => navigate('/notifications')}>
          <Bell size={22} className="bell-icon" />
          {unreadCount > 0 && (
            <span className="badge-count">{unreadCount}</span>
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
          onClick={() => navigate("/settings")}
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
