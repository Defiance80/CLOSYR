"use client";

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mail, 
  Video, 
  Plus, 
  Search, 
  Send, 
  Phone,
  Clock,
  Users,
  Check,
  CheckCheck,
  Circle,
  Calendar,
  Settings,
  ExternalLink,
  Paperclip,
  Mic,
  Smile,
  MoreVertical,
  Play,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  threadId: string;
  sender: string;
  senderRole: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  deal?: string;
  participants?: string[];
}

interface EmailThread {
  id: string;
  subject: string;
  from: string;
  fromEmail: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  deal?: string;
  messageCount: number;
  participants: string[];
}

interface VideoCall {
  id: string;
  title: string;
  participants: string[];
  platform: 'teams' | 'zoom' | 'meet';
  date: string;
  time: string;
  duration?: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  deal?: string;
  recordingAvailable?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    threadId: 'thread-1',
    sender: 'Sarah Morrison',
    senderRole: 'Buyer',
    content: 'Hi, I wanted to check on the status of the inspection report. Has it been received yet?',
    timestamp: '2024-03-25T10:30:00Z',
    status: 'read',
    deal: 'Morrison Property',
    participants: ['Robert Austin', 'Sarah Morrison', 'Mike Chen']
  },
  {
    id: '2',
    threadId: 'thread-1',
    sender: 'Robert Austin',
    senderRole: 'Escrow Officer',
    content: 'Hi Sarah, yes we received the inspection report this morning. Everything looks good and we\'re moving forward with the next steps.',
    timestamp: '2024-03-25T10:45:00Z',
    status: 'read',
    deal: 'Morrison Property'
  },
  {
    id: '3',
    threadId: 'thread-2',
    sender: 'Jennifer Rodriguez',
    senderRole: 'Lender',
    content: 'The loan documents are ready for review. Please let me know if you need any clarifications.',
    timestamp: '2024-03-25T09:15:00Z',
    status: 'delivered',
    deal: 'Johnson Commercial',
    participants: ['Robert Austin', 'Jennifer Rodriguez', 'Michael Johnson']
  },
  {
    id: '4',
    threadId: 'thread-3',
    sender: 'Lisa Davis',
    senderRole: 'Buyer Agent',
    content: '@Robert Can you provide an update on the title commitment timeline?',
    timestamp: '2024-03-25T08:30:00Z',
    status: 'sent',
    deal: 'Davis Residential',
    participants: ['Robert Austin', 'Lisa Davis', 'Emily Davis']
  }
];

const mockEmails: EmailThread[] = [
  {
    id: 'email-1',
    subject: 'Loan Approval - Johnson Commercial Deal',
    from: 'Jennifer Rodriguez',
    fromEmail: 'j.rodriguez@firstnational.com',
    lastMessage: 'The loan has been approved and documents are ready for signing...',
    timestamp: '2024-03-25T11:20:00Z',
    unread: true,
    deal: 'Johnson Commercial',
    messageCount: 3,
    participants: ['Robert Austin', 'Jennifer Rodriguez', 'Michael Johnson']
  },
  {
    id: 'email-2',
    subject: 'Title Insurance Policy - Morrison Property',
    from: 'David Wilson',
    fromEmail: 'd.wilson@securitytitle.com',
    lastMessage: 'Please find attached the title insurance policy for your review...',
    timestamp: '2024-03-25T10:15:00Z',
    unread: true,
    deal: 'Morrison Property',
    messageCount: 1,
    participants: ['Robert Austin', 'David Wilson', 'Sarah Morrison']
  },
  {
    id: 'email-3',
    subject: 'RE: Inspection Report Questions',
    from: 'Tom Bradley',
    fromEmail: 't.bradley@bradleyinspections.com',
    lastMessage: 'I\'ve addressed all the questions in the attached revised report...',
    timestamp: '2024-03-25T09:45:00Z',
    unread: false,
    deal: 'Davis Residential',
    messageCount: 5,
    participants: ['Robert Austin', 'Tom Bradley', 'Emily Davis']
  },
  {
    id: 'email-4',
    subject: 'Closing Schedule Confirmation',
    from: 'Maria Santos',
    fromEmail: 'm.santos@premierrealty.com',
    lastMessage: 'Confirming the closing schedule for Friday at 2 PM...',
    timestamp: '2024-03-24T16:30:00Z',
    unread: false,
    deal: 'Wilson Family Trust',
    messageCount: 2,
    participants: ['Robert Austin', 'Maria Santos', 'Robert Wilson']
  }
];

const mockVideoCalls: VideoCall[] = [
  {
    id: 'call-1',
    title: 'Morrison Closing Review',
    participants: ['Robert Austin', 'Sarah Morrison', 'Mike Chen', 'David Wilson'],
    platform: 'teams',
    date: '2024-03-25',
    time: '14:00',
    status: 'upcoming',
    deal: 'Morrison Property'
  },
  {
    id: 'call-2',
    title: 'Johnson Commercial Final Walkthrough',
    participants: ['Robert Austin', 'Michael Johnson', 'Jennifer Rodriguez'],
    platform: 'zoom',
    date: '2024-03-26',
    time: '10:30',
    status: 'upcoming',
    deal: 'Johnson Commercial'
  },
  {
    id: 'call-3',
    title: 'Weekly Team Standup',
    participants: ['Robert Austin', 'Lisa Rodriguez', 'Mike Chen', 'Emma Wilson'],
    platform: 'teams',
    date: '2024-03-25',
    time: '09:00',
    duration: '45 min',
    status: 'completed',
    recordingAvailable: true
  },
  {
    id: 'call-4',
    title: 'Davis Residential Q&A Session',
    participants: ['Robert Austin', 'Emily Davis', 'Lisa Davis'],
    platform: 'meet',
    date: '2024-03-25',
    time: '12:30',
    duration: '23 min',
    status: 'in-progress',
    deal: 'Davis Residential'
  }
];

const emailIntegrations = [
  { name: 'Gmail', status: 'connected', email: 'robert.austin@closyr.ai' },
  { name: 'Outlook', status: 'available', email: null },
  { name: 'Yahoo', status: 'available', email: null }
];

const videoIntegrations = [
  { name: 'Microsoft Teams', status: 'connected', account: 'CLOSYR Organization' },
  { name: 'Zoom', status: 'available', account: null },
  { name: 'Google Meet', status: 'available', account: null }
];

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'messages' | 'email' | 'video'>('messages');
  const [selectedThread, setSelectedThread] = useState<string>('thread-1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'messages' as const, label: 'Messages', icon: MessageSquare, count: 8 },
    { id: 'email' as const, label: 'Email', icon: Mail, count: 2 },
    { id: 'video' as const, label: 'Video Calls', icon: Video, count: 4 }
  ];

  const getMessagesByThread = (threadId: string) => {
    return mockMessages.filter(msg => msg.threadId === threadId);
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent': return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="h-3 w-3 text-blue-400" />;
      case 'read': return <CheckCheck className="h-3 w-3 text-green-400" />;
    }
  };

  const getPlatformIcon = (platform: VideoCall['platform']) => {
    switch (platform) {
      case 'teams': return '💼';
      case 'zoom': return '📹';
      case 'meet': return '📞';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Communications</h1>
              <p className="text-muted-foreground">Centralized communication hub for all deal parties</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-background/30 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium smooth-transition relative",
                    activeTab === tab.id 
                      ? "bg-closyr-blue text-white shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={cn(
                      "px-1.5 py-0.5 text-xs rounded-full",
                      activeTab === tab.id 
                        ? "bg-white/20 text-white" 
                        : "bg-closyr-blue/20 text-closyr-blue"
                    )}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex"
              >
                {/* Conversation List */}
                <div className="w-80 border-r border-border/50 flex flex-col">
                  {/* Search */}
                  <div className="p-4 border-b border-border/30">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-10 pr-4 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition text-sm"
                      />
                    </div>
                  </div>

                  {/* Thread List */}
                  <div className="flex-1 overflow-y-auto">
                    {['thread-1', 'thread-2', 'thread-3'].map((threadId) => {
                      const messages = getMessagesByThread(threadId);
                      const lastMessage = messages[messages.length - 1];
                      if (!lastMessage) return null;

                      return (
                        <div
                          key={threadId}
                          onClick={() => setSelectedThread(threadId)}
                          className={cn(
                            "p-4 cursor-pointer border-b border-border/30 hover:bg-white/5 smooth-transition",
                            selectedThread === threadId ? "bg-closyr-blue/10 border-l-2 border-l-closyr-blue" : ""
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{lastMessage.deal}</p>
                                <span className="text-xs text-muted-foreground">{formatTime(lastMessage.timestamp)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate mt-1">{lastMessage.content}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-closyr-blue/20 text-closyr-blue px-2 py-1 rounded">
                                  {messages.length} messages
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {lastMessage.participants?.length} participants
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chat View */}
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-border/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {getMessagesByThread(selectedThread)[0]?.deal || 'Select a conversation'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getMessagesByThread(selectedThread)[0]?.participants?.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {getMessagesByThread(selectedThread).map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.sender === 'Robert Austin' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.sender !== 'Robert Austin' && (
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div className={cn(
                          "max-w-xs lg:max-w-md p-3 rounded-lg",
                          message.sender === 'Robert Austin' 
                            ? "bg-closyr-blue text-white" 
                            : "bg-background/50 border border-border"
                        )}>
                          {message.sender !== 'Robert Austin' && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{message.senderRole}</span>
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                            {message.sender === 'Robert Austin' && getStatusIcon(message.status)}
                          </div>
                        </div>
                        {message.sender === 'Robert Austin' && (
                          <div className="w-8 h-8 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center text-white text-xs font-medium">
                            RA
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border/30">
                    <div className="flex items-center gap-2 p-3 bg-background/50 border border-border rounded-lg">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none"
                      />
                      <Button variant="ghost" size="sm" className="p-2">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email Tab */}
            {activeTab === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full p-6 space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                  {/* Email Integrations */}
                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Email Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {emailIntegrations.map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            {integration.status === 'connected' && integration.email && (
                              <p className="text-xs text-muted-foreground">{integration.email}</p>
                            )}
                          </div>
                          {integration.status === 'connected' ? (
                            <div className="flex items-center gap-2 text-green-400">
                              <Check className="h-4 w-4" />
                              <span className="text-sm">Connected</span>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm">
                              Connect
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Email Inbox */}
                  <Card className="glassmorphic lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Email Inbox</CardTitle>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Compose
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border/30">
                        {mockEmails.map((email) => (
                          <div
                            key={email.id}
                            className={cn(
                              "p-4 hover:bg-white/5 cursor-pointer smooth-transition",
                              email.unread ? "bg-closyr-blue/5" : ""
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  {email.unread && (
                                    <Circle className="h-2 w-2 text-closyr-blue fill-current" />
                                  )}
                                  <p className={cn("font-medium", email.unread ? "text-foreground" : "text-muted-foreground")}>
                                    {email.from}
                                  </p>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{formatTime(email.timestamp)}</span>
                                </div>
                                <p className="font-medium mt-1">{email.subject}</p>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{email.lastMessage}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  {email.deal && (
                                    <span className="text-xs bg-closyr-blue/20 text-closyr-blue px-2 py-1 rounded">
                                      {email.deal}
                                    </span>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {email.messageCount} message{email.messageCount !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="p-2">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Video Calls Tab */}
            {activeTab === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full p-6 space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Video Integrations */}
                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        Video Platforms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {videoIntegrations.map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            {integration.status === 'connected' && integration.account && (
                              <p className="text-xs text-muted-foreground">{integration.account}</p>
                            )}
                          </div>
                          {integration.status === 'connected' ? (
                            <div className="flex items-center gap-2 text-green-400">
                              <Check className="h-4 w-4" />
                              <span className="text-sm">Connected</span>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm">
                              Connect
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button className="w-full mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Call
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Video Calls List */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Ongoing Call */}
                    {mockVideoCalls.filter(call => call.status === 'in-progress').map((call) => (
                      <Card key={call.id} className="glassmorphic border-green-500/30 bg-green-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                              <div>
                                <p className="font-semibold text-green-400">In Call - {call.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {call.participants.length} participants • {call.duration}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Join Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Upcoming Calls */}
                    <Card className="glassmorphic">
                      <CardHeader>
                        <CardTitle>Upcoming Calls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {mockVideoCalls.filter(call => call.status === 'upcoming').map((call) => (
                          <div key={call.id} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{getPlatformIcon(call.platform)}</div>
                              <div>
                                <p className="font-medium">{call.title}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  {call.date} at {call.time}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {call.participants.join(', ')}
                                </div>
                                {call.deal && (
                                  <span className="inline-block text-xs bg-closyr-blue/20 text-closyr-blue px-2 py-1 rounded mt-1">
                                    {call.deal}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4" />
                              </Button>
                              <Button size="sm">
                                Join Call
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Call History */}
                    <Card className="glassmorphic">
                      <CardHeader>
                        <CardTitle>Recent Calls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {mockVideoCalls.filter(call => call.status === 'completed').map((call) => (
                          <div key={call.id} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl opacity-50">{getPlatformIcon(call.platform)}</div>
                              <div>
                                <p className="font-medium">{call.title}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {call.date} • {call.duration}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {call.participants.join(', ')}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {call.recordingAvailable && (
                                <Button variant="outline" size="sm">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="text-center py-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Developed by GoKoncentrate
          </p>
        </div>
      </div>
    </MainLayout>
  );
}