import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Computer Science",
    avatar: "",
    content: "Just finished my Machine Learning project! The model achieved 94% accuracy. So proud of this work 🎉",
    likes: 45,
    comments: 12,
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Prof. Michael Chen",
    role: "Mathematics Department",
    avatar: "",
    content: "Reminder: Office hours tomorrow from 2-4 PM. Looking forward to discussing your calculus questions!",
    likes: 28,
    comments: 5,
    time: "5 hours ago",
  },
  {
    id: 3,
    author: "Alex Kumar",
    role: "Business Administration",
    avatar: "",
    content: "Anyone interested in starting a study group for Financial Accounting? Let's connect!",
    likes: 32,
    comments: 18,
    time: "1 day ago",
  },
];

const Feed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-3xl py-6 space-y-6">
        {/* Create Post */}
        <Card>
          <CardHeader>
            <h2 className="font-heading font-semibold text-lg">Share something with your community</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        {mockPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {post.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">{post.role} • {post.time}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Feed;
