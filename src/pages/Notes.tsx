import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Pin, Trash2, Edit, MoreVertical, StickyNote } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Q1 Goals",
    content: "1. Increase team productivity by 20%\n2. Launch new product features\n3. Improve customer satisfaction scores\n4. Reduce technical debt",
    category: "Work",
    isPinned: true,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-02",
    color: "bg-yellow-100",
  },
  {
    id: "2",
    title: "Meeting Notes - Jan 3",
    content: "Team standup discussion:\n- Website redesign progress on track\n- Mobile app development needs more resources\n- Security audit completed successfully",
    category: "Meetings",
    isPinned: true,
    createdAt: "2026-01-03",
    updatedAt: "2026-01-03",
    color: "bg-blue-100",
  },
  {
    id: "3",
    title: "Employee Feedback Ideas",
    content: "Ideas for improving employee engagement:\n- Monthly team building activities\n- Flexible work hours\n- Professional development budget\n- Recognition program",
    category: "HR",
    isPinned: false,
    createdAt: "2025-12-28",
    updatedAt: "2025-12-30",
    color: "bg-green-100",
  },
  {
    id: "4",
    title: "Project Deadlines",
    content: "Important deadlines:\n- Website redesign: March 15\n- Mobile app beta: April 30\n- HR system integration: January 31\n- Security patches: January 15",
    category: "Work",
    isPinned: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-02",
    color: "bg-red-100",
  },
  {
    id: "5",
    title: "Training Resources",
    content: "Useful resources for team development:\n- React documentation\n- TypeScript handbook\n- AWS certification materials\n- Leadership courses on Udemy",
    category: "Learning",
    isPinned: false,
    createdAt: "2025-12-20",
    updatedAt: "2025-12-25",
    color: "bg-purple-100",
  },
  {
    id: "6",
    title: "Office Supplies Needed",
    content: "Items to order:\n- Whiteboard markers\n- Sticky notes\n- Printer paper\n- Coffee for break room\n- Standing desks (2)",
    category: "Admin",
    isPinned: false,
    createdAt: "2025-12-15",
    updatedAt: "2026-01-02",
    color: "bg-orange-100",
  },
];

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notes, setNotes] = useState(mockNotes);

  const categories = ["all", ...Array.from(new Set(mockNotes.map(n => n.category)))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const regularNotes = filteredNotes.filter(note => !note.isPinned);

  const togglePin = (noteId: string) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const NoteCard = ({ note }: { note: Note }) => (
    <Card className={`${note.color} border-2 hover:shadow-lg transition-all`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => togglePin(note.id)}
            >
              <Pin className={`h-4 w-4 ${note.isPinned ? 'fill-current' : ''}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteNote(note.id)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit">{note.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-6 mb-3">
          {note.content}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Updated {formatDate(note.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notes</h1>
            <p className="text-muted-foreground">Capture and organize your thoughts</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{notes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pinned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {notes.filter(n => n.isPinned).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(notes.map(n => n.category)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Pin className="h-5 w-5" />
              Pinned Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes */}
        {regularNotes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regularNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <StickyNote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notes found</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create your first note
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
