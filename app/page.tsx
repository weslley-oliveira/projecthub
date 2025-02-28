import { DashboardLayout } from "@/components/dashboard/layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ProjectProgressChart } from "@/components/dashboard/project-progress-chart";
import { TeamWorkloadChart } from "@/components/dashboard/team-workload-chart";
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Users 
} from "lucide-react";

export default function Home() {
  // Mock data for the dashboard
  const projects = [
    {
      id: "1",
      title: "Website Redesign",
      description: "Redesign the company website with modern UI/UX principles",
      progress: 68,
      dueDate: "Oct 15",
      status: "In Progress" as const,
      startTime: "9:00 AM",
      team: [
        { id: "1", name: "John Doe", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
        { id: "2", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
        { id: "3", name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
      ],
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for project management",
      progress: 45,
      dueDate: "Nov 30",
      status: "In Progress" as const,
      startTime: "10:30 AM",
      team: [
        { id: "4", name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60" },
        { id: "5", name: "Ana Silva", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" },
        { id: "3", name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
      ],
    },
    {
      id: "3",
      title: "CRM Integration",
      description: "Integrate the new CRM system with existing tools",
      progress: 90,
      dueDate: "Sep 28",
      status: "Completed" as const,
      startTime: "8:15 AM",
      team: [
        { id: "1", name: "John Doe", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
        { id: "2", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
      ],
    },
    {
      id: "4",
      title: "Marketing Campaign",
      description: "Launch Q4 marketing campaign for new product line",
      progress: 35,
      dueDate: "Dec 10",
      status: "On Hold" as const,
      startTime: "11:00 AM",
      team: [
        { id: "5", name: "Ana Silva", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" },
        { id: "4", name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60" },
      ],
    },
  ];

  const activities = [
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      },
      action: "completed project milestone",
      target: "Website Redesign",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      },
      action: "commented on",
      target: "Mobile App Development",
      time: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      },
      action: "created project",
      target: "Customer Support Portal",
      time: "Yesterday",
    },
    {
      id: "4",
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      },
      action: "updated project",
      target: "CRM Integration",
      time: "Yesterday",
    },
    {
      id: "5",
      user: {
        name: "Ana Silva",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
      },
      action: "joined project",
      target: "Marketing Campaign",
      time: "2 days ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Projects"
            value="12"
            icon={BarChart3}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Completed Projects"
            value="5"
            icon={CheckCircle2}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Team Members"
            value="8"
            icon={Users}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Hours Logged"
            value="164"
            description="This week"
            icon={Clock}
            trend={{ value: 5, isPositive: false }}
          />
        </div>
        
        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-3">
          <ProjectProgressChart />
          <TeamWorkloadChart />
        </div>
        
        {/* Projects */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Active Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
        
        {/* Activity Feed */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <h2 className="mb-4 text-xl font-semibold">Activity Feed</h2>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}