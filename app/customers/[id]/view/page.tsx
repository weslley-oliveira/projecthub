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
  Eye
} from "lucide-react";
import Link from "next/link";
import { Customer } from "@/app/data/customers/mockCustomers";

export default function CustomerViewPage() {
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
      if (!response.ok) throw new Error("Erro ao buscar detalhes do cliente");
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Carregando...</p>
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
            <p className="text-muted-foreground">Cliente não encontrado</p>
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
              Voltar para Detalhes do Cliente
            </Button>
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{customer.name}</h1>
              <p className="text-muted-foreground">{customer.company}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                {customer.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
              <CardDescription>
                Detalhes de contato e informações básicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{customer.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Cliente desde {new Date(customer.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
              <CardDescription>
                Informações sobre gastos e projetos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gasto</p>
                    <p className="text-2xl font-bold">£{customer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Projetos</p>
                    <p className="text-2xl font-bold">{customer.projects}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Taxas */}
          {customer.rate && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Taxas Atuais</CardTitle>
                <CardDescription>
                  Taxas por período do dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Dias Úteis */}
                  <div>
                    <h3 className="font-medium mb-2">Dias Úteis</h3>
                    <div className="space-y-2">
                      {Object.entries(customer.rate.weekdays).map(([time, rate]) => (
                        <div key={time} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{time}</span>
                          <span className="font-medium">£{rate.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sábado */}
                  <div>
                    <h3 className="font-medium mb-2">Sábado</h3>
                    <div className="space-y-2">
                      {Object.entries(customer.rate.saturday).map(([time, rate]) => (
                        <div key={time} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{time}</span>
                          <span className="font-medium">£{rate.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Domingo */}
                  <div>
                    <h3 className="font-medium mb-2">Domingo</h3>
                    <div className="space-y-2">
                      {Object.entries(customer.rate.sunday).map(([time, rate]) => (
                        <div key={time} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{time}</span>
                          <span className="font-medium">£{rate.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 