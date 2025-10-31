import { NavLink } from "react-router-dom";
import { Home, FileText, Briefcase, MessageSquare, Bell, User, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const navItems = [
    { to: "/feed", icon: Home, label: "Feed" },
    { to: "/notes", icon: FileText, label: "Notes" },
    { to: "/jobs", icon: Briefcase, label: "Jobs" },
    { to: "/discussions", icon: MessageSquare, label: "Discussions" },
    { to: "/announcements", icon: Bell, label: "Announcements" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/feed" className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
          <GraduationCap className="h-7 w-7" />
          Campus Link
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <Button variant="outline" size="sm" asChild>
          <NavLink to="/">Logout</NavLink>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="container flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
