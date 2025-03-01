import { NextResponse } from "next/server";
import { mockProjects } from "@/app/data/projects/mockProjects";
import { Project } from "@/app/types/project";

// GET /api/projects - Listar todos os projetos
export async function GET() {
  try {
    return NextResponse.json({ 
      projects: mockProjects,
      message: "Projects retrieved successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Criar novo projeto
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar dados necessários
    if (!body.title || !body.description || !body.dueDate || !body.startTime) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Criar novo projeto
    const newProject: Project = {
      id: (mockProjects.length + 1).toString(),
      title: body.title,
      description: body.description,
      progress: 0,
      dueDate: body.dueDate,
      status: "Pending",
      startTime: body.startTime,
      team: [],
      address: body.address,
      contact: body.contact,
      workforce: body.workforce
    };

    // Em um ambiente real, aqui salvaria no banco de dados
    mockProjects.push(newProject);

    return NextResponse.json({ 
      project: newProject,
      message: "Project created successfully" 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects - Atualizar projeto
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Encontrar e atualizar o projeto
    const projectIndex = mockProjects.findIndex(p => p.id === body.id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Atualizar projeto mantendo dados existentes
    const updatedProject = {
      ...mockProjects[projectIndex],
      ...body,
      id: body.id // Garantir que o ID não mude
    };

    mockProjects[projectIndex] = updatedProject;

    return NextResponse.json({ 
      project: updatedProject,
      message: "Project updated successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects - Deletar projeto
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Encontrar e remover o projeto
    const projectIndex = mockProjects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    mockProjects.splice(projectIndex, 1);

    return NextResponse.json({ 
      message: "Project deleted successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
} 