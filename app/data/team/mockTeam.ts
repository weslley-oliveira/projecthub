import { TeamMember, TeamMemberStatus } from "@/app/types/team";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Project Manager",
    email: "john.smith@example.com",
    phone: "+44 20 7123 4567",
    status: "Available",
    cscsCard: {
      number: "CSCS123456",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "12345678",
      accountName: "John Smith",
      sortCode: "12-34-56"
    },
    avatar: "/avatars/john-smith.jpg",
    joinDate: "2023-01-15"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "UI Designer",
    email: "sarah.j@example.com",
    phone: "+44 20 7123 4568",
    status: "Working",
    cscsCard: {
      number: "CSCS123457",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "87654321",
      accountName: "Sarah Johnson",
      sortCode: "65-43-21"
    },
    avatar: "/avatars/sarah-johnson.jpg",
    joinDate: "2023-02-20"
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Senior Developer",
    email: "michael.b@example.com",
    phone: "+44 20 7123 4569",
    status: "Busy",
    cscsCard: {
      number: "CSCS123458",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "11223344",
      accountName: "Michael Brown",
      sortCode: "11-22-33"
    },
    avatar: "/avatars/michael-brown.jpg",
    joinDate: "2023-03-10"
  },
  {
    id: "4",
    name: "Emma Wilson",
    role: "Frontend Developer",
    email: "emma.w@example.com",
    phone: "+44 20 7123 4570",
    status: "Available",
    cscsCard: {
      number: "CSCS123459",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "44332211",
      accountName: "Emma Wilson",
      sortCode: "44-33-22"
    },
    avatar: "/avatars/emma-wilson.jpg",
    joinDate: "2023-04-05"
  },
  {
    id: "5",
    name: "David Lee",
    role: "Marketing Manager",
    email: "david.l@example.com",
    phone: "+44 20 7123 4571",
    status: "Working",
    cscsCard: {
      number: "CSCS123460",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "55667788",
      accountName: "David Lee",
      sortCode: "55-66-77"
    },
    avatar: "/avatars/david-lee.jpg",
    joinDate: "2023-05-15"
  },
  {
    id: "6",
    name: "Lisa Chen",
    role: "Backend Developer",
    email: "lisa.c@example.com",
    phone: "+44 20 7123 4572",
    status: "Available",
    cscsCard: {
      number: "CSCS123461",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "99887766",
      accountName: "Lisa Chen",
      sortCode: "99-88-77"
    },
    avatar: "/avatars/lisa-chen.jpg",
    joinDate: "2023-06-20"
  },
  {
    id: "7",
    name: "James Wilson",
    role: "Full Stack Developer",
    email: "james.w@example.com",
    phone: "+44 20 7123 4573",
    status: "Busy",
    cscsCard: {
      number: "CSCS123462",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "11223344",
      accountName: "James Wilson",
      sortCode: "11-22-33"
    },
    avatar: "/avatars/james-wilson.jpg",
    joinDate: "2023-07-10"
  },
  {
    id: "8",
    name: "Sophie Taylor",
    role: "Project Manager",
    email: "sophie.t@example.com",
    phone: "+44 20 7123 4574",
    status: "Available",
    cscsCard: {
      number: "CSCS123463",
      expiryDate: "2025-12-31"
    },
    bankDetails: {
      accountNumber: "44332211",
      accountName: "Sophie Taylor",
      sortCode: "44-33-22"
    },
    avatar: "/avatars/sophie-taylor.jpg",
    joinDate: "2023-08-15"
  }
];

// Helper function to get a team member by ID
export function getTeamMemberById(id: string): TeamMember | undefined {
  return mockTeamMembers.find(member => member.id === id);
}

// Helper function to get team members by status
export function getTeamMembersByStatus(status: TeamMemberStatus): TeamMember[] {
  return mockTeamMembers.filter(member => member.status === status);
}