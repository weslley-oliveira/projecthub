'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { TeamMember } from '@/app/types/team';

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
                <Select
                  value={member.department}
                  onValueChange={(value: "Management" | "Engineering" | "Design" | "Marketing" | "Sales") =>
                    setMember({ ...member, department: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="grid gap-2">
                <h3 className="font-semibold">Bank Details</h3>
                <div className="grid gap-2">
                  <label htmlFor="accountName">Account Name</label>
                  <Input
                    id="accountName"
                    value={member.bankDetails?.accountName || ''}
                    onChange={(e) => setMember({
                      ...member,
                      bankDetails: {
                        accountName: e.target.value,
                        accountNumber: member.bankDetails?.accountNumber || '',
                        sortCode: member.bankDetails?.sortCode || ''
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="accountNumber">Account Number</label>
                  <Input
                    id="accountNumber"
                    value={member.bankDetails?.accountNumber || ''}
                    onChange={(e) => setMember({
                      ...member,
                      bankDetails: {
                        accountName: member.bankDetails?.accountName || '',
                        accountNumber: e.target.value,
                        sortCode: member.bankDetails?.sortCode || ''
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="sortCode">Sort Code</label>
                  <Input
                    id="sortCode"
                    value={member.bankDetails?.sortCode || ''}
                    onChange={(e) => setMember({
                      ...member,
                      bankDetails: {
                        accountName: member.bankDetails?.accountName || '',
                        accountNumber: member.bankDetails?.accountNumber || '',
                        sortCode: e.target.value
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <h3 className="font-semibold">CSCS Card</h3>
                <div className="grid gap-2">
                  <label htmlFor="cscsNumber">Card Number</label>
                  <Input
                    id="cscsNumber"
                    value={member.cscsCard?.number || ''}
                    onChange={(e) => setMember({
                      ...member,
                      cscsCard: {
                        number: e.target.value,
                        expiryDate: member.cscsCard?.expiryDate || ''
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cscsExpiryDate">Expiry Date</label>
                  <Input
                    id="cscsExpiryDate"
                    value={member.cscsCard?.expiryDate || ''}
                    onChange={(e) => setMember({
                      ...member,
                      cscsCard: {
                        number: member.cscsCard?.number || '',
                        expiryDate: e.target.value
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>
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