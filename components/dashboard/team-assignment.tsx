"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TeamMember, Project } from "@/app/types/project";

interface TeamAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  availableMembers: TeamMember[];
  onAssignMembers: (projectId: string, memberIds: string[]) => void;
}

export function TeamAssignment({ 
  isOpen, 
  onClose, 
  project, 
  availableMembers,
  onAssignMembers
}: TeamAssignmentProps) {
  const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    project.team.map(member => member.id)
  );

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSave = () => {
    onAssignMembers(project.id, selectedMembers);
    toast({
      title: "Team updated",
      description: `Successfully updated team for ${project.title}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Team Members</DialogTitle>
          <DialogDescription>
            Select team members to assign to <span className="font-medium">{project.title}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Current Team Members</h3>
            <div className="flex flex-wrap gap-2">
              {project.team.length > 0 ? (
                project.team.map((member) => (
                  <Badge key={member.id} variant="secondary" className="flex items-center gap-1">
                    <span>{member.name}</span>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No team members assigned yet</p>
              )}
            </div>
          </div>
          
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search team members..." />
            <CommandList>
              <CommandEmpty>No team members found.</CommandEmpty>
              <CommandGroup heading="Available Team Members">
                {availableMembers.map((member) => {
                  const isSelected = selectedMembers.includes(member.id);
                  const isDisabled = member.status !== "Active";
                  
                  return (
                    <CommandItem
                      key={member.id}
                      disabled={isDisabled}
                      onSelect={() => !isDisabled && handleToggleMember(member.id)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        isDisabled && (
                          <Badge variant="outline" className="text-xs">
                            {member.status}
                          </Badge>
                        )
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}