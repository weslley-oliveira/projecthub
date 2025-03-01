// Team member status type
export type TeamMemberStatus =  "Available" | 'Working' | 'Busy' | 'Absent';

// Department type based on available options
export type Department = "Management" | "Engineering" | "Design" | "Marketing" | "Sales";

// Base team member interface with common properties
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: Department;
  status: TeamMemberStatus;
  avatar?: string;
  joinDate: string;
}

// Simplified team member interface for project cards and lists
export interface SimpleTeamMember {
  id: string;
  name: string;
  avatar?: string;
}

// Project team interface
export interface ProjectTeam {
  id: string;
  title: string;
  team: TeamMember[];
}

// Team assignment props interface
export interface TeamAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectTeam;
  availableMembers: TeamMember[];
  onAssignMembers: (projectId: string, memberIds: string[]) => void;
}