'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { TeamMember, TeamMemberStatus } from '@/app/types/team';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function TeamMemberPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/team/${id}`);
        if (!response.ok) throw new Error('Failed to fetch member');
        const data = await response.json();
        setMember(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMember();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });

      if (!response.ok) throw new Error('Failed to update member');
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete member');
      router.push('/team');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!member) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <DashboardLayout>
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Team Member: {member.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  value={member.name}
                  onChange={(e) => setMember({ ...member, name: e.target.value })}
                  placeholder="Enter member name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role">Role</label>
                <Input
                  id="role"
                  value={member.role}
                  onChange={(e) => setMember({ ...member, role: e.target.value })}
                  placeholder="Enter member role"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status">Status</label>
                <Select
                  value={member.status}
                  onValueChange={(value) => setMember({ ...member, status: value as TeamMemberStatus })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Working">Working</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}