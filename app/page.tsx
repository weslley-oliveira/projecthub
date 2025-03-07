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
import { Project } from "./types/project";

export default function Home() {
  // Mock data for the dashboard
  const projects: Project[] = [
    {
      id: "1",
      title: "Website Redesign",
      description: "Redesigning the company website with modern UI/UX principles",
      status: "In Progress" as const,
      dueDate: "2024-10-15",
      team: [
        { 
          id: "1", 
          name: "John Doe", 
          role: "Developer",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
        },
        { 
          id: "2", 
          name: "Jane Smith", 
          role: "Designer",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
        },
        { 
          id: "3", 
          name: "Mike Johnson", 
          role: "Manager",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
        }
      ],
      startTime: "09:00",
      address: {
        street: "123 Tech Avenue",
        number: "100",
        city: "San Francisco",
        postcode: "94105",
        country: "USA"
      },
      contact: {
        name: "John Doe",
        phone: "+44 20 7123 4567",
        email: "john.doe@example.com"
      },
      workforce: [
        { type: "Fitter", quantity: 2 },
        { type: "Porter", quantity: 1 },
        { type: "Supervisor", quantity: 1 }
      ]
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Developing a new mobile app for iOS and Android",
      status: "In Progress" as const,
      dueDate: "2024-11-30",
      team: [
        { 
          id: "4", 
          name: "Maria Garcia", 
          role: "Developer",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60"
        },
        { 
          id: "5", 
          name: "Carlos Rodriguez", 
          role: "Designer",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
        },
        { 
          id: "6", 
          name: "Sarah Wilson", 
          role: "Developer",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60"
        }
      ],
      startTime: "09:00",
      address: {
        street: "456 Mobile Street",
        number: "200",
        city: "Seattle",
        postcode: "98101",
        country: "USA"
      },
      contact: {
        name: "Maria Garcia",
        phone: "+44 20 7123 4568",
        email: "maria.g@example.com"
      },
      workforce: [
        { type: "Fitter", quantity: 3 },
        { type: "Driver", quantity: 2 },
        { type: "Supervisor", quantity: 1 }
      ]
    },
    {
      id: "3",
      title: "Database Migration",
      description: "Migrating legacy database to new cloud infrastructure",
      status: "Completed" as const,
      dueDate: "2024-09-28",
      team: [
        { 
          id: "1", 
          name: "John Doe", 
          role: "Developer",
          status: "Active",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
        },
        { 
          id: "2", 
          name: "Jane Smith", 
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
          role: "Designer",
          status: "Active"
        }
      ],
    },
    {
      id: "4",
      title: "Marketing Campaign",
      description: "Launching a new marketing campaign for Q4",
      status: "Pending" as const,
      dueDate: "2024-12-10",
      team: [
        { 
          id: "5", 
          name: "Ana Silva", 
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
          role: "Marketing Manager",
          status: "Active"
        },
        { 
          id: "6", 
          name: "David Chen", 
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60",
          role: "Content Strategist",
          status: "Active"
        }
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