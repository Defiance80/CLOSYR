"use client";

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  Database, 
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Manager' | 'User';
  office: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  phone?: string;
  joinDate: string;
}

const mockUsers: UserAccount[] = [
  {
    id: '1',
    name: 'Robert Austin',
    email: 'robert.austin@closyr.ai',
    role: 'Super Admin',
    office: 'All Offices',
    status: 'Active',
    lastLogin: '2024-03-25T11:30:00Z',
    phone: '(555) 100-1001',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@closyr.ai',
    role: 'Admin',
    office: 'Main Office',
    status: 'Active',
    lastLogin: '2024-03-25T10:45:00Z',
    phone: '(555) 100-1002',
    joinDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@closyr.ai',
    role: 'Manager',
    office: 'Downtown Branch',
    status: 'Active',
    lastLogin: '2024-03-25T09:15:00Z',
    phone: '(555) 100-1003',
    joinDate: '2023-06-10'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@closyr.ai',
    role: 'User',
    office: 'Main Office',
    status: 'Active',
    lastLogin: '2024-03-24T16:30:00Z',
    phone: '(555) 100-1004',
    joinDate: '2023-09-05'
  },
  {
    id: '5',
    name: 'Carlos Martinez',
    email: 'carlos.martinez@closyr.ai',
    role: 'User',
    office: 'Downtown Branch',
    status: 'Active',
    lastLogin: '2024-03-24T14:20:00Z',
    phone: '(555) 100-1005',
    joinDate: '2023-11-12'
  },
  {
    id: '6',
    name: 'Emma Wilson',
    email: 'emma.wilson@closyr.ai',
    role: 'Manager',
    office: 'Westside Office',
    status: 'Active',
    lastLogin: '2024-03-24T12:10:00Z',
    phone: '(555) 100-1006',
    joinDate: '2024-01-08'
  },
  {
    id: '7',
    name: 'James Park',
    email: 'james.park@closyr.ai',
    role: 'User',
    office: 'Westside Office',
    status: 'Inactive',
    lastLogin: '2024-03-20T11:45:00Z',
    phone: '(555) 100-1007',
    joinDate: '2024-02-14'
  }
];

const rolePermissions = {
  'Super Admin': {
    'View all accounts': true,
    'View all users': true,
    'Edit all settings': true,
    'Manage roles': true,
    'Delete records': true
  },
  'Admin': {
    'View all accounts': true,
    'View all users': true,
    'Edit most settings': true,
    'Manage roles': false,
    'Delete records': true
  },
  'Manager': {
    'View all accounts': false,
    'View all users': false,
    'Edit all settings': false,
    'Manage roles': false,
    'Delete records': false,
    'View office accounts': true,
    'View office users': true,
    'Edit approved settings': true
  },
  'User': {
    'View all accounts': false,
    'View all users': false,
    'Edit all settings': false,
    'Manage roles': false,
    'Delete records': false,
    'View own accounts': true,
    'View own profile': true,
    'Edit own profile': true
  }
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'team' | 'system'>('profile');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'team' as const, label: 'Team & Roles', icon: Users },
    { id: 'system' as const, label: 'System', icon: Database }
  ];

  const getRoleBadgeColor = (role: UserAccount['role']) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Admin': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Manager': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'User': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: UserAccount['status']) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Inactive': return 'text-red-400';
    }
  };

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.office.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your CLOSYR experience</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium smooth-transition",
                  activeTab === tab.id 
                    ? "bg-closyr-blue text-white shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Display Name</label>
                    <input
                      type="text"
                      defaultValue="Robert Austin"
                      className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      defaultValue="robert.austin@closyr.ai"
                      className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      defaultValue="(555) 100-1001"
                      className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <div className="mt-1">
                      <span className="px-3 py-2 text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30 rounded-md">
                        Super Admin
                      </span>
                    </div>
                  </div>
                  <Button variant="default">Save Profile</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deal Health Alerts</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Document Updates</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WatchDog Alerts</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Team Activity</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Maintenance</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <Button variant="outline" size="sm">Setup</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Access</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Timeout</span>
                    <Button variant="outline" size="sm">4 hours</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Login History</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Policy</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Team & Roles Tab */}
          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* User Management */}
              <Card className="glassmorphic">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Management
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button onClick={() => setShowInviteModal(true)} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Invite User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr className="text-left">
                          <th className="p-3 font-medium text-muted-foreground">Name</th>
                          <th className="p-3 font-medium text-muted-foreground">Email</th>
                          <th className="p-3 font-medium text-muted-foreground">Role</th>
                          <th className="p-3 font-medium text-muted-foreground">Office/Branch</th>
                          <th className="p-3 font-medium text-muted-foreground">Status</th>
                          <th className="p-3 font-medium text-muted-foreground">Last Login</th>
                          <th className="p-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-border/50 hover:bg-white/5 smooth-transition">
                            <td className="p-3">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {user.phone}
                                </p>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className={cn("px-2 py-1 text-xs font-medium rounded border", getRoleBadgeColor(user.role))}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3" />
                                {user.office}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className={cn("font-medium", getStatusColor(user.status))}>
                                {user.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {formatLastLogin(user.lastLogin)}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowEditModal(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                {user.role !== 'Super Admin' && (
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Role Permissions Matrix */}
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle>Role Permissions Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-3 font-medium text-muted-foreground">Permission</th>
                          <th className="text-center p-3 font-medium text-red-300">Super Admin</th>
                          <th className="text-center p-3 font-medium text-blue-300">Admin</th>
                          <th className="text-center p-3 font-medium text-green-300">Manager</th>
                          <th className="text-center p-3 font-medium text-gray-300">User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(rolePermissions['Super Admin']).map((permission) => (
                          <tr key={permission} className="border-b border-border/50">
                            <td className="p-3 font-medium">{permission}</td>
                            <td className="p-3 text-center">
                              {rolePermissions['Super Admin'][permission as keyof typeof rolePermissions['Super Admin']] ? (
                                <Check className="h-4 w-4 text-green-400 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {rolePermissions['Admin'][permission as keyof typeof rolePermissions['Admin']] ? (
                                <Check className="h-4 w-4 text-green-400 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {rolePermissions['Manager'][permission as keyof typeof rolePermissions['Manager']] ? (
                                <Check className="h-4 w-4 text-green-400 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-400 mx-auto" />
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {rolePermissions['User'][permission as keyof typeof rolePermissions['User']] ? (
                                <Check className="h-4 w-4 text-green-400 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-400 mx-auto" />
                              )}
                            </td>
                          </tr>
                        ))}
                        {/* Manager-specific permissions */}
                        {Object.keys(rolePermissions['Manager'])
                          .filter(permission => !Object.keys(rolePermissions['Super Admin']).includes(permission))
                          .map((permission) => (
                          <tr key={permission} className="border-b border-border/50">
                            <td className="p-3 font-medium">{permission}</td>
                            <td className="p-3 text-center">
                              <Check className="h-4 w-4 text-green-400 mx-auto" />
                            </td>
                            <td className="p-3 text-center">
                              <X className="h-4 w-4 text-red-400 mx-auto" />
                            </td>
                            <td className="p-3 text-center">
                              <Check className="h-4 w-4 text-green-400 mx-auto" />
                            </td>
                            <td className="p-3 text-center">
                              <X className="h-4 w-4 text-red-400 mx-auto" />
                            </td>
                          </tr>
                        ))}
                        {/* User-specific permissions */}
                        {Object.keys(rolePermissions['User'])
                          .filter(permission => !Object.keys(rolePermissions['Super Admin']).includes(permission) && !Object.keys(rolePermissions['Manager']).includes(permission))
                          .map((permission) => (
                          <tr key={permission} className="border-b border-border/50">
                            <td className="p-3 font-medium">{permission}</td>
                            <td className="p-3 text-center">
                              <Check className="h-4 w-4 text-green-400 mx-auto" />
                            </td>
                            <td className="p-3 text-center">
                              <X className="h-4 w-4 text-red-400 mx-auto" />
                            </td>
                            <td className="p-3 text-center">
                              <X className="h-4 w-4 text-red-400 mx-auto" />
                            </td>
                            <td className="p-3 text-center">
                              <Check className="h-4 w-4 text-green-400 mx-auto" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version</span>
                      <span>1.0.0 (Phase 3)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environment</span>
                      <span>Demo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Backup</span>
                      <span>2024-03-25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Users</span>
                      <span>{mockUsers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Users</span>
                      <span>{mockUsers.filter(u => u.status === 'Active').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">System Status</span>
                      <span className="text-green-400">Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invite User Modal */}
        <AnimatePresence>
          {showInviteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
              onClick={() => setShowInviteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background/95 border border-border rounded-lg shadow-xl glassmorphic-dark max-w-md w-full"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Invite New User</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <select className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition">
                        <option value="">Select role</option>
                        <option value="User">User</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Office/Branch</label>
                      <select className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition">
                        <option value="">Select office</option>
                        <option value="Main Office">Main Office</option>
                        <option value="Downtown Branch">Downtown Branch</option>
                        <option value="Westside Office">Westside Office</option>
                        <option value="All Offices">All Offices</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setShowInviteModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Send Invitation
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit User Modal */}
        <AnimatePresence>
          {showEditModal && selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
              onClick={() => {
                setShowEditModal(false);
                setSelectedUser(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background/95 border border-border rounded-lg shadow-xl glassmorphic-dark max-w-md w-full"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Edit User: {selectedUser.name}</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        defaultValue={selectedUser.name}
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        defaultValue={selectedUser.email}
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <select 
                        defaultValue={selectedUser.role}
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      >
                        <option value="User">User</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Office/Branch</label>
                      <select 
                        defaultValue={selectedUser.office}
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      >
                        <option value="Main Office">Main Office</option>
                        <option value="Downtown Branch">Downtown Branch</option>
                        <option value="Westside Office">Westside Office</option>
                        <option value="All Offices">All Offices</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <select 
                        defaultValue={selectedUser.status}
                        className="w-full mt-1 h-10 px-3 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1" 
                        onClick={() => {
                          setShowEditModal(false);
                          setSelectedUser(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Save Changes
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