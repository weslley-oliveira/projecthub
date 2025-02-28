import { Project, TeamMember } from "@/app/types/project";

// Mock data for team members
export const allTeamMembers: TeamMember[] = [
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
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Apple",
    description: "Redesign the company website with modern UI/UX principles",
    progress: 68,
    dueDate: "Oct 15",
    status: "In Progress",
    startTime: "09:00",
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
    startTime: "10:30",
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
    startTime: "08:15",
    finishedTime: "16:15",
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
    status: "Canceled",
    startTime: "11:00",
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
    startTime: "08:00",
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
    status: "Confirmed",
    startTime: "09:30",
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
    status: "Pending",
    startTime: "10:00",
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
    startTime: "08:30",
    finishedTime: "16:30",
    team: [
      allTeamMembers[2], // David Kim
    ],
  },
];

// Function to get a project by ID
export function getProjectById(id: string): Project | undefined {
  return mockProjects.find(project => project.id === id);
}

// Function to calculate end time based on start time
export function calculateFinishedTime(startTime: string): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endHours = hours + 8;
  return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Function to calculate duration between two times
export function calculateDuration(startTime: string, endTime: string): string {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  let durationHours = endHours - startHours;
  let durationMinutes = endMinutes - startMinutes;
  
  if (durationMinutes < 0) {
    durationHours -= 1;
    durationMinutes += 60;
  }
  
  // If the duration is negative, we assume the end time is on the next day
  if (durationHours < 0) {
    durationHours += 24;
  }
  
  return `${durationHours} hours and ${durationMinutes} minutes`;
} 