import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  BarChart3,
  Boxes,
} from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: <Package size={20} />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <Users size={20} />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "Invoices",
    path: "/invoices",
    icon: <FileText size={20} />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <BarChart3 size={20} />,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">

        <div className="logo-icon">
          <Boxes size={26} />
        </div>

        <div>
          <h2>InventAI</h2>
          <p>Inventory System</p>
        </div>

      </div>

      <nav className="sidebar-nav">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {item.icon}

            <span>{item.name}</span>

          </NavLink>
        ))}

      </nav>

      <div className="sidebar-footer">

        <p>InventAI</p>

        <span>v1.0</span>

      </div>
    </aside>
  );
}