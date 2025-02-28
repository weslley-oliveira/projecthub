"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Mail, 
  MoreHorizontal, 
  Phone, 
  Plus, 
  Search, 
  User 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  status: "Active" | "On Leave" | "Unavailable";
  projects: number;
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  
  // Mock data for team members
  const allTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Project Manager",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      department: "Management",
      status: "Active",
      projects: 3,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      department: "Design",
      status: "Active",
      projects: 2,
    },
    {
      id: "3",
      name: "David Kim",
      role: "Full Stack Developer",
      email: "david.kim@example.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Active",
      projects: 4,
    },
    {
      id: "4",
      name: "Maria Garcia",
      role: "Backend Developer",
      email: "maria.garcia@example.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "On Leave",
      projects: 2,
    },
    {
      id: "5",
      name: "Ana Silva",
      role: "Marketing Specialist",
      email: "ana.silva@example.com",
      phone: "+1 (555) 567-8901",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
      department: "Marketing",
      status: "Active",
      projects: 0,
    },
    {
      id: "6",
      name: "Michael Johnson",
      role: "Frontend Developer",
      email: "michael.johnson@example.com",
      phone: "+1 (555) 678-9012",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Active",
      projects: 3,
    },
    {
      id: "7",
      name: "Emily Chen",
      role: "QA Engineer",
      email: "emily.chen@example.com",
      phone: "+1 (555) 789-0123",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Unavailable",
      projects: 2,
    },
    {
      id: "8",
      name: "Robert Wilson",
      role: "Product Manager",
      email: "robert.wilson@example.com",
      phone: "+1 (555) 890-1234",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      department: "Management",
      status: "Active",
      projects: 2,
    },
  ];
  
  // Filter team members based on search query and department filter
  const filteredTeamMembers = allTeamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const statusColor = {
    Active: "success",
    "On Leave": "warning",
    Unavailable: "secondary",
  } as const;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold">Team</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new team member.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Enter role" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Member</Button>
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
              placeholder="Search team members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={departmentFilter}
            onValueChange={setDepartmentFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Team Members Tabs */}
        <Tabs defaultValue="grid">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Grid View */}
          <TabsContent value="grid" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTeamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardHeader className="pb-2 text-center">
                    <Avatar className="mx-auto h-20 w-20">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                    <Badge variant={statusColor[member.status]} className="mt-1">
                      {member.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Projects</p>
                      <p className="text-lg font-medium">{member.projects}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredTeamMembers.length === 0 && (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No team members found</p>
                <Button variant="link" className="mt-2">
                  Add a new team member
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* List View */}
          <TabsContent value="list" className="mt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-10 gap-2 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-4">Name</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-center">Projects</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              
              {filteredTeamMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-10 gap-2 border-b p-4 last:border-0">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {member.department}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <Badge variant={statusColor[member.status]}>
                      {member.status}
                    </Badge>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    {member.projects}
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <User className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredTeamMembers.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center">
                  <p className="text-muted-foreground">No team members found</p>
                  <Button variant="link" className="mt-2">
                    Add a new team member
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}