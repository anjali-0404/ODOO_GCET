import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Share2,
  Archive
} from "lucide-react";
import { useDocuments, Document } from "@/contexts/DocumentsContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Documents() {
  const { documents, addDocument, deleteDocument, archiveDocument, shareDocument, unshareDocument } = useDocuments();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newDoc, setNewDoc] = useState({
    category: "Contracts",
  });

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx': 
      case 'doc': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'zip': return <Folder className="h-5 w-5 text-yellow-500" />;
      default: return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const categories = [...new Set(documents.map(d => d.category))];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch && doc.status !== "archived";
    if (activeTab === "shared") return matchesSearch && doc.isShared;
    if (activeTab === "archived") return matchesSearch && doc.status === "archived";
    return matchesSearch && doc.category.toLowerCase() === activeTab && doc.status !== "archived";
  });

  const stats = {
    total: documents.filter(d => d.status !== "archived").length,
    shared: documents.filter(d => d.isShared).length,
    archived: documents.filter(d => d.status === "archived").length,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({ title: "File too large", description: "Maximum file size is 50MB.", variant: "destructive" });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({ title: "Error", description: "Please select a file.", variant: "destructive" });
      return;
    }

    addDocument({
      name: selectedFile.name,
      type: selectedFile.name.split(".").pop()?.toUpperCase() || "FILE",
      category: newDoc.category,
      size: selectedFile.size > 1024 * 1024 
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(selectedFile.size / 1024).toFixed(0)} KB`,
      uploadedBy: "You",
      uploadedDate: new Date().toISOString().split("T")[0],
      status: "active",
      isShared: false,
    });

    setSelectedFile(null);
    setNewDoc({ category: "Contracts" });
    setIsUploadOpen(false);
    toast({ title: "Document uploaded", description: `${selectedFile.name} has been uploaded.` });
  };

  const handleDelete = () => {
    if (deleteDocId) {
      deleteDocument(deleteDocId);
      setDeleteDocId(null);
      toast({ title: "Document deleted", description: "Document has been removed." });
    }
  };

  const handleArchive = (id: string) => {
    archiveDocument(id);
    toast({ title: "Document archived", description: "Document has been archived." });
  };

  const handleShare = (id: string, isShared: boolean) => {
    if (isShared) {
      unshareDocument(id);
      toast({ title: "Sharing disabled", description: "Document is no longer shared." });
    } else {
      shareDocument(id);
      toast({ title: "Document shared", description: "Document is now shared." });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">Manage your files and documents</p>
          </div>
          <Button onClick={() => setIsUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />Total Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4" />Shared
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.shared}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Archive className="h-4 w-4" />Archived
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-600">{stats.archived}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
            {categories.slice(0, 4).map((cat) => (
              <TabsTrigger key={cat} value={cat.toLowerCase()}>{cat}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Documents List */}
        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    {getTypeIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{doc.name}</h4>
                      {doc.isShared && <Badge variant="secondary" className="text-xs">Shared</Badge>}
                      {doc.status === "archived" && <Badge variant="outline" className="text-xs">Archived</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Folder className="h-3 w-3" />{doc.category}
                      </span>
                      <span>{doc.type} • {doc.size}</span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />{doc.uploadedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{new Date(doc.uploadedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                        <DropdownMenuItem onClick={() => handleShare(doc.id, doc.isShared)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          {doc.isShared ? "Unshare" : "Share"}
                        </DropdownMenuItem>
                        {doc.status !== "archived" && (
                          <DropdownMenuItem onClick={() => handleArchive(doc.id)}>
                            <Archive className="mr-2 h-4 w-4" />Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => setDeleteDocId(doc.id)} 
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No documents found</p>
          </div>
        )}

        {/* Upload Dialog */}
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a new document to your workspace</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newDoc.category} onValueChange={(v) => setNewDoc({ ...newDoc, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contracts">Contracts</SelectItem>
                    <SelectItem value="Policies">Policies</SelectItem>
                    <SelectItem value="Benefits">Benefits</SelectItem>
                    <SelectItem value="Tax">Tax</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Payroll">Payroll</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="doc-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to select a file (max 50MB)</p>
                  </label>
                  {selectedFile && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setSelectedFile(null); setIsUploadOpen(false); }}>Cancel</Button>
              <Button onClick={handleUpload} disabled={!selectedFile}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteDocId} onOpenChange={() => setDeleteDocId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Document</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this document? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
