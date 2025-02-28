"use client";

import { useEffect, useState } from "react";
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
import { Plus, Search, Users, MapPin, Phone, Briefcase, Minus, Clock, FileText } from "lucide-react";
import { TeamAssignment } from "@/components/dashboard/team-assignment";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/components/ui/address";
import Link from "next/link";
import { TeamMember, Contact, WorkforceType, Project, AddressData } from "../types/project";
import { mockProjects, allTeamMembers, calculateDuration, calculateFinishedTime } from "@/app/data/projects/mockProjects";

export default function ProjectsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [teamAssignmentOpen, setTeamAssignmentOpen] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectAddress, setProjectAddress] = useState<AddressData | undefined>(undefined);
  const [projectContact, setProjectContact] = useState<Contact | undefined>(undefined);
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [projectToComplete, setProjectToComplete] = useState<Project | null>(null);
  const [finishTime, setFinishTime] = useState<string>("");
  
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  
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

  // Function to open address dialog
  const openAddressDialog = (project: Project) => {
    setSelectedProject(project);
    setProjectAddress(project.address);
    setAddressDialogOpen(true);
  };

  // Function to open contact dialog
  const openContactDialog = (project: Project) => {
    setSelectedProject(project);
    setProjectContact(project.contact);
    setContactDialogOpen(true);
  };

  // Function to save contact to project
  const saveProjectContact = () => {
    const name = (document.getElementById('contact-name') as HTMLInputElement)?.value;
    const phone = (document.getElementById('contact-phone') as HTMLInputElement)?.value;
    
    if (selectedProject && name && phone) {
      const contact = { name, phone };
      setProjectContact(contact);
      
      setProjects(prevProjects => 
        prevProjects.map(project => {
          if (project.id === selectedProject.id) {
            return { ...project, contact };
          }
          return project;
        })
      );
      
      toast({
        title: "Contact updated",
        description: "Project contact has been successfully updated.",
      });
      
      setContactDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  // Function to save address to project
  const saveProjectAddress = () => {
    if (selectedProject && projectAddress) {
      setProjects(prevProjects => 
        prevProjects.map(project => {
          if (project.id === selectedProject.id) {
            return { ...project, address: projectAddress };
          }
          return project;
        })
      );
      
      toast({
        title: "Address updated",
        description: "Project address has been successfully updated.",
      });
      
      setAddressDialogOpen(false);
    }
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

  // Function to format time
  const formatTime = (time?: string) => {
    if (!time) return "";
    
    if (/^\d{1,2}:\d{2}$/.test(time)) {
      return time;
    }
    
    if (/^\d{1,2}:\d{2}\s*(AM|PM)$/i.test(time)) {
      const [timePart, period] = time.split(/\s+/);
      const [hours, minutes] = timePart.split(':').map(Number);
      
      let hour24 = hours;
      if (period.toUpperCase() === 'PM' && hours < 12) {
        hour24 = hours + 12;
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
        hour24 = 0;
      }
      
      return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    return time;
  };

  // Function to ensure all completed projects have an end time
  useEffect(() => {
    setProjects(prevProjects => 
      prevProjects.map(project => {
        if (project.status === "Completed" && !project.finishedTime && project.startTime) {
          return {
            ...project,
            finishedTime: calculateFinishedTime(project.startTime)
          };
        }
        return project;
      })
    );
  }, []);

  // Function to open completion dialog
  const openCompletionDialog = (project: Project) => {
    setProjectToComplete(project);
    if (project.startTime) {
      setFinishTime(calculateFinishedTime(project.startTime));
    }
    setCompletionDialogOpen(true);
  };

  // Function to confirm project completion
  const confirmProjectCompletion = () => {
    if (projectToComplete) {
      setProjects(prevProjects => 
        prevProjects.map(project => {
          if (project.id === projectToComplete.id) {
            return {
              ...project,
              status: "Completed" as const,
              progress: 100,
              finishedTime: finishTime
            };
          }
          return project;
        })
      );
      
      toast({
        title: "Project completed",
        description: "Project has been marked as completed successfully.",
      });
      
      setCompletionDialogOpen(false);
      setProjectToComplete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">
              Manage your projects and track progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Projects Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group">
              <ProjectCard {...project} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openAddressDialog(project)}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Address
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openContactDialog(project)}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openTeamAssignment(project)}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Team
                </Button>
              </div>
              {project.status !== "Completed" && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openCompletionDialog(project)}
                    className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  >
                    Mark as Completed
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full flex justify-center p-8">
            <p className="text-muted-foreground">No projects found</p>
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

      {/* Address Dialog */}
      <Dialog 
        open={addressDialogOpen} 
        onOpenChange={(open) => setAddressDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Address Registration</DialogTitle>
            <DialogDescription>
              {selectedProject ? `Add or update the address for the project "${selectedProject.title}"` : 'Add an address for the project'}
            </DialogDescription>
          </DialogHeader>
          <Address 
            onAddressChange={setProjectAddress}
            defaultValues={projectAddress}
            className="py-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProjectAddress}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog 
        open={contactDialogOpen} 
        onOpenChange={(open) => setContactDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Registration</DialogTitle>
            <DialogDescription>
              {selectedProject ? `Add or update the contact for the project "${selectedProject.title}"` : 'Add a contact for the project'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input 
                id="contact-name" 
                placeholder="Enter contact name" 
                defaultValue={projectContact?.name || ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input 
                id="contact-phone" 
                placeholder="Enter contact phone" 
                defaultValue={projectContact?.phone || ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProjectContact}>Save Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Completion Confirmation Dialog */}
      <Dialog 
        open={completionDialogOpen} 
        onOpenChange={(open) => setCompletionDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Project</DialogTitle>
            <DialogDescription>
              {projectToComplete ? `Confirm the end time for the project "${projectToComplete.title}"` : 'Confirm the end time of the project'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {projectToComplete && (
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Start time: {projectToComplete.startTime}</span>
                </div>
                <Label htmlFor="finish-time">End Time</Label>
                <Input 
                  id="finish-time" 
                  type="time" 
                  value={finishTime}
                  onChange={(e) => setFinishTime(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Work duration minimum is 8 hours</p>
                
                {projectToComplete.startTime && finishTime && (
                  <div className="mt-2 p-3 border rounded-md bg-muted/50">
                    <p className="text-sm">
                      Total duration: <span className="font-medium">{calculateDuration(projectToComplete.startTime, finishTime)}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompletionDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmProjectCompletion}>Confirm Completion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}