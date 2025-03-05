"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  Eye
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Customer } from "@/app/types/customer";

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) throw new Error("Error fetching customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddCustomerDialog = () => {
    router.push('/customers/new');
  };

  const openEditCustomerDialog = (customer: Customer) => {
    router.push(`/customers/${customer.id}/edit`);
  };

  const removeCustomer = async (id: string) => {
    try {
      const response = await fetch(`/api/customers?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting customer");
      
      fetchCustomers();
    } catch (error) {
      console.error("Error removing customer:", error);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customers</h1>
          <Button onClick={openAddCustomerDialog}>
            <Plus className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[300px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{customer.contact.name}</span>
                        <span className="text-sm text-muted-foreground">{customer.contact.email}</span>
                        <span className="text-sm text-muted-foreground">{customer.contact.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{customer.address.street}, {customer.address.number}</span>
                        {customer.address.complement && (
                          <span className="text-sm text-muted-foreground">{customer.address.complement}</span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {customer.address.city} - {customer.address.postcode}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditCustomerDialog(customer)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/customers/${customer.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}