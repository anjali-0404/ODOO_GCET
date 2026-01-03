import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Search, 
  FileText, 
  Download, 
  Eye, 
  MoreVertical,
  Folder,
  File,
  Calendar,
  User,
  Trash2,
  Share2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  status: "active" | "archived" | "pending";
  isShared: boolean;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Employment Contract - 2024.pdf",
    type: "PDF",
    category: "Contracts",
    size: "2.4 MB",
    uploadedBy: "HR Department",
    uploadedDate: "2024-01-15",
    status: "active",
    isShared: false,
  },
  {
    id: "2",
    name: "Company Handbook.pdf",
    type: "PDF",
    category: "Policies",
    size: "5.2 MB",
    uploadedBy: "HR Department",
    uploadedDate: "2026-01-01",
    status: "active",
    isShared: true,
  },
  {
    id: "3",
    name: "Benefits Enrollment Form.pdf",
    type: "PDF",
    category: "Benefits",
    size: "856 KB",
    uploadedBy: "Sarah Johnson",
    uploadedDate: "2024-03-10",
    status: "active",
    isShared: false,
  },
  {
    id: "4",
    name: "Tax Documents 2025.zip",
    type: "ZIP",
    category: "Tax",
    size: "12.1 MB",
    uploadedBy: "Payroll System",
    uploadedDate: "2026-01-02",
    status: "active",
    isShared: false,
  },
  {
    id: "5",
    name: "Performance Review Q4 2025.pdf",
    type: "PDF",
    category: "Performance",
    size: "1.8 MB",
    uploadedBy: "Michael Chen",
    uploadedDate: "2025-12-28",
    status: "active",
    isShared: false,
  },
  {
    id: "6",
    name: "Training Certificate - React Advanced.pdf",
    type: "PDF",
    category: "Training",
    size: "624 KB",
    uploadedBy: "Sarah Johnson",
    uploadedDate: "2025-11-15",
    status: "active",
    isShared: false,
  },
  {
    id: "7",
    name: "Payslip December 2025.pdf",
    type: "PDF",
    category: "Payroll",
    size: "342 KB",
    uploadedBy: "Payroll System",
    uploadedDate: "2025-12-31",
    status: "active",
    isShared: false,
  },
  {
    id: "8",
    name: "NDA Agreement.pdf",
    type: "PDF",
    category: "Contracts",
    size: "1.2 MB",
    uploadedBy: "Legal Department",
    uploadedDate: "2024-01-20",
    status: "active",
    isShared: false,
  },
  {
    id: "9",
    name: "Remote Work Policy 2026.docx",
    type: "DOCX",
    category: "Policies",
    size: "456 KB",
    uploadedBy: "HR Department",
    uploadedDate: "2026-01-01",
    status: "active",
    isShared: true,
  },
  {
    id: "10",
    name: "Insurance Card - Health.pdf",
    type: "PDF",
    category: "Benefits",
    size: "128 KB",
    uploadedBy: "Benefits Admin",
    uploadedDate: "2024-02-01",
    status: "active",
    isShared: false,
  },
];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "archived": return "secondary";
      case "pending": return "outline";
      default: return "default";
    }
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || doc.category.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const categories = Array.from(new Set(mockDocuments.map(d => d.category)));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">Manage your personal and company documents</p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockDocuments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Shared</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {mockDocuments.filter(d => d.isShared).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28.5 MB</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {categories.map((category) => {
            const count = mockDocuments.filter(d => d.category === category).length;
            return (
              <Card 
                key={category} 
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setActiveTab(category)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Folder className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{category}</p>
                      <p className="text-xs text-muted-foreground">{count} files</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            {categories.slice(0, 4).map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "all" ? "All Documents" : activeTab}
              <span className="text-muted-foreground font-normal ml-2">
                ({filteredDocuments.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{doc.name}</p>
                        {doc.isShared && (
                          <Badge variant="secondary" className="text-xs">
                            <Share2 className="h-3 w-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <File className="h-3 w-3" />
                          {doc.type} • {doc.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {doc.uploadedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(doc.uploadedDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No documents found</p>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload your first document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
