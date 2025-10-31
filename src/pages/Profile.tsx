import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, BookOpen, Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-start gap-3 justify-between">
                    <div>
                      <h1 className="font-heading font-bold text-2xl">John Smith</h1>
                      <p className="text-muted-foreground">Computer Science Student</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Class of 2025</Badge>
                    <Badge variant="outline">Dean's List</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.smith@university.edu</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Campus Residence Hall A</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Computer Science Major</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Tell others about yourself</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Write a brief introduction about yourself..."
                defaultValue="Passionate about software development and AI. Currently working on machine learning projects and looking for internship opportunities. Love connecting with fellow students and collaborating on innovative ideas."
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your academic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" defaultValue="Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" defaultValue="Junior (3rd Year)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input id="gpa" defaultValue="3.85" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduation">Expected Graduation</Label>
                  <Input id="graduation" defaultValue="May 2025" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Interests & Skills</CardTitle>
              <CardDescription>What you're passionate about</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Machine Learning</Badge>
                <Badge>Web Development</Badge>
                <Badge>Data Science</Badge>
                <Badge>Python</Badge>
                <Badge>JavaScript</Badge>
                <Badge>React</Badge>
                <Badge>Research</Badge>
                <Badge>Innovation</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
