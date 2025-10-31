import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Search, Plus, TrendingUp } from "lucide-react";

const mockDiscussions = [
  {
    id: 1,
    title: "Best strategies for preparing for final exams?",
    author: "Jessica Wu",
    category: "Study Tips",
    replies: 24,
    views: 156,
    lastActive: "10 min ago",
    isPinned: true,
  },
  {
    id: 2,
    title: "Recommendations for CS internship interview prep",
    author: "Mike Johnson",
    category: "Career",
    replies: 18,
    views: 89,
    lastActive: "1 hour ago",
    isPinned: false,
  },
  {
    id: 3,
    title: "Study group for Calculus II - Anyone interested?",
    author: "Sarah Chen",
    category: "Study Groups",
    replies: 31,
    views: 203,
    lastActive: "2 hours ago",
    isPinned: false,
  },
  {
    id: 4,
    title: "Discussion: Impact of AI on future job market",
    author: "Prof. Anderson",
    category: "Technology",
    replies: 42,
    views: 287,
    lastActive: "3 hours ago",
    isPinned: true,
  },
  {
    id: 5,
    title: "Campus events this weekend - Let's meet up!",
    author: "Student Council",
    category: "Events",
    replies: 15,
    views: 124,
    lastActive: "5 hours ago",
    isPinned: false,
  },
];

const Discussions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">Discussions</h1>
              <p className="text-muted-foreground mt-1">Connect and share ideas with your peers</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Discussion
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search discussions..."
              className="pl-10"
            />
          </div>

          {/* Discussion List */}
          <div className="space-y-3">
            {mockDiscussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex gap-4">
                    <Avatar className="hidden sm:flex">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {discussion.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <CardTitle className="text-lg leading-tight flex-1 hover:text-primary transition-colors cursor-pointer">
                          {discussion.title}
                        </CardTitle>
                        {discussion.isPinned && (
                          <Badge variant="secondary" className="gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Pinned
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex flex-wrap gap-2 items-center">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{discussion.views} views</span>
                    </div>
                    <div className="ml-auto text-xs">
                      Last active {discussion.lastActive}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discussions;
