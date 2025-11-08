import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, LogOut, TrendingUp, Users, Activity, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
    navigate("/login");
  };

  if (!currentUser) return null;

  const stats = [
    { label: "Total Users", value: "2,543", icon: Users, color: "stat-blue", progress: 75 },
    { label: "Revenue", value: "$45,231", icon: DollarSign, color: "stat-teal", progress: 60 },
    { label: "Growth", value: "+23.5%", icon: TrendingUp, color: "stat-purple", progress: 85 },
    { label: "Activity", value: "1,234", icon: Activity, color: "stat-pink", progress: 50 },
  ];

  const navItems = [
    { label: "Home", icon: Home, value: "home" },
    { label: "Profile", icon: User, value: "profile" },
    { label: "Settings", icon: Settings, value: "settings" },
  ];

  return (
    <div className="min-h-screen gradient-bg flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-border p-6 space-y-4 slide-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mb-2">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">NexusApp</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              variant={activeTab === item.value ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                activeTab === item.value
                  ? "bg-gradient-to-r from-primary to-secondary text-white glow"
                  : "text-foreground hover:bg-muted"
              } slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="pt-4 mt-auto">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Hello, {currentUser.fullName}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">Welcome back to your dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}/20`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-muted-foreground mb-3">{stat.label}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r from-${stat.color} to-${stat.color}/60 progress-animate`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="glass rounded-2xl p-6 scale-in" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-all duration-300 slide-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">New activity detected</p>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 ? "Just now" : index === 1 ? "2 hours ago" : "1 day ago"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
