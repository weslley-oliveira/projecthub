import { Address, Rate } from './common';

// Team member status type
export type TeamMemberStatus =  "Available" | 'Working' | 'Busy' | 'Absent';

// Base team member interface with common properties
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: TeamMemberStatus;
  cscsCard?: {
    number: string;
    expiryDate: string;
  };
  bankDetails?: {
    accountNumber: string;
    accountName: string;
    sortCode: string;
  };
  avatar?: string;
  rate?: Rate;
  joinDate: string;
  address?: Address;
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