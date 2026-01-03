import { createContext, useContext, useState, ReactNode } from "react";

export interface Document {
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

interface DocumentsContextType {
  documents: Document[];
  addDocument: (doc: Omit<Document, "id">) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  archiveDocument: (id: string) => void;
  shareDocument: (id: string) => void;
  unshareDocument: (id: string) => void;
  getDocument: (id: string) => Document | undefined;
}

const initialDocuments: Document[] = [
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
];

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const addDocument = (doc: Omit<Document, "id">) => {
    const newDoc: Document = {
      ...doc,
      id: `doc${Date.now()}`,
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const archiveDocument = (id: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status: "archived" as const } : d));
  };

  const shareDocument = (id: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, isShared: true } : d));
  };

  const unshareDocument = (id: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, isShared: false } : d));
  };

  const getDocument = (id: string) => documents.find(d => d.id === id);

  return (
    <DocumentsContext.Provider value={{ 
      documents, 
      addDocument, 
      updateDocument, 
      deleteDocument, 
      archiveDocument,
      shareDocument,
      unshareDocument,
      getDocument 
    }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return context;
}
