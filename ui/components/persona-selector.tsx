"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PersonaSelectorProps {
  selectedPersona: string
  onPersonaChange: (persona: string) => void
}

export function PersonaSelector({ selectedPersona, onPersonaChange }: PersonaSelectorProps) {
  const personas = [
    {
      id: "default",
      name: "Default Assistant",
      description: "Helpful, balanced, and informative AI assistant",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Formal, concise, and business-oriented responses",
    },
    {
      id: "friendly",
      name: "Friendly",
      description: "Warm, conversational, and approachable tone",
    },
    {
      id: "technical",
      name: "Technical Expert",
      description: "Detailed technical explanations with precise terminology",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Imaginative, expressive, and idea-focused responses",
    },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-sidebar-foreground">Assistant Persona</label>
      <TooltipProvider>
        <Select value={selectedPersona} onValueChange={onPersonaChange}>
          <SelectTrigger className="bg-sidebar-background text-sidebar-foreground border-sidebar-border">
            <SelectValue placeholder="Select a persona" />
          </SelectTrigger>
          <SelectContent>
            {personas.map((persona) => (
              <Tooltip key={persona.id}>
                <TooltipTrigger asChild>
                  <SelectItem value={persona.id}>{persona.name}</SelectItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="max-w-xs">{persona.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </SelectContent>
        </Select>
      </TooltipProvider>
    </div>
  )
}
