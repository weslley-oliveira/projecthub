"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Mock data for charts
  const projectProgressData = [
    { name: "Jan", completed: 45, planned: 60 },
    { name: "Feb", completed: 52, planned: 70 },
    { name: "Mar", completed: 48, planned: 65 },
    { name: "Apr", completed: 61, planned: 75 },
    { name: "May", completed: 55, planned: 70 },
    { name: "Jun", completed: 67, planned: 80 },
    { name: "Jul", completed: 70, planned: 85 },
    { name: "Aug", completed: 75, planned: 90 },
    { name: "Sep", completed: 68, planned: 80 },
    { name: "Oct", completed: 72, planned: 85 },
    { name: "Nov", completed: 78, planned: 90 },
    { name: "Dec", completed: 82, planned: 95 }
  ];
  
  const teamPerformanceData = [
    { name: "John Doe", tasks: 45, hours: 160, efficiency: 85 },
    { name: "Sarah Johnson", tasks: 38, hours: 152, efficiency: 78 },
    { name: "David Kim", tasks: 52, hours: 168, efficiency: 92 },
    { name: "Maria Garcia", tasks: 41, hours: 145, efficiency: 80 },
    { name: "Ana Silva", tasks: 35, hours: 140, efficiency: 75 }
  ];
  
  const projectStatusData = [
    { name: "Completed", value: 5 },
    { name: "In Progress", value: 4 },
    { name: "On Hold", value: 2 },
    { name: "Planned", value: 3 }
  ];
  
  const timeTrackingData = [
    { name: "Week 1", development: 45, design: 24, meetings: 15 },
    { name: "Week 2", development: 50, design: 20, meetings: 18 },
    { name: "Week 3", development: 55, design: 22, meetings: 12 },
    { name: "Week 4", development: 48, design: 28, meetings: 16 }
  ];
  
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))"
  ];
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track project performance and team productivity
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+8%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+2</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">On-time Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive">-3%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm">Projects</TabsTrigger>
            <TabsTrigger value="team" className="text-xs sm:text-sm">Team</TabsTrigger>
            <TabsTrigger value="time" className="text-xs sm:text-sm">Time Tracking</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>Monthly completed vs planned tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={projectProgressData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDark ? "#333" : "#eee"}
                      />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: isDark ? "#ccc" : "#333" }}
                      />
                      <YAxis 
                        tick={{ fill: isDark ? "#ccc" : "#333" }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? "#1f1f1f" : "#fff",
                          borderColor: isDark ? "#333" : "#eee",
                          color: isDark ? "#fff" : "#000"
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="completed" 
                        stroke="hsl(var(--chart-1))" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="planned" 
                        stroke="hsl(var(--chart-2))" 
                        strokeDasharray="5 5" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                  <CardDescription>Distribution of projects by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} projects`, name]}
                        contentStyle={{ 
                          backgroundColor: isDark ? "#1f1f1f" : "#fff",
                          borderColor: isDark ? "#333" : "#eee",
                          color: isDark ? "#fff" : "#000"
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Tasks completed and hours logged by team members</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={teamPerformanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={isDark ? "#333" : "#eee"}
                    />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: isDark ? "#ccc" : "#333" }}
                    />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      tick={{ fill: isDark ? "#ccc" : "#333" }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: isDark ? "#ccc" : "#333" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDark ? "#1f1f1f" : "#fff",
                        borderColor: isDark ? "#333" : "#eee",
                        color: isDark ? "#fff" : "#000"
                      }}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="tasks" 
                      fill="hsl(var(--chart-1))" 
                      name="Tasks Completed" 
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="hours" 
                      fill="hsl(var(--chart-2))" 
                      name="Hours Logged" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Project Performance</CardTitle>
                    <CardDescription>Progress and status of all projects</CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                    <div className="col-span-4">Project</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Progress</div>
                    <div className="col-span-2">Team</div>
                    <div className="col-span-2">Due Date</div>
                  </div>
                  
                  <div className="divide-y">
                    {[
                      { name: "Website Redesign", status: "In Progress", progress: 68, team: 3, dueDate: "Oct 15" },
                      { name: "Mobile App Development", status: "In Progress", progress: 45, team: 3, dueDate: "Nov 30" },
                      { name: "CRM Integration", status: "Completed", progress: 100, team: 2, dueDate: "Sep 28" },
                      { name: "Marketing Campaign", status: "On Hold", progress: 35, team: 2, dueDate: "Dec 10" },
                      { name: "Database Migration", status: "In Progress", progress: 72, team: 2, dueDate: "Oct 5" }
                    ].map((project, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 p-4">
                        <div className="col-span-4 font-medium">{project.name}</div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            project.status === "In Progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                            project.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div 
                                className={`h-2 rounded-full ${
                                  project.status === "In Progress" ? "bg-blue-500" :
                                  project.status === "Completed" ? "bg-green-500" :
                                  "bg-yellow-500"
                                }`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-xs">{project.progress}%</span>
                          </div>
                        </div>
                        <div className="col-span-2">{project.team} members</div>
                        <div className="col-span-2">{project.dueDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Team Efficiency</CardTitle>
                  <CardDescription>Efficiency score by team member</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={teamPerformanceData}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        horizontal={true}
                        vertical={false}
                        stroke={isDark ? "#333" : "#eee"}
                      />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]} 
                        tick={{ fill: isDark ? "#ccc" : "#333" }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        tick={{ fill: isDark ? "#ccc" : "#333" }}
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Efficiency"]}
                        contentStyle={{ 
                          backgroundColor: isDark ? "#1f1f1f" : "#fff",
                          borderColor: isDark ? "#333" : "#eee",
                          color: isDark ? "#fff" : "#000"
                        }}
                      />
                      <Bar 
                        dataKey="efficiency" 
                        fill="hsl(var(--chart-1))" 
                        name="Efficiency (%)" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tasks Distribution</CardTitle>
                  <CardDescription>Number of tasks assigned to each team member</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={teamPerformanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="tasks"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {teamPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} tasks`, name]}
                        contentStyle={{ 
                          backgroundColor: isDark ? "#1f1f1f" : "#fff",
                          borderColor: isDark ? "#333" : "#eee",
                          color: isDark ? "#fff" : "#000"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Workload</CardTitle>
                <CardDescription>Current workload and capacity by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformanceData.map((member, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.tasks} tasks</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div 
                          className={`h-2 rounded-full ${
                            member.efficiency > 85 ? "bg-red-500" :
                            member.efficiency > 75 ? "bg-yellow-500" :
                            "bg-green-500"
                          }`}
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div>{member.hours} hours logged</div>
                        <div>{member.efficiency}% capacity</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Time Tracking Tab */}
          <TabsContent value="time" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Allocation</CardTitle>
                <CardDescription>How time is spent across different activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={timeTrackingData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={isDark ? "#333" : "#eee"}
                    />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: isDark ? "#ccc" : "#333" }}
                    />
                    <YAxis 
                      tick={{ fill: isDark ? "#ccc" : "#333" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDark ? "#1f1f1f" : "#fff",
                        borderColor: isDark ? "#333" : "#eee",
                        color: isDark ? "#fff" : "#000"
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="development" 
                      stackId="1"
                      stroke="hsl(var(--chart-1))" 
                      fill="hsl(var(--chart-1))" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="design" 
                      stackId="1"
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2))" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="meetings" 
                      stackId="1"
                      stroke="hsl(var(--chart-3))" 
                      fill="hsl(var(--chart-3))" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Hours by Project</CardTitle>
                  <CardDescription>Time spent on each project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Website Redesign", hours: 120, percentage: 30 },
                      { name: "Mobile App Development", hours: 95, percentage: 24 },
                      { name: "CRM Integration", hours: 75, percentage: 19 },
                      { name: "Marketing Campaign", hours: 60, percentage: 15 },
                      { name: "Database Migration", hours: 48, percentage: 12 }
                    ].map((project, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">{project.hours} hours</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div 
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${project.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.percentage}% of total time
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Productivity Trends</CardTitle>
                  <CardDescription>Weekly productivity score</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { week: "Week 1", score: 72 },
                        { week: "Week 2", score: 68 },
                        { week: "Week 3", score: 75 },
                        { week: "Week 4", score: 82 },
                        { week: "Week 5", score: 78 },
                        { week: "Week 6", score: 85 },
                        { week: "Week 7", score: 88 },
                        { week: "Week 8", score: 84 }
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDark ? "#333" : "#eee"}
                      />
                      <XAxis 
                        dataKey="week" 
                        tick={{ fill: isDark ? "#ccc" : "#333" }}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        tick={{ fill: isDark ? "#ccc" : "#333" }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Productivity Score"]}
                        contentStyle={{ 
                          backgroundColor: isDark ? "#1f1f1f" : "#fff",
                          borderColor: isDark ? "#333" : "#eee",
                          color: isDark ? "#fff" : "#000"
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}