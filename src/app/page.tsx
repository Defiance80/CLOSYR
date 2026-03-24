"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login after a brief moment
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-closyr-background flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-closyr-blue/10 via-transparent to-closyr-gold/10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <Logo size="xl" className="mx-auto mb-8" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-closyr-blue via-white to-closyr-gold bg-clip-text text-transparent">
            CLOSYR™
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Smarter closings. Safer titles. Seamless escrow.
          </p>
          
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-muted-foreground"
          >
            Launching...
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}