"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Receipt,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Send,
  Eye,
  Download,
  Plus,
  Calendar,
  Calculator,
  Upload,
  RefreshCw,
  Shield,
  Edit,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface TaxFiling {
  id: string;
  sellerName: string;
  sellerTin: string;
  tinVerified: boolean;
  propertyAddress: string;
  saleDate: Date;
  grossProceeds: number;
  status: 'draft' | 'ready' | 'submitted' | 'accepted' | 'rejected';
  filingDeadline: Date;
  submissionDate?: Date;
  rejectionReason?: string;
  dealId: string;
}

const taxFilings: TaxFiling[] = [
  {
    id: '1099s-001',
    sellerName: 'Sarah Johnson',
    sellerTin: 'XXX-XX-1234',
    tinVerified: true,
    propertyAddress: '123 Oak Street, Austin TX 78701',
    saleDate: new Date('2024-03-15'),
    grossProceeds: 750000,
    status: 'ready',
    filingDeadline: new Date('2025-01-31'),
    dealId: 'TX001'
  },
  {
    id: '1099s-002',
    sellerName: 'Mike Chen',
    sellerTin: 'XXX-XX-5678',
    tinVerified: false,
    propertyAddress: '456 Pine Avenue, Dallas TX 75201',
    saleDate: new Date('2024-03-20'),
    grossProceeds: 425000,
    status: 'draft',
    filingDeadline: new Date('2025-01-31'),
    dealId: 'TX002'
  },
  {
    id: '1099s-003',
    sellerName: 'Emma Wilson',
    sellerTin: 'XXX-XX-9012',
    tinVerified: true,
    propertyAddress: '789 Maple Drive, Houston TX 77001',
    saleDate: new Date('2024-02-28'),
    grossProceeds: 890000,
    status: 'submitted',
    filingDeadline: new Date('2025-01-31'),
    submissionDate: new Date('2024-03-20'),
    dealId: 'TX003'
  },
  {
    id: '1099s-004',
    sellerName: 'Robert Taylor',
    sellerTin: 'XXX-XX-3456',
    tinVerified: true,
    propertyAddress: '321 Elm Street, San Antonio TX 78201',
    saleDate: new Date('2024-03-10'),
    grossProceeds: 650000,
    status: 'accepted',
    filingDeadline: new Date('2025-01-31'),
    submissionDate: new Date('2024-03-18'),
    dealId: 'TX004'
  },
  {
    id: '1099s-005',
    sellerName: 'Jennifer Davis',
    sellerTin: 'XXX-XX-7890',
    tinVerified: false,
    propertyAddress: '654 Cedar Lane, Fort Worth TX 76101',
    saleDate: new Date('2024-03-05'),
    grossProceeds: 520000,
    status: 'rejected',
    filingDeadline: new Date('2025-01-31'),
    submissionDate: new Date('2024-03-15'),
    rejectionReason: 'Invalid TIN format',
    dealId: 'TX005'
  }
];

const monthlyFilings = [
  { month: 'Jan', submitted: 45, accepted: 42, rejected: 3 },
  { month: 'Feb', submitted: 52, accepted: 48, rejected: 4 },
  { month: 'Mar', submitted: 38, accepted: 35, rejected: 3 },
];

const statusDistribution = [
  { name: 'Draft', value: 25, color: '#94A3B8' },
  { name: 'Ready', value: 30, color: '#3B82F6' },
  { name: 'Submitted', value: 20, color: '#F59E0B' },
  { name: 'Accepted', value: 20, color: '#10B981' },
  { name: 'Rejected', value: 5, color: '#EF4444' },
];

const annualStats = [
  { year: '2022', filings: 485, totalProceeds: 245000000 },
  { year: '2023', filings: 567, totalProceeds: 298000000 },
  { year: '2024', filings: 134, totalProceeds: 87500000 }, // YTD
];

export default function TaxPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedFiling, setSelectedFiling] = useState<TaxFiling | null>(null);

  const totalFilings = taxFilings.length;
  const readyToSubmit = taxFilings.filter(filing => filing.status === 'ready').length;
  const pendingVerification = taxFilings.filter(filing => !filing.tinVerified).length;
  const daysToDeadline = Math.ceil((new Date('2025-01-31').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'text-green-400';
      case 'submitted': return 'text-yellow-400';
      case 'ready': return 'text-blue-400';
      case 'rejected': return 'text-red-400';
      case 'draft': return 'text-gray-400';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500/20';
      case 'submitted': return 'bg-yellow-500/20';
      case 'ready': return 'bg-blue-500/20';
      case 'rejected': return 'bg-red-500/20';
      case 'draft': return 'bg-gray-500/20';
      default: return 'bg-muted/20';
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">1099-S Tax Filing</h1>
            <p className="text-muted-foreground">Manage tax filings for real estate transactions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Bulk Import
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Filing
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total 1099-S Forms</p>
                  <p className="text-2xl font-bold text-closyr-blue">{totalFilings}</p>
                </div>
                <Receipt className="h-8 w-8 text-closyr-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ready to Submit</p>
                  <p className="text-2xl font-bold text-closyr-green">{readyToSubmit}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-closyr-green opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">TIN Verification</p>
                  <p className="text-2xl font-bold text-yellow-400">{pendingVerification}</p>
                </div>
                <Shield className="h-8 w-8 text-yellow-400 opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Filing Deadline</p>
                  <p className="text-2xl font-bold text-closyr-gold">{daysToDeadline}d</p>
                </div>
                <Calendar className="h-8 w-8 text-closyr-gold opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Filings */}
            <Card className="glassmorphic">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    1099-S Filings
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
                <CardDescription>Review and manage tax form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxFilings.map((filing) => (
                    <motion.div
                      key={filing.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 cursor-pointer smooth-transition"
                      onClick={() => setSelectedFiling(filing)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{filing.sellerName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(filing.status)} ${getStatusColor(filing.status)}`}>
                              {filing.status.toUpperCase()}
                            </span>
                            {!filing.tinVerified && (
                              <div className="flex items-center gap-1 text-yellow-400">
                                <AlertTriangle className="h-3 w-3" />
                                <span className="text-xs">TIN Not Verified</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{filing.propertyAddress}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Form ID: {filing.id}</span>
                            <span>Sale Date: {filing.saleDate.toLocaleDateString()}</span>
                            <span>Deal: {filing.dealId}</span>
                          </div>

                          {filing.rejectionReason && (
                            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                              <p className="text-sm text-red-400">Rejected: {filing.rejectionReason}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-closyr-gold">{formatCurrency(filing.grossProceeds)}</p>
                          <p className="text-sm text-muted-foreground">Gross Proceeds</p>
                          
                          <div className="flex gap-1 mt-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {filing.status === 'ready' && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Filing Activity */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Monthly Filing Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyFilings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="submitted" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="accepted" fill="#10B981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="rejected" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Annual Summary */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Annual Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {annualStats.map((stat) => (
                    <div key={stat.year} className="p-4 rounded-lg bg-accent/30 text-center">
                      <h3 className="text-2xl font-bold text-closyr-blue">{stat.year}</h3>
                      <p className="text-lg font-semibold">{stat.filings} Filings</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(stat.totalProceeds)} Total Proceeds
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Status Distribution */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Filing Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {statusDistribution.map((status) => (
                    <div key={status.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        <span>{status.name}</span>
                      </div>
                      <span className="font-medium">{status.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="glassmorphic border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">Filing Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-yellow-500/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">2024 Tax Year</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Filing deadline: January 31, 2025
                    </p>
                    <p className="text-sm font-medium text-yellow-400">
                      {daysToDeadline} days remaining
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-accent/30">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium">2023 Tax Year</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All filings completed
                    </p>
                    <p className="text-sm font-medium text-green-400">
                      567 forms submitted
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Create New 1099-S
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Send className="h-4 w-4" />
                  Batch Submit Ready
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Verify All TINs
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Export for E-File
                </Button>

                <Button variant="gold" className="w-full justify-start gap-2">
                  <Calculator className="h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="glassmorphic border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">IRS E-File Authorized</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">TIN Validation Enabled</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Auto-backup Configured</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Next Compliance Review: June 2024</span>
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