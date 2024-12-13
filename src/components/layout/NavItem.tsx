import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/classNames';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isCollapsed: boolean;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  onClick,
  isCollapsed,
  isActive
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center text-gray-300 hover:text-white w-full p-2 rounded hover:bg-primary-700",
      "transition-colors duration-200",
      isCollapsed ? "justify-center" : "justify-start",
      isActive && "bg-primary-700 text-white"
    )}
  >
    <Icon className="w-5 h-5" />
    {!isCollapsed && <span className="ml-2">{label}</span>}
  </button>
);