"use client";

import React from 'react';

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "icon" | "text";
}

export function Logo({ className = "", size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const iconElement = (
    <svg
      viewBox="0 0 120 120"
      className={`${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle - Professional Seal */}
      <circle 
        cx="60" 
        cy="60" 
        r="55" 
        fill="none" 
        stroke="#3B82F6" 
        strokeWidth="2"
        className="opacity-60"
      />
      
      {/* Inner Shield Shape - Security & Trust */}
      <path 
        d="M60 15 L85 30 L85 70 Q85 85 60 100 Q35 85 35 70 L35 30 Z" 
        fill="url(#blueGradient)"
        stroke="#D4AF37"
        strokeWidth="1"
      />
      
      {/* Central 'C' for CLOSYR */}
      <path 
        d="M75 45 Q75 35 60 35 Q45 35 45 50 Q45 65 60 65 Q75 65 75 55"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Convergence Lines - "Where deals converge" */}
      <g stroke="#3B82F6" strokeWidth="1.5" opacity="0.7">
        <line x1="25" y1="45" x2="40" y2="50" />
        <line x1="25" y1="55" x2="40" y2="50" />
        <line x1="95" y1="45" x2="80" y2="50" />
        <line x1="95" y1="55" x2="80" y2="50" />
        <line x1="55" y1="25" x2="60" y2="40" />
        <line x1="65" y1="25" x2="60" y2="40" />
      </g>
      
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
    </svg>
  );

  if (variant === "icon") {
    return iconElement;
  }

  if (variant === "text") {
    return (
      <span className={`font-bold text-2xl bg-gradient-to-r from-closyr-blue to-closyr-gold bg-clip-text text-transparent ${className}`}>
        CLOSYR™
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {iconElement}
      <span className="font-bold text-2xl bg-gradient-to-r from-closyr-blue to-closyr-gold bg-clip-text text-transparent">
        CLOSYR™
      </span>
    </div>
  );
}