"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send,
  Eye,
  Download,
  Filter,
  Search,
  MoreVertical,
  Shield,
  Zap,
  Users,
  Tag,
  Camera,
  Scan,
  PenTool,
  Copy,
  History,
  Layers,
  Brain,
  ScanLine
} from 'lucide-react';

// Mock document data
const documents = [
  {
    id: 'DOC001',
    name: 'Purchase Agreement.pdf',
    category: 'Contract',
    status: 'approved',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-03-20T10:30:00Z',
    size: '2.4 MB',
    transaction: 'TX001 - Oak Street',
    aiTags: ['executed', 'fully_signed', 'contingencies_included'],
    reviewedBy: 'Lisa Rodriguez',
    priority: 'high'
  },
  {
    id: 'DOC002', 
    name: 'Title Commitment.pdf',
    category: 'Title',
    status: 'pending_review',
    uploadedBy: 'Mike Chen',
    uploadedAt: '2024-03-22T14:15:00Z',
    size: '1.8 MB',
    transaction: 'TX001 - Oak Street',
    aiTags: ['preliminary', 'exceptions_noted', 'survey_required'],
    priority: 'high'
  },
  {
    id: 'DOC003',
    name: 'Inspection Report.pdf', 
    category: 'Inspection',
    status: 'submitted',
    uploadedBy: 'David Kim',
    uploadedAt: '2024-03-25T09:45:00Z',
    size: '5.2 MB',
    transaction: 'TX002 - Pine Avenue',
    aiTags: ['minor_issues', 'electrical_noted', 'roof_ok'],
    priority: 'medium'
  },
  {
    id: 'DOC004',
    name: 'Loan Approval Letter.pdf',
    category: 'Financing', 
    status: 'missing',
    uploadedBy: null,
    uploadedAt: null,
    size: null,
    transaction: 'TX003 - Maple Drive',
    aiTags: [],
    priority: 'critical'
  },
  {
    id: 'DOC005',
    name: 'Appraisal Report.pdf',
    category: 'Appraisal',
    status: 'approved',
    uploadedBy: 'Emma Wilson', 
    uploadedAt: '2024-03-28T16:20:00Z',
    size: '3.1 MB',
    transaction: 'TX002 - Pine Avenue',
    aiTags: ['meets_value', 'no_concerns', 'market_support'],
    reviewedBy: 'Carlos Martinez',
    priority: 'high'
  },
  {
    id: 'DOC006',
    name: 'Wire Instructions.pdf',
    category: 'Settlement',
    status: 'flagged',
    uploadedBy: 'Jennifer Davis',
    uploadedAt: '2024-04-01T11:30:00Z', 
    size: '0.8 MB',
    transaction: 'TX003 - Maple Drive',
    aiTags: ['recent_change', 'verify_required', 'watchdog_alert'],
    priority: 'critical'
  }
];

const categories = [
  'All',
  'Contract',
  'Title', 
  'Inspection',
  'Financing',
  'Appraisal',
  'Settlement',
  'Insurance',
  'Other'
];

const statusConfig = {
  approved: { color: 'text-closyr-green', bg: 'bg-closyr-green/10', icon: CheckCircle2 },
  pending_review: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Clock },
  submitted: { color: 'text-closyr-blue', bg: 'bg-closyr-blue/10', icon: Send },
  missing: { color: 'text-red-500', bg: 'bg-red-500/10', icon: AlertTriangle },
  flagged: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Shield },
  scanning: { color: 'text-blue-400', bg: 'bg-blue-400/10', icon: ScanLine },
  processing: { color: 'text-purple-400', bg: 'bg-purple-400/10', icon: Brain }
};

const documentVersions = {
  'DOC001': [
    { version: '1.3', date: '2024-03-25T10:30:00Z', changes: 'Final signatures added', author: 'Lisa Rodriguez' },
    { version: '1.2', date: '2024-03-22T14:15:00Z', changes: 'Contingency dates updated', author: 'Sarah Johnson' },
    { version: '1.1', date: '2024-03-20T09:00:00Z', changes: 'Price adjustment', author: 'Mike Chen' },
    { version: '1.0', date: '2024-03-18T16:45:00Z', changes: 'Initial draft', author: 'David Kim' }
  ]
};

const digitalSignatures = {
  'DOC001': [
    { signer: 'Sarah Johnson (Buyer)', status: 'signed', timestamp: '2024-03-20T10:30:00Z', ipAddress: '192.168.1.100' },
    { signer: 'Mike Chen (Seller)', status: 'signed', timestamp: '2024-03-20T11:15:00Z', ipAddress: '192.168.1.101' },
    { signer: 'Lisa Rodriguez (Agent)', status: 'pending', timestamp: null, ipAddress: null }
  ],
  'DOC002': [
    { signer: 'Title Company', status: 'signed', timestamp: '2024-03-22T14:15:00Z', ipAddress: '10.0.0.50' }
  ]
};

function formatDate(dateString: string | null) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ id: string; name: string; [key: string]: string } | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showSignatureStatus, setShowSignatureStatus] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Simulation functions
  const simulateScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setOcrProcessing(true);
      setTimeout(() => {
        setOcrProcessing(false);
        setShowScanner(false);
        // Simulate auto-classification
        alert('Document scanned and classified as "Deed" with 95% confidence');
      }, 2000);
    }, 3000);
  };

  const handleBatchScan = () => {
    setBatchMode(!batchMode);
    if (!batchMode) {
      alert('Batch scan mode enabled. All scanned documents will be queued for processing.');
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.transaction.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const missingDocuments = documents.filter(doc => doc.status === 'missing');
  const flaggedDocuments = documents.filter(doc => doc.status === 'flagged');
  const pendingDocuments = documents.filter(doc => doc.status === 'pending_review');

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Document Intelligence</h1>
            <p className="text-muted-foreground">AI-powered document management and analysis</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setShowScanner(true)}>
              <Camera className="h-4 w-4" />
              Scan Document
            </Button>
            <Button 
              variant={batchMode ? "default" : "outline"} 
              className="gap-2" 
              onClick={handleBatchScan}
            >
              <Layers className="h-4 w-4" />
              Batch Mode
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="gold" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glassmorphic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </div>
                <FileText className="h-8 w-8 text-closyr-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Missing</p>
                  <p className="text-2xl font-bold text-red-500">{missingDocuments.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-500">{pendingDocuments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphic border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                  <p className="text-2xl font-bold text-orange-500">{flaggedDocuments.length}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Missing Documents Alert */}
        {missingDocuments.length > 0 && (
          <Card className="glassmorphic border-red-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-red-500 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Missing Documents Alert
              </CardTitle>
              <CardDescription>
                Critical documents required for transaction completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {missingDocuments.map((doc) => (
                  <div key={doc.id} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.transaction}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Request
                        </Button>
                        <Button size="sm" variant="default">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scanner Interface */}
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowScanner(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-closyr-blue/20 rounded-full flex items-center justify-center">
                  {isScanning ? (
                    <ScanLine className="h-8 w-8 text-closyr-blue animate-pulse" />
                  ) : ocrProcessing ? (
                    <Brain className="h-8 w-8 text-purple-400 animate-pulse" />
                  ) : (
                    <Camera className="h-8 w-8 text-closyr-blue" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isScanning ? 'Scanning Document...' : 
                     ocrProcessing ? 'AI Reading Document...' : 
                     'Document Scanner'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isScanning ? 'Please keep document steady' : 
                     ocrProcessing ? 'Extracting text and classifying document type' : 
                     'Position document within the camera view'}
                  </p>
                </div>

                {ocrProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>OCR Progress</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full w-3/4 smooth-transition"></div>
                    </div>
                  </div>
                )}

                {batchMode && !isScanning && !ocrProcessing && (
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-400">Batch mode enabled - documents will be queued</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {!isScanning && !ocrProcessing && (
                    <>
                      <Button variant="outline" className="flex-1" onClick={() => setShowScanner(false)}>
                        Cancel
                      </Button>
                      <Button variant="default" className="flex-1 gap-2" onClick={simulateScanning}>
                        <Scan className="h-4 w-4" />
                        Start Scan
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Document Preview Modal */}
        {showPreview && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-background border border-border rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{selectedDocument.name}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowVersionHistory(true)}>
                    <History className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowSignatureStatus(true)}>
                    <PenTool className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                    ✕
                  </Button>
                </div>
              </div>
              
              {/* Mock document preview */}
              <div className="aspect-[8.5/11] bg-white rounded border border-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Document Preview - {selectedDocument.name}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Version History Modal */}
        {showVersionHistory && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowVersionHistory(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Version History</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowVersionHistory(false)}>
                  ✕
                </Button>
              </div>
              
              <div className="space-y-3">
                {(documentVersions[selectedDocument.id as keyof typeof documentVersions] || []).map((version, index) => (
                  <div key={version.version} className="p-3 rounded-lg border border-border/50">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">v{version.version}</span>
                      {index === 0 && (
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{version.changes}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{version.author}</span>
                      <span>{formatDate(version.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Digital Signature Status Modal */}
        {showSignatureStatus && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowSignatureStatus(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Digital Signatures</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSignatureStatus(false)}>
                  ✕
                </Button>
              </div>
              
              <div className="space-y-3">
                {(digitalSignatures[selectedDocument.id as keyof typeof digitalSignatures] || []).map((signature, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{signature.signer}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        signature.status === 'signed' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {signature.status.toUpperCase()}
                      </span>
                    </div>
                    {signature.timestamp && (
                      <div className="text-xs text-muted-foreground">
                        <p>Signed: {formatDate(signature.timestamp)}</p>
                        <p>IP: {signature.ipAddress}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Upload Zone */}
        <Card className={`glassmorphic border-2 border-dashed transition-all ${
          dragActive ? 'border-closyr-blue bg-closyr-blue/5' : 'border-border'
        }`}>
          <CardContent className="p-8">
            <div
              className="text-center"
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                // Handle file drop logic here
              }}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
              <p className="text-muted-foreground mb-4">
                Supports PDF, DOC, DOCX, JPG, PNG up to 10MB each
              </p>
              <Button variant="default" className="gap-2">
                <Upload className="h-4 w-4" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Categories */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
            />
          </div>
          
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents ({filteredDocuments.length})
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Zap className="h-4 w-4 mr-1" />
                  Auto-categorize
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredDocuments.map((doc) => {
                const statusInfo = statusConfig[doc.status as keyof typeof statusConfig] || statusConfig.pending_review;
                const StatusIcon = statusInfo.icon;
                
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg border border-border hover:border-closyr-blue/50 smooth-transition hover:bg-accent/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-closyr-blue/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-closyr-blue" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusInfo.bg} ${statusInfo.color}`}>
                              <StatusIcon className="h-3 w-3" />
                              {doc.status.replace('_', ' ')}
                            </div>
                            {doc.priority === 'critical' && (
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-500/10 text-red-500">
                                <AlertTriangle className="h-3 w-3" />
                                Critical
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{doc.category}</span>
                            <span>{doc.transaction}</span>
                            {doc.size && <span>{doc.size}</span>}
                            {doc.uploadedBy && <span>by {doc.uploadedBy}</span>}
                            <span>{formatDate(doc.uploadedAt)}</span>
                          </div>
                          
                          {doc.aiTags.length > 0 && (
                            <div className="flex items-center gap-1 mt-2">
                              <Tag className="h-3 w-3 text-muted-foreground" />
                              <div className="flex gap-1">
                                {doc.aiTags.slice(0, 3).map((tag) => (
                                  <span key={tag} className="px-2 py-0.5 text-xs bg-muted/50 rounded">
                                    {tag.replace('_', ' ')}
                                  </span>
                                ))}
                                {doc.aiTags.length > 3 && (
                                  <span className="px-2 py-0.5 text-xs text-muted-foreground">
                                    +{doc.aiTags.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowPreview(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowVersionHistory(true);
                          }}
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowSignatureStatus(true);
                          }}
                        >
                          <PenTool className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        {(doc.status === 'pending_review' || doc.status === 'flagged') && (
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}