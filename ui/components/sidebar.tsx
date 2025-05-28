// components/Sidebar.tsx
"use client";

import { useGetSessions } from "@/hooks/useGetSessions";
import { Button } from "./ui/button";
import { LogOut, Plus } from "lucide-react";
import { PersonaSelector } from "./persona-selector";
import { ConversationList } from "./conversation-list";
import { ResetControls } from "./reset-controls";
// ... other imports

export const Sidebar = ({
    selectedPersona,
    handleNewConversation,
    handlePersonaChange,
    handleSelectConversation,
    currentConversationId,
    handleDeleteConversation,
    handleUpdateConversationTitle,
    handleResetMemory,
    handleSignOut
}) => {
  const { data, isLoading } = useGetSessions();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border/50">
      <div className="p-4 border-b border-sidebar-border/50 flex justify-between items-center bg-sidebar/80">
        <h2 className="font-semibold text-sidebar-foreground">
          Voice Assistant
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewConversation}
          className="text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 border-b border-sidebar-border/50 bg-sidebar/60">
        <PersonaSelector
          selectedPersona={selectedPersona}
          onPersonaChange={handlePersonaChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto bg-sidebar/40">
        <ConversationList
          conversations={data}
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          onUpdateTitle={handleUpdateConversationTitle}
        />
      </div>

      <div className="p-4 border-t border-sidebar-border/50 flex flex-col gap-2 bg-sidebar/80">
        <ResetControls onResetMemory={handleResetMemory} />
        <Button
          variant="outline"
          className="w-full flex items-center bg-sidebar-background/50 hover:bg-sidebar-accent/50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
