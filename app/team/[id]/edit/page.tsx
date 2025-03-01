'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  department: string;
  status: "Available" | "Working" | "Busy" | "Absent";
}

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/team/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch member');
        const data = await response.json();
        setMember(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMember();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    try {
      const response = await fetch(`/api/team/${params.id}`, {
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
      const response = await fetch(`/api/team/${params.id}`, {
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
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="role">Role</label>
                <Input
                  id="role"
                  value={member.role}
                  onChange={(e) => setMember({ ...member, role: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="department">Department</label>
                <Input
                  id="department"
                  value={member.department}
                  onChange={(e) => setMember({ ...member, department: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="status">Status</label>
                <Select
                  value={member.status}
                  onValueChange={(value: "Available" | 'Working' | 'Busy' | 'Absent') =>
                    setMember({ ...member, status: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
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

            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <Button type="submit" variant="default">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button type="button" variant="default" onClick={() => setIsEditing(true)}>Edit</Button>
                  <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}