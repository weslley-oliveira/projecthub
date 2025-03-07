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
import { Search, Plus, X, Check, UserPlus, ArrowLeft, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Project } from "@/app/types/project";
import { Checkbox } from "@radix-ui/react-checkbox";
import { mockTeamMembers } from "@/app/data/team/mockTeam";

// Mock data para simular a busca de um projeto pelo ID
function getMockProject(id: string): Project {
  return {
    id,
    title: "Website Redesign",
    description: "Redesign the company website with modern UI/UX principles",
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

export default function ProjectTeamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [projectTeam, setProjectTeam] = useState<Project["team"]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch project team
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}/team`)
      .then(res => res.json())
      .then(data => {
        setProjectTeam(data.team);
        // Update available team members
        setAvailableTeamMembers(
          mockTeamMembers.filter(
            member => !data.team.some((teamMember: Project["team"][0]) => teamMember.id === member.id)
          )
        );
      })
      .catch(error => {
        toast({
          title: "Erro",
          description: "Não foi possível carregar a equipe do projeto.",
          variant: "destructive",
        });
      });

    // Set project data
    setProject(getMockProject(params.id));
  }, [params.id, toast]);

  // Filtrar membros disponíveis com base na busca
  const filteredAvailableMembers = availableTeamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = async (memberId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId }),
      });

      if (!response.ok) throw new Error('Failed to add team member');

      // Atualizar a lista de membros disponíveis
      setAvailableTeamMembers(prev => prev.filter(member => member.id !== memberId));
      
      // Adicionar o membro à equipe do projeto
      const member = mockTeamMembers.find(m => m.id === memberId);
      if (member) {
        setProjectTeam(prev => [...prev, {
          id: member.id,
          name: member.name,
          role: member.role,
          status: member.status === "Available" ? "Active" :
                  member.status === "Working" ? "Active" :
                  member.status === "Busy" ? "Active" :
                  "Unavailable",
          avatar: member.avatar
        }]);
      }

      toast({
        title: "Sucesso",
        description: "Membro adicionado à equipe com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o membro à equipe.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}/team`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId }),
      });

      if (!response.ok) throw new Error('Failed to remove team member');

      // Remover o membro da equipe do projeto
      setProjectTeam(prev => prev.filter(member => member.id !== memberId));
      
      // Adicionar o membro de volta à lista de disponíveis
      const member = mockTeamMembers.find(m => m.id === memberId);
      if (member) {
        setAvailableTeamMembers(prev => [...prev, member]);
      }

      toast({
        title: "Sucesso",
        description: "Membro removido da equipe com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o membro da equipe.",
        variant: "destructive",
      });
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/projects/${params.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Gerenciar Equipe</h1>
              <p className="text-muted-foreground">{project.title}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setAddMemberDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Membro
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar membros..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Membros Atuais</CardTitle>
            <CardDescription>Membros da equipe atualmente no projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectTeam.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{member.status}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Membros Disponíveis</CardTitle>
            <CardDescription>Membros que podem ser adicionados ao projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAvailableMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{member.status}</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddMember(member.id)}
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 