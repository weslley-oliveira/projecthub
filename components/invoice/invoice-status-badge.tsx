import { Badge } from "@/components/ui/badge";

type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const statusColor = {
    Draft: "secondary",
    Sent: "default",
    Paid: "success",
    Overdue: "destructive",
  } as const;

  return (
    <Badge variant={statusColor[status]}>
      {status}
    </Badge>
  );
}