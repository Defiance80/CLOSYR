"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Send, 
  Bot,
  User,
  Clock,
  CheckCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

const DEMO_CONVERSATION: Message[] = [
  {
    id: '1',
    content: "Hi! I'm CLOSYR Intelligence, your AI assistant for deal management. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: '2',
    content: "What's the status of the Morrison closing?",
    sender: 'user',
    timestamp: new Date(Date.now() - 45000)
  },
  {
    id: '3',
    content: "The Morrison closing (Deal #1247) is on track for Friday, March 28th. Title commitment received, all contingencies removed. Just waiting for the final walkthrough confirmation. Would you like me to send a reminder to the buyer's agent?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 40000)
  },
  {
    id: '4',
    content: "Schedule the final walkthrough for Friday at 2 PM",
    sender: 'user',
    timestamp: new Date(Date.now() - 30000)
  },
  {
    id: '5',
    content: "✅ I've scheduled the final walkthrough for Friday, March 28th at 2:00 PM and sent calendar invites to all parties. I've also set up automated reminders for 24 hours and 2 hours before the appointment.",
    sender: 'ai',
    timestamp: new Date(Date.now() - 25000)
  }
];

const QUICK_ACTIONS = [
  "Check deal status",
  "Missing documents",
  "Wire verification",
  "Schedule closing"
];

const MOCK_RESPONSES = [
  "I've found 3 deals requiring attention: Morrison closing (document missing), Peterson purchase (wire verification pending), and Johnson refinance (scheduled for next week).",
  "Based on current deal pipeline, I found 2 missing documents: Income verification for Deal #1249 and Property survey for Deal #1251. Should I send automated requests?",
  "Wire verification complete for Deal #1247. All routing numbers confirmed and amounts match settlement statement. Funds are secure and ready for disbursement.",
  "I can help schedule your closing. Which deal would you like to schedule? I see 4 active transactions ready for closing dates.",
  "I've automated the document request workflow. Missing items have been flagged and follow-up emails will be sent in 24 hours if not received.",
  "All title searches are current. I've flagged one potential issue on Deal #1253 - an unreleased lien that needs attention before closing.",
  "Fraud detection is active and monitoring all transactions. No suspicious activity detected in the last 24 hours."
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(DEMO_CONVERSATION);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const newMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      
      if (!isOpen || isMinimized) {
        setHasNewMessage(true);
      }
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateTyping();
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateTyping();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
    setHasNewMessage(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className={cn(
            "relative h-14 w-14 rounded-full shadow-lg shadow-closyr-blue/20",
            "bg-gradient-to-br from-closyr-blue to-closyr-blue/80",
            "hover:from-closyr-blue/90 hover:to-closyr-blue/70",
            "border border-closyr-blue/30"
          )}
        >
          <MessageCircle className="h-6 w-6" />
          
          {hasNewMessage && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-closyr-gold rounded-full border-2 border-background"
            />
          )}
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-40",
              "sm:bottom-24 sm:right-6 sm:w-[380px] sm:max-h-[520px]",
              "bottom-0 right-0 left-0 h-[85vh] sm:h-[520px] w-full sm:w-auto sm:left-auto",
              "bg-background/95 backdrop-blur-xl border border-border/50 rounded-t-2xl sm:rounded-2xl",
              "shadow-2xl shadow-black/20 glassmorphic-dark flex flex-col",
              isMinimized ? "h-16" : ""
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-closyr-blue to-closyr-gold rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-closyr-green rounded-full border-2 border-background" />
                </div>
                {!isMinimized && (
                  <div>
                    <h3 className="font-semibold text-sm">CLOSYR Intelligence</h3>
                    <p className="text-xs text-muted-foreground">AI Assistant</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {!isMinimized && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={minimizeChat}
                    className="h-8 w-8 p-0 hover:bg-background/50"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-background/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80 sm:h-96">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      )}
                    >
                      {/* Avatar */}
                      <div className={cn(
                        "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center",
                        message.sender === 'user' 
                          ? "bg-closyr-blue" 
                          : "bg-gradient-to-br from-closyr-blue to-closyr-gold"
                      )}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2",
                        message.sender === 'user'
                          ? "bg-closyr-blue text-white"
                          : "bg-muted/50 border border-border/30"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={cn(
                          "text-xs mt-1 opacity-70",
                          message.sender === 'user' ? "text-blue-100" : "text-muted-foreground"
                        )}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-closyr-blue to-closyr-gold flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-muted/50 border border-border/30 rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-closyr-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-closyr-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-closyr-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-2 border-t border-border/30">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {QUICK_ACTIONS.map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="text-xs h-7 bg-background/50 hover:bg-closyr-blue/20 border-border/50"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/30">
                  <div className="flex gap-2">
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me about deals, schedules, or documents..."
                      className="flex-1 bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-closyr-blue/50"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      disabled={!inputValue.trim() || isTyping}
                      className="h-9 w-9 p-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-closyr-gold rounded-full" />
                    <p className="text-xs text-muted-foreground">AI-powered by CLOSYR Intelligence</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}