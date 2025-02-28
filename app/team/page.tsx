"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Filter 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Definir tipos
interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  status: "Active" | "On Leave" | "Unavailable";
  avatar?: string;
  joinDate: string;
}

// Mock data para membros da equipe
const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Project Manager",
      email: "john.doe@example.com",
    phone: "+55 11 98765-4321",
      department: "Management",
      status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    joinDate: "Jan 15, 2022",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      email: "sarah.johnson@example.com",
    phone: "+55 11 91234-5678",
      department: "Design",
      status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    joinDate: "Mar 3, 2022",
    },
    {
      id: "3",
      name: "David Kim",
      role: "Full Stack Developer",
      email: "david.kim@example.com",
    phone: "+55 11 99876-5432",
      department: "Engineering",
      status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    joinDate: "Feb 12, 2022",
    },
    {
      id: "4",
      name: "Maria Garcia",
      role: "Backend Developer",
      email: "maria.garcia@example.com",
    phone: "+55 11 98888-7777",
      department: "Engineering",
      status: "On Leave",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
    joinDate: "Apr 20, 2022",
    },
    {
      id: "5",
      name: "Ana Silva",
      role: "Marketing Specialist",
      email: "ana.silva@example.com",
    phone: "+55 11 97777-8888",
      department: "Marketing",
      status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
    joinDate: "Jun 5, 2022",
    },
    {
      id: "6",
      name: "Michael Johnson",
      role: "Frontend Developer",
      email: "michael.johnson@example.com",
    phone: "+55 11 96666-5555",
      department: "Engineering",
      status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60",
    joinDate: "May 15, 2022",
    },
    {
      id: "7",
      name: "Emily Chen",
      role: "QA Engineer",
      email: "emily.chen@example.com",
    phone: "+55 11 95555-4444",
      department: "Engineering",
      status: "Unavailable",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    joinDate: "Jul 10, 2022",
    },
    {
      id: "8",
      name: "Robert Wilson",
      role: "Product Manager",
      email: "robert.wilson@example.com",
    phone: "+55 11 94444-3333",
      department: "Management",
      status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
    joinDate: "Aug 22, 2022",
  },
];

export default function TeamPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  
  // Filtrar membros com base na pesquisa e filtros
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !filterDepartment || member.department === filterDepartment;
    const matchesStatus = !filterStatus || member.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Obter departamentos únicos para o filtro
  const departments = Array.from(new Set(members.map(member => member.department)));
  
  // Função para abrir o diálogo de adicionar membro
  const openAddMemberDialog = () => {
    setCurrentMember(null);
    setIsAddMemberOpen(true);
  };
  
  // Função para abrir o diálogo de editar membro
  const openEditMemberDialog = (member: TeamMember) => {
    setCurrentMember(member);
    setIsEditMemberOpen(true);
  };
  
  // Função para adicionar um novo membro
  const addMember = () => {
    // Em um cenário real, você enviaria os dados para uma API
    // Por enquanto, apenas fechamos o diálogo e mostramos um toast
    setIsAddMemberOpen(false);
    
    toast({
      title: "Membro adicionado",
      description: "O novo membro foi adicionado com sucesso.",
    });
  };
  
  // Função para editar um membro
  const editMember = () => {
    // Em um cenário real, você enviaria os dados para uma API
    // Por enquanto, apenas fechamos o diálogo e mostramos um toast
    setIsEditMemberOpen(false);
    
    toast({
      title: "Membro atualizado",
      description: "As informações do membro foram atualizadas com sucesso.",
    });
  };
  
  // Função para remover um membro
  const removeMember = (id: string) => {
    // Em um cenário real, você enviaria uma solicitação para uma API
    // Por enquanto, apenas atualizamos o estado local
    setMembers(members.filter(member => member.id !== id));
    
    toast({
      title: "Membro removido",
      description: "O membro foi removido com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Equipe</h1>
            <p className="text-muted-foreground">
              Gerencie os membros da sua equipe e suas funções
            </p>
          </div>
          <Button onClick={openAddMemberDialog}>
                <Plus className="mr-2 h-4 w-4" />
            Adicionar Membro
              </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Membros da Equipe</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os membros da sua equipe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
                  placeholder="Buscar membros..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
              
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Departamento
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterDepartment(null)}>
                      Todos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {departments.map((department) => (
                      <DropdownMenuItem 
                        key={department}
                        onClick={() => setFilterDepartment(department)}
                      >
                        {department}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                      Todos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterStatus("Active")}>
                      Ativo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("On Leave")}>
                      De Licença
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("Unavailable")}>
                      Indisponível
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                    </div>
            </div>
            
            <div className="mt-6 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Membro</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead className="hidden md:table-cell">Departamento</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Data de Entrada</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum membro encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                    <div className="flex items-center gap-3">
                            <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                                {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell className="hidden md:table-cell">{member.department}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge 
                            variant={
                              member.status === "Active" 
                                ? "default" 
                                : member.status === "On Leave" 
                                  ? "secondary" 
                                  : "outline"
                            }
                          >
                      {member.status}
                    </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{member.joinDate}</TableCell>
                        <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => openEditMemberDialog(member)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                Ligar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => removeMember(member.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Diálogo para adicionar membro */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Membro</DialogTitle>
            <DialogDescription>
              Preencha as informações para adicionar um novo membro à equipe.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input id="phone" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Função
              </Label>
              <Input id="role" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Departamento
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Management">Gestão</SelectItem>
                  <SelectItem value="Engineering">Engenharia</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Vendas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Ativo</SelectItem>
                  <SelectItem value="On Leave">De Licença</SelectItem>
                  <SelectItem value="Unavailable">Indisponível</SelectItem>
                </SelectContent>
              </Select>
                  </div>
                </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={addMember}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para editar membro */}
      <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Membro</DialogTitle>
            <DialogDescription>
              Atualize as informações do membro da equipe.
            </DialogDescription>
          </DialogHeader>
          {currentMember && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nome
                </Label>
                <Input id="edit-name" defaultValue={currentMember.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" type="email" defaultValue={currentMember.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Telefone
                </Label>
                <Input id="edit-phone" defaultValue={currentMember.phone} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Função
                </Label>
                <Input id="edit-role" defaultValue={currentMember.role} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">
                  Departamento
                </Label>
                <Select defaultValue={currentMember.department}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Management">Gestão</SelectItem>
                    <SelectItem value="Engineering">Engenharia</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Vendas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={currentMember.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Ativo</SelectItem>
                    <SelectItem value="On Leave">De Licença</SelectItem>
                    <SelectItem value="Unavailable">Indisponível</SelectItem>
                  </SelectContent>
                </Select>
                </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMemberOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={editMember}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}