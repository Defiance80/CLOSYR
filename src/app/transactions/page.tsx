"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Shield,
  TrendingUp,
  Eye,
  ExternalLink
} from 'lucide-react';

// Mock transaction data
const transactions = [
  {
    id: 'TX001',
    address: '123 Oak Street, Austin TX',
    price: 750000,
    status: 'under_contract',
    healthScore: 94,
    daysToClose: 12,
    progress: 75,
    parties: {
      buyer: { name: 'Sarah Johnson', email: 'sarah@email.com' },
      seller: { name: 'Mike Chen', email: 'mike@email.com' },
      lender: { name: 'First National Bank', contact: 'Tom Wilson' },
      agent: { name: 'Lisa Rodriguez', phone: '(555) 123-4567' }
    }
  },
  {
    id: 'TX002', 
    address: '456 Pine Avenue, Dallas TX',
    price: 425000,
    status: 'pending_docs',
    healthScore: 78,
    daysToClose: 18,
    progress: 60,
    parties: {
      buyer: { name: 'David Kim', email: 'david@email.com' },
      seller: { name: 'Emma Wilson', email: 'emma@email.com' },
      lender: { name: 'Community Credit Union', contact: 'Jane Smith' },
      agent: { name: 'Carlos Martinez', phone: '(555) 987-6543' }
    }
  },
  {
    id: 'TX003',
    address: '789 Maple Drive, Houston TX', 
    price: 890000,
    status: 'at_risk',
    healthScore: 45,
    daysToClose: 5,
    progress: 85,
    parties: {
      buyer: { name: 'Jennifer Davis', email: 'jennifer@email.com' },
      seller: { name: 'Robert Taylor', email: 'robert@email.com' },
      lender: { name: 'Metro Bank', contact: 'Steve Johnson' },
      agent: { name: 'Maria Garcia', phone: '(555) 456-7890' }
    }
  }
];

const timeline = [
  { date: '2024-03-20', title: 'Contract Signed', status: 'completed', details: 'Purchase agreement executed by all parties' },
  { date: '2024-03-22', title: 'Earnest Money Deposited', status: 'completed', details: '$15,000 deposited into escrow' },
  { date: '2024-03-25', title: 'Inspection Period', status: 'completed', details: 'Home inspection completed, minor items noted' },
  { date: '2024-03-28', title: 'Appraisal Ordered', status: 'completed', details: 'Bank appraisal scheduled and completed' },
  { date: '2024-04-02', title: 'Title Search', status: 'in_progress', details: 'Title company reviewing ownership history' },
  { date: '2024-04-05', title: 'Final Walkthrough', status: 'pending', details: 'Scheduled 24h before closing' },
  { date: '2024-04-08', title: 'Closing', status: 'pending', details: 'Final document signing and fund transfer' },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'text-closyr-green';
    case 'in_progress': return 'text-closyr-blue';
    case 'pending': return 'text-muted-foreground';
    default: return 'text-muted-foreground';
  }
}

function getStatusBg(status: string) {
  switch (status) {
    case 'completed': return 'bg-closyr-green/20';
    case 'in_progress': return 'bg-closyr-blue/20';
    case 'pending': return 'bg-muted/30';
    default: return 'bg-muted/30';
  }
}

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(transactions[0]);
  const [showMobileList, setShowMobileList] = useState(true);

  return (
    <MainLayout>
      <div className="h-full flex flex-col lg:flex-row">
        {/* Mobile Header - Hidden on desktop */}
        <div className="lg:hidden p-3 sm:p-4 border-b border-border bg-background/95">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Transactions</h1>
          <div className="flex items-center gap-2 sm:gap-3 text-sm text-muted-foreground">
            <span>{transactions.length} Active Deals</span>
            <span>•</span>
            <span>Health Score: {selectedTransaction.healthScore}</span>
          </div>
        </div>

        {/* Left Panel - Deal Summary */}
        <div className={`${showMobileList ? 'block' : 'hidden lg:block'} w-full lg:w-80 border-r border-border bg-background/95 glassmorphic-dark p-3 sm:p-4 overflow-y-auto`}>
          <div className="space-y-3 sm:space-y-4">
            <div className="hidden lg:block">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Active Transactions</h2>
            </div>
            
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 sm:p-4 rounded-lg border cursor-pointer smooth-transition min-h-[44px] ${
                  selectedTransaction.id === tx.id
                    ? 'border-closyr-blue bg-closyr-blue/10'
                    : 'border-border hover:border-closyr-blue/50 hover:bg-accent/20'
                }`}
                onClick={() => {
                  setSelectedTransaction(tx);
                  setShowMobileList(false);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-closyr-blue">{tx.id}</span>
                  <div className={`text-lg font-bold ${
                    tx.healthScore >= 80 ? 'text-closyr-green' :
                    tx.healthScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {tx.healthScore}
                  </div>
                </div>
                
                <p className="text-sm font-medium mb-2">{tx.address}</p>
                <p className="text-lg font-bold text-closyr-gold mb-2">
                  ${tx.price.toLocaleString()}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{tx.progress}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-closyr-blue"
                      style={{ width: `${tx.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {tx.daysToClose} days
                  </span>
                  <span className="capitalize">{tx.status.replace('_', ' ')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Panel - Timeline & Activity */}
        <div className={`${showMobileList ? 'hidden lg:block' : 'block'} flex-1 p-3 sm:p-6 overflow-y-auto`}>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Mobile Back Button */}
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMobileList(true)}
                className="mb-4"
              >
                ← Back to Deals
              </Button>
            </div>

            {/* Transaction Header */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold mb-1 truncate">{selectedTransaction.address}</h1>
                  <p className="text-lg sm:text-xl text-closyr-gold font-semibold">
                    ${selectedTransaction.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-muted-foreground">Deal Health</p>
                    <p className={`text-xl sm:text-2xl font-bold ${
                      selectedTransaction.healthScore >= 80 ? 'text-closyr-green' :
                      selectedTransaction.healthScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {selectedTransaction.healthScore}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto min-h-[44px]">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transaction Progress</span>
                  <span>{selectedTransaction.progress}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-closyr-blue to-closyr-green smooth-transition"
                    style={{ width: `${selectedTransaction.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  Transaction Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  {timeline.map((event, index) => (
                    <div key={index} className="flex gap-3 sm:gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          event.status === 'completed' ? 'bg-closyr-green border-closyr-green' :
                          event.status === 'in_progress' ? 'bg-closyr-blue border-closyr-blue' :
                          'bg-background border-muted-foreground'
                        }`} />
                        {index < timeline.length - 1 && (
                          <div className={`w-0.5 h-8 sm:h-12 mt-2 ${
                            event.status === 'completed' ? 'bg-closyr-green' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-4 sm:pb-6 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1 sm:gap-0">
                          <h4 className="font-medium text-sm sm:text-base">{event.title}</h4>
                          <span className="text-xs sm:text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{event.details}</p>
                        <div className={`inline-flex px-2 py-1 rounded text-xs ${getStatusBg(event.status)} ${getStatusColor(event.status)}`}>
                          {event.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Party Communication */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  Recent Communications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 rounded-lg bg-closyr-blue/10">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 mb-2">
                      <span className="font-medium text-sm sm:text-base">Title Company Update</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Title search complete. One minor lien found and being resolved.</p>
                  </div>
                  
                  <div className="p-3 sm:p-4 rounded-lg bg-closyr-green/10">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 mb-2">
                      <span className="font-medium text-sm sm:text-base">Lender Approval</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Final loan approval received. Clear to close conditions met.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Actions & Insights */}
        <div className={`${showMobileList ? 'hidden lg:block' : 'block lg:block'} w-full lg:w-80 lg:border-l border-border bg-background/95 glassmorphic-dark p-3 sm:p-4 overflow-y-auto`}>
          <div className="space-y-4 sm:space-y-6">
            {/* Parties - Mobile: Horizontal scroll, Desktop: Stacked */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Parties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <div className="p-3 rounded-lg bg-accent/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Buyer</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 min-h-[24px] min-w-[24px]">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm truncate">{selectedTransaction.parties.buyer.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{selectedTransaction.parties.buyer.email}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-accent/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Seller</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 min-h-[24px] min-w-[24px]">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm truncate">{selectedTransaction.parties.seller.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{selectedTransaction.parties.seller.email}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-accent/30">
                    <span className="text-sm font-medium">Lender</span>
                    <p className="text-sm truncate">{selectedTransaction.parties.lender.name}</p>
                    <p className="text-xs text-muted-foreground truncate">Contact: {selectedTransaction.parties.lender.contact}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-accent/30">
                    <span className="text-sm font-medium">Agent</span>
                    <p className="text-sm truncate">{selectedTransaction.parties.agent.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{selectedTransaction.parties.agent.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full justify-start gap-2 min-h-[44px]">
                  <FileText className="h-4 w-4" />
                  Upload Document
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2 min-h-[44px]">
                  <MessageSquare className="h-4 w-4" />
                  Send Update
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2 min-h-[44px]">
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
                
                <Button variant="gold" className="w-full justify-start gap-2 min-h-[44px]">
                  <DollarSign className="h-4 w-4" />
                  Request Funds
                </Button>
              </CardContent>
            </Card>

            {/* WatchDog Alerts */}
            <Card className="glassmorphic border-red-500/20">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-red-500">
                  <Shield className="h-4 w-4" />
                  WatchDog Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">High Risk</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Wire instructions changed within 48h of closing - requires verification
                  </p>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto min-h-[44px]">
                    Investigate
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-500">Attention</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Document deadline approaching - 2 days remaining
                  </p>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto min-h-[44px]">
                    Follow Up
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    📈 This transaction is <span className="text-closyr-green font-medium">15% ahead</span> of average timeline
                  </p>
                  <p className="text-muted-foreground">
                    💡 Consider scheduling closing 2 days earlier than planned
                  </p>
                  <p className="text-muted-foreground">
                    ⚠️ Lender typically requires 48h notice for funding
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}