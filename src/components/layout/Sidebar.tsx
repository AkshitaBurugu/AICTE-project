
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CreditCard, PieChart, Users, Settings, 
  LogOut, Menu, ChevronLeft, Wallet, FileText, Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const location = useLocation();
  
  const sidebarVariants = {
    open: { width: '16rem' },
    closed: { width: '5rem' }
  };
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/expenses', icon: <CreditCard size={20} />, label: 'Expenses' },
    { path: '/categories', icon: <Tag size={20} />, label: 'Categories' },
    { path: '/reports', icon: <PieChart size={20} />, label: 'Reports' },
    { path: '/wallets', icon: <Wallet size={20} />, label: 'Wallets' },
    { path: '/receipts', icon: <FileText size={20} />, label: 'Receipts' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      animate={open ? 'open' : 'closed'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-30",
        "flex flex-col overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {open ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-2">
                <span className="text-primary-foreground font-bold text-lg">Ex</span>
              </div>
              <span className="font-display font-semibold text-sidebar-foreground">Expensify</span>
            </motion.div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">Ex</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {open ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 rounded-md transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground"
                )}
              >
                <span className="flex items-center justify-center w-5">{item.icon}</span>
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3"
                  >
                    {item.label}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-3 mt-auto border-t border-sidebar-border">
        <NavLink
          to="/logout"
          className="flex items-center px-3 py-2 rounded-md text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span className="flex items-center justify-center w-5"><LogOut size={20} /></span>
          {open && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-3"
            >
              Sign Out
            </motion.span>
          )}
        </NavLink>
      </div>
    </motion.div>
  );
};
