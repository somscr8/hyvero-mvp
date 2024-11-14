// src/components/Layout.tsx

import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Users, 
  FileSpreadsheet,
  LogOut,
  Trash2 // Import Trash icon for 'Clear Tables' link
} from 'lucide-react';
import { userAtom } from '../atoms/auth';

function Layout() {
  const [user, setUser] = useAtom(userAtom);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Templates', href: '/templates', icon: FileText },
    { name: 'Reports', href: '/reports', icon: FileSpreadsheet },
    { name: 'Files', href: '/files', icon: Upload },
    ...(user.role === 'admin' ? [{ name: 'Users', href: '/users', icon: Users }] : []),
    ...(user.role === 'admin' ? [{ name: 'Data Management', href: '/cleartables', icon: Trash2 }] : []), // Add Clear Tables for admins
  ];

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-primary-700">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-white">hyvero.ai</h1>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          location.pathname === item.href
                            ? 'bg-primary-800 text-white'
                            : 'text-primary-100 hover:bg-primary-600'
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <Icon className="mr-3 h-6 w-6" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
                <button
                  onClick={handleLogout}
                  className="flex-shrink-0 w-full group block"
                >
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-primary-100 group-hover:text-white">
                        {user.name}
                      </p>
                      <div className="flex items-center text-sm text-primary-200 group-hover:text-primary-100">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
