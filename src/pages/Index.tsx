import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, MessageSquare, Briefcase, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="p-4 rounded-2xl bg-primary/10">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-foreground">
            Campus Link
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Connect, collaborate, and grow with your university community
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Network with students and faculty</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Share Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Access study materials</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Briefcase className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Find Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Discover opportunities</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Discuss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Engage in conversations</p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Card */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your campus network</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.smith@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full" onClick={handleLogin}>Sign In</Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account? <span className="text-primary cursor-pointer hover:underline">Sign up</span>
                </p>
              </TabsContent>
              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" placeholder="admin@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input id="otp" type="text" placeholder="Enter 6-digit code" maxLength={6} />
                </div>
                <Button className="w-full" onClick={handleLogin}>Verify & Sign In</Button>
                <p className="text-sm text-center text-muted-foreground">
                  OTP will be sent to your registered email
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
