"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onMenuToggle?: () => void;
  sidebarCollapsed?: boolean;
  isMobile?: boolean;
}

export function TopBar({ onMenuToggle, sidebarCollapsed = false, isMobile = false }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="h-16 bg-background/95 border-b border-border glassmorphic-dark px-6 flex items-center justify-between">
      {/* Left Side - Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        )}

        {/* Desktop Menu Toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="hidden md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search transactions, documents, parties..."
            className={cn(
              "w-full h-10 pl-10 pr-4 bg-background/50 border rounded-md smooth-transition",
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
      <div className="flex items-center gap-3">
        {/* Quick Stats */}
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
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-closyr-gold rounded-full border-2 border-background"
            />
          </Button>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">Demo User</p>
            <p className="text-xs text-muted-foreground">Transaction Manager</p>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}