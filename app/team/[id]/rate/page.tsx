"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/dashboard/layout';
import { TeamMember } from '@/app/types/team';
import { Rate } from '@/app/types/common';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

type PageProps = {
  params: Promise<{ id: string }>;
};

interface TimeSlot {
  startTime: string;
  endTime: string;
  rate: number;
}

interface DayRates {
  [key: string]: TimeSlot[];
}

export default function RatePage({ params }: PageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = use(params);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [rates, setRates] = useState<DayRates>({
    weekdays: [{ startTime: '', endTime: '', rate: 0 }],
    saturday: [{ startTime: '', endTime: '', rate: 0 }],
    sunday: [{ startTime: '', endTime: '', rate: 0 }]
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/team/${id}`);
        if (!response.ok) throw new Error('Failed to fetch member');
        const data = await response.json();
        setMember(data);
        
        // Busca as taxas do membro
        const rateResponse = await fetch(`/api/team/${id}/rate`);
        if (rateResponse.ok) {
          const rateData = await rateResponse.json();
          if (rateData && rateData.rates) {
            const formattedRates: DayRates = {
              weekdays: Object.entries(rateData.rates.weekdays).map(([time, rate]) => {
                const [start, end] = time.split('-');
                return { startTime: start, endTime: end, rate: rate as number };
              }),
              saturday: Object.entries(rateData.rates.saturday).map(([time, rate]) => {
                const [start, end] = time.split('-');
                return { startTime: start, endTime: end, rate: rate as number };
              }),
              sunday: Object.entries(rateData.rates.sunday).map(([time, rate]) => {
                const [start, end] = time.split('-');
                return { startTime: start, endTime: end, rate: rate as number };
              })
            };
            setRates(formattedRates);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to load member data",
          variant: "destructive"
        });
      }
    };

    fetchMember();
  }, [id, toast]);

  const addTimeSlot = (day: keyof DayRates) => {
    setRates(prev => ({
      ...prev,
      [day]: [...prev[day], { startTime: '', endTime: '', rate: 0 }]
    }));
  };

  const removeTimeSlot = async (day: keyof DayRates, index: number) => {
    try {
      // Remove do estado local primeiro
      const newRates = {
        ...rates,
        [day]: rates[day].filter((_, i) => i !== index)
      };
      setRates(newRates);

      // Formata os dados para salvar no banco
      const formattedRate: Rate = {
        weekdays: newRates.weekdays.reduce((acc, { startTime, endTime, rate }) => {
          if (startTime && endTime) {
            acc[`${startTime}-${endTime}`] = rate;
          }
          return acc;
        }, {} as { [key: string]: number }),
        saturday: newRates.saturday.reduce((acc, { startTime, endTime, rate }) => {
          if (startTime && endTime) {
            acc[`${startTime}-${endTime}`] = rate;
          }
          return acc;
        }, {} as { [key: string]: number }),
        sunday: newRates.sunday.reduce((acc, { startTime, endTime, rate }) => {
          if (startTime && endTime) {
            acc[`${startTime}-${endTime}`] = rate;
          }
          return acc;
        }, {} as { [key: string]: number })
      };

      // Atualiza no banco de dados
      const response = await fetch(`/api/team/${id}/rate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rates: formattedRate })
      });

      if (!response.ok) {
        throw new Error('Failed to update rates');
      }

      toast({
        title: "Success",
        description: "Rate removed successfully"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to remove rate",
        variant: "destructive"
      });
      
      // Se falhar, reverte o estado local
      setRates(prev => ({
        ...prev,
        [day]: prev[day]
      }));
    }
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
    try {
      const formattedRate: Rate = {
        weekdays: rates.weekdays.reduce((acc, { startTime, endTime, rate }) => {
          if (startTime && endTime) {
            acc[`${startTime}-${endTime}`] = rate;
          }
          return acc;
        }, {} as { [key: string]: number }),
        saturday: rates.saturday.reduce((acc, { startTime, endTime, rate }) => {
          if (startTime && endTime) {
            acc[`${startTime}-${endTime}`] = rate;
          }
          return acc;
        }, {} as { [key: string]: number }),
        sunday: rates.sunday.reduce((acc, { startTime, endTime, rate }) => {
          if (startTime && endTime) {
            acc[`${startTime}-${endTime}`] = rate;
          }
          return acc;
        }, {} as { [key: string]: number })
      };

      console.log('Dados formatados para envio:', { rates: formattedRate });

      const response = await fetch(`/api/team/${id}/rate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rates: formattedRate })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        throw new Error('Failed to update rates');
      }

      toast({
        title: "Success",
        description: "Rates updated successfully"
      });

      router.push(`/team/${id}`);
    } catch (error) {
      console.error('Error completo:', error);
      toast({
        title: "Error",
        description: "Failed to update rates",
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
              <Label>Start Time</Label>
              <Input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateTimeSlot(day, index, 'startTime', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateTimeSlot(day, index, 'endTime', e.target.value)}
              />
            </div>
          </div>
          <div className="w-32">
            <Label>Rate (£)</Label>
            <Input
              type="number"
              value={slot.rate}
              onChange={(e) => updateTimeSlot(day, index, 'rate', parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeTimeSlot(day, index)}
            className="mt-6"
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
        Add Time Slot
      </Button>
    </div>
  );

  if (!member) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Manage Rates</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rate Settings for {member.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekdays" className="space-y-4">
              <TabsList>
                <TabsTrigger value="weekdays">Weekdays</TabsTrigger>
                <TabsTrigger value="saturday">Saturday</TabsTrigger>
                <TabsTrigger value="sunday">Sunday</TabsTrigger>
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
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}