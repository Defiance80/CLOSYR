"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileCheck,
  FileText,
  Plus,
  Search,
  Filter,
  Copy,
  Edit,
  Eye,
  Download,
  Share,
  Clock,
  Star,
  Users,
  Tag,
  Layout,
  MoreVertical,
  Code,
  Save,
  Settings
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  lastModified: Date;
  createdBy: string;
  usageCount: number;
  isFavorite: boolean;
  isShared: boolean;
  tags: string[];
  preview: string;
  fields: string[];
}

const templates: Template[] = [
  {
    id: 'tpl-001',
    name: 'Closing Disclosure',
    category: 'Closing',
    description: 'TRID-compliant closing disclosure form with automated calculations',
    lastModified: new Date('2024-03-20'),
    createdBy: 'System',
    usageCount: 127,
    isFavorite: true,
    isShared: false,
    tags: ['TRID', 'required', 'calculation'],
    preview: 'Federal closing disclosure form with borrower and seller information, loan terms, and closing cost details.',
    fields: ['[borrower_name]', '[property_address]', '[loan_amount]', '[closing_date]', '[lender_name]']
  },
  {
    id: 'tpl-002',
    name: 'Settlement Statement (HUD-1)',
    category: 'Closing',
    description: 'Traditional HUD-1 settlement statement for non-TRID transactions',
    lastModified: new Date('2024-03-18'),
    createdBy: 'Lisa Rodriguez',
    usageCount: 89,
    isFavorite: false,
    isShared: true,
    tags: ['HUD-1', 'settlement', 'legacy'],
    preview: 'Detailed breakdown of all charges and credits in a real estate transaction.',
    fields: ['[buyer_name]', '[seller_name]', '[property_address]', '[sale_price]', '[commission]']
  },
  {
    id: 'tpl-003',
    name: 'Title Commitment',
    category: 'Title',
    description: 'Standard title insurance commitment with schedule of exceptions',
    lastModified: new Date('2024-03-22'),
    createdBy: 'Mike Chen',
    usageCount: 156,
    isFavorite: true,
    isShared: false,
    tags: ['title', 'insurance', 'commitment'],
    preview: 'Title insurance commitment outlining coverage and exceptions.',
    fields: ['[insured_name]', '[property_description]', '[policy_amount]', '[effective_date]']
  },
  {
    id: 'tpl-004',
    name: 'Warranty Deed',
    category: 'Legal',
    description: 'General warranty deed template with full covenants',
    lastModified: new Date('2024-03-15'),
    createdBy: 'Sarah Johnson',
    usageCount: 234,
    isFavorite: false,
    isShared: true,
    tags: ['deed', 'warranty', 'transfer'],
    preview: 'Legal document transferring ownership with full warranties.',
    fields: ['[grantor_name]', '[grantee_name]', '[property_description]', '[consideration]']
  },
  {
    id: 'tpl-005',
    name: 'Mortgage Note',
    category: 'Legal',
    description: 'Promissory note for mortgage loans with payment terms',
    lastModified: new Date('2024-03-25'),
    createdBy: 'David Kim',
    usageCount: 67,
    isFavorite: true,
    isShared: false,
    tags: ['mortgage', 'note', 'payment'],
    preview: 'Promissory note outlining loan terms and payment obligations.',
    fields: ['[borrower_name]', '[principal_amount]', '[interest_rate]', '[payment_amount]']
  },
  {
    id: 'tpl-006',
    name: 'Property Disclosure',
    category: 'Compliance',
    description: 'Seller property disclosure statement',
    lastModified: new Date('2024-03-20'),
    createdBy: 'Emma Wilson',
    usageCount: 98,
    isFavorite: false,
    isShared: true,
    tags: ['disclosure', 'seller', 'property'],
    preview: 'Required disclosure of known property conditions and defects.',
    fields: ['[seller_name]', '[property_address]', '[disclosure_items]']
  },
  {
    id: 'tpl-007',
    name: 'Affidavit of Title',
    category: 'Title',
    description: 'Seller affidavit regarding title and liens',
    lastModified: new Date('2024-03-19'),
    createdBy: 'Robert Taylor',
    usageCount: 145,
    isFavorite: true,
    isShared: false,
    tags: ['affidavit', 'title', 'seller'],
    preview: 'Sworn statement regarding property ownership and encumbrances.',
    fields: ['[affiant_name]', '[property_address]', '[ownership_period]']
  },
  {
    id: 'tpl-008',
    name: 'Estoppel Certificate',
    category: 'Escrow',
    description: 'Lender estoppel for loan payoff amounts',
    lastModified: new Date('2024-03-17'),
    createdBy: 'Jennifer Davis',
    usageCount: 76,
    isFavorite: false,
    isShared: true,
    tags: ['estoppel', 'payoff', 'lender'],
    preview: 'Certificate confirming loan balance and payoff requirements.',
    fields: ['[lender_name]', '[borrower_name]', '[loan_number]', '[payoff_amount]']
  }
];

const categories = ['All', 'Closing', 'Title', 'Legal', 'Compliance', 'Escrow'];

const recentlyUsed = templates.filter(tpl => tpl.usageCount > 50).slice(0, 4);

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [favoriteFilter, setFavoriteFilter] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorite = !favoriteFilter || template.isFavorite;
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  const toggleFavorite = (templateId: string) => {
    // Mock toggle favorite functionality
    console.log('Toggle favorite:', templateId);
  };

  const duplicateTemplate = (template: Template) => {
    // Mock duplicate functionality
    console.log('Duplicate template:', template.name);
  };

  const shareTemplate = (template: Template) => {
    // Mock share functionality
    console.log('Share template:', template.name);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Document Templates</h1>
            <p className="text-muted-foreground">Create and manage standardized document templates</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Import Templates
            </Button>
            <Button className="gap-2" onClick={() => setShowEditor(true)}>
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                  <p className="text-2xl font-bold text-closyr-blue">{templates.length}</p>
                </div>
                <FileCheck className="h-8 w-8 text-closyr-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold text-closyr-gold">
                    {templates.filter(t => t.isFavorite).length}
                  </p>
                </div>
                <Star className="h-8 w-8 text-closyr-gold opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Shared</p>
                  <p className="text-2xl font-bold text-closyr-green">
                    {templates.filter(t => t.isShared).length}
                  </p>
                </div>
                <Share className="h-8 w-8 text-closyr-green opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Usage</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-400 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Used Templates */}
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recently Used Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentlyUsed.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 cursor-pointer smooth-transition"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-closyr-blue" />
                    <h3 className="font-medium truncate">{template.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.usageCount} uses</span>
                    <span>{template.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-background/50 border border-border rounded-md focus:border-closyr-blue smooth-transition"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-2">Category</h4>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Favorites Filter */}
                <div>
                  <Button
                    variant={favoriteFilter ? "default" : "outline"}
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => setFavoriteFilter(!favoriteFilter)}
                  >
                    <Star className="h-4 w-4" />
                    Favorites Only
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Template Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.slice(1).map((category) => {
                    const count = templates.filter(t => t.category === category).length;
                    return (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm">{category}</span>
                        <span className="text-sm text-muted-foreground">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glassmorphic">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Templates ({filteredTemplates.length})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Sort
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Layout className="h-4 w-4" />
                      Grid View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-closyr-blue/30 cursor-pointer smooth-transition group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-closyr-blue" />
                          <span className="text-sm font-medium text-muted-foreground">
                            {template.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(template.id);
                            }}
                          >
                            <Star className={`h-3 w-3 ${template.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <h3 className="font-medium mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {template.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-muted/50 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {template.tags.length > 2 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">
                            +{template.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Merge Fields Preview */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1">Merge Fields:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.fields.slice(0, 3).map((field) => (
                            <code key={field} className="px-1 py-0.5 text-xs bg-code rounded">
                              {field}
                            </code>
                          ))}
                          {template.fields.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{template.fields.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{template.usageCount} uses</span>
                        <span>by {template.createdBy}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateTemplate(template);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setShowEditor(true);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Template Preview Modal */}
        {selectedTemplate && !showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-background border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedTemplate.name}</h3>
                  <p className="text-muted-foreground">{selectedTemplate.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowEditor(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
                    ✕
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span> {selectedTemplate.category}
                  </div>
                  <div>
                    <span className="font-medium">Usage Count:</span> {selectedTemplate.usageCount}
                  </div>
                  <div>
                    <span className="font-medium">Created by:</span> {selectedTemplate.createdBy}
                  </div>
                  <div>
                    <span className="font-medium">Last Modified:</span> {selectedTemplate.lastModified.toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Merge Fields</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.fields.map((field) => (
                      <code key={field} className="px-2 py-1 text-sm bg-muted/50 rounded">
                        {field}
                      </code>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Template Preview</h4>
                  <div className="p-4 bg-white text-black rounded border">
                    <p className="text-sm">{selectedTemplate.preview}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 gap-2">
                    <Copy className="h-4 w-4" />
                    Use Template
                  </Button>
                  <Button variant="outline" onClick={() => duplicateTemplate(selectedTemplate)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => shareTemplate(selectedTemplate)}>
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Template Editor Modal */}
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => {
              setShowEditor(false);
              setSelectedTemplate(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-background border border-border rounded-lg p-6 max-w-6xl w-full mx-4 h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {selectedTemplate ? `Edit: ${selectedTemplate.name}` : 'Create New Template'}
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="default" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setShowEditor(false);
                    setSelectedTemplate(null);
                  }}>
                    ✕
                  </Button>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Editor Settings */}
                <div className="space-y-4">
                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="text-lg">Template Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Template Name</label>
                        <input
                          type="text"
                          defaultValue={selectedTemplate?.name || ''}
                          className="w-full h-9 px-3 bg-background/50 border border-border rounded-md"
                          placeholder="Enter template name..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="w-full h-9 px-3 bg-background/50 border border-border rounded-md">
                          <option>Closing</option>
                          <option>Title</option>
                          <option>Legal</option>
                          <option>Compliance</option>
                          <option>Escrow</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          defaultValue={selectedTemplate?.description || ''}
                          className="w-full h-20 px-3 py-2 bg-background/50 border border-border rounded-md resize-none"
                          placeholder="Template description..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Tags</label>
                        <input
                          type="text"
                          defaultValue={selectedTemplate?.tags.join(', ') || ''}
                          className="w-full h-9 px-3 bg-background/50 border border-border rounded-md"
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="text-lg">Merge Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground mb-3">Available merge fields:</p>
                        <div className="space-y-1">
                          <code className="block px-2 py-1 bg-muted/50 rounded cursor-pointer hover:bg-muted">
                            [buyer_name]
                          </code>
                          <code className="block px-2 py-1 bg-muted/50 rounded cursor-pointer hover:bg-muted">
                            [seller_name]
                          </code>
                          <code className="block px-2 py-1 bg-muted/50 rounded cursor-pointer hover:bg-muted">
                            [property_address]
                          </code>
                          <code className="block px-2 py-1 bg-muted/50 rounded cursor-pointer hover:bg-muted">
                            [sale_price]
                          </code>
                          <code className="block px-2 py-1 bg-muted/50 rounded cursor-pointer hover:bg-muted">
                            [closing_date]
                          </code>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Field
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Editor */}
                <div className="lg:col-span-2">
                  <Card className="glassmorphic h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Template Editor</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-4rem)]">
                      <div className="h-full bg-white rounded border p-4 text-black font-mono text-sm overflow-y-auto">
                        {selectedTemplate ? (
                          <div>
                            <p className="mb-4">{selectedTemplate.preview}</p>
                            <br />
                            <p>Document contains the following merge fields:</p>
                            <ul className="list-disc ml-4 mt-2">
                              {selectedTemplate.fields.map((field) => (
                                <li key={field}>{field}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-gray-500">Start typing your template content here...</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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