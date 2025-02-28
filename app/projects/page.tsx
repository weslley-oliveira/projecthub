"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Users } from "lucide-react";
import { TeamAssignment } from "@/components/dashboard/team-assignment";
import { useToast } from "@/hooks/use-toast";

// Define types
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  department: string;
  status: "Active" | "On Leave" | "Unavailable";
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "In Progress" | "Completed" | "On Hold" | "Planned";
  team: TeamMember[];
  startTime?: string;
}

export default function ProjectsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [teamAssignmentOpen, setTeamAssignmentOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Mock data for team members
  const allTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      department: "Management",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      department: "Design",
      status: "Active",
    },
    {
      id: "3",
      name: "David Kim",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "4",
      name: "Maria Garcia",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "On Leave",
    },
    {
      id: "5",
      name: "Ana Silva",
      role: "Marketing Specialist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
      department: "Marketing",
      status: "Active",
    },
    {
      id: "6",
      name: "Michael Johnson",
      role: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "7",
      name: "Emily Chen",
      role: "QA Engineer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Unavailable",
    },
    {
      id: "8",
      name: "Robert Wilson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      department: "Management",
      status: "Active",
    },
  ];
  
  // Mock data for projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Redesign the company website with modern UI/UX principles",
      progress: 68,
      dueDate: "Oct 15",
      status: "In Progress",
      startTime: "9:00 AM",
      team: [
        allTeamMembers[0], // John Doe
        allTeamMembers[1], // Sarah Johnson
        allTeamMembers[2], // David Kim
      ],
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for project management",
      progress: 45,
      dueDate: "Nov 30",
      status: "In Progress",
      startTime: "10:30 AM",
      team: [
        allTeamMembers[3], // Maria Garcia
        allTeamMembers[4], // Ana Silva
        allTeamMembers[2], // David Kim
      ],
    },
    {
      id: "3",
      title: "CRM Integration",
      description: "Integrate the new CRM system with existing tools",
      progress: 90,
      dueDate: "Sep 28",
      status: "Completed",
      startTime: "8:15 AM",
      team: [
        allTeamMembers[0], // John Doe
        allTeamMembers[1], // Sarah Johnson
      ],
    },
    {
      id: "4",
      title: "Marketing Campaign",
      description: "Launch Q4 marketing campaign for new product line",
      progress: 35,
      dueDate: "Dec 10",
      status: "On Hold",
      startTime: "11:00 AM",
      team: [
        allTeamMembers[4], // Ana Silva
        allTeamMembers[3], // Maria Garcia
      ],
    },
    {
      id: "5",
      title: "Database Migration",
      description: "Migrate legacy database to new cloud infrastructure",
      progress: 72,
      dueDate: "Oct 5",
      status: "In Progress",
      startTime: "8:00 AM",
      team: [
        allTeamMembers[2], // David Kim
        allTeamMembers[0], // John Doe
      ],
    },
    {
      id: "6",
      title: "Product Launch",
      description: "Prepare for the launch of our new flagship product",
      progress: 15,
      dueDate: "Jan 15",
      status: "Planned",
      startTime: "9:30 AM",
      team: [
        allTeamMembers[1], // Sarah Johnson
        allTeamMembers[3], // Maria Garcia
        allTeamMembers[4], // Ana Silva
      ],
    },
    {
      id: "7",
      title: "Customer Support Portal",
      description: "Build a new customer support portal with ticketing system",
      progress: 0,
      dueDate: "Feb 28",
      status: "Planned",
      startTime: "10:00 AM",
      team: [
        allTeamMembers[0], // John Doe
        allTeamMembers[2], // David Kim
      ],
    },
    {
      id: "8",
      title: "Security Audit",
      description: "Conduct comprehensive security audit of all systems",
      progress: 100,
      dueDate: "Aug 30",
      status: "Completed",
      startTime: "8:30 AM",
      team: [
        allTeamMembers[2], // David Kim
      ],
    },
  ]);
  
  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Function to open team assignment dialog
  const openTeamAssignment = (project: Project) => {
    setSelectedProject(project);
    setTeamAssignmentOpen(true);
  };

  // Function to assign team members to a project
  const assignTeamMembers = (projectId: string, memberIds: string[]) => {
    setProjects(prevProjects => 
      prevProjects.map(project => {
        if (project.id === projectId) {
          const newTeam = allTeamMembers.filter(member => memberIds.includes(member.id));
          return { ...project, team: newTeam };
        }
        return project;
      })
    );
    
    toast({
      title: "Team updated",
      description: "Team members have been successfully assigned to the project.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" placeholder="Enter project name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter project description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="planned">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" defaultValue="09:00" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Planned">Planned</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Projects Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group">
              <ProjectCard {...project} />
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => openTeamAssignment(project)}
              >
                <Users className="h-4 w-4 mr-1" />
                Assign Team
              </Button>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">No projects found</p>
            <Button variant="link" className="mt-2">
              Create a new project
            </Button>
          </div>
        )}
      </div>

      {/* Team Assignment Dialog */}
      {selectedProject && (
        <TeamAssignment
          isOpen={teamAssignmentOpen}
          onClose={() => setTeamAssignmentOpen(false)}
          project={selectedProject}
          availableMembers={allTeamMembers}
          onAssignMembers={assignTeamMembers}
        />
      )}
    </DashboardLayout>
  );
}