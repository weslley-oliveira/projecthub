import { Project } from "@/app/types/project";

// Mock data for projects
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Redesign completo do website da empresa, incluindo nova interface e funcionalidades modernas",
    progress: 75,
    dueDate: "2024-04-15",
    status: "In Progress",
    team: [
      {
        id: "1",
        name: "John Smith",
        role: "Project Manager",
        status: "Active",
        avatar: "/avatars/john-smith.jpg",
        finishedTime: "17:00"
      },
      {
        id: "2",
        name: "Sarah Johnson",
        role: "UI Designer",
        status: "Active",
        avatar: "/avatars/sarah-johnson.jpg",
        finishedTime: "17:00"
      }
    ],
    startTime: "09:00",
    address: {
      street: "123 Tech Avenue",
      number: "100",
      city: "San Francisco",
      postcode: "94105",
      country: "USA"
    },
    contact: {
      name: "John Smith",
      phone: "+44 20 7123 4567",
      email: "john.smith@example.com"
    },
    workforce: [
      { type: "Fitter", quantity: 2 },
      { type: "Porter", quantity: 1 },
      { type: "Supervisor", quantity: 1 }
    ]
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Desenvolvimento de um aplicativo móvel para gerenciamento de projetos",
    progress: 30,
    dueDate: "2024-05-20",
    status: "Confirmed",
    team: [
      {
        id: "3",
        name: "Michael Brown",
        role: "Senior Developer",
        status: "Active",
        avatar: "/avatars/michael-brown.jpg",
        finishedTime: "17:00"
      },
      {
        id: "4",
        name: "Emma Wilson",
        role: "Frontend Developer",
        status: "Active",
        avatar: "/avatars/emma-wilson.jpg",
        finishedTime: "17:00"
      }
    ],
    startTime: "09:00",
    address: {
      street: "456 Mobile Street",
      number: "200",
      city: "Seattle",
      postcode: "98101",
      country: "USA"
    },
    contact: {
      name: "Michael Brown",
      phone: "+44 20 7123 4569",
      email: "michael.b@example.com"
    },
    workforce: [
      { type: "Fitter", quantity: 3 },
      { type: "Driver", quantity: 2 },
      { type: "Supervisor", quantity: 1 }
    ]
  },
  {
    id: "3",
    title: "Marketing Campaign",
    description: "Campanha de marketing digital para lançamento do novo produto",
    progress: 100,
    dueDate: "2024-03-30",
    status: "Completed",
    team: [
      {
        id: "5",
        name: "David Lee",
        role: "Marketing Manager",
        status: "Active",
        avatar: "/avatars/david-lee.jpg",
        finishedTime: "17:00"
      }
    ],
    startTime: "09:00",
    finishedTime: "17:00",
    address: {
      street: "789 Marketing Blvd",
      number: "300",
      city: "New York",
      postcode: "10001",
      country: "USA"
    },
    contact: {
      name: "David Lee",
      phone: "+44 20 7123 4571",
      email: "david.l@example.com"
    },
    workforce: [
      { type: "Porter", quantity: 2 },
      { type: "Driver", quantity: 1 }
    ]
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Migração do banco de dados para uma nova versão com melhor performance",
    progress: 0,
    dueDate: "2024-06-10",
    status: "Pending",
    team: [],
    address: {
      street: "101 Data Center",
      number: "400",
      city: "Austin",
      postcode: "73301",
      country: "USA"
    },
    contact: {
      name: "Sarah Johnson",
      phone: "+44 20 7123 4572",
      email: "sarah.j@example.com"
    },
    workforce: [
      { type: "Fitter", quantity: 1 },
      { type: "Porter", quantity: 1 }
    ]
  },
  {
    id: "5",
    title: "Security Audit",
    description: "Auditoria completa de segurança do sistema",
    progress: 45,
    dueDate: "2024-04-30",
    status: "In Progress",
    team: [
      {
        id: "6",
        name: "Alex Turner",
        role: "Security Specialist",
        status: "Active",
        avatar: "/avatars/alex-turner.jpg",
        finishedTime: "17:00"
      }
    ],
    startTime: "09:00",
    address: {
      street: "202 Security Ave",
      number: "500",
      city: "Boston",
      postcode: "02108",
      country: "USA"
    },
    contact: {
      name: "Alex Turner",
      phone: "+44 20 7123 4573",
      email: "alex.t@example.com"
    },
    workforce: [
      { type: "Fitter", quantity: 2 },
      { type: "Porter", quantity: 1 },
      { type: "Driver", quantity: 1 },
      { type: "Supervisor", quantity: 1 }
    ]
  }
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