"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mail, Phone, Video } from 'lucide-react';

export default function CommunicationsPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Communications</h1>
          <p className="text-muted-foreground">Centralized communication hub for all deal parties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-closyr-blue" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Real-time messaging with all transaction parties</p>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-closyr-green" />
                Email Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Automated email notifications and tracking</p>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-closyr-gold" />
                Video Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Schedule and conduct virtual meetings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}