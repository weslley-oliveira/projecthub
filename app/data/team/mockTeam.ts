import { TeamMember, TeamMemberStatus, Department } from "@/app/types/team";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Joao Doria",
    role: "Project Manager",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Management",
      status: "Busy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-01-15"
  },
  {
    id: "2",
    name: "Dona Maria",
    role: "UI/UX Designer",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    department: "Design",
    status: "Working",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-03-01"
  },
  {
    id: "3",
    name: "David Kim",
    role: "Full Stack Developer",
    email: "david.kim@company.com",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    status: "Busy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-02-15"
  },
  {
    id: "4",
    name: "Maria Garcia",
    role: "Backend Developer",
    email: "maria.garcia@company.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-04-01"
  },
  {
    id: "5",
    name: "Ana Silva",
    role: "Marketing Specialist",
    email: "ana.silva@company.com",
    phone: "+1 (555) 567-8901",
    department: "Marketing",
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-06-15"
  },
  {
    id: "6",
    name: "Michael Johnson",
    role: "Frontend Developer",
    email: "michael.johnson@company.com",
    phone: "+1 (555) 678-9012",
    department: "Engineering",
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-05-01"
  },
  {
    id: "7",
    name: "Emily Chen",
    role: "QA Engineer",
    email: "emily.chen@company.com",
    phone: "+1 (555) 789-0123",
    department: "Engineering",
    status: "Busy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-07-15"
  },
  {
    id: "8",
    name: "Robert Wilson",
    role: "Product Manager",
    email: "robert.wilson@company.com",
    phone: "+1 (555) 890-1234",
    department: "Management",
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
    joinDate: "2022-08-01"
  }
];

// Helper function to get a team member by ID
export function getTeamMemberById(id: string): TeamMember | undefined {
  return mockTeamMembers.find(member => member.id === id);
}

// Helper function to get team members by department
export function getTeamMembersByDepartment(department: Department): TeamMember[] {
  return mockTeamMembers.filter(member => member.department === department);
}

// Helper function to get team members by status
export function getTeamMembersByStatus(status: TeamMemberStatus): TeamMember[] {
  return mockTeamMembers.filter(member => member.status === status);
}