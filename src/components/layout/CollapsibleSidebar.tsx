import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/classNames';
import { 
  Users, 
  PlusCircle, 
  FileText, 
  UserPlus, 
  LogOut, 
  UserCog, 
  FileCheck, 
  Layout, 
  Calendar,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { NavItem } from './NavItem';

export const CollapsibleSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const { handleLogout } = useAuth();

  const navItems = [
    {
      icon: Layout,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Users,
      label: 'Patient Registration',
      path: '/patients'
    },
    {
      icon: PlusCircle,
      label: 'New Tests Add',
      path: '/tests'
    },
    {
      icon: FileText,
      label: 'Patient Summary',
      path: '/summary'
    },
    {
      icon: FileCheck,
      label: 'Patient Reports',
      path: '/reports'
    },
    {
      icon: Calendar,
      label: 'Appointments',
      path: '/appointments'
    }
  ];

  const adminNavItems = [
    {
      icon: UserPlus,
      label: 'Register Employee',
      path: '/employees'
    },
    {
      icon: UserCog,
      label: 'Doctor Manage',
      path: '/doctors'
    }
  ];

  return (
    <div 
      className={cn(
        "bg-primary-800 min-h-screen transition-all duration-300 relative z-50",
        isCollapsed ? "w-16" : "w-64",
        "fixed md:relative"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-primary-800 rounded-full p-1 text-white hover:bg-primary-700 hidden md:block"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className="p-4">
        <div className={cn(
          "flex items-center mb-8",
          isCollapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-primary-800 text-xl font-bold">PS</span>
          </div>
          {!isCollapsed && (
            <span className="text-white text-xl font-bold">Healthcare</span>
          )}
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              onClick={() => navigate(item.path)}
              isCollapsed={isCollapsed}
            />
          ))}

          {currentUser?.role === 'admin' && adminNavItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              onClick={() => navigate(item.path)}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700",
            "absolute bottom-4 left-0 right-0 mx-4"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </div>
  );
};