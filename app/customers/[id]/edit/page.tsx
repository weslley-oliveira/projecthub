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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Customer } from "@/app/types/customer";
import { AddressDialog } from "@/components/address/address-dialog";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Omit<Customer, "id" | "createdAt" | "updatedAt" | "projects">>({
    name: "",
    status: "Active",
    contact: {
      name: "",
      phone: "",
      email: ""
    },
    address: {
      street: "",
      number: "",
      complement: "",
      city: "",
      postcode: "",
      country: ""
    }
  });

  useEffect(() => {
    fetchCustomerDetails();
  }, [params.id]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await fetch(`/api/customers/${params.id}`);
      if (!response.ok) throw new Error("Error fetching customer details");
      const data = await response.json();
      setCustomer(data);
      setFormData({
        name: data.name,
        status: data.status,
        contact: data.contact,
        address: data.address
      });
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error updating customer");
      
      router.push(`/customers/${params.id}`);
    } catch (error) {
      console.error("Error updating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!customer) {
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

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Link href={`/customers/${params.id}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customer Details
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Customer</h1>
          <p className="text-muted-foreground">
            Update customer information
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contact.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, name: e.target.value }
                  })}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsAddressDialogOpen(true)}
                >
                  {formData.address.street ? "Edit Address" : "Add Address"}
                </Button>
                {formData.address.street && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {formData.address.street}, {formData.address.number}
                    {formData.address.complement && ` - ${formData.address.complement}`}
                    <br />
                    {formData.address.city}
                    <br />
                    {formData.address.postcode} - {formData.address.country}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Active" | "Inactive" | "Pending") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/customers/${params.id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <AddressDialog
          open={isAddressDialogOpen}
          onOpenChange={setIsAddressDialogOpen}
          address={formData.address}
          onAddressChange={(address) => setFormData({ ...formData, address })}
          onSave={() => setIsAddressDialogOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
} 