import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase, CheckCircle, FolderOpen, DollarSign, Bell, User } from "lucide-react";

const stats = [
  { label: "Available Jobs", value: "18", icon: Briefcase },
  { label: "Applied", value: "6", icon: CheckCircle },
  { label: "Active Projects", value: "2", icon: FolderOpen },
  { label: "Earnings", value: "$3,480", icon: DollarSign },
];

const availableJobs = [
  { title: "React Dashboard Build", company: "TechCorp", category: "Web Development", posted: "2h ago" },
  { title: "Mobile App UI Design", company: "AppStudio", category: "UI/UX Design", posted: "5h ago" },
  { title: "Data Pipeline Setup", company: "DataFlow Inc", category: "Data Science", posted: "1d ago" },
];

const appliedJobs = [
  { title: "E-commerce Frontend", company: "ShopBase", status: "Interview Scheduled" },
  { title: "Brand Guidelines", company: "StartupXYZ", status: "Under Review" },
];

const notifications = [
  { text: "TechCorp wants to schedule a live interview", time: "5 min ago" },
  { text: "Payment of $850 received for Dashboard project", time: "2 hours ago" },
  { text: "New job match in Web Development category", time: "1 day ago" },
];

const EmployerDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const profileCompletion = 72;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="text-lg tracking-tight text-foreground font-heading">
            <span className="font-normal">Instant</span><span className="font-bold">Hire</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1 font-medium">Freelancer</span>
            <Button variant="outline" size="sm" className="rounded-[7px]" onClick={async () => { await signOut(); navigate("/"); }}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="container max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, {profile?.display_name || "Freelancer"}</h1>
            <p className="text-sm text-muted-foreground mt-1">Find jobs, manage projects, track earnings</p>
          </div>
        </div>

        {/* Profile completion bar */}
        <div className="border border-border rounded-xl p-5 bg-card mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Profile Completion</span>
            </div>
            <span className="text-sm font-bold text-foreground">{profileCompletion}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${profileCompletion}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Add your skills and bio to complete your profile</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="border border-border rounded-xl p-5 bg-card">
              <s.icon className="w-5 h-5 text-muted-foreground mb-3" />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Jobs */}
          <div className="lg:col-span-2 border border-border rounded-xl bg-card">
            <div className="p-5 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Available Jobs</h2>
            </div>
            <div className="divide-y divide-border">
              {availableJobs.map((job, i) => (
                <div key={i} className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.company} · {job.category} · {job.posted}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-[7px] text-xs">Apply</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="border border-border rounded-xl bg-card">
            <div className="p-5 border-b border-border flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Notifications</h2>
            </div>
            <div className="divide-y divide-border">
              {notifications.map((n, i) => (
                <div key={i} className="p-4">
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="border border-border rounded-xl bg-card mt-6">
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Applied Jobs</h2>
          </div>
          <div className="divide-y divide-border">
            {appliedJobs.map((j, i) => (
              <div key={i} className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{j.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{j.company}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
