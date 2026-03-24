"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { 
  BarChart3, 
  FileText, 
  MessageSquare, 
  DollarSign, 
  Zap, 
  PieChart, 
  Users, 
  Settings,
  LayoutDashboard,
  ArrowLeftRight,
  Shield
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Communications', href: '/communications', icon: MessageSquare },
  { name: 'Funds', href: '/funds', icon: DollarSign },
  { name: 'Automation', href: '/automation', icon: Zap },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Client Portal', href: '/portal', icon: Users },
  { name: 'Integrations', href: '/integrations', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-background/95 border-r border-border glassmorphic-dark flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        {collapsed ? (
          <Logo variant="icon" size="lg" className="mx-auto" />
        ) : (
          <Logo size="md" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md smooth-transition relative group",
                  isActive
                    ? "bg-closyr-blue/20 text-closyr-blue border border-closyr-blue/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 w-1 h-6 bg-closyr-blue rounded-l-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* WatchDog Status */}
      <div className="p-4 border-t border-border/50">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md",
          collapsed ? "justify-center" : ""
        )}>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-closyr-green" />
            <div className="w-2 h-2 bg-closyr-green rounded-full animate-pulse" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-xs font-medium text-closyr-green">WatchDog Active</p>
              <p className="text-xs text-muted-foreground">Fraud detection online</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 text-center text-xs text-muted-foreground border-t border-border/50">
          Developed by GoKoncentrate
        </div>
      )}
    </motion.div>
  );
}