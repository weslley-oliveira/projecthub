"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { ArrowLeft, Plus, Minus, Users } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { AddressDialog } from "@/components/address/address-dialog";
import { Contact, WorkforceType, ProjectRequirements } from "@/app/types/project";
import { Address } from "@/app/types/common";

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Estados
  const [currentStep, setCurrentStep] = useState(1);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  
  // Calcular data e horário padrão (amanhã às 08:00)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];
  const defaultTime = "08:00";
  
  const [dueDate, setDueDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState(defaultTime);
  
  const [projectAddress, setProjectAddress] = useState<Address>({
    street: "",
    number: "",
    complement: "",
    city: "",
    postcode: "",
    country: ""
  });
  const [projectContact, setProjectContact] = useState<Contact | undefined>(undefined);
  const [workforce, setWorkforce] = useState<WorkforceType[]>([
    { type: "Fitter", quantity: 0 },
    { type: "Porter", quantity: 0 },
    { type: "Driver", quantity: 0 },
    { type: "Supervisor", quantity: 0 }
  ]);
  const [loading, setLoading] = useState(false);
  
  const [projectRequirements, setProjectRequirements] = useState<ProjectRequirements>({
    cscsCard: false,
    fullPPE: false,
    additionalRequirements: []
  });

  const [newRequirement, setNewRequirement] = useState("");

  // Função para atualizar quantidade de mão de obra
  const updateWorkforceQuantity = (type: WorkforceType["type"], action: "increase" | "decrease") => {
    setWorkforce(prev => 
      prev.map(item => {
        if (item.type === type) {
          const newQuantity = action === "increase" 
            ? item.quantity + 1 
            : Math.max(0, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Função para validar e avançar para próxima etapa
  const handleNextStep = () => {
    setCurrentStep(2);
  };

  // Função para voltar etapa
  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };
  
  // Função para adicionar requisito adicional
  const addRequirement = () => {
    if (newRequirement.trim()) {
      setProjectRequirements(prev => ({
        ...prev,
        additionalRequirements: [...(prev.additionalRequirements || []), newRequirement.trim()]
      }));
      setNewRequirement("");
    }
  };

  // Função para remover requisito adicional
  const removeRequirement = (index: number) => {
    setProjectRequirements(prev => ({
      ...prev,
      additionalRequirements: prev.additionalRequirements?.filter((_, i) => i !== index) || []
    }));
  };

  // Função para criar novo projeto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const contactName = formData.get("contactName") as string;
    const contactPhone = formData.get("contactPhone") as string;

    try {
      const newProject = {
        title,
        description,
        dueDate,
        startTime,
        contact: contactName && contactPhone ? {
          name: contactName,
          phone: contactPhone
        } as Contact : undefined,
        address: projectAddress,
        workforce: workforce.filter(item => item.quantity > 0),
        requirements: projectRequirements
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      router.push(`/projects/${data.project.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">New Project</h1>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 ? "Workforce Selection" : "Project Information"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 
                  ? "Select the types and quantities of workforce needed for the project."
                  : "Fill in the project details."}
              </CardDescription>
            </CardHeader>

            {currentStep === 1 ? (
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {workforce.map((item) => (
                    <div key={item.type} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">{item.type}</Label>
                        <p className="text-sm text-muted-foreground">
                          Current quantity: {item.quantity} {item.quantity === 1 ? 'person' : 'people'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateWorkforceQuantity(item.type, "decrease")}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateWorkforceQuantity(item.type, "increase")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <CardFooter className="flex justify-end gap-2">
                  <Link href="/projects">Cancel</Link>
                  <Button onClick={handleNextStep}>
                    Next
                  </Button>
                </CardFooter>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter project title"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter project description"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={defaultDate}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          name="contactName"
                          placeholder="Enter contact name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          placeholder="Enter contact phone"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Address</h3>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsAddressDialogOpen(true)}
                    >
                      {projectAddress.street ? "Edit Address" : "Add Address"}
                    </Button>
                    {projectAddress.street && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {projectAddress.street}, {projectAddress.number}
                        {projectAddress.complement && ` - ${projectAddress.complement}`}
                        <br />
                        {projectAddress.city}
                        <br />
                        {projectAddress.postcode} - {projectAddress.country}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Requirements</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cscsCard"
                          checked={projectRequirements.cscsCard}
                          onCheckedChange={(checked) => 
                            setProjectRequirements(prev => ({ ...prev, cscsCard: checked as boolean }))
                          }
                        />
                        <Label htmlFor="cscsCard">CSCS Card Required</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fullPPE"
                          checked={projectRequirements.fullPPE}
                          onCheckedChange={(checked) => 
                            setProjectRequirements(prev => ({ ...prev, fullPPE: checked as boolean }))
                          }
                        />
                        <Label htmlFor="fullPPE">Full PPE Required</Label>
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Requirements</Label>
                        <div className="flex gap-2">
                          <Input
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            placeholder="Add new requirement"
                          />
                          <Button type="button" onClick={addRequirement}>
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {projectRequirements.additionalRequirements?.map((req, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                              <span>{req}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeRequirement(index)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Project"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Workforce Summary
              </CardTitle>
              <CardDescription>
                Total number of people selected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workforce.map((item) => (
                  item.quantity > 0 && (
                    <div key={item.type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{item.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.quantity === 1 ? 'person' : 'people'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateWorkforceQuantity(item.type, "decrease")}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateWorkforceQuantity(item.type, "increase")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                ))}
                {workforce.every(item => item.quantity === 0) && (
                  <div className="p-3 text-center text-sm text-muted-foreground">
                    No workforce selected
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm font-medium">Total:</p>
              <p className="text-lg font-bold">
                {workforce.reduce((acc, item) => acc + item.quantity, 0)} people
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <AddressDialog
        open={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
        address={projectAddress}
        onAddressChange={setProjectAddress}
        onSave={() => setIsAddressDialogOpen(false)}
      />
    </DashboardLayout>
  );
}