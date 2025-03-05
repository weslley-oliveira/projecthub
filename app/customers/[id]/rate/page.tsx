"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/app/types/customer";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface TimeSlot {
  startTime: string;
  endTime: string;
  rate: number;
}

interface DayRates {
  [key: string]: TimeSlot[];
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function CustomerRatePage({ params }: PageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = use(params);
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
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`/api/customers/${id}`);
        if (!response.ok) throw new Error("Error fetching customer details");
        const data = await response.json();
        setCustomer(data);
        if (data.rate) {
          // Convert rate data to TimeSlot format
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
        console.error("Error fetching customer details:", error);
        toast({
          title: "Error",
          description: "Failed to load customer data",
          variant: "destructive"
        });
      }
    };

    fetchCustomerDetails();
  }, [id, toast]);

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

    const formattedRate = {
      weekdays: formatRates(rates.weekdays),
      saturday: formatRates(rates.saturday),
      sunday: formatRates(rates.sunday)
    };

    try {
      const response = await fetch(`/api/customers/${id}/rate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rate: formattedRate }),
      });

      if (!response.ok) throw new Error("Error saving rates");
      
      toast({
        title: "Success",
        description: "Rates updated successfully",
      });

      router.push(`/customers/${id}`);
    } catch (error) {
      console.error("Error saving rates:", error);
      toast({
        title: "Error",
        description: "Error saving rates",
        variant: "destructive",
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
                placeholder="Start Time"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateTimeSlot(day, index, 'endTime', e.target.value)}
                placeholder="End Time"
              />
            </div>
          </div>
          <div className="w-32">
            <Input
              type="number"
              value={slot.rate}
              onChange={(e) => updateTimeSlot(day, index, 'rate', parseFloat(e.target.value))}
              placeholder="Rate (£)"
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
        Add Time Slot
      </Button>
    </div>
  );

  if (!customer) {
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
            <CardTitle>Rate Settings for {customer.name}</CardTitle>
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