"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Plus, X, Check, UserPlus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { TeamMember, Project } from "@/app/types/project";
import { Checkbox } from "@radix-ui/react-checkbox";

// Mock data para simular a busca de um projeto pelo ID
function getMockProject(id: string): Project {
  return {
    id,
    title: "Website Redesign",
    description: "Redesign the company website with modern UI/UX principles",
    progress: 68,
    dueDate: "Oct 15",
    status: "In Progress",
    startTime: "09:00",
    team: [
      {
        id: "1",
        name: "John Doe",
        role: "Project Manager",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
        status: "Active",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
        status: "Active",
      }
    ]
  };
}

// Mock data para simular a busca de todos os membros da equipe
const getAllTeamMembers = (): TeamMember[] => {
  return [
    {
      id: "1",
      name: "John Doe",
      role: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      status: "Active",
    },
    {
      id: "3",
      name: "David Kim",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      status: "Active",
    },
    {
      id: "4",
      name: "Maria Garcia",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      status: "On Leave",
    },
    {
      id: "5",
      name: "Ana Silva",
      role: "Marketing Specialist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
      status: "Active",
    },
    {
      id: "6",
      name: "Michael Johnson",
      role: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60",
      status: "Active",
    },
    {
      id: "7",
      name: "Emily Chen",
      role: "QA Engineer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
      status: "Unavailable",
    },
    {
      id: "8",
      name: "Robert Wilson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      status: "Active",
    },
  ];
};

export default function ProjectTeamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  // Carregar dados do projeto e membros da equipe
  useEffect(() => {
    // Em um cenário real, você buscaria os dados do projeto e membros de uma API
    const loadedProject = getMockProject(params.id);
    setProject(loadedProject);
    
    const teamMembers = getAllTeamMembers();
    setAllMembers(teamMembers);
  }, [params.id]);
  
  // Filtrar membros da equipe com base na pesquisa
  const filteredMembers = allMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Verificar se um membro já está na equipe do projeto
  const isInTeam = (memberId: string) => {
    return project?.team.some(member => member.id === memberId) || false;
  };
  
  // Função para abrir o diálogo de adicionar membro
  const openAddMemberDialog = () => {
    setSelectedMembers([]);
    setAddMemberDialogOpen(true);
  };
  
  // Função para alternar a seleção de um membro
  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };
  
  // Função para adicionar membros selecionados à equipe
  const addMembersToTeam = () => {
    if (project && selectedMembers.length > 0) {
      const newMembers = allMembers.filter(member => selectedMembers.includes(member.id));
      
      // Verificar se algum membro já está na equipe
      const existingMembers = newMembers.filter(member => isInTeam(member.id));
      
      if (existingMembers.length > 0) {
        toast({
          title: "Aviso",
          description: `${existingMembers.length} membro(s) já fazem parte da equipe.`,
          variant: "default",
        });
      }
      
      // Adicionar apenas membros que ainda não estão na equipe
      const membersToAdd = newMembers.filter(member => !isInTeam(member.id));
      
      if (membersToAdd.length > 0) {
        setProject({
          ...project,
          team: [...project.team, ...membersToAdd]
        });
        
        toast({
          title: "Membros adicionados",
          description: `${membersToAdd.length} membro(s) foram adicionados à equipe.`,
        });
      }
      
      setAddMemberDialogOpen(false);
    }
  };
  
  // Função para remover um membro da equipe
  const removeMemberFromTeam = (memberId: string) => {
    if (project) {
      setProject({
        ...project,
        team: project.team.filter(member => member.id !== memberId)
      });
      
      toast({
        title: "Membro removido",
        description: "O membro foi removido da equipe com sucesso.",
      });
    }
  };
  
  // Função para salvar as alterações na equipe
  const saveTeamChanges = () => {
    // Aqui você implementaria a lógica para salvar as alterações na equipe
    // Por enquanto, apenas mostraremos um toast e redirecionaremos
    
    toast({
      title: "Equipe atualizada",
      description: "As alterações na equipe foram salvas com sucesso.",
    });
    
    // Redirecionar para a página de detalhes do projeto
    router.push(`/projects/${params.id}`);
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
            <h1 className="text-3xl font-bold">Gerenciar Equipe</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={openAddMemberDialog}>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Membros
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Equipe do Projeto: {project.title}</CardTitle>
            <CardDescription>
              Gerencie os membros da equipe atribuídos a este projeto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {project.team.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">Nenhum membro na equipe</p>
                <Button variant="outline" onClick={openAddMemberDialog}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Membros
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.team.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
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
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeMemberFromTeam(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href={`/projects/${params.id}`}>Cancelar</Link>
            </Button>
            <Button onClick={saveTeamChanges}>Salvar Alterações</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Diálogo para adicionar membros */}
      <Dialog 
        open={addMemberDialogOpen} 
        onOpenChange={(open) => setAddMemberDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar Membros à Equipe</DialogTitle>
            <DialogDescription>
              Selecione os membros que deseja adicionar à equipe do projeto.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar membros..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
              {filteredMembers.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhum membro encontrado
                </div>
              ) : (
                filteredMembers.map((member) => {
                  const isAlreadyInTeam = isInTeam(member.id);
                  
                  return (
                    <div 
                      key={member.id} 
                      className={`flex items-center justify-between p-3 ${
                        isAlreadyInTeam ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            member.status === "Active" 
                              ? "default" 
                              : member.status === "On Leave" 
                                ? "secondary" 
                                : "outline"
                          }
                          className="mr-2"
                        >
                          {member.status}
                        </Badge>
                        
                        {isAlreadyInTeam ? (
                          <Badge variant="outline">Na equipe</Badge>
                        ) : (
                          <Checkbox 
                            id={`member-${member.id}`}
                            checked={selectedMembers.includes(member.id)}
                            onCheckedChange={() => toggleMemberSelection(member.id)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={addMembersToTeam}
              disabled={selectedMembers.length === 0}
            >
              Adicionar {selectedMembers.length > 0 ? `(${selectedMembers.length})` : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
} 