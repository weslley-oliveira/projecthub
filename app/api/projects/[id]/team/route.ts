import { NextResponse } from "next/server";
import { getProjectTeamMembers } from "@/app/data/team/mockTeam";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const team = getProjectTeamMembers(params.id);
    return NextResponse.json({ 
      team,
      message: "Project team retrieved successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving project team" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { memberId } = await request.json();
    
    // Em um ambiente real, aqui você adicionaria o membro ao projeto no banco de dados
    // Por enquanto, apenas retornamos uma mensagem de sucesso
    return NextResponse.json({ 
      message: "Team member added successfully",
      memberId
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { memberId } = await request.json();
    
    // Em um ambiente real, aqui você removeria o membro do projeto no banco de dados
    // Por enquanto, apenas retornamos uma mensagem de sucesso
    return NextResponse.json({ 
      message: "Team member removed successfully",
      memberId
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error removing team member" },
      { status: 500 }
    );
  }
} 