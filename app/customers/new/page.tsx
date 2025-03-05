"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [customer, setCustomer] = useState<Omit<Customer, "id" | "createdAt" | "updatedAt" | "projects">>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) throw new Error("Error creating customer");
      
      const newCustomer = await response.json();
      router.push(`/customers/${newCustomer.id}`);
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold">New Customer</h1>
          <p className="text-muted-foreground">
            Fill in the information to add a new customer
          </p>
        </div>

        <Card>
          <CardHeader>
           
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={customer.status}
                  onValueChange={(value: "Active" | "Inactive" | "Pending") =>
                    setCustomer({ ...customer, status: value })
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

              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={customer.contact.name}
                  onChange={(e) => setCustomer({
                    ...customer,
                    contact: { ...customer.contact, name: e.target.value }
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
                    value={customer.contact.email}
                    onChange={(e) => setCustomer({
                      ...customer,
                      contact: { ...customer.contact, email: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={customer.contact.phone}
                    onChange={(e) => setCustomer({
                      ...customer,
                      contact: { ...customer.contact, phone: e.target.value }
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
                  {customer.address.street ? "Edit Address" : "Add Address"}
                </Button>
                {customer.address.street && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {customer.address.street}, {customer.address.number}
                    {customer.address.complement && ` - ${customer.address.complement}`}
                    <br />
                    {customer.address.city}
                    <br />
                    {customer.address.postcode} - {customer.address.country}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Customer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <AddressDialog
          open={isAddressDialogOpen}
          onOpenChange={setIsAddressDialogOpen}
          address={customer.address}
          onAddressChange={(address) => setCustomer({ ...customer, address })}
          onSave={() => setIsAddressDialogOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
} 