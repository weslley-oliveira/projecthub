import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Users, MoreHorizontal, MapPin, Phone, Eye, Copy, Check } from "lucide-react";
import { TeamMember, Project } from "@/app/types/project";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Estendendo o tipo Project para o componente ProjectCard
type ProjectCardProps = Omit<Project, 'contact'> & {
  onOpenTeam?: () => void;
  onComplete?: () => void;
  onDuplicate?: () => void;
};

export function ProjectCard({
  id,
  title,
  description,
  status,
  dueDate,
  team,
  startTime = "08:00", // Default start time if not provided
  finishedTime,
  onOpenTeam,
  onComplete,
  onDuplicate,
  address,
  workforce,
}: ProjectCardProps) {
  const statusColor = {
    "Pending": "bg-yellow-500",
    "Confirmed": "bg-blue-500",
    "In Progress": "bg-purple-500",
    "Completed": "bg-green-500",
    "Canceled": "bg-red-500",
  };

  const statusVariant = {
    "Pending": "secondary",
    "Confirmed": "default",
    "In Progress": "default",
    "Completed": "outline",
    "Canceled": "destructive",
  } as const;

  return (
    <Card className="relative overflow-hidden">
      {/* Status bar with text */}
      <div className={cn(
        "h-6 flex items-center justify-center text-xs font-medium text-white",
        {
          "bg-yellow-500": status === "Pending",
          "bg-blue-500": status === "Confirmed",
          "bg-purple-500": status === "In Progress",
          "bg-green-500": status === "Completed",
          "bg-red-500": status === "Canceled"
        }
      )}>
        {status}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {address ? `${address.street}, ${address.number} - ${address.city}` : "No address registered"}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenTeam}>
                <Users className="mr-2 h-4 w-4" />
                Team
              </DropdownMenuItem>
              {status !== "Completed" && (
                <DropdownMenuItem onClick={onComplete}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {/* Start Time with Emphasis */}
        <div className="flex items-center bg-primary/10 rounded-md p-2 mb-3">
          <Clock className="h-4 w-4 text-primary mr-2" />
          <div>
            {status === "Completed" && finishedTime ? (
              <>
                <span className="text-xs text-muted-foreground">Time</span>
                <p className="text-sm font-semibold">{startTime} - {finishedTime}</p>
              </>
            ) : (
              <>
                <span className="text-xs text-muted-foreground">Start</span>
                <p className="text-sm font-semibold">{startTime}</p>
              </>
            )}
          </div>
        </div>

        {/* Workforce */}
        {workforce && workforce.length > 0 && (
          <div className="flex flex-col bg-secondary/20 rounded-md p-2 mb-3">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 text-secondary-foreground mr-2" />
              <span className="text-xs text-muted-foreground">Team Required</span>
            </div>
            <div className="flex items-center justify-between bg-background/50 px-2 py-1.5 rounded-md">
              <span className="text-xs font-medium">Total Professionals</span>
              <span className="text-xs font-semibold text-primary">
                {workforce.reduce((total, work) => total + work.quantity, 0)}
              </span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {(() => {
                const totalRequired = workforce.reduce((total, work) => total + work.quantity, 0);
                const currentTeam = team.length;
                const remaining = totalRequired - currentTeam;
                
                if (remaining > 0) {
                  return `${remaining} professional${remaining > 1 ? 's' : ''} needed to complete the team`;
                } else if (remaining < 0) {
                  return `${Math.abs(remaining)} professional${Math.abs(remaining) > 1 ? 's' : ''} excess in the team`;
                } else {
                  return "Team complete";
                }
              })()}
            </div>
          </div>
        )}
        
        {/* Team Members List */}
        <div className="flex flex-col bg-secondary/20 rounded-md p-2 mb-3">
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-secondary-foreground mr-2" />
            <span className="text-xs text-muted-foreground">Team Members</span>
          </div>
          
          <div className="space-y-2">
            {team.map((member) => (
              <div key={member.id} className="flex items-center justify-between bg-background/50 rounded-md p-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.contact?.phone || "No phone"}</span>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs",
                    {
                      "bg-green-500/10 text-green-500 border-green-500/20": member.status === "Active",
                      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20": member.status === "On Leave",
                      "bg-red-500/10 text-red-500 border-red-500/20": member.status === "Unavailable"
                    }
                  )}
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end pt-2">
        <div className="text-xs text-muted-foreground">Due {dueDate}</div>
      </CardFooter>
    </Card>
  );
}