"use client";

import { useState, useEffect } from "react";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowLeft, Briefcase, MapPin, Phone, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/components/ui/address";
import { TeamMember, Contact, WorkforceType, Project, AddressData } from "@/app/types/project";

// Mock data para simular a busca de um projeto pelo ID
const getMockProject = (id: string): Project => {
  return {
    id,
    title: `Projeto ${id}`,
    description: "Descrição detalhada do projeto que está sendo editado.",
    progress: 45,
    dueDate: "2023-12-31",
    status: "In Progress",
    startTime: "08:00",
    team: [],
    address: {
      street: "Rua Exemplo",
      number: "123",
      complement: "Apto 101",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01001-000",
      country: "Brasil"
    },
    contact: {
      name: "João Silva",
      phone: "(11) 98765-4321"
    },
    workforce: [
      { type: "Fitter", quantity: 2 },
      { type: "Porter", quantity: 1 },
      { type: "Driver", quantity: 1 },
      { type: "Supervisor", quantity: 1 }
    ]
  };
};

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  
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
  
  // Carregar dados do projeto
  useEffect(() => {
    // Em um cenário real, você buscaria os dados do projeto de uma API
    const loadedProject = getMockProject(params.id);
    setProject(loadedProject);
    
    // Inicializar estados com os dados do projeto
    if (loadedProject.address) {
      setProjectAddress(loadedProject.address);
    }
    
    if (loadedProject.contact) {
      setProjectContact(loadedProject.contact);
    }
    
    if (loadedProject.workforce) {
      // Mesclar a mão de obra do projeto com o estado inicial
      const updatedWorkforce = workforce.map(item => {
        const projectItem = loadedProject.workforce?.find(w => w.type === item.type);
        return projectItem ? projectItem : item;
      });
      setWorkforce(updatedWorkforce);
    }
  }, [params.id]);
  
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
    if (project) {
      setProject({
        ...project,
        address: projectAddress
      });
      
      toast({
        title: "Endereço atualizado",
        description: "O endereço do projeto foi atualizado com sucesso.",
      });
      
      setAddressDialogOpen(false);
    }
  };
  
  // Função para salvar contato
  const saveProjectContact = () => {
    const name = (document.getElementById('contact-name') as HTMLInputElement)?.value;
    const phone = (document.getElementById('contact-phone') as HTMLInputElement)?.value;
    
    if (project && name && phone) {
      const contact = { name, phone };
      setProjectContact(contact);
      
      setProject({
        ...project,
        contact
      });
      
      toast({
        title: "Contato atualizado",
        description: "O contato do projeto foi atualizado com sucesso.",
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
    if (project) {
      setProject({
        ...project,
        workforce: workforce.filter(item => item.quantity > 0)
      });
      
      toast({
        title: "Mão de obra atualizada",
        description: "A seleção de mão de obra foi atualizada com sucesso.",
      });
      
      setWorkforceDialogOpen(false);
    }
  };
  
  // Função para atualizar projeto
  const updateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    if (project) {
      const updatedProject: Project = {
        ...project,
        title: formData.get("name") as string,
        description: formData.get("description") as string,
        dueDate: formData.get("dueDate") as string,
        status: formData.get("status") as Project["status"],
        startTime: formData.get("startTime") as string,
      };
      
      // Aqui você implementaria a lógica para salvar o projeto atualizado
      // Por enquanto, apenas mostraremos um toast e redirecionaremos
      
      toast({
        title: "Projeto atualizado",
        description: "O projeto foi atualizado com sucesso.",
      });
      
      // Redirecionar para a página de detalhes do projeto
      router.push(`/projects/${params.id}`);
    }
  };
  
  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p>Carregando projeto...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/projects/${params.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Editar Projeto</h1>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
            <CardDescription>
              Atualize os detalhes do projeto.
            </CardDescription>
          </CardHeader>
          <form onSubmit={updateProject}>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Projeto</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Digite o nome do projeto" 
                    defaultValue={project.title}
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Digite a descrição do projeto" 
                    defaultValue={project.description}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={project.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pendente</SelectItem>
                        <SelectItem value="Confirmed">Confirmado</SelectItem>
                        <SelectItem value="In Progress">Em Andamento</SelectItem>
                        <SelectItem value="Completed">Concluído</SelectItem>
                        <SelectItem value="Canceled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Data de Entrega</Label>
                    <Input 
                      id="dueDate" 
                      name="dueDate" 
                      type="date" 
                      defaultValue={project.dueDate}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <Input 
                    id="startTime" 
                    name="startTime" 
                    type="time" 
                    defaultValue={project.startTime} 
                    required 
                  />
                  <p className="text-xs text-muted-foreground">Os trabalhos têm duração mínima de 8 horas</p>
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
                    Editar Mão de Obra
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
                    <Label>Endereço do Projeto</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={openAddressDialog}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      {projectAddress ? "Editar Endereço" : "Adicionar Endereço"}
                    </Button>
                  </div>
                  
                  {projectAddress && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium">Endereço cadastrado:</p>
                      <p className="text-sm">{projectAddress.street}, {projectAddress.number}</p>
                      <p className="text-sm">{projectAddress.neighborhood} - {projectAddress.city}/{projectAddress.state}</p>
                      <p className="text-sm">CEP: {projectAddress.zipCode}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Contato do Projeto</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={openContactDialog}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {projectContact ? "Editar Contato" : "Adicionar Contato"}
                    </Button>
                  </div>
                  
                  {projectContact && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium">Contato cadastrado:</p>
                      <p className="text-sm">Nome: {projectContact.name}</p>
                      <p className="text-sm">Telefone: {projectContact.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href={`/projects/${params.id}`}>Cancelar</Link>
              </Button>
              <Button type="submit">Salvar Alterações</Button>
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
            <DialogTitle>Cadastro de Endereço</DialogTitle>
            <DialogDescription>
              Atualize o endereço do projeto
            </DialogDescription>
          </DialogHeader>
          <Address 
            onAddressChange={setProjectAddress}
            defaultValues={projectAddress}
            className="py-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveProjectAddress}>Salvar Endereço</Button>
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
            <DialogTitle>Cadastro de Contato</DialogTitle>
            <DialogDescription>
              Atualize o contato do projeto
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Nome</Label>
              <Input 
                id="contact-name" 
                placeholder="Digite o nome do contato" 
                defaultValue={projectContact?.name || ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-phone">Telefone</Label>
              <Input 
                id="contact-phone" 
                placeholder="Digite o telefone do contato" 
                defaultValue={projectContact?.phone || ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveProjectContact}>Salvar Contato</Button>
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
            <DialogTitle>Seleção de Mão de Obra</DialogTitle>
            <DialogDescription>
              Atualize os tipos de mão de obra e suas quantidades necessárias para o projeto.
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
              <p className="text-sm font-medium">Resumo da mão de obra:</p>
              {workforce.filter(item => item.quantity > 0).map(item => (
                <p key={item.type} className="text-sm">
                  {item.type}: {item.quantity} {item.quantity === 1 ? 'pessoa' : 'pessoas'}
                </p>
              ))}
              {workforce.every(item => item.quantity === 0) && (
                <p className="text-sm text-muted-foreground">Nenhuma mão de obra selecionada</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkforceDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveWorkforceSelection}>Salvar Seleção</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
} 