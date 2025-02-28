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
import { Address } from "@/components/ui/address";
import { Contact, WorkforceType, AddressData } from "@/app/types/project";

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Estados
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [workforceDialogOpen, setWorkforceDialogOpen] = useState(false);
  const [projectAddress, setProjectAddress] = useState<AddressData | undefined>(undefined);
  const [projectContact, setProjectContact] = useState<Contact | undefined>(undefined);
  const [workforce, setWorkforce] = useState<WorkforceType[]>([
    { type: "Fitter", quantity: 0 },
    { type: "Porter", quantity: 0 },
    { type: "Driver", quantity: 0 },
    { type: "Supervisor", quantity: 0 }
  ]);
  
  // Função para abrir diálogo de endereço
  const openAddressDialog = () => {
    setAddressDialogOpen(true);
  };
  
  // Função para abrir diálogo de contato
  const openContactDialog = () => {
    setContactDialogOpen(true);
  };
  
  // Função para abrir diálogo de mão de obra
  const openWorkforceDialog = () => {
    setWorkforceDialogOpen(true);
  };
  
  // Função para salvar endereço
  const saveProjectAddress = () => {
    toast({
      title: "Endereço adicionado",
      description: "O endereço foi adicionado ao projeto.",
    });
    
    setAddressDialogOpen(false);
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
  const createProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Aqui você implementaria a lógica para salvar o projeto
    // Por enquanto, apenas mostraremos um toast e redirecionaremos
    
    toast({
      title: "Projeto criado",
      description: "O novo projeto foi criado com sucesso.",
    });
    
    // Redirecionar para a lista de projetos
    router.push("/projects");
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
          <form onSubmit={createProject}>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" placeholder="Enter project name" required />
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
                  <Input id="dueDate" name="dueDate" type="date" required />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input 
                    id="startTime" 
                    name="startTime" 
                    type="time" 
                    defaultValue="08:00" 
                    required 
                  />
                  <p className="text-xs text-muted-foreground">Work has a minimum duration of 8 hours</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="self-start flex items-center gap-2"
                    onClick={openWorkforceDialog}
                  >
                    <Briefcase className="h-4 w-4" />
                    {workforce.some(item => item.quantity > 0) 
                      ? "Edit Workforce" 
                      : "Add Workforce"}
                  </Button>
                  
                  {workforce.some(item => item.quantity > 0) && (
                    <div className="px-3 py-1 bg-muted rounded-md text-sm">
                      {workforce.filter(item => item.quantity > 0).map((item, index, arr) => (
                        <span key={item.type}>
                          {item.type}: {item.quantity}
                          {index < arr.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Project Address</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={openAddressDialog}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      {projectAddress ? "Edit Address" : "Add Address"}
                    </Button>
                  </div>
                  
                  {projectAddress && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium">Registered Address:</p>
                      <p className="text-sm">{projectAddress.street}, {projectAddress.number}</p>
                      <p className="text-sm">{projectAddress.neighborhood} - {projectAddress.city}/{projectAddress.state}</p>
                      <p className="text-sm">CEP: {projectAddress.zipCode}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Project Contact</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={openContactDialog}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {projectContact ? "Edit Contact" : "Add Contact"}
                    </Button>
                  </div>
                  
                  {projectContact && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium">Registered Contact:</p>
                      <p className="text-sm">Name: {projectContact.name}</p>
                      <p className="text-sm">Phone: {projectContact.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href="/projects">Cancel</Link>
              <Button type="submit">Create Project</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      {/* Diálogo de Endereço */}
      <Dialog 
        open={addressDialogOpen} 
        onOpenChange={(open) => setAddressDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Address Registration</DialogTitle>
            <DialogDescription>
              Add an address for the new project
            </DialogDescription>
          </DialogHeader>
          <Address 
            onAddressChange={setProjectAddress}
            defaultValues={projectAddress}
            className="py-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProjectAddress}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
    </DashboardLayout>
  );
}