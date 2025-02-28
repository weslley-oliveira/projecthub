"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Mail, 
  MoreHorizontal, 
  Phone, 
  Plus, 
  Search, 
  UserRound,
  Building2,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  avatar?: string;
  address: string;
  status: "Active" | "Inactive" | "Prospect";
  totalSpent: number;
  lastPurchase: string;
  projects: number;
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock data for customers
  const allCustomers: Customer[] = [
    {
      id: "1",
      name: "Acme Corporation",
      company: "Acme Inc.",
      email: "contact@acmecorp.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "123 Business Ave, San Francisco, CA 94107",
      status: "Active",
      totalSpent: 45000,
      lastPurchase: "2 days ago",
      projects: 3,
    },
    {
      id: "2",
      name: "Globex Industries",
      company: "Globex Ltd.",
      email: "info@globex.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "456 Corporate Blvd, New York, NY 10001",
      status: "Active",
      totalSpent: 78500,
      lastPurchase: "1 week ago",
      projects: 2,
    },
    {
      id: "3",
      name: "Initech Systems",
      company: "Initech LLC",
      email: "support@initech.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "789 Tech Park, Austin, TX 78701",
      status: "Inactive",
      totalSpent: 12000,
      lastPurchase: "3 months ago",
      projects: 1,
    },
    {
      id: "4",
      name: "Soylent Corp",
      company: "Soylent Enterprises",
      email: "hello@soylent.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "101 Green St, Chicago, IL 60607",
      status: "Active",
      totalSpent: 93200,
      lastPurchase: "5 days ago",
      projects: 4,
    },
    {
      id: "5",
      name: "Umbrella Corporation",
      company: "Umbrella Inc.",
      email: "contact@umbrella.com",
      phone: "+1 (555) 567-8901",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "202 Science Dr, Boston, MA 02115",
      status: "Prospect",
      totalSpent: 0,
      lastPurchase: "Never",
      projects: 0,
    },
    {
      id: "6",
      name: "Stark Industries",
      company: "Stark Innovations",
      email: "info@stark.com",
      phone: "+1 (555) 678-9012",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "303 Innovation Way, Malibu, CA 90265",
      status: "Active",
      totalSpent: 125000,
      lastPurchase: "1 day ago",
      projects: 5,
    },
    {
      id: "7",
      name: "Wayne Enterprises",
      company: "Wayne Corp",
      email: "business@wayne.com",
      phone: "+1 (555) 789-0123",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "404 Gotham Rd, Gotham City, NJ 07101",
      status: "Inactive",
      totalSpent: 67500,
      lastPurchase: "2 months ago",
      projects: 2,
    },
    {
      id: "8",
      name: "Cyberdyne Systems",
      company: "Cyberdyne Tech",
      email: "future@cyberdyne.com",
      phone: "+1 (555) 890-1234",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      address: "505 AI Blvd, Los Angeles, CA 90001",
      status: "Prospect",
      totalSpent: 0,
      lastPurchase: "Never",
      projects: 0,
    },
  ];
  
  // Filter customers based on search query and status filter
  const filteredCustomers = allCustomers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColor = {
    Active: "success",
    Inactive: "secondary",
    Prospect: "warning",
  } as const;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold">Customers</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Add Customer</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new customer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input id="name" placeholder="Enter customer name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="prospect">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button className="w-full sm:w-auto">Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Customers Tabs */}
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="grid" className="flex-1 sm:flex-initial">Grid View</TabsTrigger>
              <TabsTrigger value="list" className="flex-1 sm:flex-initial">List View</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Grid View */}
          <TabsContent value="grid" className="mt-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant={statusColor[customer.status]}>
                        {customer.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Contact</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="mt-2 text-base sm:text-lg">{customer.name}</CardTitle>
                    <CardDescription>{customer.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{customer.address}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-muted/50 px-4 sm:px-6 py-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Projects</p>
                      <p className="text-base sm:text-lg font-medium">{customer.projects}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                      <p className="text-base sm:text-lg font-medium">{formatCurrency(customer.totalSpent)}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredCustomers.length === 0 && (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No customers found</p>
                <Button variant="link" className="mt-2">
                  Add a new customer
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* List View */}
          <TabsContent value="list" className="mt-4 overflow-auto">
            <div className="rounded-md border overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-3">Customer</div>
                  <div className="col-span-2">Contact</div>
                  <div className="col-span-3">Address</div>
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-1 text-center">Projects</div>
                  <div className="col-span-1 text-right">Total Spent</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="grid grid-cols-12 gap-2 border-b p-4 last:border-0">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback>
                            {customer.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.company}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Mail className="mr-1 h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Phone className="mr-1 h-3 w-3 text-muted-foreground shrink-0" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <div className="flex items-start">
                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-sm line-clamp-2">{customer.address}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <Badge variant={statusColor[customer.status]}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      {customer.projects}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Contact</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredCustomers.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center">
                  <p className="text-muted-foreground">No customers found</p>
                  <Button variant="link" className="mt-2">
                    Add a new customer
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile View for List */}
        <div className="block sm:hidden mt-6">
          <h2 className="text-lg font-medium mb-4">Mobile View</h2>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Badge variant={statusColor[customer.status]}>
                      {customer.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{customer.name}</CardTitle>
                      <CardDescription>{customer.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{customer.address}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4 border-t bg-muted/50 px-4 py-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Projects</p>
                    <p className="text-base font-medium">{customer.projects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="text-base font-medium">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}