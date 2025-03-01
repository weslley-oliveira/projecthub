import { NextResponse } from 'next/server';
import { getTeamMemberById } from '@/app/data/team/mockTeam';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const member = getTeamMemberById(params.id);

    if (!member) {
      return new NextResponse(JSON.stringify({ error: 'Team member not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify(member), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}