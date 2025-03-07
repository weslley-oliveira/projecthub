import { TeamMember, TeamMemberStatus } from '@/app/types/team';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/team
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

// POST /api/team
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validação básica dos campos obrigatórios
    if (!body.name || !body.role || !body.status || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Name, role, status, email and phone are required fields' },
        { status: 400 }
      );
    }

    // Validação do status
    const validStatuses: TeamMemberStatus[] = ["Available", "Working", "Busy", "Absent"];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: Available, Working, Busy, Absent' },
        { status: 400 }
      );
    }

    // Remover campos opcionais se não fornecidos
    const { id, cscsCard, bankDetails, rate, address, ...memberData } = body;

    // Adicionar data de ingresso
    memberData.join_date = new Date().toISOString();

    const { data, error } = await supabase
      .from('team_members')
      .insert([memberData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create team member', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Failed to create team member', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/team
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE /api/team
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}