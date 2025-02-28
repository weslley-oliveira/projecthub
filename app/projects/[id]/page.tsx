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
  MessageSquare,
  FileText,
  BarChart3,
  ListTodo,
  Link as LinkIcon
} from "lucide-react";
import { format, addDays } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // Generate params for projects 1-8
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Mock team members data
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      role: "Project Manager",
      email: "john.doe@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      department: "Management",
      status: "Active" as const,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      email: "sarah.johnson@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      department: "Design",
      status: "Active" as const,
    },
    {
      id: "3",
      name: "David Kim",
      role: "Full Stack Developer",
      email: "david.kim@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      department: "Engineering",
      status: "Active" as const,
    },
  ];
  
  // Mock tasks data
  const tasks = [
    {
      id: "1",
      title: "Design homepage wireframes",
      description: "Create wireframes for the new homepage layout",
      status: "Completed" as const,
      assignee: teamMembers[1],
      dueDate: format(addDays(new Date(), -5), 'MMM d, yyyy'),
      priority: "High" as const,
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up user authentication system with JWT",
      status: "In Progress" as const,
      assignee: teamMembers[2],
      dueDate: format(addDays(new Date(), 2), 'MMM d, yyyy'),
      priority: "High" as const,
    },
    {
      id: "3",
      title: "Create responsive navigation",
      description: "Implement responsive navigation menu for all devices",
      status: "In Progress" as const,
      assignee: teamMembers[1],
      dueDate: format(addDays(new Date(), 3), 'MMM d, yyyy'),
      priority: "Medium" as const,
    },
    {
      id: "4",
      title: "Set up CI/CD pipeline",
      description: "Configure continuous integration and deployment pipeline",
      status: "Pending" as const,
      assignee: teamMembers[2],
      dueDate: format(addDays(new Date(), 7), 'MMM d, yyyy'),
      priority: "Medium" as const,
    },
    {
      id: "5",
      title: "Conduct user testing",
      description: "Organize and conduct user testing sessions",
      status: "Pending" as const,
      assignee: teamMembers[0],
      dueDate: format(addDays(new Date(), 10), 'MMM d, yyyy'),
      priority: "Low" as const,
    },
  ];
  
  // Mock milestones data
  const milestones = [
    {
      id: "1",
      title: "Project Kickoff",
      description: "Initial project planning and requirements gathering",
      date: format(addDays(new Date(), -30), 'MMM d, yyyy'),
      status: "Completed" as const,
    },
    {
      id: "2",
      title: "Design Phase Completion",
      description: "Finalize all design assets and get client approval",
      date: format(addDays(new Date(), -10), 'MMM d, yyyy'),
      status: "Completed" as const,
    },
    {
      id: "3",
      title: "Development Milestone",
      description: "Complete core functionality development",
      date: format(addDays(new Date(), 5), 'MMM d, yyyy'),
      status: "In Progress" as const,
    },
    {
      id: "4",
      title: "Testing Phase",
      description: "Comprehensive testing of all features",
      date: format(addDays(new Date(), 15), 'MMM d, yyyy'),
      status: "Pending" as const,
    },
    {
      id: "5",
      title: "Project Launch",
      description: "Final deployment and project handover",
      date: format(addDays(new Date(), 30), 'MMM d, yyyy'),
      status: "Pending" as const,
    },
  ];
  
  // Mock comments data
  const comments = [
    {
      id: "1",
      user: teamMembers[0],
      text: "Let's make sure we prioritize the responsive design for mobile users.",
      timestamp: "2 days ago",
    },
    {
      id: "2",
      user: teamMembers[1],
      text: "I've uploaded the latest design mockups to the shared folder. Please review when you get a chance.",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      user: teamMembers[2],
      text: "We might need to reconsider the authentication flow. The current implementation is causing some UX issues.",
      timestamp: "5 hours ago",
    },
  ];
  
  // Mock project data
  const project = {
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
    progress: params.id === "1" ? 68 :
              params.id === "2" ? 45 :
              params.id === "3" ? 90 :
              params.id === "4" ? 35 :
              params.id === "5" ? 72 :
              params.id === "6" ? 15 :
              params.id === "7" ? 0 :
              100,
    status: params.id === "1" ? "In Progress" as const :
            params.id === "2" ? "In Progress" as const :
            params.id === "3" ? "Completed" as const :
            params.id === "4" ? "On Hold" as const :
            params.id === "5" ? "In Progress" as const :
            params.id === "6" ? "Planned" as const :
            params.id === "7" ? "Planned" as const :
            "Completed" as const,
    startDate: format(addDays(new Date(), -30), 'MMMM d, yyyy'),
    dueDate: format(addDays(new Date(), 30), 'MMMM d, yyyy'),
    client: "Acme Corporation",
    budget: 25000,
    team: teamMembers,
    tasks: tasks,
    milestones: milestones,
    comments: comments,
    startTime: "9:00 AM",
    links: [
      { title: "Project Brief", url: "#" },
      { title: "Design Assets", url: "#" },
      { title: "Technical Documentation", url: "#" },
    ]
  };
  
  // Status color mapping
  const statusColor = {
    "In Progress": "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    Completed: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30",
    "On Hold": "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
    Planned: "text-slate-500 bg-slate-100 dark:bg-slate-900/30",
  };
  
  // Status icon mapping
  const getStatusIcon = () => {
    switch(project.status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "On Hold":
        return <PauseCircle className="h-5 w-5 text-amber-500" />;
      case "In Progress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-slate-500" />;
    }
  };
  
  // Priority color mapping
  const priorityColor = {
    High: "text-red-500 bg-red-100 dark:bg-red-900/30",
    Medium: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
    Low: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
  };
  
  // Task status color mapping
  const taskStatusColor = {
    Completed: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30",
    "In Progress": "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    Pending: "text-slate-500 bg-slate-100 dark:bg-slate-900/30",
  };

  // Definir as variantes de badge para status
  const statusVariant = {
    "In Progress": "default",
    Completed: "outline",
    "On Hold": "secondary",
    Planned: "secondary",
  } as const;

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
                Editar Projeto
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/projects/${params.id}/team`}>
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Equipe
              </Link>
            </Button>
            <Button size="sm">
              <ListTodo className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
        
        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
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
                  <p className="text-xs text-muted-foreground">Started on {project.startDate}</p>
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
        
        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overall completion status and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{project.progress}% Complete</p>
                  <p className="text-sm text-muted-foreground">Due on {project.dueDate}</p>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="font-medium">{project.startTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{project.client}</p>
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
          <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex">
            <TabsTrigger value="team" className="text-xs sm:text-sm">Team</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">Tasks</TabsTrigger>
            <TabsTrigger value="milestones" className="text-xs sm:text-sm">Milestones</TabsTrigger>
            <TabsTrigger value="discussion" className="text-xs sm:text-sm">Discussion</TabsTrigger>
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
                        <p className="text-sm">{member.email}</p>
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
          
          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Project Tasks</CardTitle>
                    <CardDescription>Tasks and their current status</CardDescription>
                  </div>
                  <Button size="sm">
                    <ListTodo className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.tasks.map((task) => (
                    <div key={task.id} className="flex flex-col gap-2 p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge className={taskStatusColor[task.status]}>
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback>
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{task.dueDate}</span>
                        </div>
                        <Badge variant="outline" className={priorityColor[task.priority]}>
                          {task.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
                <CardDescription>Key milestones and deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4 before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-muted">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="relative flex gap-4 pl-12">
                      <div className="absolute left-[18px] top-1 h-4 w-4 rounded-full border bg-background"></div>
                      <div className="flex-1 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{milestone.title}</h3>
                          <Badge className={
                            milestone.status === "Completed" ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30" :
                            milestone.status === "In Progress" ? "text-blue-500 bg-blue-100 dark:bg-blue-900/30" :
                            "text-slate-500 bg-slate-100 dark:bg-slate-900/30"
                          }>
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{milestone.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Discussion Tab */}
          <TabsContent value="discussion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Discussion</CardTitle>
                <CardDescription>Team communication and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>
                          {comment.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{comment.user.name}</p>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <textarea 
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Add your comment..."
                />
                <Button className="self-end">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Post Comment
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
              {project.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <a href={link.url} className="text-primary hover:underline">{link.title}</a>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <LinkIcon className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}