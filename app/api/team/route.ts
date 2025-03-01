import { TeamMember } from '@/app/types/project';
import { NextResponse } from 'next/server';
import { mockTeamMembers, getTeamMemberById } from '@/app/data/team/mockTeam';

// GET /api/team
export async function GET() {
  try {
    return NextResponse.json(mockTeamMembers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

// POST /api/team
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, we would save to database here
    // For mock purposes, we'll just return success
    return NextResponse.json({ message: 'Team member created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

// PUT /api/team
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // In a real app, we would update the database here
    // For mock purposes, we'll just return success
    return NextResponse.json({ message: 'Team member updated successfully' });
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
    
    const member = getTeamMemberById(id);
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    // In a real app, we would delete from database here
    // For mock purposes, we'll just return success
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}