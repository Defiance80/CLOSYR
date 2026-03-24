"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Plus,
  Search,
  Filter,
  Activity,
  AlertTriangle,
  RefreshCw,
  Shield,
  Database,
  Globe,
  FileText,
  DollarSign,
  Users,
  Building,
  Webhook,
  Key,
  Eye,
  ExternalLink,
  ArrowUpDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'connected' | 'available' | 'error' | 'pending';
  logo: string;
  isPopular: boolean;
  lastSync: Date | null;
  dataDirection: 'in' | 'out' | 'bidirectional';
  recordsProcessed: number;
  healthScore: number;
  features: string[];
}

const integrations: Integration[] = [
  {
    id: 'first-american',
    name: 'First American Title',
    category: 'Title Underwriters',
    description: 'Complete title insurance and settlement services integration',
    status: 'connected',
    logo: '🏢',
    isPopular: true,
    lastSync: new Date(Date.now() - 30 * 60 * 1000),
    dataDirection: 'bidirectional',
    recordsProcessed: 12450,
    healthScore: 98,
    features: ['Title Commitments', 'Policy Issuance', 'Rate Calculations', 'Compliance Checks']
  },
  {
    id: 'fidelity-national',
    name: 'Fidelity National Title',
    category: 'Title Underwriters',
    description: 'Nationwide title insurance and escrow services',
    status: 'connected',
    logo: '🏛️',
    isPopular: true,
    lastSync: new Date(Date.now() - 45 * 60 * 1000),
    dataDirection: 'bidirectional',
    recordsProcessed: 8920,
    healthScore: 95,
    features: ['Title Search', 'E&O Insurance', 'Closing Protection', 'Wire Verification']
  },
  {
    id: 'old-republic',
    name: 'Old Republic Title',
    category: 'Title Underwriters',
    description: 'Title insurance and real estate services',
    status: 'available',
    logo: '🏰',
    isPopular: false,
    lastSync: null,
    dataDirection: 'bidirectional',
    recordsProcessed: 0,
    healthScore: 0,
    features: ['Title Insurance', 'Escrow Services', 'Commercial Transactions']
  },
  {
    id: 'stewart-title',
    name: 'Stewart Title',
    category: 'Title Underwriters',
    description: 'Global real estate services and title insurance',
    status: 'connected',
    logo: '🏗️',
    isPopular: false,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
    dataDirection: 'in',
    recordsProcessed: 5670,
    healthScore: 92,
    features: ['International Transactions', 'Commercial Title', 'REO Services']
  },
  {
    id: 'fannie-mae',
    name: 'Fannie Mae',
    category: 'Lenders',
    description: 'Government-sponsored enterprise for mortgage financing',
    status: 'connected',
    logo: '🏦',
    isPopular: true,
    lastSync: new Date(Date.now() - 10 * 60 * 1000),
    dataDirection: 'out',
    recordsProcessed: 15680,
    healthScore: 99,
    features: ['Loan Origination', 'Underwriting Guidelines', 'Quality Control', 'Delivery']
  },
  {
    id: 'freddie-mac',
    name: 'Freddie Mac',
    category: 'Lenders',
    description: 'Secondary mortgage market corporation',
    status: 'connected',
    logo: '🏪',
    isPopular: true,
    lastSync: new Date(Date.now() - 15 * 60 * 1000),
    dataDirection: 'out',
    recordsProcessed: 13240,
    healthScore: 97,
    features: ['Loan Purchase', 'Risk Management', 'Servicing Standards', 'Analytics']
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    category: 'Notary Services',
    description: 'Electronic signature and digital transaction management',
    status: 'connected',
    logo: '✍️',
    isPopular: true,
    lastSync: new Date(Date.now() - 5 * 60 * 1000),
    dataDirection: 'bidirectional',
    recordsProcessed: 9870,
    healthScore: 96,
    features: ['E-Signatures', 'Document Management', 'Workflow Automation', 'Compliance']
  },
  {
    id: 'notarize',
    name: 'Notarize',
    category: 'Notary Services',
    description: 'Remote online notarization platform',
    status: 'available',
    logo: '📋',
    isPopular: false,
    lastSync: null,
    dataDirection: 'bidirectional',
    recordsProcessed: 0,
    healthScore: 0,
    features: ['Remote Notarization', 'Identity Verification', 'Legal Compliance', 'Audit Trail']
  },
  {
    id: 'avalara',
    name: 'Avalara',
    category: 'Tax Services',
    description: 'Automated tax compliance and reporting',
    status: 'connected',
    logo: '💰',
    isPopular: false,
    lastSync: new Date(Date.now() - 60 * 60 * 1000),
    dataDirection: 'in',
    recordsProcessed: 3450,
    healthScore: 94,
    features: ['Tax Calculation', '1099-S Filing', 'Compliance Monitoring', 'Reporting']
  },
  {
    id: 'cortera',
    name: 'Cortera',
    category: 'Survey',
    description: 'Land surveying and mapping services',
    status: 'error',
    logo: '🗺️',
    isPopular: false,
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
    dataDirection: 'in',
    recordsProcessed: 1230,
    healthScore: 45,
    features: ['Property Surveys', 'Boundary Mapping', 'Elevation Certificates', 'ALTA Surveys']
  },
  {
    id: 'lenders-one',
    name: 'Lenders One',
    category: 'Lenders',
    description: 'Mortgage lending cooperative network',
    status: 'pending',
    logo: '🤝',
    isPopular: false,
    lastSync: null,
    dataDirection: 'bidirectional',
    recordsProcessed: 0,
    healthScore: 0,
    features: ['Loan Origination', 'Secondary Market', 'Training', 'Technology Solutions']
  },
  {
    id: 'first-american-flood',
    name: 'First American Flood',
    category: 'Insurance',
    description: 'Flood insurance and risk assessment',
    status: 'available',
    logo: '🌊',
    isPopular: false,
    lastSync: null,
    dataDirection: 'in',
    recordsProcessed: 0,
    healthScore: 0,
    features: ['Flood Certificates', 'Risk Assessment', 'Policy Management', 'Claims Processing']
  }
];

const categories = ['All', 'Title Underwriters', 'Lenders', 'Notary Services', 'Tax Services', 'Survey', 'Insurance'];

const syncActivity = [
  { time: '09:00', successful: 245, failed: 3 },
  { time: '12:00', successful: 189, failed: 1 },
  { time: '15:00', successful: 312, failed: 5 },
  { time: '18:00', successful: 267, failed: 2 },
  { time: '21:00', successful: 198, failed: 1 },
];

const webhookActivity = [
  { date: '2024-03-25', events: 1240, errors: 12 },
  { date: '2024-03-26', events: 1350, errors: 8 },
  { date: '2024-03-27', events: 1180, errors: 15 },
  { date: '2024-03-28', events: 1420, errors: 6 },
];

const connectionStatus = [
  { name: 'Connected', value: 65, color: '#10B981' },
  { name: 'Available', value: 25, color: '#94A3B8' },
  { name: 'Error', value: 7, color: '#EF4444' },
  { name: 'Pending', value: 3, color: '#F59E0B' }
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const totalRecords = integrations.reduce((sum, i) => sum + i.recordsProcessed, 0);
  const avgHealthScore = Math.round(integrations.filter(i => i.status === 'connected').reduce((sum, i) => sum + i.healthScore, 0) / connectedCount);
  const errorCount = integrations.filter(i => i.status === 'error').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'available': return 'text-gray-400';
      case 'error': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20';
      case 'available': return 'bg-gray-500/20';
      case 'error': return 'bg-red-500/20';
      case 'pending': return 'bg-yellow-500/20';
      default: return 'bg-muted/20';
    }
  };

  const connectIntegration = (id: string) => {
    console.log('Connecting integration:', id);
    // Mock connection logic
  };

  const testConnection = (id: string) => {
    console.log('Testing connection:', id);
    // Mock test logic
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Partner Integrations</h1>
            <p className="text-muted-foreground">Connect with industry partners and service providers</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setShowApiConfig(true)}>
              <Settings className="h-4 w-4" />
              API Config
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync All
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Integration
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Connected Services</p>
                  <p className="text-2xl font-bold text-closyr-green">{connectedCount}</p>
                </div>
                <Zap className="h-8 w-8 text-closyr-green opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Records Processed</p>
                  <p className="text-2xl font-bold text-closyr-blue">{formatNumber(totalRecords)}</p>
                </div>
                <Database className="h-8 w-8 text-closyr-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Health Score</p>
                  <p className="text-2xl font-bold text-closyr-gold">{avgHealthScore}%</p>
                </div>
                <Activity className="h-8 w-8 text-closyr-gold opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issues</p>
                  <p className="text-2xl font-bold text-red-400">{errorCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start text-sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Status */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={connectionStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {connectionStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {connectionStatus.map((status) => (
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

            {/* Quick Actions */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full justify-start gap-2">
                  <Webhook className="h-4 w-4" />
                  Test Webhooks
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Key className="h-4 w-4" />
                  Manage API Keys
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  View Logs
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Shield className="h-4 w-4" />
                  Security Audit
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Popular Integrations */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Popular Integrations
                </CardTitle>
                <CardDescription>Most commonly used partner integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {integrations.filter(i => i.isPopular).slice(0, 6).map((integration) => (
                    <motion.div
                      key={integration.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 cursor-pointer smooth-transition"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{integration.logo}</div>
                        <div className="flex-1">
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.category}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          integration.status === 'connected' ? 'bg-green-400' :
                          integration.status === 'error' ? 'bg-red-400' :
                          integration.status === 'pending' ? 'bg-yellow-400' :
                          'bg-gray-400'
                        }`} />
                      </div>
                      
                      {integration.status === 'connected' ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Health Score</span>
                            <span className="font-medium">{integration.healthScore}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Records</span>
                            <span className="font-medium">{formatNumber(integration.recordsProcessed)}</span>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            connectIntegration(integration.id);
                          }}
                        >
                          Connect
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All Integrations */}
            <Card className="glassmorphic">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    All Integrations ({filteredIntegrations.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Sort
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Status
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredIntegrations.map((integration) => (
                    <motion.div
                      key={integration.id}
                      whileHover={{ scale: 1.005 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 smooth-transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-3xl">{integration.logo}</div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-medium">{integration.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(integration.status)} ${getStatusColor(integration.status)}`}>
                                {integration.status.toUpperCase()}
                              </span>
                              {integration.isPopular && (
                                <span className="px-2 py-1 bg-closyr-gold/20 text-closyr-gold rounded-full text-xs font-medium">
                                  Popular
                                </span>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                            
                            <div className="flex items-center gap-6 text-sm">
                              <span className="text-muted-foreground">{integration.category}</span>
                              {integration.status === 'connected' && (
                                <>
                                  <span className="text-muted-foreground">
                                    Health: {integration.healthScore}%
                                  </span>
                                  <span className="text-muted-foreground">
                                    Records: {formatNumber(integration.recordsProcessed)}
                                  </span>
                                  <span className="text-muted-foreground">
                                    Last sync: {integration.lastSync?.toLocaleTimeString() || 'Never'}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {integration.features.slice(0, 3).map((feature) => (
                                <span
                                  key={feature}
                                  className="px-2 py-1 text-xs bg-muted/50 rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                              {integration.features.length > 3 && (
                                <span className="px-2 py-1 text-xs text-muted-foreground">
                                  +{integration.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {integration.status === 'connected' ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => testConnection(integration.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedIntegration(integration)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedIntegration(integration)}
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </>
                          ) : integration.status === 'error' ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-400 border-red-400 hover:bg-red-400/10"
                                onClick={() => testConnection(integration.id)}
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Fix Error
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => connectIntegration(integration.id)}
                            >
                              <Zap className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                          )}
                          
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Health Monitor */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>API Health Monitor</CardTitle>
                <CardDescription>Real-time integration performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sync Activity */}
                  <div>
                    <h4 className="font-medium mb-3">Sync Activity Today</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={syncActivity}>
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
                        <Bar dataKey="successful" fill="#10B981" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="failed" fill="#EF4444" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Webhook Activity */}
                  <div>
                    <h4 className="font-medium mb-3">Webhook Activity</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={webhookActivity}>
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
                        <Line type="monotone" dataKey="events" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                        <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Integration Details Modal */}
        {selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedIntegration(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedIntegration.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedIntegration.name}</h3>
                    <p className="text-muted-foreground">{selectedIntegration.category}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedIntegration(null)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedIntegration.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusBg(selectedIntegration.status)} ${getStatusColor(selectedIntegration.status)}`}>
                      {selectedIntegration.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Data Flow:</span> {selectedIntegration.dataDirection}
                  </div>
                  {selectedIntegration.status === 'connected' && (
                    <>
                      <div>
                        <span className="font-medium">Health Score:</span> {selectedIntegration.healthScore}%
                      </div>
                      <div>
                        <span className="font-medium">Records Processed:</span> {formatNumber(selectedIntegration.recordsProcessed)}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Available Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedIntegration.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {selectedIntegration.status === 'connected' ? (
                    <>
                      <Button variant="outline" onClick={() => testConnection(selectedIntegration.id)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Test Connection
                      </Button>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </>
                  ) : (
                    <Button className="flex-1" onClick={() => connectIntegration(selectedIntegration.id)}>
                      <Zap className="h-4 w-4 mr-2" />
                      Connect Integration
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground py-4">
          Developed by GoKoncentrate
        </div>
      </div>
    </MainLayout>
  );
}