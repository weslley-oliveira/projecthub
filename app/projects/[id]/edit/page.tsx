"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/components/ui/address";
import { Project, AddressData } from "@/app/types/project";

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [projectAddress, setProjectAddress] = useState<AddressData | undefined>(undefined);

  // Carregar dados do projeto
  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      console.log(`Fetching project with ID: ${params.id}`);
      // Buscar dados da API
      const response = await fetch(`/api/projects/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      
      const data = await response.json();
      console.log("Project data received:", data);
      
      setProject(data.project);
      setProjectAddress(data.project.address);
      
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o projeto. Verifique a conexão com a API.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const updatedProject = {
      id: params.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dueDate: formData.get("dueDate") as string,
      startTime: formData.get("startTime") as string,
      contact: {
        name: formData.get("contactName") as string,
        phone: formData.get("contactPhone") as string
      },
      address: projectAddress
    };

    try {
      // Por enquanto, simularemos uma resposta bem-sucedida,
      // já que não temos a rota de atualização implementada
      // const response = await fetch('/api/projects', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedProject),
      // });
      
      // if (!response.ok) throw new Error('Failed to update project');

      // Simulando um delay para mostrar o estado de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Sucesso",
        description: "Projeto atualizado com sucesso",
      });

      router.push(`/projects/${params.id}`);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o projeto",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Carregando projeto...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>Projeto não encontrado</p>
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
            <div>
              <h1 className="text-2xl font-bold">Editar Projeto</h1>
              <p className="text-muted-foreground">Projeto #{params.id} - {project.title}</p>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
            <CardDescription>
              Atualize os detalhes do projeto
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título do Projeto</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={project.title}
                    placeholder="Digite o título do projeto"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={project.description}
                    placeholder="Digite a descrição do projeto"
                    required
                  />
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
                
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    defaultValue={project.startTime}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações de Contato</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="contactName">Nome de Contato</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      defaultValue={project.contact?.name}
                      placeholder="Digite o nome de contato"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Telefone de Contato</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      defaultValue={project.contact?.phone}
                      placeholder="Digite o telefone de contato"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço do Projeto</h3>
                <Address
                  onAddressChange={setProjectAddress}
                  defaultValues={project.address}
                  className="border rounded-lg p-4"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
} 