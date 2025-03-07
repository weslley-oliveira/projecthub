import { Project } from "@/app/types/project";

// Mock data for projects
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Redesigning the company website with modern UI/UX principles",
    status: "In Progress",
    dueDate: "2024-10-15",
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
    description: "Developing a new mobile app for iOS and Android",
    status: "Pending",
    dueDate: "2024-11-30",
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
    description: "Launching a new marketing campaign for Q4",
    status: "Pending",
    dueDate: "2024-12-10",
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
    description: "Migrating legacy database to new cloud infrastructure",
    status: "Completed",
    dueDate: "2024-09-28",
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
    title: "CRM Integration",
    description: "Integrating new CRM system with existing tools",
    status: "In Progress",
    dueDate: "2024-10-05",
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