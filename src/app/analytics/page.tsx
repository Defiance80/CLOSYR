"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  FileText,
  Plus,
  Eye,
  Settings,
  Clock,
  DollarSign,
  Users,
  Activity,
  Target,
  Award,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const monthlyClosings = [
  { month: 'Sep', closings: 45, revenue: 2250000, avgDays: 32 },
  { month: 'Oct', closings: 52, revenue: 2750000, avgDays: 28 },
  { month: 'Nov', closings: 48, revenue: 2580000, avgDays: 30 },
  { month: 'Dec', closings: 38, revenue: 2100000, avgDays: 35 },
  { month: 'Jan', closings: 42, revenue: 2350000, avgDays: 29 },
  { month: 'Feb', closings: 56, revenue: 3100000, avgDays: 26 },
  { month: 'Mar', closings: 61, revenue: 3450000, avgDays: 24 }
];

const revenueByType = [
  { type: 'Title Insurance', amount: 1250000, percentage: 36 },
  { type: 'Escrow Services', amount: 980000, percentage: 28 },
  { type: 'Document Prep', amount: 520000, percentage: 15 },
  { type: 'Wire Fees', amount: 350000, percentage: 10 },
  { type: 'Recording Fees', amount: 280000, percentage: 8 },
  { type: 'Other', amount: 120000, percentage: 3 }
];

const dealStatusBreakdown = [
  { name: 'In Progress', value: 145, color: '#3B82F6' },
  { name: 'Pending Docs', value: 67, color: '#F59E0B' },
  { name: 'Ready to Close', value: 23, color: '#10B981' },
  { name: 'At Risk', value: 12, color: '#EF4444' },
  { name: 'Closed', value: 342, color: '#8B5CF6' }
];

const agentPerformance = [
  { name: 'Lisa Rodriguez', deals: 34, revenue: 1850000, avgDays: 22, satisfaction: 4.8 },
  { name: 'Mike Chen', deals: 28, revenue: 1420000, avgDays: 26, satisfaction: 4.7 },
  { name: 'Sarah Johnson', deals: 31, revenue: 1675000, avgDays: 24, satisfaction: 4.9 },
  { name: 'Carlos Martinez', deals: 26, revenue: 1280000, avgDays: 28, satisfaction: 4.6 },
  { name: 'Emma Wilson', deals: 29, revenue: 1520000, avgDays: 25, satisfaction: 4.8 }
];

const lenderScorecard = [
  { lender: 'First National Bank', deals: 45, avgDays: 21, onTimeRate: 94, docQuality: 4.7 },
  { lender: 'Community Credit Union', deals: 38, avgDays: 28, onTimeRate: 87, docQuality: 4.3 },
  { lender: 'Metro Bank', deals: 52, avgDays: 24, onTimeRate: 91, docQuality: 4.5 },
  { lender: 'Regional Trust', deals: 29, avgDays: 32, onTimeRate: 82, docQuality: 4.1 },
  { lender: 'Premier Lending', deals: 41, avgDays: 26, onTimeRate: 89, docQuality: 4.4 }
];

const complianceMetrics = [
  { date: '2024-01', auditScore: 96, violations: 2, riskLevel: 'Low' },
  { date: '2024-02', auditScore: 94, violations: 3, riskLevel: 'Low' },
  { date: '2024-03', auditScore: 97, violations: 1, riskLevel: 'Low' }
];

const pipelineData = [
  { date: '2024-03-01', prospects: 45, contracts: 32, closings: 28 },
  { date: '2024-03-08', prospects: 52, contracts: 38, closings: 31 },
  { date: '2024-03-15', prospects: 48, contracts: 41, closings: 29 },
  { date: '2024-03-22', prospects: 61, contracts: 45, closings: 35 },
  { date: '2024-03-29', prospects: 58, contracts: 47, closings: 38 }
];

const reportTemplates = [
  {
    id: 'monthly-closings',
    name: 'Monthly Closings Summary',
    description: 'Comprehensive monthly performance report',
    category: 'Performance',
    schedule: 'Monthly',
    lastRun: '2024-03-01'
  },
  {
    id: 'revenue-analysis',
    name: 'Revenue Analysis',
    description: 'Revenue breakdown by service type and period',
    category: 'Financial',
    schedule: 'Weekly',
    lastRun: '2024-03-25'
  },
  {
    id: 'pipeline-report',
    name: 'Deal Pipeline Report',
    description: 'Current pipeline status and forecasting',
    category: 'Sales',
    schedule: 'Daily',
    lastRun: '2024-03-28'
  },
  {
    id: 'agent-performance',
    name: 'Agent Performance Scorecard',
    description: 'Individual agent metrics and rankings',
    category: 'Performance',
    schedule: 'Monthly',
    lastRun: '2024-03-01'
  },
  {
    id: 'lender-scorecard',
    name: 'Lender Partnership Scorecard',
    description: 'Lender performance and relationship metrics',
    category: 'Partnerships',
    schedule: 'Quarterly',
    lastRun: '2024-01-01'
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit Report',
    description: 'Regulatory compliance and risk assessment',
    category: 'Compliance',
    schedule: 'Monthly',
    lastRun: '2024-03-01'
  }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('last30days');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const totalRevenue = monthlyClosings.reduce((sum, month) => sum + month.revenue, 0);
  const totalClosings = monthlyClosings.reduce((sum, month) => sum + month.closings, 0);
  const avgDaysToClose = Math.round(monthlyClosings.reduce((sum, month) => sum + month.avgDays, 0) / monthlyClosings.length);
  const openOrders = dealStatusBreakdown.reduce((sum, status) => status.name !== 'Closed' ? sum + status.value : sum, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const exportReport = (reportId: string) => {
    console.log('Exporting report:', reportId);
    // Mock export functionality
  };

  const scheduleReport = (reportId: string) => {
    console.log('Scheduling report:', reportId);
    // Mock schedule functionality
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics & Reporting</h1>
            <p className="text-muted-foreground">Comprehensive business intelligence and performance insights</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="lastyear">Last Year</option>
                <option value="ytd">Year to Date</option>
              </select>
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Custom Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Closings</p>
                  <p className="text-2xl font-bold text-closyr-green">{totalClosings}</p>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% vs last period
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-closyr-green opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Days to Close</p>
                  <p className="text-2xl font-bold text-closyr-blue">{avgDaysToClose}</p>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -8% improvement
                  </p>
                </div>
                <Clock className="h-8 w-8 text-closyr-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-closyr-gold">{formatCurrency(totalRevenue)}</p>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +15% vs last period
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-closyr-gold opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Open Orders</p>
                  <p className="text-2xl font-bold text-purple-400">{openOrders}</p>
                  <p className="text-sm text-purple-400 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Active pipeline
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-400 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Performance */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Monthly Closings & Revenue Trend</CardTitle>
                <CardDescription>Track monthly performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyClosings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis yAxisId="left" stroke="#9CA3AF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? formatCurrency(value as number) : value,
                        name === 'revenue' ? 'Revenue' : name === 'closings' ? 'Closings' : 'Avg Days'
                      ]}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area yAxisId="right" type="monotone" dataKey="revenue" stackId="1" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.3} />
                    <Bar yAxisId="left" dataKey="closings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="avgDays" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Deal Pipeline */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Deal Pipeline Trend</CardTitle>
                <CardDescription>Track deal flow through the pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="prospects" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="contracts" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="closings" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Agent Performance Table */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Agent Performance Scorecard</CardTitle>
                <CardDescription>Individual agent metrics and rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2">Agent</th>
                        <th className="text-center py-3 px-2">Deals</th>
                        <th className="text-center py-3 px-2">Revenue</th>
                        <th className="text-center py-3 px-2">Avg Days</th>
                        <th className="text-center py-3 px-2">Satisfaction</th>
                        <th className="text-center py-3 px-2">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agentPerformance.map((agent, index) => (
                        <tr key={agent.name} className="border-b border-border/50">
                          <td className="py-3 px-2 font-medium">{agent.name}</td>
                          <td className="py-3 px-2 text-center">{agent.deals}</td>
                          <td className="py-3 px-2 text-center text-closyr-gold">{formatCurrency(agent.revenue)}</td>
                          <td className="py-3 px-2 text-center">{agent.avgDays}</td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {agent.satisfaction}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              index === 0 ? 'bg-gold-500/20 text-gold-400' :
                              index === 1 ? 'bg-gray-400/20 text-gray-400' :
                              index === 2 ? 'bg-amber-600/20 text-amber-600' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              #{index + 1}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deal Status Breakdown */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Deal Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={dealStatusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dealStatusBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {dealStatusBreakdown.map((status) => (
                    <div key={status.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        <span>{status.name}</span>
                      </div>
                      <span className="font-medium">{status.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Type */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueByType.map((item, index) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.type}</span>
                        <span className="font-medium">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-closyr-blue"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pre-built Reports */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Pre-built Reports</CardTitle>
                <CardDescription>Quick access to common reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportTemplates.slice(0, 4).map((report) => (
                    <motion.div
                      key={report.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg border border-border/50 hover:border-closyr-blue/30 cursor-pointer smooth-transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => exportReport(report.id)}>
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedReport(report.id)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{report.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted/30 rounded">{report.category}</span>
                        <span>Last run: {new Date(report.lastRun).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  <Button variant="outline" className="w-full gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    View All Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="glassmorphic border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">97%</div>
                    <div className="text-sm text-muted-foreground">Audit Score</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>March 2024</span>
                      <span className="text-green-400">1 violation</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span className="text-green-400">Low</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <FileText className="h-4 w-4" />
                    Full Audit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lender Scorecard */}
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>Lender Partnership Scorecard</CardTitle>
            <CardDescription>Performance metrics for lending partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2">Lender</th>
                    <th className="text-center py-3 px-2">Deals</th>
                    <th className="text-center py-3 px-2">Avg Days</th>
                    <th className="text-center py-3 px-2">On-Time Rate</th>
                    <th className="text-center py-3 px-2">Doc Quality</th>
                    <th className="text-center py-3 px-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {lenderScorecard.map((lender) => (
                    <tr key={lender.lender} className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">{lender.lender}</td>
                      <td className="py-3 px-2 text-center">{lender.deals}</td>
                      <td className="py-3 px-2 text-center">{lender.avgDays}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          lender.onTimeRate >= 90 ? 'bg-green-500/20 text-green-400' :
                          lender.onTimeRate >= 85 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {lender.onTimeRate}%
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {lender.docQuality}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lender.onTimeRate >= 90 && lender.docQuality >= 4.5 ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {lender.onTimeRate >= 90 && lender.docQuality >= 4.5 ? 'Excellent' : 'Good'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground py-4">
          Developed by GoKoncentrate
        </div>
      </div>
    </MainLayout>
  );
}

// Star component for ratings
function Star({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}