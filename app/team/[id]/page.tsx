'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Edit } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { TeamMember } from '@/app/types/team';



export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/team/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch member: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Type guard to validate API response
        const isValidMember = (data: any): data is TeamMember => {
          return (
            typeof data === 'object' &&
            data !== null &&
            typeof data.id === 'string' &&
            typeof data.name === 'string' &&
            typeof data.role === 'string' &&
            typeof data.department === 'string' &&
            typeof data.email === 'string' &&
            (['Available', 'Working', 'Busy', 'Absent'] as const).includes(data.status)
          );
        };

        if (!isValidMember(data)) {
          throw new Error('Invalid member data received from API');
        }

        setMember(data);
      } catch (error) {
        console.error('Error fetching member:', error);
        // You might want to set an error state here to show to the user
        setMember(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [params.id]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!member) return <div className="flex items-center justify-center h-screen">Member not found</div>;

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
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member?.avatar} />
              <AvatarFallback>
                {member?.name ? member.name.split(" ").map(n => n[0]).join("") : ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
            </div>
          </div>
          <div className="flex gap-2">
          </div>
            <Button onClick={() => router.push(`/team/${params.id}/rate`)}>
              <Edit className="h-4 w-4 mr-2" />
              Manage Rates
            </Button>
            <Button onClick={() => router.push(`/team/${params.id}/edit`)}>

            <Edit className="h-4 w-4 mr-2" />
            Edit Member
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Role</h3>
              <p>{member.role}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Department</h3>
              <p>{member.department}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Status</h3>
              <Badge
                variant={
                  member.status === "Available"
                    ? "default"
                    : member.status === "Working"
                    ? "secondary"
                    : "outline"
                }
              >
                {member.status}
              </Badge>
            </div>
            {member.phone && (
              <div className="space-y-2">
                <h3 className="font-semibold">Phone</h3>
                <p>{member.phone}</p>
              </div>
            )}
            {member.joinDate && (
              <div className="space-y-2">
                <h3 className="font-semibold">Join Date</h3>
                <p>{member.joinDate}</p>
              </div>
            )}
            {member.bankDetails && (
              <div className="space-y-2">
                <h3 className="font-semibold">Bank Details</h3>
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">Account Name:</span> {member.bankDetails.accountName}</p>
                  <p><span className="text-muted-foreground">Account Number:</span> {member.bankDetails.accountNumber}</p>
                  <p><span className="text-muted-foreground">Sort Code:</span> {member.bankDetails.sortCode}</p>
                </div>
              </div>
            )}
            {member.cscsCard && (
              <div className="space-y-2">
                <h3 className="font-semibold">CSCS Card</h3>
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">Card Number:</span> {member.cscsCard.number}</p>
                  <p><span className="text-muted-foreground">Expiry Date:</span> {member.cscsCard.expiryDate}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}