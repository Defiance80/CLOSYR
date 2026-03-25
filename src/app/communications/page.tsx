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
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

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
        <div className="p-3 sm:p-6 border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Communications</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Centralized communication hub for all deal parties</p>
            </div>
            <Button className="flex items-center gap-2 w-full sm:w-auto min-h-[44px]">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>

          {/* Tabs - Horizontally scrollable on mobile */}
          <div className="overflow-x-auto">
            <div className="flex space-x-1 bg-background/30 rounded-lg p-1 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMobileChat(false);
                      setSelectedEmail(null);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium smooth-transition relative min-h-[44px] whitespace-nowrap",
                      activeTab === tab.id 
                        ? "bg-closyr-blue text-white shadow-sm" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.id === 'messages' ? 'MSG' : tab.id === 'email' ? 'EMAIL' : 'VIDEO'}</span>
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
                <div className={`${showMobileChat ? 'hidden lg:block' : 'block'} w-full lg:w-80 border-r border-border/50 flex flex-col`}>
                  {/* Search */}
                  <div className="p-3 sm:p-4 border-b border-border/30">
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
                          onClick={() => {
                            setSelectedThread(threadId);
                            setShowMobileChat(true);
                          }}
                          className={cn(
                            "p-3 sm:p-4 cursor-pointer border-b border-border/30 hover:bg-white/5 smooth-transition min-h-[72px]",
                            selectedThread === threadId ? "bg-closyr-blue/10 border-l-2 border-l-closyr-blue" : ""
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-medium truncate text-sm sm:text-base">{lastMessage.deal}</p>
                                <span className="text-xs text-muted-foreground flex-shrink-0">{formatTime(lastMessage.timestamp)}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate mt-1">{lastMessage.content}</p>
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
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
                <div className={`${showMobileChat ? 'block' : 'hidden lg:block'} flex-1 flex flex-col`}>
                  <div className="p-3 sm:p-4 border-b border-border/30">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Mobile Back Button */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowMobileChat(false)}
                          className="lg:hidden flex-shrink-0 min-h-[44px] min-w-[44px] p-0"
                        >
                          ← 
                        </Button>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base truncate">
                            {getMessagesByThread(selectedThread)[0]?.deal || 'Select a conversation'}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {getMessagesByThread(selectedThread)[0]?.participants?.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] p-0 sm:px-3">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] p-0 sm:px-3">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] p-0 sm:px-3">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {getMessagesByThread(selectedThread).map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-2 sm:gap-3",
                          message.sender === 'Robert Austin' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.sender !== 'Robert Austin' && (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div className={cn(
                          "max-w-[280px] sm:max-w-xs lg:max-w-md p-2.5 sm:p-3 rounded-lg",
                          message.sender === 'Robert Austin' 
                            ? "bg-closyr-blue text-white" 
                            : "bg-background/50 border border-border"
                        )}>
                          {message.sender !== 'Robert Austin' && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium truncate">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground truncate">{message.senderRole}</span>
                            </div>
                          )}
                          <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                            {message.sender === 'Robert Austin' && getStatusIcon(message.status)}
                          </div>
                        </div>
                        {message.sender === 'Robert Austin' && (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                            RA
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input - Sticky on mobile */}
                  <div className="p-3 sm:p-4 border-t border-border/30 bg-background/95 backdrop-blur-sm">
                    <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-background/50 border border-border rounded-lg">
                      <Button variant="ghost" size="sm" className="p-2 min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px]">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none text-sm min-h-[36px]"
                      />
                      <Button variant="ghost" size="sm" className="p-2 min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px]">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px]">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" disabled={!newMessage.trim()} className="min-h-[36px] sm:min-h-[40px]">
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
                className="h-full p-3 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 h-full">
                  {/* Email Integrations */}
                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                        Email Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      {emailIntegrations.map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base truncate">{integration.name}</p>
                            {integration.status === 'connected' && integration.email && (
                              <p className="text-xs text-muted-foreground truncate">{integration.email}</p>
                            )}
                          </div>
                          {integration.status === 'connected' ? (
                            <div className="flex items-center gap-2 text-green-400 flex-shrink-0">
                              <Check className="h-4 w-4" />
                              <span className="text-sm hidden sm:inline">Connected</span>
                              <span className="text-xs sm:hidden">✓</span>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" className="min-h-[44px] flex-shrink-0">
                              Connect
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Email Inbox */}
                  <Card className="glassmorphic lg:col-span-2 flex-1 lg:flex-none">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <CardTitle className="text-base sm:text-lg">Email Inbox</CardTitle>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto min-h-[44px]">
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
                            onClick={() => setSelectedEmail(selectedEmail === email.id ? null : email.id)}
                            className={cn(
                              "p-3 sm:p-4 hover:bg-white/5 cursor-pointer smooth-transition",
                              email.unread ? "bg-closyr-blue/5" : "",
                              selectedEmail === email.id ? "bg-closyr-blue/10" : ""
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {email.unread && (
                                    <Circle className="h-2 w-2 text-closyr-blue fill-current flex-shrink-0" />
                                  )}
                                  <p className={cn("font-medium text-sm sm:text-base truncate", email.unread ? "text-foreground" : "text-muted-foreground")}>
                                    {email.from}
                                  </p>
                                  <span className="text-xs text-muted-foreground flex-shrink-0">•</span>
                                  <span className="text-xs text-muted-foreground flex-shrink-0">{formatTime(email.timestamp)}</span>
                                </div>
                                <p className="font-medium text-sm sm:text-base mb-1 truncate">{email.subject}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">{email.lastMessage}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {email.deal && (
                                    <span className="text-xs bg-closyr-blue/20 text-closyr-blue px-2 py-1 rounded">
                                      {email.deal}
                                    </span>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {email.messageCount} message{email.messageCount !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                
                                {/* Expandable Email Detail - Mobile */}
                                {selectedEmail === email.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-3 pt-3 border-t border-border/30"
                                  >
                                    <div className="text-xs sm:text-sm text-muted-foreground space-y-2">
                                      <p><strong>From:</strong> {email.fromEmail}</p>
                                      <p><strong>Participants:</strong> {email.participants.join(', ')}</p>
                                      <p className="border-t border-border/30 pt-2">{email.lastMessage}</p>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                      <Button variant="outline" size="sm" className="flex-1">Reply</Button>
                                      <Button variant="outline" size="sm" className="flex-1">Forward</Button>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                              <Button variant="ghost" size="sm" className="p-2 min-h-[36px] min-w-[36px] flex-shrink-0">
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
                className="h-full p-3 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Video Integrations */}
                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Video className="h-4 w-4 sm:h-5 sm:w-5" />
                        Video Platforms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      {videoIntegrations.map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base truncate">{integration.name}</p>
                            {integration.status === 'connected' && integration.account && (
                              <p className="text-xs text-muted-foreground truncate">{integration.account}</p>
                            )}
                          </div>
                          {integration.status === 'connected' ? (
                            <div className="flex items-center gap-2 text-green-400 flex-shrink-0">
                              <Check className="h-4 w-4" />
                              <span className="text-sm hidden sm:inline">Connected</span>
                              <span className="text-xs sm:hidden">✓</span>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" className="min-h-[44px] flex-shrink-0">
                              Connect
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button className="w-full mt-4 min-h-[44px]">
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
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-green-400 text-sm sm:text-base truncate">In Call - {call.title}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {call.participants.length} participants • {call.duration}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto min-h-[44px]">
                              Join Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Upcoming Calls */}
                    <Card className="glassmorphic">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Upcoming Calls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        {mockVideoCalls.filter(call => call.status === 'upcoming').map((call) => (
                          <div key={call.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-background/30 rounded-lg">
                            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                              <div className="text-xl sm:text-2xl flex-shrink-0">{getPlatformIcon(call.platform)}</div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm sm:text-base truncate">{call.title}</p>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                                  <Calendar className="h-4 w-4" />
                                  {call.date} at {call.time}
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                                  <Users className="h-4 w-4" />
                                  <span className="truncate">{call.participants.join(', ')}</span>
                                </div>
                                {call.deal && (
                                  <span className="inline-block text-xs bg-closyr-blue/20 text-closyr-blue px-2 py-1 rounded mt-2">
                                    {call.deal}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              <Button variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px]">
                                <Calendar className="h-4 w-4 mr-2 sm:mr-0" />
                                <span className="sm:hidden">Schedule</span>
                              </Button>
                              <Button size="sm" className="flex-1 sm:flex-none min-h-[44px]">
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
                        <CardTitle className="text-base sm:text-lg">Recent Calls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        {mockVideoCalls.filter(call => call.status === 'completed').map((call) => (
                          <div key={call.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-background/30 rounded-lg">
                            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                              <div className="text-xl sm:text-2xl opacity-50 flex-shrink-0">{getPlatformIcon(call.platform)}</div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm sm:text-base truncate">{call.title}</p>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                                  <Clock className="h-4 w-4" />
                                  {call.date} • {call.duration}
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                                  <Users className="h-4 w-4" />
                                  <span className="truncate">{call.participants.join(', ')}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              {call.recordingAvailable && (
                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px]">
                                  <Play className="h-4 w-4 mr-2 sm:mr-0" />
                                  <span className="sm:hidden">Play</span>
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="flex-1 sm:flex-none min-h-[44px]">
                                <ExternalLink className="h-4 w-4 mr-2 sm:mr-0" />
                                <span className="sm:hidden">Open</span>
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
        <div className="text-center py-3 sm:py-4 px-3 sm:px-6 border-t border-border/50">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Developed by GoKoncentrate
          </p>
        </div>
      </div>
    </MainLayout>
  );
}