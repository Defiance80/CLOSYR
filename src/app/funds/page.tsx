"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertTriangle,
  Receipt,
  CreditCard,
  Banknote,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface TrustAccount {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  balance: number;
  reconciled: boolean;
  lastReconciliation: Date;
  variance: number;
}

interface LedgerEntry {
  id: string;
  date: Date;
  description: string;
  dealId: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  balance: number;
  status: 'cleared' | 'pending' | 'hold';
  checkNumber?: string;
  wireReference?: string;
}

interface Disbursement {
  id: string;
  dealId: string;
  party: string;
  amount: number;
  method: 'wire' | 'check' | 'ach';
  status: 'pending' | 'processed' | 'failed';
  scheduledDate: Date;
  description: string;
}

const trustAccounts: TrustAccount[] = [
  {
    id: 'trust-1',
    name: 'Main Operating Trust',
    accountNumber: '****-1234',
    bank: 'First National Bank',
    balance: 2450000,
    reconciled: true,
    lastReconciliation: new Date(Date.now() - 24 * 60 * 60 * 1000),
    variance: 0
  },
  {
    id: 'trust-2',
    name: 'High Value Escrow',
    accountNumber: '****-5678',
    bank: 'Metro Commercial Bank',
    balance: 5750000,
    reconciled: false,
    lastReconciliation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    variance: 2500
  },
  {
    id: 'trust-3',
    name: 'Tax Escrow Account',
    accountNumber: '****-9012',
    bank: 'Community Trust Bank',
    balance: 850000,
    reconciled: true,
    lastReconciliation: new Date(Date.now() - 12 * 60 * 60 * 1000),
    variance: 0
  }
];

const ledgerEntries: LedgerEntry[] = [
  {
    id: 'le-1',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: 'Earnest Money - Morrison Deal',
    dealId: 'TX001',
    type: 'deposit',
    amount: 15000,
    balance: 2450000,
    status: 'cleared',
    checkNumber: 'CHK-1234'
  },
  {
    id: 'le-2',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    description: 'Down Payment - Johnson Deal',
    dealId: 'TX002',
    type: 'deposit',
    amount: 85000,
    balance: 2435000,
    status: 'pending',
    wireReference: 'WR-789456'
  },
  {
    id: 'le-3',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000),
    description: 'Commission Payment - Agent',
    dealId: 'TX003',
    type: 'withdrawal',
    amount: -12500,
    balance: 2350000,
    status: 'cleared',
    checkNumber: 'CHK-1235'
  },
  {
    id: 'le-4',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    description: 'Title Insurance Premium',
    dealId: 'TX004',
    type: 'withdrawal',
    amount: -3250,
    balance: 2362500,
    status: 'hold'
  },
  {
    id: 'le-5',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    description: 'Closing Proceeds Transfer',
    dealId: 'TX005',
    type: 'transfer',
    amount: 450000,
    balance: 2365750,
    status: 'cleared',
    wireReference: 'WR-123789'
  }
];

const disbursements: Disbursement[] = [
  {
    id: 'disb-1',
    dealId: 'TX001',
    party: 'Sarah Johnson (Buyer)',
    amount: 125000,
    method: 'wire',
    status: 'pending',
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Closing proceeds disbursement'
  },
  {
    id: 'disb-2',
    dealId: 'TX002',
    party: 'Mike Chen (Seller)',
    amount: 287500,
    method: 'wire',
    status: 'pending',
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    description: 'Sale proceeds after closing'
  },
  {
    id: 'disb-3',
    dealId: 'TX001',
    party: 'Lisa Rodriguez (Agent)',
    amount: 8750,
    method: 'check',
    status: 'processed',
    scheduledDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    description: 'Real estate commission'
  },
  {
    id: 'disb-4',
    dealId: 'TX003',
    party: 'First National Title',
    amount: 2400,
    method: 'ach',
    status: 'pending',
    scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    description: 'Title insurance premium'
  }
];

const balanceHistory = [
  { date: '2024-03-20', balance: 2100000 },
  { date: '2024-03-21', balance: 2250000 },
  { date: '2024-03-22', balance: 2180000 },
  { date: '2024-03-23', balance: 2350000 },
  { date: '2024-03-24', balance: 2420000 },
  { date: '2024-03-25', balance: 2450000 },
];

const monthlyStats = [
  { month: 'Jan', deposits: 1800000, disbursements: 1650000 },
  { month: 'Feb', deposits: 2100000, disbursements: 1950000 },
  { month: 'Mar', deposits: 2450000, disbursements: 2200000 },
];

const fundStatus = [
  { name: 'Cleared', value: 85, color: '#10B981' },
  { name: 'Pending', value: 12, color: '#F59E0B' },
  { name: 'Hold', value: 3, color: '#EF4444' },
];

export default function AccountingPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedAccount, setSelectedAccount] = useState(trustAccounts[0]);

  const totalBalance = trustAccounts.reduce((sum, account) => sum + account.balance, 0);
  const pendingAmount = ledgerEntries
    .filter(entry => entry.status === 'pending')
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
  const totalDisbursements = disbursements
    .filter(disb => disb.status === 'pending')
    .reduce((sum, disb) => sum + disb.amount, 0);

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
      case 'cleared':
      case 'reconciled':
      case 'processed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'hold':
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'cleared':
      case 'reconciled':
      case 'processed':
        return 'bg-green-500/20';
      case 'pending':
        return 'bg-yellow-500/20';
      case 'hold':
      case 'failed':
        return 'bg-red-500/20';
      default:
        return 'bg-muted/20';
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trust Account Management</h1>
            <p className="text-muted-foreground">Monitor and reconcile escrow accounts</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reconcile
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Trust Balance</p>
                  <p className="text-2xl font-bold text-closyr-green">{formatCurrency(totalBalance)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-closyr-green opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Deposits</p>
                  <p className="text-2xl font-bold text-yellow-400">{formatCurrency(pendingAmount)}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400 opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Disbursements</p>
                  <p className="text-2xl font-bold text-closyr-blue">{formatCurrency(totalDisbursements)}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-closyr-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reconciliation Status</p>
                  <p className="text-2xl font-bold text-closyr-gold">
                    {trustAccounts.filter(acc => acc.reconciled).length}/{trustAccounts.length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-closyr-gold opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trust Accounts */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Trust Accounts
                </CardTitle>
                <CardDescription>Monitor account balances and reconciliation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trustAccounts.map((account) => (
                    <motion.div
                      key={account.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-lg border cursor-pointer smooth-transition ${
                        selectedAccount.id === account.id
                          ? 'border-closyr-blue bg-closyr-blue/10'
                          : 'border-border/50 hover:border-closyr-blue/30'
                      }`}
                      onClick={() => setSelectedAccount(account)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{account.name}</h3>
                          <p className="text-sm text-muted-foreground">{account.bank} • {account.accountNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-closyr-green">{formatCurrency(account.balance)}</p>
                          {account.variance !== 0 && (
                            <p className="text-sm text-red-400">Variance: {formatCurrency(account.variance)}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {account.reconciled ? (
                            <div className="flex items-center gap-1 text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              Reconciled
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <AlertTriangle className="h-4 w-4" />
                              Needs Reconciliation
                            </div>
                          )}
                        </div>
                        <span className="text-muted-foreground">
                          Last: {account.lastReconciliation.toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Balance Trend */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Balance History - {selectedAccount.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={balanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Balance']}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="glassmorphic">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Recent Ledger Entries
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Search className="h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ledgerEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      whileHover={{ scale: 1.005 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 smooth-transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              entry.type === 'deposit' ? 'bg-green-500/20' :
                              entry.type === 'withdrawal' ? 'bg-red-500/20' : 'bg-blue-500/20'
                            }`}>
                              {entry.type === 'deposit' ? (
                                <TrendingUp className="h-4 w-4 text-green-400" />
                              ) : entry.type === 'withdrawal' ? (
                                <TrendingDown className="h-4 w-4 text-red-400" />
                              ) : (
                                <RefreshCw className="h-4 w-4 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{entry.description}</p>
                              <p className="text-sm text-muted-foreground">
                                Deal: {entry.dealId} • {entry.date.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <span className={`px-2 py-1 rounded-full ${getStatusBg(entry.status)} ${getStatusColor(entry.status)}`}>
                              {entry.status.toUpperCase()}
                            </span>
                            {entry.checkNumber && (
                              <span className="text-muted-foreground">Check: {entry.checkNumber}</span>
                            )}
                            {entry.wireReference && (
                              <span className="text-muted-foreground">Wire: {entry.wireReference}</span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`text-xl font-bold ${
                            entry.amount > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {entry.amount > 0 ? '+' : ''}{formatCurrency(entry.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Balance: {formatCurrency(entry.balance)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Fund Status Distribution */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Fund Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={fundStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fundStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {fundStatus.map((status) => (
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

            {/* Pending Disbursements */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Pending Disbursements</CardTitle>
                <CardDescription>Scheduled payments queue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disbursements.filter(disb => disb.status === 'pending').map((disbursement) => (
                    <div key={disbursement.id} className="p-3 rounded-lg border border-border/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{disbursement.party}</p>
                          <p className="text-xs text-muted-foreground">{disbursement.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-closyr-green">{formatCurrency(disbursement.amount)}</p>
                          <p className="text-xs text-muted-foreground">{disbursement.method.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {disbursement.scheduledDate.toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Process
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), '']}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="deposits" fill="#10B981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="disbursements" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full justify-start gap-2">
                  <Upload className="h-4 w-4" />
                  Import Bank Statement
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Export Ledger
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Run Reconciliation
                </Button>
                
                <Button variant="gold" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
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