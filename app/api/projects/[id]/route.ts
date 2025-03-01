import { NextResponse } from "next/server";
import { mockProjects, getProjectById } from "@/app/data/projects/mockProjects";
import { AddressData } from "@/app/types/project";

// Dados de endereço e contato mockados
const projectAddresses: Record<string, AddressData> = {
  "1": {
    street: "123 Tech Avenue",
    number: "100",
    neighborhood: "Silicon District",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA"
  },
  "2": {
    street: "456 Mobile Street",
    number: "200",
    neighborhood: "App Valley",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    country: "USA"
  },
  "3": {
    street: "789 Integration Road",
    number: "300",
    neighborhood: "Database District",
    city: "Austin",
    state: "TX",
    zipCode: "73301",
    country: "USA"
  },
  "4": {
    street: "101 Marketing Boulevard",
    number: "400",
    neighborhood: "Ad Network",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA"
  },
  "5": {
    street: "202 Server Lane",
    number: "500",
    neighborhood: "Cloud Heights",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    country: "USA"
  },
  "6": {
    street: "303 Product Road",
    number: "600",
    neighborhood: "Innovation Park",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "USA"
  },
  "7": {
    street: "404 Support Street",
    number: "700",
    neighborhood: "Help Center",
    city: "Denver",
    state: "CO",
    zipCode: "80201",
    country: "USA"
  },
  "8": {
    street: "505 Security Avenue",
    number: "800",
    neighborhood: "Firewall District",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    country: "USA"
  }
};

// Função para formatar data como ISO string (YYYY-MM-DD)
function formatDateForInput(dateString: string): string {
  try {
    if (!dateString) return '';
    
    // Primeiro verificamos se a data já está no formato ISO
    if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
      return dateString.split('T')[0];
    }
    
    // Tentamos alguns formatos comuns
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Se não conseguir converter, retornamos a data atual
      return new Date().toISOString().split('T')[0];
    }
    
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return new Date().toISOString().split('T')[0];
  }
}

// Função para formatar hora para o input time (HH:MM)
function formatTimeForInput(timeString: string): string {
  try {
    if (!timeString) return '';
    
    // Se já estiver no formato HH:MM, retornamos como está
    if (/^\d{1,2}:\d{2}$/.test(timeString)) {
      return timeString;
    }
    
    // Se estiver no formato "9:00 AM", convertemos para 09:00
    const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      let hours = parseInt(match[1]);
      const minutes = match[2];
      const period = match[3]?.toUpperCase();
      
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    
    // Se não conseguirmos extrair, retornamos um valor padrão
    return '09:00';
  } catch (error) {
    console.error("Error formatting time:", error);
    return '09:00';
  }
}

// GET /api/projects/[id] - Buscar projeto por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Buscamos o projeto pelo ID
    const project = getProjectById(params.id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Formatamos data e hora para os campos de formulário
    const formattedDueDate = formatDateForInput(project.dueDate);
    const formattedStartTime = formatTimeForInput(project.startTime || '');

    // Adicionamos o endereço mockado e outros dados formatados
    const enrichedProject = {
      ...project,
      dueDate: formattedDueDate,
      startTime: formattedStartTime,
      address: projectAddresses[params.id] || {
        street: "Default Street",
        number: "0",
        neighborhood: "Default Neighborhood",
        city: "Default City",
        state: "Default State",
        zipCode: "00000",
        country: "Default Country"
      },
      contact: {
        name: `Contact for ${project.title}`,
        phone: `555-${params.id}${params.id}${params.id}-${params.id}${params.id}${params.id}${params.id}`
      }
    };

    return NextResponse.json({ 
      project: enrichedProject,
      message: "Project retrieved successfully" 
    });
  } catch (error) {
    console.error("Error retrieving project:", error);
    return NextResponse.json(
      { message: "Error retrieving project" },
      { status: 500 }
    );
  }
} 