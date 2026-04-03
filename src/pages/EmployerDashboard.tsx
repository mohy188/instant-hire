import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase, Users, FolderOpen, DollarSign, Bell, Plus } from "lucide-react";

const stats = [
  { label: "Posted Jobs", value: "3", icon: Briefcase },
  { label: "Hired Freelancers", value: "5", icon: Users },
  { label: "Active Projects", value: "2", icon: FolderOpen },
  { label: "Total Spent", value: "$1,240", icon: DollarSign },
];

const postedJobs = [
  { title: "React Frontend Developer", category: "Web Development", applicants: 12, status: "Active" },
  { title: "Logo & Brand Design", category: "UI/UX Design", applicants: 8, status: "Active" },
  { title: "SEO Audit", category: "Marketing", applicants: 4, status: "Closed" },
];

const hiredFreelancers = [
  { name: "Alex Chen", role: "Frontend Developer", project: "Dashboard Redesign", status: "Working" },
  { name: "Sara Kim", role: "UI Designer", project: "Brand Identity", status: "Completed" },
];

const notifications = [
  { text: "New applicant for React Frontend Developer", time: "2 min ago" },
  { text: "Sara Kim submitted final deliverables", time: "1 hour ago" },
  { text: "Your subscription renews in 3 days", time: "1 day ago" },
];

const EmployerDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="text-lg tracking-tight text-foreground font-heading">
            <span className="font-normal">Instant</span><span className="font-bold">Hire</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1 font-medium">Employer</span>
            <Button variant="outline" size="sm" className="rounded-[7px]" onClick={async () => { await signOut(); navigate("/"); }}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="container max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, {profile?.display_name || "Employer"}</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your jobs, freelancers, and projects</p>
          </div>
          <Button className="rounded-[7px] gap-2 font-semibold">
            <Plus className="w-4 h-4" /> Post a Job
          </Button>
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
          {/* Posted Jobs */}
          <div className="lg:col-span-2 border border-border rounded-xl bg-card">
            <div className="p-5 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Posted Jobs</h2>
            </div>
            <div className="divide-y divide-border">
              {postedJobs.map((job, i) => (
                <div key={i} className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.category} · {job.applicants} applicants</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    job.status === "Active" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                  }`}>{job.status}</span>
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

        {/* Hired Freelancers */}
        <div className="border border-border rounded-xl bg-card mt-6">
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Hired Freelancers</h2>
          </div>
          <div className="divide-y divide-border">
            {hiredFreelancers.map((f, i) => (
              <div key={i} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {f.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.role} · {f.project}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  f.status === "Working" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                }`}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
