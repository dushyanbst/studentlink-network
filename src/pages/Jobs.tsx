import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock, Search } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Tech Corp",
    location: "Remote",
    type: "Internship",
    department: "Computer Science",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Marketing Assistant",
    company: "Creative Agency",
    location: "On Campus",
    type: "Part-time",
    department: "Business",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Research Assistant - Biology Lab",
    company: "University Research Center",
    location: "On Campus",
    type: "Full-time",
    department: "Biology",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "Financial Services Inc",
    location: "Hybrid",
    type: "Internship",
    department: "Mathematics",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Teaching Assistant - Chemistry",
    company: "Chemistry Department",
    location: "On Campus",
    type: "Part-time",
    department: "Chemistry",
    posted: "1 day ago",
  },
];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Jobs & Internships</h1>
            <p className="text-muted-foreground mt-1">Find opportunities that match your skills</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search jobs..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.company}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline">{job.department}</Badge>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Posted {job.posted}
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

export default Jobs;
