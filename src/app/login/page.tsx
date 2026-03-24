"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@closyr.ai');
  const [password, setPassword] = useState('closyrdemo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'demo@closyr.ai' && password === 'closyrdemo123') {
      setIsLoading(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      alert('Invalid credentials. Use demo@closyr.ai / closyrdemo123');
    }
  };

  return (
    <div className="min-h-screen bg-closyr-background flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-closyr-blue/5 via-transparent to-closyr-gold/5" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md"
      >
        {/* Logo & Branding - Centered */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <Logo size="xl" variant="icon" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-2"
          >
            <span className="font-bold text-3xl bg-gradient-to-r from-closyr-blue to-closyr-gold bg-clip-text text-transparent">
              CLOSYR™
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-closyr-blue to-white bg-clip-text text-transparent">
              Welcome to CLOSYR™
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Smarter closings. Safer titles. Seamless escrow.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glassmorphic-dark soft-shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Demo Environment - Use the credentials below
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-closyr-blue smooth-transition text-sm"
                      placeholder="demo@closyr.ai"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-closyr-blue smooth-transition text-sm"
                      placeholder="closyrdemo123"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-md text-sm">
                  <p className="font-medium text-closyr-gold mb-1">Demo Credentials:</p>
                  <p className="text-xs text-muted-foreground">Email: demo@closyr.ai</p>
                  <p className="text-xs text-muted-foreground">Password: closyrdemo123</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-xs text-muted-foreground"
        >
          Developed by GoKoncentrate
        </motion.div>
      </motion.div>
    </div>
  );
}
