import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Send,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { format, addDays, differenceInDays } from "date-fns";
import Link from "next/link";

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // Generate params for invoices 1-10
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
  // Mock invoice data
  const invoice = {
    id: params.id,
    number: `INV-2025-00${params.id}`,
    status: "Draft" as const,
    issueDate: new Date(),
    dueDate: addDays(new Date(), 30),
    customer: {
      name: "Acme Corporation",
      company: "Acme Inc.",
      email: "contact@acmecorp.com",
      address: "123 Business Ave, San Francisco, CA 94107",
      phone: "+1 (555) 123-4567",
    },
    projects: [
      {
        id: "1",
        title: "Website Redesign",
        description: "Complete redesign of corporate website with modern UI/UX",
        amount: 8500,
      },
      {
        id: "2",
        title: "CRM Integration",
        description: "Integration of new CRM system with existing tools",
        amount: 6200,
      }
    ],
    subtotal: 14700,
    tax: 0,
    total: 14700,
    notes: "Payment is due within 30 days. Please make checks payable to Acme Inc. or use the bank details provided below.",
    paymentDetails: {
      bank: "First National Bank",
      accountName: "Acme Inc.",
      accountNumber: "1234567890",
      routingNumber: "987654321",
    }
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

  // Calculate days until due
  const daysUntilDue = differenceInDays(invoice.dueDate, new Date());
  
  // Get status icon
  const getStatusIcon = () => {
    switch(invoice.status) {
      case "Paid":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "Overdue":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Invoice {invoice.number}</h1>
            <Badge variant={statusColor[invoice.status]}>
              {invoice.status}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            {invoice.status === "Draft" && (
              <Button size="sm">
                <Send className="mr-2 h-4 w-4" />
                Send Invoice
              </Button>
            )}
            {invoice.status === "Sent" && (
              <Button size="sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Paid
              </Button>
            )}
          </div>
        </div>
        
        {/* Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold">{invoice.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-lg font-semibold">{format(invoice.dueDate, 'MMM d, yyyy')}</p>
                  {daysUntilDue > 0 ? (
                    <p className="text-xs text-muted-foreground">{daysUntilDue} days remaining</p>
                  ) : (
                    <p className="text-xs text-destructive">{Math.abs(daysUntilDue)} days overdue</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">$</div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-semibold">{formatCurrency(invoice.total)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Invoice Document */}
        <Card className="border-2">
          <CardContent className="p-6 sm:p-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-primary">INVOICE</h1>
                <p className="text-xl font-medium mt-1">{invoice.number}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">Your Company Name</p>
                <p className="text-muted-foreground">123 Your Street</p>
                <p className="text-muted-foreground">Your City, ST 12345</p>
                <p className="text-muted-foreground">contact@yourcompany.com</p>
                <p className="text-muted-foreground">+1 (555) 987-6543</p>
              </div>
            </div>
            
            {/* Invoice Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="p-4 bg-muted/20 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
                <p className="font-medium">{invoice.customer.company}</p>
                <p>{invoice.customer.name}</p>
                <p>{invoice.customer.address}</p>
                <p>{invoice.customer.email}</p>
                <p>{invoice.customer.phone}</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Invoice Details:</h2>
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <p className="font-medium">Invoice Number:</p>
                    <p>{invoice.number}</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p className="font-medium">Issue Date:</p>
                    <p>{format(invoice.issueDate, 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p className="font-medium">Due Date:</p>
                    <p>{format(invoice.dueDate, 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p className="font-medium">Status:</p>
                    <Badge variant={statusColor[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Invoice Items */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-6">Project</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                
                <div className="divide-y">
                  {invoice.projects.map((project) => (
                    <div key={project.id} className="grid grid-cols-12 gap-2 p-4 hover:bg-muted/20">
                      <div className="col-span-6 font-medium">{project.title}</div>
                      <div className="col-span-4 text-muted-foreground">{project.description}</div>
                      <div className="col-span-2 text-right">{formatCurrency(project.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Invoice Summary */}
            <div className="flex flex-col items-end mb-10">
              <div className="w-full sm:w-72 p-4 bg-muted/20 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal:</p>
                  <p>{formatCurrency(invoice.subtotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax (0%):</p>
                  <p>{formatCurrency(invoice.tax)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total:</p>
                  <p>{formatCurrency(invoice.total)}</p>
                </div>
              </div>
            </div>
            
            {/* Notes and Payment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-muted/20 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Notes</h2>
                <p className="text-muted-foreground">{invoice.notes}</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
                <div className="space-y-1">
                  <p><span className="font-medium">Bank:</span> {invoice.paymentDetails.bank}</p>
                  <p><span className="font-medium">Account Name:</span> {invoice.paymentDetails.accountName}</p>
                  <p><span className="font-medium">Account Number:</span> {invoice.paymentDetails.accountNumber}</p>
                  <p><span className="font-medium">Routing Number:</span> {invoice.paymentDetails.routingNumber}</p>
                </div>
              </div>
            </div>
            
            {/* Thank You */}
            <div className="mt-10 text-center p-4 bg-primary/10 rounded-lg">
              <p className="font-medium">Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment History */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Payment History</h2>
            {invoice.status === "Paid" ? (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-3">Date</div>
                  <div className="col-span-3">Transaction ID</div>
                  <div className="col-span-4">Method</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                <div className="p-4 grid grid-cols-12 gap-2">
                  <div className="col-span-3">{format(new Date(), 'MMM d, yyyy')}</div>
                  <div className="col-span-3">TRX-{Math.floor(Math.random() * 1000000)}</div>
                  <div className="col-span-4">Bank Transfer</div>
                  <div className="col-span-2 text-right">{formatCurrency(invoice.total)}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No payment records found for this invoice.</p>
                {invoice.status === "Sent" && (
                  <Button variant="outline" className="mt-4">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}