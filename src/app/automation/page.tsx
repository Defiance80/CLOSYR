"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Play, 
  Pause, 
  Plus,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  Shield,
  Eye,
  RotateCcw,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: 'active' | 'inactive' | 'paused';
  category: string;
  runsToday: number;
  timeSaved: number; // in minutes
  lastRun: Date;
  errorCount: number;
}

const automations: Automation[] = [
  {
    id: 'auto-1',
    name: 'Auto-Request Missing Documents',
    description: 'Automatically request missing documents when deal enters contract stage',
    trigger: 'Deal status = Under Contract',
    action: 'Send document request email',
    status: 'active',
    category: 'Document Management',
    runsToday: 12,
    timeSaved: 180,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    errorCount: 0
  },
  {
    id: 'auto-2',
    name: 'Lender Follow-up After 48hrs',
    description: 'Send follow-up to lender if no response within 48 hours',
    trigger: 'No lender response for 48+ hours',
    action: 'Send follow-up email + SMS',
    status: 'active',
    category: 'Communication',
    runsToday: 8,
    timeSaved: 120,
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
    errorCount: 1
  },
  {
    id: 'auto-3',
    name: 'Closing Confirmation',
    description: 'Send closing confirmation to all parties 24h before',
    trigger: 'Closing date - 24 hours',
    action: 'Send confirmation email + calendar',
    status: 'active',
    category: 'Closing',
    runsToday: 5,
    timeSaved: 75,
    lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
    errorCount: 0
  },
  {
    id: 'auto-4',
    name: 'Wire Verification Alert',
    description: 'Alert when wire instructions are modified close to closing',
    trigger: 'Wire instruction change within 72h',
    action: 'Send security alert + verification required',
    status: 'active',
    category: 'Security',
    runsToday: 2,
    timeSaved: 45,
    lastRun: new Date(Date.now() - 8 * 60 * 60 * 1000),
    errorCount: 0
  },
  {
    id: 'auto-5',
    name: 'Status Update to All Parties',
    description: 'Weekly status update digest to stakeholders',
    trigger: 'Every Monday 9 AM',
    action: 'Generate and send status report',
    status: 'paused',
    category: 'Communication',
    runsToday: 0,
    timeSaved: 0,
    lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    errorCount: 3
  }
];

const templates = [
  {
    id: 'template-1',
    name: 'Document Request',
    category: 'Document Management',
    description: 'Request missing documents from parties',
    icon: FileText,
    color: 'text-blue-500'
  },
  {
    id: 'template-2',
    name: 'Payment Reminder',
    category: 'Financial',
    description: 'Remind parties of pending payments',
    icon: DollarSign,
    color: 'text-green-500'
  },
  {
    id: 'template-3',
    name: 'Meeting Scheduler',
    category: 'Communication',
    description: 'Schedule meetings automatically',
    icon: Calendar,
    color: 'text-purple-500'
  },
  {
    id: 'template-4',
    name: 'Compliance Check',
    category: 'Security',
    description: 'Run compliance checks on transactions',
    icon: Shield,
    color: 'text-red-500'
  },
  {
    id: 'template-5',
    name: 'Status Notification',
    category: 'Communication',
    description: 'Send status updates to stakeholders',
    icon: MessageSquare,
    color: 'text-indigo-500'
  },
  {
    id: 'template-6',
    name: 'Deal Milestone',
    category: 'Process',
    description: 'Trigger actions at deal milestones',
    icon: CheckCircle,
    color: 'text-emerald-500'
  }
];

const runHistory = [
  { time: '09:00', successful: 15, failed: 1 },
  { time: '10:00', successful: 12, failed: 0 },
  { time: '11:00', successful: 18, failed: 2 },
  { time: '12:00', successful: 22, failed: 1 },
  { time: '13:00', successful: 19, failed: 0 },
  { time: '14:00', successful: 25, failed: 3 },
  { time: '15:00', successful: 21, failed: 1 },
  { time: '16:00', successful: 17, failed: 0 }
];

const automationStats = [
  { category: 'Document Management', count: 45 },
  { category: 'Communication', count: 38 },
  { category: 'Security', count: 12 },
  { category: 'Financial', count: 23 },
  { category: 'Closing', count: 15 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AutomationPage() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const toggleAutomation = (id: string) => {
    // Mock toggle functionality
    console.log('Toggle automation:', id);
  };

  const totalRunsToday = automations.reduce((sum, auto) => sum + auto.runsToday, 0);
  const totalTimeSaved = automations.reduce((sum, auto) => sum + auto.timeSaved, 0);
  const totalErrors = automations.reduce((sum, auto) => sum + auto.errorCount, 0);
  const activeAutomations = automations.filter(auto => auto.status === 'active').length;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Automation Engine</h1>
            <p className="text-muted-foreground">Streamline your workflows with intelligent automation</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Automation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Automations Run Today</p>
                  <p className="text-2xl font-bold text-closyr-blue">{totalRunsToday}</p>
                </div>
                <Activity className="h-8 w-8 text-closyr-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time Saved Today</p>
                  <p className="text-2xl font-bold text-closyr-green">{Math.floor(totalTimeSaved / 60)}h {totalTimeSaved % 60}m</p>
                </div>
                <Clock className="h-8 w-8 text-closyr-green opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Automations</p>
                  <p className="text-2xl font-bold text-closyr-gold">{activeAutomations}</p>
                </div>
                <Zap className="h-8 w-8 text-closyr-gold opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Errors Today</p>
                  <p className="text-2xl font-bold text-red-500">{totalErrors}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Automations */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Active Automations
                </CardTitle>
                <CardDescription>Manage your automated workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <motion.div
                      key={automation.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 smooth-transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{automation.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              automation.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              automation.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {automation.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{automation.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Play className="h-3 w-3" />
                              {automation.runsToday} runs today
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {automation.timeSaved}m saved
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              Last run: {automation.lastRun.toLocaleTimeString()}
                            </span>
                          </div>

                          {automation.errorCount > 0 && (
                            <div className="flex items-center gap-1 mt-2 text-sm text-red-400">
                              <AlertTriangle className="h-3 w-3" />
                              {automation.errorCount} errors today
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedAutomation(automation)}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAutomation(automation.id)}
                          >
                            {automation.status === 'active' ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Run History Chart */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Automation Activity Today</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={runHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="successful" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Automation Templates */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Automation Templates</CardTitle>
                <CardDescription>Pre-built automation workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {templates.map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-3 rounded-lg border border-border/50 hover:border-closyr-blue/30 cursor-pointer smooth-transition"
                      >
                        <div className="flex items-start gap-3">
                          <IconComponent className={`h-5 w-5 ${template.color} flex-shrink-0 mt-0.5`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                            <span className="text-xs text-closyr-blue">{template.category}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Automation by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={automationStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      fontSize={12}
                    >
                      {automationStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Suggested Automations */}
            <Card className="glassmorphic border-closyr-gold/20">
              <CardHeader>
                <CardTitle className="text-closyr-gold">Suggested Automations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-closyr-gold/10">
                    <h4 className="font-medium text-sm mb-1">Title Search Reminder</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Send reminder if title search not started within 3 days
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      Create Automation
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg bg-closyr-gold/10">
                    <h4 className="font-medium text-sm mb-1">Appraisal Follow-up</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Follow up with appraiser if no report within 10 days
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      Create Automation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground py-4">
          Developed by GoKoncentrate
        </div>
      </div>
    </MainLayout>
  );
}