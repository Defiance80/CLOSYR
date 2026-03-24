"use client";

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Activity,
  Users,
  FileText,
  Shield,
  Eye,
  MessageSquare
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const dealHealthScores = [
  { id: '001', address: '123 Oak Street', score: 94, status: 'excellent', risk: 'low' },
  { id: '002', address: '456 Pine Avenue', score: 78, status: 'good', risk: 'medium' },
  { id: '003', address: '789 Maple Drive', score: 45, status: 'needs_attention', risk: 'high' },
  { id: '004', address: '321 Elm Court', score: 88, status: 'good', risk: 'low' },
];

const chartData = [
  { name: 'Jan', deals: 45, revenue: 2400000 },
  { name: 'Feb', deals: 52, revenue: 2800000 },
  { name: 'Mar', deals: 48, revenue: 2600000 },
  { name: 'Apr', deals: 61, revenue: 3200000 },
  { name: 'May', deals: 55, revenue: 2900000 },
  { name: 'Jun', deals: 67, revenue: 3500000 },
];

const pieData = [
  { name: 'Residential', value: 65, color: '#3B82F6' },
  { name: 'Commercial', value: 25, color: '#22C55E' },
  { name: 'Investment', value: 10, color: '#D4AF37' },
];

const recentActivity = [
  { time: '2m ago', action: 'Document uploaded', deal: 'Oak Street', type: 'success' },
  { time: '15m ago', action: 'Wire instruction change flagged', deal: 'Pine Avenue', type: 'warning' },
  { time: '1h ago', action: 'Title commitment received', deal: 'Maple Drive', type: 'info' },
  { time: '3h ago', action: 'Closing scheduled', deal: 'Elm Court', type: 'success' },
];

function getScoreColor(score: number) {
  if (score >= 80) return 'text-closyr-green';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

function getScoreBg(score: number) {
  if (score >= 80) return 'bg-closyr-green/10 border-closyr-green/20';
  if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
  return 'bg-red-500/10 border-red-500/20';
}

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Deal Intelligence Dashboard</h1>
            <p className="text-muted-foreground">Monitor deal health, track progress, and take action</p>
          </div>
          <Button variant="gold" className="gap-2">
            <Eye className="h-4 w-4" />
            View All Deals
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Health Score</p>
                  <p className="text-2xl font-bold text-closyr-green">94</p>
                </div>
                <TrendingUp className="h-8 w-8 text-closyr-green" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Deals</p>
                  <p className="text-2xl font-bold text-closyr-blue">12</p>
                </div>
                <Activity className="h-8 w-8 text-closyr-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Close Time</p>
                  <p className="text-2xl font-bold text-closyr-gold">28 days</p>
                </div>
                <Clock className="h-8 w-8 text-closyr-gold" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                  <p className="text-2xl font-bold text-closyr-green">$3.5M</p>
                </div>
                <DollarSign className="h-8 w-8 text-closyr-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deal Health Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-closyr-blue" />
                  Deal Health Scores
                </CardTitle>
                <CardDescription>
                  Real-time health monitoring for all active transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dealHealthScores.map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border ${getScoreBg(deal.score)} smooth-transition hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${getScoreColor(deal.score)}`}>
                          {deal.score}
                        </div>
                        <div>
                          <p className="font-medium">{deal.address}</p>
                          <p className="text-sm text-muted-foreground">Deal #{deal.id}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${deal.score >= 80 ? 'bg-closyr-green' : deal.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${deal.score}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Next Best Actions */}
          <div>
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="text-lg">Next Best Actions</CardTitle>
                <CardDescription>What should I do next?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">Critical</span>
                  </div>
                  <p className="text-sm">Review wire instructions for Maple Drive - flagged by WatchDog</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Review Now
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-closyr-gold/10 border border-closyr-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-closyr-gold" />
                    <span className="text-sm font-medium text-closyr-gold">Pending</span>
                  </div>
                  <p className="text-sm">3 documents awaiting approval for Oak Street</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Approve
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-closyr-blue/10 border border-closyr-blue/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-closyr-blue" />
                    <span className="text-sm font-medium text-closyr-blue">Follow Up</span>
                  </div>
                  <p className="text-sm">Schedule closing for Pine Avenue (ready to close)</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly deal volume and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fill="url(#colorRevenue)"
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across all deals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 smooth-transition">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-closyr-green' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-closyr-blue'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.deal} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}