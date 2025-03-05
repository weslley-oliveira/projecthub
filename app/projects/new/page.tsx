"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ArrowLeft, Briefcase, MapPin, Phone, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { AddressDialog } from "@/components/address/address-dialog";
import { Contact, WorkforceType, Project } from "@/app/types/project";
import { CustomerAddress } from "@/app/types/customer";

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Estados
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [workforceDialogOpen, setWorkforceDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [projectAddress, setProjectAddress] = useState<CustomerAddress>({
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
  
  // Função para abrir diálogo de contato
  const openContactDialog = () => {
    setContactDialogOpen(true);
  };
  
  // Função para abrir diálogo de mão de obra
  const openWorkforceDialog = () => {
    setWorkforceDialogOpen(true);
  };
  
  // Função para salvar contato
  const saveProjectContact = () => {
    const name = (document.getElementById('contact-name') as HTMLInputElement)?.value;
    const phone = (document.getElementById('contact-phone') as HTMLInputElement)?.value;
    
    if (name && phone) {
      setProjectContact({ name, phone });
      
      toast({
        title: "Contato adicionado",
        description: "O contato foi adicionado ao projeto.",
      });
      
      setContactDialogOpen(false);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
    }
  };
  
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
  
  // Função para salvar seleção de mão de obra
  const saveWorkforceSelection = () => {
    toast({
      title: "Mão de obra selecionada",
      description: "A seleção de mão de obra foi salva com sucesso.",
    });
    
    setWorkforceDialogOpen(false);
  };
  
  // Função para criar novo projeto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const startTime = formData.get("startTime") as string;
    const contactName = formData.get("contactName") as string;
    const contactPhone = formData.get("contactPhone") as string;

    try {
      // Criar objeto do projeto
      const newProject = {
        title,
        description,
        dueDate,
        startTime,
        contact: contactName && contactPhone ? {
          name: contactName,
          phone: contactPhone
        } as Contact : undefined,
        address: projectAddress
      };

      // Enviar para a API
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

      // Redirecionar para a página do projeto
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
      <div className="space-y-6">
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
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Fill in the details to create a new project.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-8">
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
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
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
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href="/projects">Cancel</Link>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      {/* Diálogo de Contato */}
      <Dialog 
        open={contactDialogOpen} 
        onOpenChange={(open) => setContactDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Registration</DialogTitle>
            <DialogDescription>
              Add a contact for the new project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input 
                id="contact-name" 
                placeholder="Enter contact name" 
                defaultValue={projectContact?.name || ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input 
                id="contact-phone" 
                placeholder="Enter contact phone" 
                defaultValue={projectContact?.phone || ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProjectContact}>Save Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de Mão de Obra */}
      <Dialog 
        open={workforceDialogOpen} 
        onOpenChange={(open) => setWorkforceDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Workforce Selection</DialogTitle>
            <DialogDescription>
              Select the types of workforce and their quantities needed for the project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {workforce.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <Label className="text-base font-medium">{item.type}</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateWorkforceQuantity(item.type, "decrease")}
                    disabled={item.quantity === 0}
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

            <div className="mt-2 p-3 border rounded-md bg-muted/50">
              <p className="text-sm font-medium">Workforce Summary:</p>
              {workforce.filter(item => item.quantity > 0).map(item => (
                <p key={item.type} className="text-sm">
                  {item.type}: {item.quantity} {item.quantity === 1 ? 'person' : 'people'}
                </p>
              ))}
              {workforce.every(item => item.quantity === 0) && (
                <p className="text-sm text-muted-foreground">No workforce selected</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkforceDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveWorkforceSelection}>Save Selection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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