"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Printer, 
  Send 
} from "lucide-react";
import { format, addDays } from "date-fns";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  // Handle send invoice
  const handleSendInvoice = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Invoice sent",
        description: `Invoice ${invoice.number} has been sent to ${invoice.customer.email}`,
      });
    }, 1500);
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
            <Button size="sm" onClick={handleSendInvoice} disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? "Sending..." : "Send Invoice"}
            </Button>
          </div>
        </div>
        
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
              <div>
                <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
                <p className="font-medium">{invoice.customer.company}</p>
                <p>{invoice.customer.name}</p>
                <p>{invoice.customer.address}</p>
                <p>{invoice.customer.email}</p>
                <p>{invoice.customer.phone}</p>
              </div>
              <div className="sm:text-right">
                <div className="space-y-1">
                  <div className="flex justify-between sm:justify-end gap-4">
                    <p className="font-medium">Invoice Date:</p>
                    <p>{format(invoice.issueDate, 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-4">
                    <p className="font-medium">Due Date:</p>
                    <p>{format(invoice.dueDate, 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-4">
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
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-6">Project</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                
                <div className="divide-y">
                  {invoice.projects.map((project) => (
                    <div key={project.id} className="grid grid-cols-12 gap-2 p-4">
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
              <div className="w-full sm:w-72 space-y-2">
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
              <div>
                <h2 className="text-lg font-semibold mb-2">Notes</h2>
                <p className="text-muted-foreground">{invoice.notes}</p>
              </div>
               <div>
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
            <div className="mt-10 text-center">
              <p className="font-medium">Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}