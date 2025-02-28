import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "In Progress" | "Completed" | "On Hold" | "Planned";
  team: TeamMember[];
  startTime?: string; // Add optional start time
}

export function ProjectCard({
  title,
  description,
  progress,
  dueDate,
  status,
  team,
  startTime = "9:00 AM", // Default start time if not provided
}: ProjectCardProps) {
  const statusColor = {
    "In Progress": "bg-blue-500",
    Completed: "bg-emerald-500",
    "On Hold": "bg-amber-500",
    Planned: "bg-slate-500",
  };

  const statusVariant = {
    "In Progress": "default",
    Completed: "success",
    "On Hold": "warning",
    Planned: "secondary",
  } as const;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant={statusVariant[status]}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        {/* Start Time with Emphasis */}
        <div className="flex items-center bg-primary/10 rounded-md p-2 mb-3">
          <Clock className="h-4 w-4 text-primary mr-2" />
          <div>
            <span className="text-xs text-muted-foreground">Start Time</span>
            <p className="text-sm font-semibold">{startTime}</p>
          </div>
        </div>
        
        {/* Team Members Count with Images - Changed to column layout */}
        <div className="flex flex-col bg-secondary/20 rounded-md p-2 mb-3">
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-secondary-foreground mr-2" />
            <span className="text-xs text-muted-foreground">Team Members</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{team.length} professionals</p>
            <div className="flex -space-x-2">
              {team.slice(0, 3).map((member, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {team.length > 3 && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium">
                  +{team.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end pt-2">
        <div className="text-xs text-muted-foreground">Due {dueDate}</div>
      </CardFooter>
    </Card>
  );
}