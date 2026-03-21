import React, { useState } from 'react';
import { UserCircle, Store, Shield, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store/MockAppStore';

type Tab = 'profile' | 'store' | 'security';

export const Settings: React.FC = () => {
  const { adminProfile, storeDetails, updateAdminProfile, updateStoreDetails } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [toast, setToast] = useState('');

  // Local state for forms
  const [profileForm, setProfileForm] = useState(adminProfile);
  const [storeForm, setStoreForm] = useState(storeDetails);
  
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile(profileForm);
    showToast('Profile updated successfully!');
  };

  const handleStoreSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreDetails(storeForm);
    showToast('Store details updated successfully!');
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    // Mock save
    setPasswords({ current: '', newPass: '', confirm: '' });
    showToast('Security settings updated!');
  };

  return (
    <div className="page-container" style={{ padding: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary-dark)' }}>Admin Settings</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Manage your profile, business information, and secure access.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        {/* Sidebar Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div 
            onClick={() => setActiveTab('profile')}
            className={`card card-hover`} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1.25rem',
              borderLeft: activeTab === 'profile' ? '4px solid var(--color-primary)' : '4px solid transparent',
              backgroundColor: activeTab === 'profile' ? 'var(--color-surface-hover)' : 'var(--color-surface)'
            }}>
            <UserCircle size={22} color={activeTab === 'profile' ? 'var(--color-primary)' : 'var(--color-text-light)'} />
            <div style={{ fontWeight: activeTab === 'profile' ? 600 : 400, color: activeTab === 'profile' ? 'var(--color-primary-dark)' : 'var(--color-text)' }}>Profile Informtion</div>
          </div>
          
          <div 
            onClick={() => setActiveTab('store')}
            className={`card card-hover`} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1.25rem',
              borderLeft: activeTab === 'store' ? '4px solid var(--color-primary)' : '4px solid transparent',
              backgroundColor: activeTab === 'store' ? 'var(--color-surface-hover)' : 'var(--color-surface)'
            }}>
            <Store size={22} color={activeTab === 'store' ? 'var(--color-primary)' : 'var(--color-text-light)'} />
            <div style={{ fontWeight: activeTab === 'store' ? 600 : 400, color: activeTab === 'store' ? 'var(--color-primary-dark)' : 'var(--color-text)' }}>Store Details</div>
          </div>

          <div 
            onClick={() => setActiveTab('security')}
            className={`card card-hover`} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1.25rem',
              borderLeft: activeTab === 'security' ? '4px solid var(--color-primary)' : '4px solid transparent',
              backgroundColor: activeTab === 'security' ? 'var(--color-surface-hover)' : 'var(--color-surface)'
            }}>
            <Shield size={22} color={activeTab === 'security' ? 'var(--color-primary)' : 'var(--color-text-light)'} />
            <div style={{ fontWeight: activeTab === 'security' ? 600 : 400, color: activeTab === 'security' ? 'var(--color-primary-dark)' : 'var(--color-text)' }}>Security</div>
          </div>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'profile' && (
            <form className="card" onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'slideUp 0.3s ease-out' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Profile Information</h3>
              <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input type="email" className="input-field" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input type="tel" className="input-field" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Role</label>
                  <input type="text" className="input-field" value={profileForm.role} disabled style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-light)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          )}

          {activeTab === 'store' && (
            <form className="card" onSubmit={handleStoreSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'slideUp 0.3s ease-out' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Business & Store Details</h3>
              <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Business Name</label>
                  <input type="text" className="input-field" value={storeForm.name} onChange={e => setStoreForm({...storeForm, name: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Default Currency</label>
                  <select className="input-field" value={storeForm.currency} onChange={e => setStoreForm({...storeForm, currency: e.target.value})}>
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                  <label className="input-label">Registered Address (Optional)</label>
                  <input type="text" className="input-field" placeholder="123 Corporate Park, Mumbai..." value={storeForm.address} onChange={e => setStoreForm({...storeForm, address: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">GSTIN / Tax ID (Optional)</label>
                  <input type="text" className="input-field" placeholder="27XXXXX1234X1Z5" value={storeForm.gst} onChange={e => setStoreForm({...storeForm, gst: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <button type="submit" className="btn btn-primary">Save Details</button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form className="card" onSubmit={handleSecuritySave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'slideUp 0.3s ease-out' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Security Settings</h3>
              <div className="grid" style={{ gap: '1.5rem', maxWidth: '400px' }}>
                <div className="input-group">
                  <label className="input-label">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label className="input-label">New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label className="input-label">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <button type="submit" className="btn btn-primary">Change Password</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {toast && (
        <div className="toast-container">
          <CheckCircle size={20} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
