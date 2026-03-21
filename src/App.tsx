import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/MockAppStore';
import { AppLayout } from './components/layout/AppLayout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Orders } from './pages/Orders';
import { Invoices } from './pages/Invoices';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { AIAssistant } from './pages/AIAssistant';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  // Simple mock authentication state with persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('inventai_auth') === 'true';
  });
  
  const [adminId, setAdminId] = useState<string>(() => {
    return localStorage.getItem('inventai_admin_id') || 'admin@inventai.com';
  });

  const login = (email: string) => {
    localStorage.setItem('inventai_auth', 'true');
    localStorage.setItem('inventai_admin_id', email);
    setAdminId(email);
    setIsAuthenticated(true);
  };

  return (
    <AppProvider adminId={adminId}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth onLogin={login} />} />
          
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="customers" element={<Customers />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
