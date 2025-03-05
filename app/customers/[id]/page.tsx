"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  ArrowLeft,
  Edit,
  Eye
} from "lucide-react";
import Link from "next/link";
import { Customer } from "@/app/types/customer";

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerDetails();
  }, [params.id]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await fetch(`/api/customers/${params.id}`);
      if (!response.ok) throw new Error("Error fetching customer details");
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Customer not found</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Link href="/customers">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customers List
            </Button>
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{customer.name}</h1>
              <p className="text-muted-foreground">Customer Details</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                {customer.status}
              </Badge>
              <Button onClick={() => router.push(`/customers/${params.id}/rate`)}>
                <DollarSign className="mr-2 h-4 w-4" />
                Edit Rate
              </Button>
              <Button onClick={() => router.push(`/customers/${params.id}/view`)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button onClick={() => router.push(`/customers/${params.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Customer
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Customer contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{customer.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{customer.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Name</p>
                    <p>{customer.contact.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>
                Customer location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>
                      {customer.address.street}, {customer.address.number}
                      {customer.address.complement && ` - ${customer.address.complement}`}
                    </p>
                    <p>{customer.address.city}</p>
                    <p>{customer.address.postcode}</p>
                    <p>{customer.address.country}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>
              Information about spending and projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="text-2xl font-bold">{new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold">{customer.projects?.length || "0"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 