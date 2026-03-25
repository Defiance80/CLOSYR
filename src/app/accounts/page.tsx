"use client";

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  ExternalLink,
  DollarSign,
  TrendingUp,
  Building,
  Shield,
  ChevronDown,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  accountNumber: string;
  name: string;
  type: 'Escrow' | 'Trust' | 'Operating';
  status: 'Active' | 'Pending' | 'Closed';
  balance: number;
  linkedTransactions: string[];
  lastActivity: string;
  accountHolderInfo: {
    name: string;
    email: string;
    phone: string;
  };
  complianceStatus: 'Compliant' | 'Review Required' | 'Non-Compliant';
  transactions: Array<{
    id: string;
    date: string;
    type: 'Deposit' | 'Withdrawal' | 'Wire Transfer' | 'Fee';
    amount: number;
    description: string;
    reference: string;
  }>;
}

const mockAccounts: Account[] = [
  {
    id: '1',
    accountNumber: 'ESC-2024-001',
    name: 'Morrison Property Escrow',
    type: 'Escrow',
    status: 'Active',
    balance: 485000.00,
    linkedTransactions: ['TXN-2024-001'],
    lastActivity: '2024-03-24',
    accountHolderInfo: {
      name: 'Sarah Morrison',
      email: 'sarah.morrison@email.com',
      phone: '(555) 123-4567'
    },
    complianceStatus: 'Compliant',
    transactions: [
      {
        id: 't1',
        date: '2024-03-24',
        type: 'Deposit',
        amount: 485000.00,
        description: 'Initial earnest money deposit',
        reference: 'REF-001'
      }
    ]
  },
  {
    id: '2',
    accountNumber: 'ESC-2024-002',
    name: 'Johnson Commercial Deal',
    type: 'Escrow',
    status: 'Active',
    balance: 750000.00,
    linkedTransactions: ['TXN-2024-002'],
    lastActivity: '2024-03-23',
    accountHolderInfo: {
      name: 'Michael Johnson',
      email: 'm.johnson@bizmail.com',
      phone: '(555) 987-6543'
    },
    complianceStatus: 'Compliant',
    transactions: [
      {
        id: 't2',
        date: '2024-03-23',
        type: 'Deposit',
        amount: 750000.00,
        description: 'Commercial purchase deposit',
        reference: 'REF-002'
      }
    ]
  },
  {
    id: '3',
    accountNumber: 'ESC-2024-003',
    name: 'Davis Residential Escrow',
    type: 'Escrow',
    status: 'Pending',
    balance: 25000.00,
    linkedTransactions: ['TXN-2024-003'],
    lastActivity: '2024-03-22',
    accountHolderInfo: {
      name: 'Emily Davis',
      email: 'emily.davis@gmail.com',
      phone: '(555) 456-7890'
    },
    complianceStatus: 'Review Required',
    transactions: [
      {
        id: 't3',
        date: '2024-03-22',
        type: 'Deposit',
        amount: 25000.00,
        description: 'Earnest money deposit',
        reference: 'REF-003'
      }
    ]
  },
  {
    id: '4',
    accountNumber: 'TRS-2024-001',
    name: 'Client Trust Account',
    type: 'Trust',
    status: 'Active',
    balance: 2500000.00,
    linkedTransactions: ['Multiple'],
    lastActivity: '2024-03-25',
    accountHolderInfo: {
      name: 'CLOSYR Trust Department',
      email: 'trust@closyr.ai',
      phone: '(555) 100-2000'
    },
    complianceStatus: 'Compliant',
    transactions: [
      {
        id: 't4',
        date: '2024-03-25',
        type: 'Wire Transfer',
        amount: -125000.00,
        description: 'Disbursement for Davis closing',
        reference: 'WIRE-001'
      },
      {
        id: 't5',
        date: '2024-03-24',
        type: 'Deposit',
        amount: 350000.00,
        description: 'Trust fund allocation',
        reference: 'TRS-DEP-001'
      }
    ]
  },
  {
    id: '5',
    accountNumber: 'OPR-2024-001',
    name: 'CLOSYR Operating Account',
    type: 'Operating',
    status: 'Active',
    balance: 125000.00,
    linkedTransactions: [],
    lastActivity: '2024-03-25',
    accountHolderInfo: {
      name: 'CLOSYR Operations',
      email: 'operations@closyr.ai',
      phone: '(555) 100-1000'
    },
    complianceStatus: 'Compliant',
    transactions: [
      {
        id: 't6',
        date: '2024-03-25',
        type: 'Fee',
        amount: 2500.00,
        description: 'Escrow service fees',
        reference: 'FEE-001'
      },
      {
        id: 't7',
        date: '2024-03-24',
        type: 'Withdrawal',
        amount: -5000.00,
        description: 'Office supplies and maintenance',
        reference: 'EXP-001'
      }
    ]
  },
  {
    id: '6',
    accountNumber: 'ESC-2024-004',
    name: 'Wilson Family Trust Escrow',
    type: 'Escrow',
    status: 'Active',
    balance: 875000.00,
    linkedTransactions: ['TXN-2024-004'],
    lastActivity: '2024-03-21',
    accountHolderInfo: {
      name: 'Robert Wilson',
      email: 'rwilson@familytrust.org',
      phone: '(555) 234-5678'
    },
    complianceStatus: 'Compliant',
    transactions: []
  },
  {
    id: '7',
    accountNumber: 'ESC-2024-005',
    name: 'Anderson Investment Group',
    type: 'Escrow',
    status: 'Active',
    balance: 1250000.00,
    linkedTransactions: ['TXN-2024-005'],
    lastActivity: '2024-03-20',
    accountHolderInfo: {
      name: 'Jennifer Anderson',
      email: 'j.anderson@invgroup.com',
      phone: '(555) 345-6789'
    },
    complianceStatus: 'Compliant',
    transactions: []
  },
  {
    id: '8',
    accountNumber: 'ESC-2024-006',
    name: 'Chen LLC Commercial',
    type: 'Escrow',
    status: 'Closed',
    balance: 0.00,
    linkedTransactions: ['TXN-2024-006'],
    lastActivity: '2024-03-15',
    accountHolderInfo: {
      name: 'David Chen',
      email: 'dchen@chenllc.com',
      phone: '(555) 456-7891'
    },
    complianceStatus: 'Compliant',
    transactions: [
      {
        id: 't8',
        date: '2024-03-15',
        type: 'Wire Transfer',
        amount: -920000.00,
        description: 'Final disbursement - closing completed',
        reference: 'FINAL-001'
      }
    ]
  }
];

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || account.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || account.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalEscrow = mockAccounts
    .filter(acc => acc.type === 'Escrow')
    .reduce((sum, acc) => sum + acc.balance, 0);
    
  const totalTrust = mockAccounts
    .filter(acc => acc.type === 'Trust')
    .reduce((sum, acc) => sum + acc.balance, 0);
    
  const totalOperating = mockAccounts
    .filter(acc => acc.type === 'Operating')
    .reduce((sum, acc) => sum + acc.balance, 0);
    
  const totalAll = totalEscrow + totalTrust + totalOperating;

  const getStatusColor = (status: Account['status']) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Closed': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getComplianceColor = (status: Account['complianceStatus']) => {
    switch (status) {
      case 'Compliant': return 'text-green-400';
      case 'Review Required': return 'text-yellow-400';
      case 'Non-Compliant': return 'text-red-400';
    }
  };

  const getTypeColor = (type: Account['type']) => {
    switch (type) {
      case 'Escrow': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Trust': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'Operating': return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Accounts</h1>
            <p className="text-muted-foreground">Manage escrow, trust, and operating accounts</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Account
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Escrow</p>
                  <p className="text-2xl font-bold text-closyr-blue">${totalEscrow.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-closyr-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Trust</p>
                  <p className="text-2xl font-bold text-purple-400">${totalTrust.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Operating</p>
                  <p className="text-2xl font-bold text-closyr-green">${totalOperating.toLocaleString()}</p>
                </div>
                <Building className="h-8 w-8 text-closyr-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total All</p>
                  <p className="text-2xl font-bold text-closyr-gold">${totalAll.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-closyr-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="glassmorphic">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                >
                  <option value="all">All Types</option>
                  <option value="Escrow">Escrow</option>
                  <option value="Trust">Trust</option>
                  <option value="Operating">Operating</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounts Table */}
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>Account List ({filteredAccounts.length} accounts)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-muted-foreground">Account #</th>
                    <th className="p-4 font-medium text-muted-foreground">Account Name</th>
                    <th className="p-4 font-medium text-muted-foreground">Type</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Balance</th>
                    <th className="p-4 font-medium text-muted-foreground">Linked Transactions</th>
                    <th className="p-4 font-medium text-muted-foreground">Last Activity</th>
                    <th className="p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <>
                      <motion.tr
                        key={account.id}
                        className="border-b border-border/50 hover:bg-white/5 smooth-transition cursor-pointer"
                        onClick={() => setExpandedAccount(expandedAccount === account.id ? null : account.id)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {expandedAccount === account.id ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="font-mono text-sm">{account.accountNumber}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-muted-foreground">{account.accountHolderInfo.name}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn("px-2 py-1 text-xs font-medium rounded-md border", getTypeColor(account.type))}>
                            {account.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn("px-2 py-1 text-xs font-medium rounded-md border", getStatusColor(account.status))}>
                            {account.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold">${account.balance.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {account.linkedTransactions.map((txn, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs bg-closyr-blue/20 text-closyr-blue rounded">
                                {txn}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {account.lastActivity}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>

                      {/* Expanded Account Details */}
                      <AnimatePresence>
                        {expandedAccount === account.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td colSpan={8} className="p-0">
                              <div className="bg-background/30 border-t border-border/50 p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                  {/* Account Info */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Account Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Account Number:</span>
                                        <span className="font-mono">{account.accountNumber}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type:</span>
                                        <span>{account.type}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status:</span>
                                        <span className={getStatusColor(account.status).split(' ')[0]}>{account.status}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Compliance:</span>
                                        <span className={getComplianceColor(account.complianceStatus)}>{account.complianceStatus}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Account Holder Info */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Account Holder</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Name:</span>
                                        <span>{account.accountHolderInfo.name}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Email:</span>
                                        <span className="text-closyr-blue">{account.accountHolderInfo.email}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Phone:</span>
                                        <span>{account.accountHolderInfo.phone}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Recent Transactions */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Recent Transactions</h4>
                                    {account.transactions.length > 0 ? (
                                      <div className="space-y-2">
                                        {account.transactions.slice(0, 3).map((transaction) => (
                                          <div key={transaction.id} className="flex justify-between items-center text-sm p-2 bg-background/50 rounded">
                                            <div>
                                              <p className="font-medium">{transaction.type}</p>
                                              <p className="text-xs text-muted-foreground">{transaction.date}</p>
                                            </div>
                                            <span className={cn("font-semibold", transaction.amount >= 0 ? "text-green-400" : "text-red-400")}>
                                              {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                                            </span>
                                          </div>
                                        ))}
                                        {account.transactions.length > 3 && (
                                          <Button variant="ghost" size="sm" className="w-full text-closyr-blue">
                                            View All Transactions
                                          </Button>
                                        )}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No recent transactions</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Create Account Modal */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
              onClick={() => setShowCreateForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background/95 border border-border rounded-lg shadow-xl glassmorphic-dark max-w-md w-full"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Create New Account</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Account Name</label>
                      <input
                        type="text"
                        placeholder="Enter account name"
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Account Type</label>
                      <select className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition">
                        <option value="">Select type</option>
                        <option value="Escrow">Escrow</option>
                        <option value="Trust">Trust</option>
                        <option value="Operating">Operating</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Account Holder Name</label>
                      <input
                        type="text"
                        placeholder="Enter account holder name"
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Create Account
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Developed by GoKoncentrate
          </p>
        </div>
      </div>
    </MainLayout>
  );
}