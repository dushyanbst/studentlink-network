import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, AlertCircle, Info, Trophy } from "lucide-react";

const mockAnnouncements = [
  {
    id: 1,
    title: "Final Exam Schedule Released",
    content: "The final exam schedule for Fall 2024 is now available. Please check your student portal for specific dates and times.",
    category: "Academic",
    priority: "high",
    date: "2024-11-15",
    icon: AlertCircle,
  },
  {
    id: 2,
    title: "Career Fair - December 5th",
    content: "Join us for the annual Career Fair! Over 50 companies will be present. Bring your resume and dress professionally.",
    category: "Event",
    priority: "medium",
    date: "2024-11-14",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Library Hours Extended for Finals Week",
    content: "The library will be open 24/7 during finals week (Dec 10-20) to support your study needs.",
    category: "Facility",
    priority: "low",
    date: "2024-11-13",
    icon: Info,
  },
  {
    id: 4,
    title: "Research Grants Application Deadline",
    content: "Student research grant applications are due December 1st. Up to $5,000 available for qualifying projects.",
    category: "Academic",
    priority: "high",
    date: "2024-11-12",
    icon: Trophy,
  },
  {
    id: 5,
    title: "Campus Safety Reminder",
    content: "Please remember to use the campus escort service after dark. Available 7 PM - 2 AM daily. Call ext. 2222.",
    category: "Safety",
    priority: "medium",
    date: "2024-11-10",
    icon: AlertCircle,
  },
];

const priorityColors = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const;

const Announcements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">Announcements</h1>
              <p className="text-muted-foreground">Stay updated with campus news and events</p>
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {mockAnnouncements.map((announcement) => {
              const Icon = announcement.icon;
              return (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        announcement.priority === 'high' 
                          ? 'bg-destructive/10' 
                          : 'bg-primary/10'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          announcement.priority === 'high'
                            ? 'text-destructive'
                            : 'text-primary'
                        }`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-start gap-2 justify-between">
                          <CardTitle className="text-xl">{announcement.title}</CardTitle>
                          <Badge variant={priorityColors[announcement.priority]}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="outline">{announcement.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(announcement.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Announcements;
