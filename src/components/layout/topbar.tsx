"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Menu, X, LogOut, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onMenuToggle?: () => void;
  sidebarCollapsed?: boolean;
  mobileMenuOpen?: boolean;
  isMobile?: boolean;
}

export function TopBar({ onMenuToggle, mobileMenuOpen = false, isMobile = false }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    router.push('/login');
  };

  return (
    <div className="h-14 sm:h-16 bg-background/95 border-b border-border glassmorphic-dark px-3 sm:px-6 flex items-center justify-between relative z-50">
      {/* Left Side - Menu & Search */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="shrink-0"
        >
          {isMobile && mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={isMobile ? "Search..." : "Search transactions, documents, parties..."}
            className={cn(
              "w-full h-9 sm:h-10 pl-10 pr-4 bg-background/50 border rounded-md smooth-transition text-sm",
              searchFocused 
                ? "border-closyr-blue focus:ring-2 focus:ring-closyr-blue/30" 
                : "border-border focus:border-closyr-blue"
            )}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Side - Notifications & User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Stats - Desktop only */}
        <div className="hidden lg:flex items-center gap-4 pr-4 border-r border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-closyr-green">94</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-closyr-blue">12</p>
            <p className="text-xs text-muted-foreground">Active Deals</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2.5 h-2.5 bg-closyr-gold rounded-full border-2 border-background"
            />
          </Button>
        </div>

        {/* User Menu with Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 sm:gap-3 hover:bg-white/5 rounded-lg px-2 py-1.5 smooth-transition"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">Robert Austin</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
            
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-white" />
            </div>
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-background/95 border border-border rounded-lg shadow-xl glassmorphic-dark z-[60] overflow-hidden"
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium">Robert Austin</p>
                  <p className="text-xs text-muted-foreground">robert.austin@closyr.ai</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-300 rounded-md border border-red-500/30">
                      Super Admin
                    </span>
                    <span className="text-xs text-muted-foreground">All Offices</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => { setProfileOpen(false); router.push('/settings'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 smooth-transition"
                  >
                    <UserCircle className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); router.push('/settings'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 smooth-transition"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-border py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 smooth-transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
