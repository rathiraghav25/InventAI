import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import OrdersPage from './pages/Orders';
import { Invoices } from './pages/Invoices';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { AIAssistant } from './pages/AIAssistant';
import { Notifications } from './pages/Notifications';
import { getCurrentUser } from "./api/auth";
import { Settings } from './pages/Settings';

const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  //Authentication state with persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  
  const [, setAdminId] = useState<string>(() => {
    return localStorage.getItem('inventai_admin_id') || 'admin@inventai.com';
  });

  const login = (email: string) => {
    localStorage.setItem("inventai_admin_id", email);
    setAdminId(email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("inventai_admin_id");

    setIsAuthenticated(false);
    setAdminId("");
  };

  const [currentUser, setCurrentUser] = useState<{
    id: number;
    username: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
        try {
          const user = await getCurrentUser();

          setCurrentUser(user);
          setAdminId(user.id.toString());
          setIsAuthenticated(true);
          setCurrentUser(user);
        } catch (err) {
            localStorage.removeItem("token");
            localStorage.removeItem("inventai_admin_id");

            setIsAuthenticated(false);
            setAdminId("");
        }
      };

      if (localStorage.getItem("token")) {
        loadUser();
      }
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth onLogin={login} />} />
          
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AppLayout currentUser={currentUser} onLogout={logout} /></ProtectedRoute>}>            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<OrdersPage  />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="customers" element={<Customers />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="settings" element={<Settings onLogout={logout} />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
