'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TeamMember, TeamMemberStatus } from "@/app/types/team";

interface NewMemberForm {
  name: string;
  role: string;
  email: string;
  phone: string;
  status: TeamMemberStatus;
  avatar?: string;
}

const initialFormState: NewMemberForm = {
  name: '',
  role: '',
  email: '',
  phone: '',
  status: 'Available',
  avatar: ''
};

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [member, setMember] = useState<NewMemberForm>(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });

      if (!response.ok) throw new Error('Failed to create team member');
      router.push('/team');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/team">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Add New Team Member</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
            <CardDescription>
              Fill in the details to add a new team member.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={member.name}
                    onChange={(e) => setMember({ ...member, name: e.target.value })}
                    placeholder="Enter member name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={member.role}
                    onChange={(e) => setMember({ ...member, role: e.target.value })}
                    placeholder="Enter member role"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={member.email}
                    onChange={(e) => setMember({ ...member, email: e.target.value })}
                    placeholder="Enter member email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={member.phone}
                    onChange={(e) => setMember({ ...member, phone: e.target.value })}
                    placeholder="Enter member phone"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
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
                <div className="grid gap-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={member.avatar}
                    onChange={(e) => setMember({ ...member, avatar: e.target.value })}
                    placeholder="Enter avatar URL"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">Create Team Member</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}