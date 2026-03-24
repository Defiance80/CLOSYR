"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Shield, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const fundData = [
  { transaction: 'TX001 - Oak Street', amount: 75000, status: 'held', type: 'earnest_money' },
  { transaction: 'TX002 - Pine Avenue', amount: 42500, status: 'held', type: 'earnest_money' },
  { transaction: 'TX003 - Maple Drive', amount: 89000, status: 'flagged', type: 'earnest_money' },
];

export default function FundsPage() {
  const totalHeld = fundData.reduce((sum, fund) => sum + fund.amount, 0);
  const flaggedFunds = fundData.filter(fund => fund.status === 'flagged');

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Funds Management</h1>
          <p className="text-muted-foreground">Secure escrow fund tracking and management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Funds Held</p>
                  <p className="text-2xl font-bold text-closyr-green">${totalHeld.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-closyr-green" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Flagged Accounts</p>
                  <p className="text-2xl font-bold text-orange-500">{flaggedFunds.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">WatchDog Status</p>
                  <p className="text-sm font-bold text-closyr-green">ACTIVE</p>
                </div>
                <Shield className="h-8 w-8 text-closyr-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fund Tracking */}
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Escrow Fund Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fundData.map((fund, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover:border-closyr-blue/50 smooth-transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{fund.transaction}</p>
                      <p className="text-sm text-muted-foreground capitalize">{fund.type.replace('_', ' ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${fund.amount.toLocaleString()}</p>
                      <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                        fund.status === 'held' ? 'bg-closyr-green/10 text-closyr-green' :
                        'bg-orange-500/10 text-orange-500'
                      }`}>
                        {fund.status === 'held' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {fund.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}