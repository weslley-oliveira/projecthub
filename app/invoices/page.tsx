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
  X,
  MapPin
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
import { Customer } from "@/app/types/customer";
import { MockCustomer } from "@/app/data/customers/mockCustomers";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "In Progress" | "Completed" | "On Hold" | "Planned";
  customer: Pick<Customer, "id" | "name" | "document" | "type" | "contact">;
  amount: number;
  completedDate: Date | null;
}

interface Invoice {
  id: string;
  number: string;
  customer: Pick<Customer, "id" | "name" | "document" | "type" | "contact">;
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
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date()
  });
  const [address, setAddress] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  
  // Mock data for customers
  const customers: MockCustomer[] = [
    {
      id: "1",
      name: "Acme Corporation",
      document: "12.345.678/0001-90",
      type: "Company",
      status: "Active",
      createdAt: "2024-03-04",
      updatedAt: "2024-03-04",
      contact: {
        name: "John Doe",
        phone: "(11) 99999-9999",
        email: "contact@acmecorp.com",
        position: "CEO"
      },
      address: {
        street: "123 Business Ave",
        number: "100",
        neighborhood: "Financial District",
        city: "San Francisco",
        state: "CA",
        zipCode: "94107",
        country: "USA"
      },
      projects: ["1", "2"],
      totalSpent: 14700,
      projectsCount: 2
    },
    {
      id: "2",
      name: "Globex Industries",
      document: "98.765.432/0001-10",
      type: "Company",
      status: "Active",
      createdAt: "2024-03-03",
      updatedAt: "2024-03-03",
      contact: {
        name: "Jane Smith",
        phone: "(11) 98888-8888",
        email: "info@globex.com",
        position: "CTO"
      },
      address: {
        street: "456 Corporate Blvd",
        number: "200",
        neighborhood: "Midtown",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA"
      },
      projects: ["3", "6"],
      totalSpent: 15700,
      projectsCount: 2
    },
    {
      id: "3",
      name: "Initech Systems",
      document: "45.678.901/0001-20",
      type: "Company",
      status: "Active",
      createdAt: "2024-03-02",
      updatedAt: "2024-03-02",
      contact: {
        name: "Bob Wilson",
        phone: "(11) 97777-7777",
        email: "support@initech.com",
        position: "Director"
      },
      address: {
        street: "789 Tech Park",
        number: "300",
        neighborhood: "Downtown",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        country: "USA"
      },
      projects: ["4"],
      totalSpent: 15000,
      projectsCount: 1
    },
    {
      id: "4",
      name: "Soylent Corp",
      document: "23.456.789/0001-30",
      type: "Company",
      status: "Active",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-01",
      contact: {
        name: "Alice Johnson",
        phone: "(11) 96666-6666",
        email: "hello@soylent.com",
        position: "Manager"
      },
      address: {
        street: "101 Green St",
        number: "400",
        neighborhood: "Loop",
        city: "Chicago",
        state: "IL",
        zipCode: "60607",
        country: "USA"
      },
      projects: ["5"],
      totalSpent: 4800,
      projectsCount: 1
    },
  ];
  
  // Mock data for completed projects
  const completedProjects: Project[] = [
    {
      id: "1",
      title: "Website Redesign",
      description: "Complete redesign of corporate website with modern UI/UX",
      status: "Completed",
      customer: {
        id: customers[0].id,
        name: customers[0].name,
        document: customers[0].document,
        type: customers[0].type,
        contact: customers[0].contact
      },
      amount: 8500,
      completedDate: new Date(2025, 3, 12),
    },
    {
      id: "2",
      title: "CRM Integration",
      description: "Integration of new CRM system with existing tools",
      status: "Completed",
      customer: {
        id: customers[0].id,
        name: customers[0].name,
        document: customers[0].document,
        type: customers[0].type,
        contact: customers[0].contact
      },
      amount: 6200,
      completedDate: new Date(2025, 3, 14),
    },
    {
      id: "3",
      title: "E-commerce Platform",
      description: "Development of online store with payment processing",
      status: "Completed",
      customer: {
        id: customers[1].id,
        name: customers[1].name,
        document: customers[1].document,
        type: customers[1].type,
        contact: customers[1].contact
      },
      amount: 12500,
      completedDate: new Date(2025, 3, 10),
    },
    {
      id: "4",
      title: "Mobile App Development",
      description: "iOS and Android app for customer engagement",
      status: "Completed",
      customer: {
        id: customers[2].id,
        name: customers[2].name,
        document: customers[2].document,
        type: customers[2].type,
        contact: customers[2].contact
      },
      amount: 15000,
      completedDate: new Date(2025, 3, 8),
    },
    {
      id: "5",
      title: "Security Audit",
      description: "Comprehensive security audit of all systems",
      status: "Completed",
      customer: {
        id: customers[3].id,
        name: customers[3].name,
        document: customers[3].document,
        type: customers[3].type,
        contact: customers[3].contact
      },
      amount: 4800,
      completedDate: new Date(2025, 3, 15),
    },
    {
      id: "6",
      title: "Content Migration",
      description: "Migration of content to new CMS platform",
      status: "Completed",
      customer: {
        id: customers[1].id,
        name: customers[1].name,
        document: customers[1].document,
        type: customers[1].type,
        contact: customers[1].contact
      },
      amount: 3200,
      completedDate: new Date(2025, 3, 9),
    },
  ];
  
  // Mock data for invoices
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "INV-2025-001",
      customer: {
        id: customers[0].id,
        name: customers[0].name,
        document: customers[0].document,
        type: customers[0].type,
        contact: customers[0].contact
      },
      status: "Paid",
      issueDate: new Date(2025, 2, 15),
      dueDate: new Date(2025, 3, 15),
      projects: [completedProjects[0], completedProjects[1]],
      amount: 14700,
    },
    {
      id: "2",
      number: "INV-2025-002",
      customer: {
        id: customers[1].id,
        name: customers[1].name,
        document: customers[1].document,
        type: customers[1].type,
        contact: customers[1].contact
      },
      status: "Sent",
      issueDate: new Date(2025, 3, 1),
      dueDate: new Date(2025, 4, 1),
      projects: [completedProjects[2]],
      amount: 12500,
    },
    {
      id: "3",
      number: "INV-2025-003",
      customer: {
        id: customers[2].id,
        name: customers[2].name,
        document: customers[2].document,
        type: customers[2].type,
        contact: customers[2].contact
      },
      status: "Overdue",
      issueDate: new Date(2025, 2, 1),
      dueDate: new Date(2025, 3, 1),
      projects: [completedProjects[3]],
      amount: 15000,
    },
    {
      id: "4",
      number: "INV-2025-004",
      customer: {
        id: customers[3].id,
        name: customers[3].name,
        document: customers[3].document,
        type: customers[3].type,
        contact: customers[3].contact
      },
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
                         invoice.customer.document.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      customer: {
        id: customer.id,
        name: customer.name,
        document: customer.document,
        type: customer.type,
        contact: customer.contact
      },
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

  const handleViewInvoice = (invoice: Invoice) => {
    // Implementar visualização da fatura
    console.log("Visualizar fatura:", invoice);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Implementar download da fatura
    console.log("Download fatura:", invoice);
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    // Implementar impressão da fatura
    console.log("Imprimir fatura:", invoice);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    // Implementar envio da fatura
    console.log("Enviar fatura:", invoice);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Faturas</h1>
          <Button onClick={() => setIsCreateInvoiceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Fatura
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar faturas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[300px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Draft">Rascunho</SelectItem>
                  <SelectItem value="Sent">Enviada</SelectItem>
                  <SelectItem value="Paid">Paga</SelectItem>
                  <SelectItem value="Overdue">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Emissão</TableHead>
                  <TableHead>Data de Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{invoice.customer.name}</span>
                        <span className="text-sm text-muted-foreground">{invoice.customer.document}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        invoice.status === "Paid" ? "default" :
                        invoice.status === "Overdue" ? "destructive" :
                        invoice.status === "Sent" ? "secondary" :
                        "outline"
                      }>
                        {invoice.status === "Paid" ? "Paga" :
                         invoice.status === "Overdue" ? "Vencida" :
                         invoice.status === "Sent" ? "Enviada" :
                         "Rascunho"}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(invoice.issueDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(invoice.dueDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrintInvoice(invoice)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar
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

        <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Nova Fatura</DialogTitle>
              <DialogDescription>
                Gere uma fatura para projetos concluídos dentro do período selecionado.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Seleção de Cliente */}
              <div className="space-y-2">
                <Label htmlFor="customer">Cliente</Label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} ({customer.document})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botão para abrir o popup de endereço */}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddressDialogOpen(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Adicionar Endereço
              </Button>
              
              {/* Seleção de Período */}
              <div className="space-y-2">
                <Label>Período</Label>
                <div className="flex items-center gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                              {format(dateRange.to, "dd/MM/yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "dd/MM/yyyy")
                          )
                        ) : (
                          <span>Selecione um período</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range: any) => setDateRange(range)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Lista de Projetos */}
              <div className="space-y-2">
                <Label>Projetos</Label>
                <div className="space-y-4">
                  {getProjectsInDateRange().map((project) => (
                    <div key={project.id} className="flex items-center space-x-4">
                      <Checkbox
                        id={project.id}
                        checked={selectedProjects.includes(project.id)}
                        onCheckedChange={() => toggleProjectSelection(project.id)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={project.id}>{project.title}</Label>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(project.amount)}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(project.completedDate!, "dd/MM/yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={createInvoice}>Criar Fatura</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Popup de Endereço */}
        <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Endereço de Faturamento</DialogTitle>
              <DialogDescription>
                Preencha o endereço para faturamento
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    value={address.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={address.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  value={address.neighborhood}
                  onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddressDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                // Aqui você pode adicionar a lógica para salvar o endereço
                setIsAddressDialogOpen(false);
              }}>
                Salvar Endereço
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}