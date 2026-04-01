import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Users, Video, CheckCircle, DollarSign, Shield } from "lucide-react";

interface UserRow {
  user_id: string;
  display_name: string | null;
  status: string;
  created_at: string;
  role: string | null;
}

const AdminPanel = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState({ total: 0, employers: 0, freelancers: 0, admins: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    // Get all profiles
    const { data: profiles } = await supabase.from("profiles").select("*");
    // Get all roles (admin can see all)
    const { data: roles } = await supabase.from("user_roles").select("*");

    const roleMap = new Map<string, string>();
    roles?.forEach((r) => roleMap.set(r.user_id, r.role));

    const userRows: UserRow[] = (profiles || []).map((p) => ({
      user_id: p.user_id,
      display_name: p.display_name,
      status: p.status,
      created_at: p.created_at,
      role: roleMap.get(p.user_id) || null,
    }));

    setUsers(userRows);
    setStats({
      total: userRows.length,
      employers: userRows.filter((u) => u.role === "employer").length,
      freelancers: userRows.filter((u) => u.role === "freelancer").length,
      admins: userRows.filter((u) => u.role === "admin").length,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    const { error } = await supabase.from("profiles").update({ status: newStatus }).eq("user_id", userId);
    if (error) {
      toast({ title: "Failed to update user status", variant: "destructive" });
    } else {
      toast({ title: `User ${newStatus === "active" ? "activated" : "suspended"}` });
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const statCards = [
    { label: "Total Users", value: stats.total, icon: Users },
    { label: "Employers", value: stats.employers, icon: Shield },
    { label: "Freelancers", value: stats.freelancers, icon: Users },
    { label: "Active Sessions", value: 0, icon: Video },
    { label: "Hires Completed", value: 0, icon: CheckCircle },
    { label: "Revenue", value: "$0", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background">
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-lg font-bold tracking-tight text-foreground">OnlineChatWorkers</Link>
            <span className="text-xs bg-foreground text-background px-2 py-0.5 rounded font-medium">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-[7px]" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-[7px]" onClick={handleSignOut}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="container max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-8">Admin Panel</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* User Management */}
        <h2 className="text-xl font-semibold text-foreground mb-4">User Management</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Joined</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{u.display_name || "—"}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{u.role || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        u.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-[7px] text-xs"
                        onClick={() => toggleUserStatus(u.user_id, u.status)}
                      >
                        {u.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No users yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
