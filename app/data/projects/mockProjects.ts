import { ProjectTeam } from "@/app/types/team";

// Mock data for projects
export const mockProjects: ProjectTeam[] = [
  {
    id: "1",
    title: "Website Redesign",
    team: [
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
      }
    ]
  },
  {
    id: "2",
    title: "Mobile App Development",
    team: [
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
      }
    ]
  },
  {
    id: "3",
    title: "Marketing Campaign",
    team: [
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
      }
    ]
  }
];

// Function to get a project by ID
export function getProjectById(id: string): ProjectTeam | undefined {
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