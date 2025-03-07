import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  PauseCircle,
  PlayCircle,
  FileText,
  BarChart3,
  MapPin,
  Phone
} from "lucide-react";
import { format, addDays } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/app/types/project";

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // Generate params for projects 1-8
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
  }));
}

async function getProjectTeam(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}/team`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch project team');
  }
  
  return res.json();
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Status color mapping
  const statusColor: Record<Project["status"], string> = {
    "Pending": "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30",
    "Confirmed": "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    "In Progress": "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    "Completed": "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30",
    "Canceled": "text-red-500 bg-red-100 dark:bg-red-900/30"
  };
  
  // Status icon mapping
  const getStatusIcon = (status: Project["status"]) => {
    switch(status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "In Progress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-slate-500" />;
    }
  };
  
  // Fetch project team
  const { team: projectTeam } = await getProjectTeam(params.id);
  
  // Mock project data
  const project: Project = {
    id: params.id,
    title: params.id === "1" ? "Website Redesign" : 
           params.id === "2" ? "Mobile App Development" :
           params.id === "3" ? "CRM Integration" :
           params.id === "4" ? "Marketing Campaign" :
           params.id === "5" ? "Database Migration" :
           params.id === "6" ? "Product Launch" :
           params.id === "7" ? "Customer Support Portal" :
           "Security Audit",
    description: params.id === "1" ? "Redesign the company website with modern UI/UX principles" :
                 params.id === "2" ? "Create a cross-platform mobile app for project management" :
                 params.id === "3" ? "Integrate the new CRM system with existing tools" :
                 params.id === "4" ? "Launch Q4 marketing campaign for new product line" :
                 params.id === "5" ? "Migrate legacy database to new cloud infrastructure" :
                 params.id === "6" ? "Prepare for the launch of our new flagship product" :
                 params.id === "7" ? "Build a new customer support portal with ticketing system" :
                 "Conduct comprehensive security audit of all systems",
    status: params.id === "1" ? "In Progress" :
            params.id === "2" ? "In Progress" :
            params.id === "3" ? "Completed" :
            params.id === "4" ? "Pending" :
            params.id === "5" ? "In Progress" :
            params.id === "6" ? "Pending" :
            params.id === "7" ? "Pending" :
            "Completed",
    dueDate: format(addDays(new Date(), 30), 'MMMM d, yyyy'),
    startTime: "09:00",
    team: projectTeam,
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
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <p className="text-muted-foreground">Project #{project.id}</p>
            </div>
            <Badge className={`ml-2 ${statusColor[project.status]}`}>
              {project.status}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Log Time
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button size="sm" asChild>
              <Link href={`/projects/${params.id}/edit`}>
                <FileText className="mr-2 h-4 w-4" />
                Edit Project
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/projects/${params.id}/team`}>
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Equipe
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                {getStatusIcon(project.status)}
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold">{project.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="text-lg font-semibold">{project.dueDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Team</p>
                  <p className="text-lg font-semibold">{project.team.length} Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current status and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Status: {project.status}</p>
                  <p className="text-sm text-muted-foreground">Due on {project.dueDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="font-medium">{project.startTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-medium">{project.team.length} Members</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Workforce Required</p>
                  <p className="font-medium">
                    {project.workforce?.reduce((total, work) => total + work.quantity, 0)} Professionals
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p>{project.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Project Details Tabs */}
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-1 sm:inline-flex">
            <TabsTrigger value="team" className="text-xs sm:text-sm">Team</TabsTrigger>
          </TabsList>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Team</CardTitle>
                <CardDescription>Team members assigned to this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{member.name}</h3>
                          <Badge variant="outline">{member.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Project Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Project Resources</CardTitle>
            <CardDescription>Important documents and links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary">
                  {project.address?.street}, {project.address?.number} - {project.address?.city}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary">{project.contact?.phone}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}