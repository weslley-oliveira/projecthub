'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Edit, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { TeamMember } from '@/app/types/team';
import { useToast } from '@/hooks/use-toast';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function TeamMemberPage({ params }: PageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = use(params);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/team/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch member: ${response.statusText}`);
        }

        const data = await response.json();
        setMember(data);
      } catch (error) {
        console.error('Error fetching member:', error);
        toast({
          title: "Error",
          description: "Failed to load team member details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, toast]);

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-screen">Loading...</div>
    </DashboardLayout>
  );

  if (!member) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-screen">Member not found</div>
    </DashboardLayout>
  );

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
                <AvatarImage src={member.avatar} />
                <AvatarFallback>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <Badge variant="outline" className="mt-1">{member.role}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/team/${id}/rate`)} variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Manage Rates
              </Button>
              <Button onClick={() => router.push(`/team/${id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Member
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
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
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>{member.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>{member.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Join Date</h3>
                  <p>{new Date(member.joinDate).toLocaleDateString()}</p>
                </div>
              </div>

              {member.bankDetails && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Bank Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Account Number:</span> {member.bankDetails.accountNumber}</p>
                    <p><span className="font-medium">Account Name:</span> {member.bankDetails.accountName}</p>
                    <p><span className="font-medium">Sort Code:</span> {member.bankDetails.sortCode}</p>
                  </div>
                </div>
              )}

              {member.cscsCard && (
                <div className="space-y-4">
                  <h3 className="font-semibold">CSCS Card</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Number:</span> {member.cscsCard.number}</p>
                    <p><span className="font-medium">Expiry Date:</span> {new Date(member.cscsCard.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {member.address && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Address</h3>
                  <div className="space-y-2">
                    <p>{member.address.street}</p>
                    <p>{member.address.city}</p>
                    <p>{member.address.postcode}</p>
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