import React, { useState } from 'react';
import {
  Home,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Hash
} from 'lucide-react';
import StudentDashboard from './StudentDashboard';
import { Link, Outlet, useNavigate } from 'react-router-dom';


const StudentSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, link: "/dashboard/student" },
    { id: 'users', label: 'Groups', icon: Hash, link: "/dashboard/student/groups" },
    // { id: 'products', label: 'Products', icon: ShoppingCart },
    // { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    // { id: 'settings', label: 'Settings', icon: Settings },
    // { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && (
            <h1 className="text-xl font-bold">Student Panel</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-700"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-4">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link to={item.link}>
                    <button
                      onClick={() => setActive(item.id)}
                      className={`flex items-center w-full p-3 ${active === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                        } ${collapsed ? 'justify-center' : 'justify-start'} transition-colors duration-200`}
                    >
                      <Icon size={20} />
                      {!collapsed && <span className="ml-4">{item.label}</span>}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md w-full ${collapsed ? 'justify-center' : 'justify-start'
            }`}>
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content area */}
      {/* <StudentDashboard /> */}
      <Outlet />
    </div>
  );
};

export default StudentSidebar;