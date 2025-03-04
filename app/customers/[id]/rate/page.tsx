"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Customer, Rate } from "@/app/data/customers/mockCustomers";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";

interface TimeSlot {
  startTime: string;
  endTime: string;
  rate: number;
}

interface DayRates {
  [key: string]: TimeSlot[];
}

export default function RatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [rates, setRates] = useState<DayRates>(() => {
    const defaultRates = {
      weekdays: [
        { startTime: "06:00", endTime: "08:00", rate: 11.00 },
        { startTime: "08:00", endTime: "18:00", rate: 11.00 },
        { startTime: "18:00", endTime: "22:00", rate: 15.00 },
        { startTime: "22:00", endTime: "06:00", rate: 17.00 }
      ],
      saturday: [
        { startTime: "08:00", endTime: "22:00", rate: 15.00 },
        { startTime: "22:00", endTime: "08:00", rate: 17.00 }
      ],
      sunday: [
        { startTime: "00:00", endTime: "23:59", rate: 17.00 }
      ]
    };
    return defaultRates;
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do cliente');
        const data = await response.json();
        setCustomer(data);
        if (data.rate) {
          // Converter dados de rate para formato TimeSlot
          const convertedRates: DayRates = {
            weekdays: Object.entries(data.rate.weekdays).map(([time, rate]) => ({
              startTime: time.split('-')[0],
              endTime: time.split('-')[1],
              rate: rate as number
            })),
            saturday: Object.entries(data.rate.saturday).map(([time, rate]) => ({
              startTime: time.split('-')[0],
              endTime: time.split('-')[1],
              rate: rate as number
            })),
            sunday: Object.entries(data.rate.sunday).map(([time, rate]) => ({
              startTime: time.split('-')[0],
              endTime: time.split('-')[1],
              rate: rate as number
            }))
          };
          setRates(convertedRates);
        }
      } catch (error) {
        console.error('Erro:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do cliente",
          variant: "destructive"
        });
      }
    };

    fetchCustomer();
  }, [params.id, toast]);

  const addTimeSlot = (day: keyof DayRates) => {
    setRates(prev => ({
      ...prev,
      [day]: [...prev[day], { startTime: "", endTime: "", rate: 0 }]
    }));
  };

  const removeTimeSlot = (day: keyof DayRates, index: number) => {
    setRates(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const updateTimeSlot = (day: keyof DayRates, index: number, field: keyof TimeSlot, value: string | number) => {
    setRates(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) => {
        if (i === index) {
          return { ...slot, [field]: value };
        }
        return slot;
      })
    }));
  };

  const handleSave = async () => {
    if (!customer) return;

    const formatRates = (slots: TimeSlot[]) => {
      return slots.reduce((acc, { startTime, endTime, rate }) => {
        if (startTime && endTime) {
          acc[`${startTime}-${endTime}`] = rate;
        }
        return acc;
      }, {} as { [key: string]: number });
    };

    const formattedRate: Rate = {
      weekdays: formatRates(rates.weekdays),
      saturday: formatRates(rates.saturday),
      sunday: formatRates(rates.sunday)
    };

    try {
      const response = await fetch(`/api/customers/${params.id}/rate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate: formattedRate })
      });

      if (!response.ok) throw new Error('Erro ao atualizar taxas');

      toast({
        title: "Sucesso",
        description: "Taxas atualizadas com sucesso"
      });

      router.push(`/customers/${params.id}`);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar taxas",
        variant: "destructive"
      });
    }
  };

  const renderTimeSlots = (day: keyof DayRates) => (
    <div className="space-y-4">
      {rates[day].map((slot, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="space-y-2">
              <Input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateTimeSlot(day, index, 'startTime', e.target.value)}
                placeholder="Hora Inicial"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateTimeSlot(day, index, 'endTime', e.target.value)}
                placeholder="Hora Final"
              />
            </div>
          </div>
          <div className="w-32">
            <Input
              type="number"
              value={slot.rate}
              onChange={(e) => updateTimeSlot(day, index, 'rate', parseFloat(e.target.value))}
              placeholder="Taxa (£)"
              min="0"
              step="0.01"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeTimeSlot(day, index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => addTimeSlot(day)}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Horário
      </Button>
    </div>
  );

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p>Carregando...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/customers">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Lista de Clientes
              </Button>
            </Link>
            <Button onClick={() => router.push(`/customers/${params.id}/rate`)}>
              <Edit className="mr-2 h-4 w-4" />
              Gerenciar Taxas
            </Button>
            <Button onClick={() => router.push(`/customers/${params.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar Cliente
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Taxa para {customer.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekdays" className="space-y-4">
              <TabsList>
                <TabsTrigger value="weekdays">Dias Úteis</TabsTrigger>
                <TabsTrigger value="saturday">Sábado</TabsTrigger>
                <TabsTrigger value="sunday">Domingo</TabsTrigger>
              </TabsList>

              <TabsContent value="weekdays" className="space-y-4">
                {renderTimeSlots('weekdays')}
              </TabsContent>

              <TabsContent value="saturday" className="space-y-4">
                {renderTimeSlots('saturday')}
              </TabsContent>

              <TabsContent value="sunday" className="space-y-4">
                {renderTimeSlots('sunday')}
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar Alterações</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 