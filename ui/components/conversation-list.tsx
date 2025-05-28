"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface Conversation {
  id: string;
  title: string;
  lastUpdated: string;
  messages: any[];
}

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string, e: React.MouseEvent) => void;
  onUpdateTitle: (id: string, title: string) => void;
}

export function ConversationList({
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onUpdateTitle,
}: ConversationListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleEditStart = (
    id: string,
    currentTitle: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleEditCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const handleEditSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onUpdateTitle(id, editTitle);
    }
    setEditingId(null);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-1 p-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {conversations?.map((conversation) => (
        <motion.div
          key={conversation?.id}
          variants={item}
          className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-sidebar-accent group ${
            conversation?.id === currentConversationId
              ? "bg-sidebar-accent"
              : ""
          }`}
          onClick={() => onSelectConversation(conversation?.id)}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex-1 min-w-0">
            {editingId === conversation?.id ? (
              <div
                className="flex items-center space-x-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="h-7 text-sm bg-sidebar-background"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  onClick={(e) => handleEditSave(conversation?.id, e)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  onClick={handleEditCancel}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="font-medium truncate text-sidebar-foreground">
                  {conversation?.title}
                </div>
                <div className="text-xs text-sidebar-foreground/70">
                  {formatDistanceToNow(new Date(conversation?.lastUpdated), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            )}
          </div>

          {editingId !== conversation?.id && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-sidebar-foreground hover:text-sidebar-accent-foreground"
                onClick={(e) =>
                  handleEditStart(conversation?.id, conversation?.title, e)
                }
                aria-label={`Edit conversation ${conversation?.title}`}
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-sidebar-foreground hover:text-sidebar-accent-foreground"
                onClick={(e) => onDeleteConversation(conversation?.id, e)}
                aria-label={`Delete conversation ${conversation?.title}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </motion.div>
      ))}

      {conversations?.length === 0 && (
        <div className="p-4 text-center text-sidebar-foreground/70">
          No conversations yet
        </div>
      )}
    </motion.div>
  );
}
