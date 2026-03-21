import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  reorder_threshold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  created_at: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
};

export type OrderItem = {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  subtotal: number;
};

export type Order = {
  id: string;
  customer_id: string;
  order_date: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  total_amount: number;
  items: OrderItem[];
};

export type Invoice = {
  id: string;
  order_id: string;
  invoice_date: string;
  total_amount: number;
  payment_status: 'Unpaid' | 'Paid' | 'Partially Paid';
  payment_method: string;
};

export type Notification = {
  id: string;
  type: string;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
};

export type AdminProfile = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export type StoreDetails = {
  name: string;
  currency: string;
  address: string;
  gst: string;
};

interface AppContextType {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  invoices: Invoice[];
  notifications: Notification[];
  adminProfile: AdminProfile;
  storeDetails: StoreDetails;
  addProduct: (p: Omit<Product, 'id' | 'created_at'>) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  addOrder: (o: Omit<Order, 'id' | 'order_date'>) => void;
  updateOrder: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  markNotificationRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  generateInvoice: (orderId: string) => void;
  markInvoicePaid: (id: string) => void;
  deleteInvoice: (id: string) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (c: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, c: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  updateAdminProfile: (p: Partial<AdminProfile>) => void;
  updateStoreDetails: (s: Partial<StoreDetails>) => void;
}

const initialProducts: Product[] = [
  { id: 'p1', name: 'Premium Wireless Earbuds', sku: 'AUDIO-01', category: 'Electronics', description: 'High bass wireless earbuds', purchase_price: 1500, selling_price: 2999, stock_quantity: 45, reorder_threshold: 10, status: 'In Stock', created_at: new Date().toISOString() },
  { id: 'p2', name: 'Ergonomic Desk Chair', sku: 'FURN-01', category: 'Furniture', description: 'Office chair with lumbar support', purchase_price: 4500, selling_price: 7999, stock_quantity: 8, reorder_threshold: 10, status: 'Low Stock', created_at: new Date().toISOString() },
  { id: 'p3', name: 'Mechanical Keyboard X2', sku: 'ELEC-02', category: 'Electronics', description: 'RGB mechanical keyboard', purchase_price: 2200, selling_price: 4500, stock_quantity: 0, reorder_threshold: 5, status: 'Out of Stock', created_at: new Date().toISOString() },
];

const initialCustomers: Customer[] = [
  { id: 'c1', name: 'Aditya Sharma', phone: '+91 9876543210', email: 'aditya@example.com', address: 'Mumbai, MH', notes: 'VIP customer' },
  { id: 'c2', name: 'Priya Patel', phone: '+91 8765432109', email: 'priya@example.com', address: 'Ahmedabad, GJ', notes: '' },
];

const initialOrders: Order[] = [
  { id: 'o1', customer_id: 'c1', order_date: new Date(Date.now() - 86400000).toISOString(), status: 'Completed', total_amount: 5998, items: [{ id: 'oi1', product_id: 'p1', quantity: 2, price: 2999, subtotal: 5998 }] },
];

const initialInvoices: Invoice[] = [
  { id: 'inv-1', order_id: 'o1', invoice_date: new Date(Date.now() - 86400000).toISOString(), total_amount: 5998, payment_status: 'Paid', payment_method: 'UPI' }
];

const initialNotifications: Notification[] = [
  { id: 'n1', type: 'alert', message: 'Ergonomic Desk Chair is Low on Stock (8 left)', status: 'unread', created_at: new Date().toISOString() },
  { id: 'n2', type: 'info', message: 'Order #o1 was completed successfully.', status: 'unread', created_at: new Date().toISOString() }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode, adminId: string }> = ({ children, adminId }) => {
  const getKey = (key: string) => `inventai_${adminId}_${key}`;
  const isDefaultAdmin = adminId === 'admin@inventai.com';

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(getKey('products'));
    return saved ? JSON.parse(saved) : (isDefaultAdmin ? initialProducts : []);
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(getKey('customers'));
    return saved ? JSON.parse(saved) : (isDefaultAdmin ? initialCustomers : []);
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(getKey('orders'));
    return saved ? JSON.parse(saved) : (isDefaultAdmin ? initialOrders : []);
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(getKey('invoices'));
    return saved ? JSON.parse(saved) : (isDefaultAdmin ? initialInvoices : []);
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(getKey('notifications'));
    return saved ? JSON.parse(saved) : (isDefaultAdmin ? initialNotifications : []);
  });

  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const saved = localStorage.getItem(getKey('adminProfile'));
    return saved ? JSON.parse(saved) : { name: 'Admin', email: adminId, phone: '+91 9876543210', role: 'Administrator' };
  });

  const [storeDetails, setStoreDetails] = useState<StoreDetails>(() => {
    const saved = localStorage.getItem(getKey('storeDetails'));
    return saved ? JSON.parse(saved) : { name: 'InventAI Business Hub', currency: 'INR', address: '123 Business Avenue', gst: '27AABC1234E1Z2' };
  });

  useEffect(() => { localStorage.setItem(getKey('products'), JSON.stringify(products)); }, [products, adminId]);
  useEffect(() => { localStorage.setItem(getKey('customers'), JSON.stringify(customers)); }, [customers, adminId]);
  useEffect(() => { localStorage.setItem(getKey('orders'), JSON.stringify(orders)); }, [orders, adminId]);
  useEffect(() => { localStorage.setItem(getKey('invoices'), JSON.stringify(invoices)); }, [invoices, adminId]);
  useEffect(() => { localStorage.setItem(getKey('notifications'), JSON.stringify(notifications)); }, [notifications, adminId]);

  const updateAdminProfile = (p: Partial<AdminProfile>) => {
    const fresh = { ...adminProfile, ...p };
    setAdminProfile(fresh);
    localStorage.setItem(getKey('adminProfile'), JSON.stringify(fresh));
  };

  const updateStoreDetails = (s: Partial<StoreDetails>) => {
    const fresh = { ...storeDetails, ...s };
    setStoreDetails(fresh);
    localStorage.setItem(getKey('storeDetails'), JSON.stringify(fresh));
  };

  const syncProductStatuses = (prods: Product[]) => {
    return prods.map(p => ({
      ...p,
      status: (p.stock_quantity === 0 ? 'Out of Stock' : p.stock_quantity <= p.reorder_threshold ? 'Low Stock' : 'In Stock') as Product['status']
    }));
  };

  const addProduct = (p: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = { ...p, id: uuidv4(), created_at: new Date().toISOString(), status: 'In Stock' };
    setProducts(prev => syncProductStatuses([...prev, newProduct]));
  };

  const updateProduct = (id: string, p: Partial<Product>) => {
    setProducts(prev => syncProductStatuses(prev.map(prod => prod.id === id ? { ...prod, ...p } : prod)));
  };

  const addOrder = (o: Omit<Order, 'id' | 'order_date'>) => {
    const newOrder: Order = { ...o, id: `ORD-${Math.floor(Math.random()*10000)}`, order_date: new Date().toISOString() };
    setOrders(prev => [newOrder, ...prev]);
    
    if (newOrder.status === 'Confirmed' || newOrder.status === 'Completed') {
      newOrder.items.forEach(item => {
        setProducts(prev => {
          const prod = prev.find(p => p.id === item.product_id);
          if (prod) {
            updateProduct(prod.id, { stock_quantity: Math.max(0, prod.stock_quantity - item.quantity) });
          }
          return prev;
        });
      });
    }

    setNotifications(prev => [{ id: uuidv4(), type: 'info', message: `New order ${newOrder.id} created`, status: 'unread', created_at: new Date().toISOString() }, ...prev]);
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const updateOrder = (id: string, status: Order['status']) => {
    setOrders(prev => {
      const idx = prev.findIndex(o => o.id === id);
      if (idx === -1) return prev;
      const oldOrder = prev[idx];
      const updated = { ...oldOrder, status };
      const newOrders = [...prev];
      newOrders[idx] = updated;

      if (oldOrder.status === 'Pending' && (status === 'Confirmed' || status === 'Completed')) {
        updated.items.forEach(item => {
          const prod = products.find(p => p.id === item.product_id);
          if (prod) {
            updateProduct(prod.id, { stock_quantity: Math.max(0, prod.stock_quantity - item.quantity) });
          }
        });
      }

      return newOrders;
    });
  };

  const generateInvoice = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const inv: Invoice = {
      id: `INV-${Math.floor(Math.random()*10000)}`,
      order_id: orderId,
      invoice_date: new Date().toISOString(),
      total_amount: order.total_amount,
      payment_status: 'Unpaid',
      payment_method: 'N/A'
    };
    setInvoices(prev => [inv, ...prev]);
  };

  const markInvoicePaid = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, payment_status: 'Paid' } : inv));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'read' } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCustomer = (c: Omit<Customer, 'id'>) => {
    const newCust: Customer = { ...c, id: `c${Math.floor(Math.random()*10000)}` };
    setCustomers(prev => [newCust, ...prev]);
  };

  const updateCustomer = (id: string, c: Partial<Customer>) => {
    setCustomers(prev => prev.map(cust => cust.id === id ? { ...cust, ...c } : cust));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products, customers, orders, invoices, notifications, adminProfile, storeDetails,
      addProduct, updateProduct, deleteProduct,
      addCustomer, updateCustomer, deleteCustomer,
      addOrder, updateOrder, deleteOrder,
      markNotificationRead, deleteNotification,
      generateInvoice, markInvoicePaid, deleteInvoice,
      updateAdminProfile, updateStoreDetails
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};
