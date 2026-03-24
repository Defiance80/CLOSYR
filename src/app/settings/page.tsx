"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, User, Shield, Bell, Palette, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your CLOSYR experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <input
                  type="text"
                  defaultValue="Demo User"
                  className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="demo@closyr.ai"
                  className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                />
              </div>
              <Button variant="default">Save Profile</Button>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Deal Health Alerts</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Document Updates</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">WatchDog Alerts</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Authentication</span>
                <Button variant="outline" size="sm">Setup</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Access</span>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Session Timeout</span>
                <Button variant="outline" size="sm">4 hours</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span>1.0.0 (Phase 1)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Environment</span>
                  <span>Demo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Backup</span>
                  <span>2024-03-24</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Developed by GoKoncentrate
          </p>
        </div>
      </div>
    </MainLayout>
  );
}