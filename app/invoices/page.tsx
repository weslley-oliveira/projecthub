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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Calendar as CalendarIcon, 
  Check, 
  Download, 
  FileText, 
  MoreHorizontal, 
  Plus, 
  Printer, 
  Search, 
  Send, 
  X 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format, addDays, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "In Progress" | "Completed" | "On Hold" | "Planned";
  customer: {
    id: string;
    name: string;
    company: string;
    email: string;
  };
  amount: number;
  completedDate: Date | null;
}

interface Invoice {
  id: string;
  number: string;
  customer: {
    id: string;
    name: string;
    company: string;
    email: string;
  };
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  issueDate: Date;
  dueDate: Date;
  projects: Project[];
  amount: number;
}

export default function InvoicesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date())
  });
  
  // Mock data for customers
  const customers = [
    {
      id: "1",
      name: "Acme Corporation",
      company: "Acme Inc.",
      email: "contact@acmecorp.com",
      address: "123 Business Ave, San Francisco, CA 94107",
    },
    {
      id: "2",
      name: "Globex Industries",
      company: "Globex Ltd.",
      email: "info@globex.com",
      address: "456 Corporate Blvd, New York, NY 10001",
    },
    {
      id: "3",
      name: "Initech Systems",
      company: "Initech LLC",
      email: "support@initech.com",
      address: "789 Tech Park, Austin, TX 78701",
    },
    {
      id: "4",
      name: "Soylent Corp",
      company: "Soylent Enterprises",
      email: "hello@soylent.com",
      address: "101 Green St, Chicago, IL 60607",
    },
  ];
  
  // Mock data for completed projects
  const completedProjects: Project[] = [
    {
      id: "1",
      title: "Website Redesign",
      description: "Complete redesign of corporate website with modern UI/UX",
      status: "Completed",
      customer: customers[0],
      amount: 8500,
      completedDate: new Date(2025, 3, 12),
    },
    {
      id: "2",
      title: "CRM Integration",
      description: "Integration of new CRM system with existing tools",
      status: "Completed",
      customer: customers[0],
      amount: 6200,
      completedDate: new Date(2025, 3, 14),
    },
    {
      id: "3",
      title: "E-commerce Platform",
      description: "Development of online store with payment processing",
      status: "Completed",
      customer: customers[1],
      amount: 12500,
      completedDate: new Date(2025, 3, 10),
    },
    {
      id: "4",
      title: "Mobile App Development",
      description: "iOS and Android app for customer engagement",
      status: "Completed",
      customer: customers[2],
      amount: 15000,
      completedDate: new Date(2025, 3, 8),
    },
    {
      id: "5",
      title: "Security Audit",
      description: "Comprehensive security audit of all systems",
      status: "Completed",
      customer: customers[3],
      amount: 4800,
      completedDate: new Date(2025, 3, 15),
    },
    {
      id: "6",
      title: "Content Migration",
      description: "Migration of content to new CMS platform",
      status: "Completed",
      customer: customers[1],
      amount: 3200,
      completedDate: new Date(2025, 3, 9),
    },
  ];
  
  // Mock data for invoices
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "INV-2025-001",
      customer: customers[0],
      status: "Paid",
      issueDate: new Date(2025, 2, 15),
      dueDate: new Date(2025, 3, 15),
      projects: [completedProjects[0], completedProjects[1]],
      amount: 14700,
    },
    {
      id: "2",
      number: "INV-2025-002",
      customer: customers[1],
      status: "Sent",
      issueDate: new Date(2025, 3, 1),
      dueDate: new Date(2025, 4, 1),
      projects: [completedProjects[2]],
      amount: 12500,
    },
    {
      id: "3",
      number: "INV-2025-003",
      customer: customers[2],
      status: "Overdue",
      issueDate: new Date(2025, 2, 1),
      dueDate: new Date(2025, 3, 1),
      projects: [completedProjects[3]],
      amount: 15000,
    },
    {
      id: "4",
      number: "INV-2025-004",
      customer: customers[3],
      status: "Draft",
      issueDate: new Date(2025, 3, 16),
      dueDate: new Date(2025, 4, 16),
      projects: [completedProjects[4]],
      amount: 4800,
    },
  ]);
  
  // State for selected projects in create invoice dialog
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  
  // Filter invoices based on search query and status filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get projects completed within the selected date range
  const getProjectsInDateRange = () => {
    return completedProjects.filter(project => 
      project.completedDate && 
      isWithinInterval(project.completedDate, {
        start: dateRange.from,
        end: dateRange.to
      }) &&
      (selectedCustomer === "" || project.customer.id === selectedCustomer)
    );
  };

  // Calculate total amount for selected projects
  const calculateTotal = () => {
    return completedProjects
      .filter(project => selectedProjects.includes(project.id))
      .reduce((sum, project) => sum + project.amount, 0);
  };

  // Handle project selection
  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Create a new invoice
  const createInvoice = () => {
    if (selectedProjects.length === 0) {
      toast({
        title: "No projects selected",
        description: "Please select at least one project to create an invoice.",
        variant: "destructive"
      });
      return;
    }

    if (selectedCustomer === "") {
      toast({
        title: "No customer selected",
        description: "Please select a customer for this invoice.",
        variant: "destructive"
      });
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomer);
    if (!customer) return;

    const selectedProjectsData = completedProjects.filter(project => 
      selectedProjects.includes(project.id)
    );

    const totalAmount = selectedProjectsData.reduce((sum, project) => sum + project.amount, 0);
    
    const newInvoice: Invoice = {
      id: `${invoices.length + 1}`,
      number: `INV-2025-00${invoices.length + 1}`,
      customer,
      status: "Draft",
      issueDate: new Date(),
      dueDate: addDays(new Date(), 30),
      projects: selectedProjectsData,
      amount: totalAmount
    };

    setInvoices(prev => [newInvoice, ...prev]);
    
    setIsCreateInvoiceOpen(false);
    setSelectedCustomer("");
    setSelectedProjects([]);
    
    toast({
      title: "Invoice created",
      description: `Invoice ${newInvoice.number} has been created successfully.`,
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Status color mapping
  const statusColor = {
    Draft: "secondary",
    Sent: "default",
    Paid: "success",
    Overdue: "destructive",
  } as const;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold">Invoices</h1>
          
          <Button onClick={() => setIsCreateInvoiceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Create Invoice</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
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
              <SelectItem value="all">All Invoices</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Invoices Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="draft" className="text-xs sm:text-sm">Draft</TabsTrigger>
            <TabsTrigger value="sent" className="text-xs sm:text-sm">Sent</TabsTrigger>
            <TabsTrigger value="paid" className="text-xs sm:text-sm">Paid</TabsTrigger>
          </TabsList>
          
          {/* All Invoices Tab */}
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                      <div className="col-span-2">Invoice #</div>
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2">Issue Date</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    
                    {filteredInvoices.length > 0 ? (
                      <div className="divide-y">
                        {filteredInvoices.map((invoice) => (
                          <div key={invoice.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                            <div className="col-span-2 font-medium">{invoice.number}</div>
                            <div className="col-span-3">
                              <div>
                                <p className="font-medium">{invoice.customer.name}</p>
                                <p className="text-sm text-muted-foreground">{invoice.customer.company}</p>
                              </div>
                            </div>
                            <div className="col-span-2 font-medium">{formatCurrency(invoice.amount)}</div>
                            <div className="col-span-2">{format(invoice.issueDate, 'MMM d, yyyy')}</div>
                            <div className="col-span-1">
                              <Badge variant={statusColor[invoice.status]}>
                                {invoice.status}
                              </Badge>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Print</span>
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  {invoice.status === "Draft" && (
                                    <DropdownMenuItem>
                                      <Send className="mr-2 h-4 w-4" />
                                      Send to Customer
                                    </DropdownMenuItem>
                                  )}
                                  {invoice.status === "Sent" && (
                                    <DropdownMenuItem>
                                      <Check className="mr-2 h-4 w-4" />
                                      Mark as Paid
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-40 flex-col items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No invoices found</p>
                        <Button variant="link" className="mt-2" onClick={() => setIsCreateInvoiceOpen(true)}>
                          Create a new invoice
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs would have similar content but filtered by status */}
          <TabsContent value="draft" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                      <div className="col-span-2">Invoice #</div>
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2">Issue Date</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    
                    {filteredInvoices.filter(inv => inv.status === "Draft").length > 0 ? (
                      <div className="divide-y">
                        {filteredInvoices
                          .filter(inv => inv.status === "Draft")
                          .map((invoice) => (
                            <div key={invoice.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                              <div className="col-span-2 font-medium">{invoice.number}</div>
                              <div className="col-span-3">
                                <div>
                                  <p className="font-medium">{invoice.customer.name}</p>
                                  <p className="text-sm text-muted-foreground">{invoice.customer.company}</p>
                                </div>
                              </div>
                              <div className="col-span-2 font-medium">{formatCurrency(invoice.amount)}</div>
                              <div className="col-span-2">{format(invoice.issueDate, 'MMM d, yyyy')}</div>
                              <div className="col-span-1">
                                <Badge variant={statusColor[invoice.status]}>
                                  {invoice.status}
                                </Badge>
                              </div>
                              <div className="col-span-2 flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Printer className="h-4 w-4" />
                                  <span className="sr-only">Print</span>
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Send className="mr-2 h-4 w-4" />
                                      Send to Customer
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-40 flex-col items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No draft invoices found</p>
                        <Button variant="link" className="mt-2" onClick={() => setIsCreateInvoiceOpen(true)}>
                          Create a new invoice
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Similar content for other tabs */}
          <TabsContent value="sent" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="flex h-40 flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">View sent invoices here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="paid" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="flex h-40 flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">View paid invoices here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile View */}
        <div className="block md:hidden mt-6">
          <h2 className="text-lg font-medium mb-4">Recent Invoices</h2>
          <div className="space-y-4">
            {filteredInvoices.slice(0, 5).map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Badge variant={statusColor[invoice.status]}>
                      {invoice.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        {invoice.status === "Draft" && (
                          <DropdownMenuItem>Send to Customer</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base mt-2">{invoice.number}</CardTitle>
                  <CardDescription>{invoice.customer.company}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Issue Date:</span>
                      <span>{format(invoice.issueDate, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span>{format(invoice.dueDate, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" className="w-full ml-2">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Invoice Dialog */}
      <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Generate an invoice for completed projects within a selected date range.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Customer Selection */}
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.company} ({customer.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Date Range Selection */}
            <div className="space-y-2">
              <Label>Date Range for Completed Projects</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="from">From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          format(dateRange.from, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="to">To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? (
                          format(dateRange.to, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            {/* Projects Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Completed Projects</Label>
                <span className="text-sm text-muted-foreground">
                  {selectedProjects.length} selected
                </span>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-3 font-medium text-sm">
                      <div className="col-span-1"></div>
                      <div className="col-span-4">Project</div>
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Completed Date</div>
                      <div className="col-span-2 text-right">Amount</div>
                    </div>
                    
                    {getProjectsInDateRange().length > 0 ? (
                      <div className="divide-y">
                        {getProjectsInDateRange().map((project) => (
                          <div key={project.id} className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-muted/30">
                            <div className="col-span-1">
                              <Checkbox
                                checked={selectedProjects.includes(project.id)}
                                onCheckedChange={() => toggleProjectSelection(project.id)}
                              />
                            </div>
                            <div className="col-span-4">
                              <p className="font-medium">{project.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                            </div>
                            <div className="col-span-3">
                              <p className="text-sm">{project.customer.company}</p>
                            </div>
                            <div className="col-span-2 text-sm">
                              {project.completedDate && format(project.completedDate, 'MMM d, yyyy')}
                            </div>
                            <div className="col-span-2 text-right font-medium">
                              {formatCurrency(project.amount)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-40 flex-col items-center justify-center">
                        <p className="text-muted-foreground">No completed projects found in the selected date range</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Invoice Summary */}
            {selectedProjects.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Invoice Summary</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Selected Projects:</span>
                        <span>{selectedProjects.length}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Subtotal:</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tax (0%):</span>
                        <span>{formatCurrency(0)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createInvoice} disabled={selectedProjects.length === 0 || selectedCustomer === ""}>
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}