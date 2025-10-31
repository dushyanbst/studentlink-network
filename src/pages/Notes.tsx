import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Upload } from "lucide-react";

const mockNotes = [
  {
    id: 1,
    title: "Data Structures & Algorithms - Complete Notes",
    subject: "Computer Science",
    author: "Emily Zhang",
    downloads: 234,
    semester: "Fall 2024",
  },
  {
    id: 2,
    title: "Calculus II - Lecture Notes Week 1-5",
    subject: "Mathematics",
    author: "Prof. David Lee",
    downloads: 156,
    semester: "Fall 2024",
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Manual",
    subject: "Chemistry",
    author: "Rachel Green",
    downloads: 189,
    semester: "Fall 2024",
  },
  {
    id: 4,
    title: "Marketing Principles - Case Studies",
    subject: "Business",
    author: "John Smith",
    downloads: 98,
    semester: "Fall 2024",
  },
  {
    id: 5,
    title: "World History - Modern Era Summary",
    subject: "History",
    author: "Prof. Maria Garcia",
    downloads: 167,
    semester: "Fall 2024",
  },
];

const Notes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">Study Notes</h1>
              <p className="text-muted-foreground mt-1">Share and access course materials</p>
            </div>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Notes
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search notes by title, subject, or author..."
              className="pl-10"
            />
          </div>

          {/* Notes Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {mockNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                      <CardDescription>by {note.author}</CardDescription>
                    </div>
                    <Badge variant="secondary">{note.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{note.semester}</span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {note.downloads} downloads
                    </span>
                  </div>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notes;
