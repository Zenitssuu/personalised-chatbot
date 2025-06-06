"use client";

import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { useFixedVoice } from "@/hooks/useVoiceSetup";
import { useState, useRef, useEffect } from "react";
import { ConversationList } from "@/components/conversation-list";
import { MessageFeed } from "@/components/message-feed";
import { PersonaSelector } from "@/components/persona-selector";
import { SummaryPanel } from "@/components/summary-panel";
import { VoiceControl } from "@/components/voice-control";
import { ResetControls } from "@/components/reset-controls";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { AppHeader } from "@/components/app-header";
import { motion, AnimatePresence } from "framer-motion";
import { cleanForSpeech } from "./cleanspeech";
import { EnhancedVoiceInput } from "@/components/enhanced-voice-input";
import { useGetSessions } from "@/hooks/useGetSessions";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/lib/stores/store";
import { clearToken } from "@/lib/stores/features/auth/authSlice";
import axios from "axios";

export default function Dashboard() {
  const ws = useRef<WebSocket | null>(null);
  const voice = useFixedVoice();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState("default");
  const [summary, setSummary] = useState("No conversation yet.");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Introduction to AI",
      lastUpdated: new Date().toISOString(),
      messages: [],
    },
    {
      id: "2",
      title: "Voice Recognition Tips",
      lastUpdated: new Date(Date.now() - 86400000).toISOString(),
      messages: [],
    },
    {
      id: "3",
      title: "Productivity Workflow",
      lastUpdated: new Date(Date.now() - 172800000).toISOString(),
      messages: [],
    },
  ]);
  const { data, error, isLoading } = useGetSessions();

  // console.log(allData);
  console.log("data", data);
  // console.log("error", error);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [autoTTS, setAutoTTS] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const isMobile = useMobile();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const storedToken = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.decoded?.userId);
  // console.log(userId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  const handleStartTalking = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setIsListening(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript?.trim();
      setIsListening(false);

      if (!transcript) return;

      const sessionId = getOrCreateSessionId();

      const userMessage: Message = {
        id: Date.now().toString(),
        content: transcript,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // ✅ Send to backend
      ws.current?.send(
        JSON.stringify({
          type: "speak",
          payload: transcript,
          persona: selectedPersona,
          sessionId: currentConversationId,
          token: storedToken,
          clientUserId: userId,
        })
      );
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const playTTS = async (
    text: string,
    voiceId: string = "9BWtsMINqrJLrRacOk9x"
  ) => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, voiceId }),
      });

      if (!res.ok) {
        console.error("TTS failed");
        return;
      }

      const audioData = await res.arrayBuffer();
      const audioBlob = new Blob([audioData], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      return new Promise<void>((resolve) => {
        audio.onended = () => {
          setIsSpeaking(false);
          resolve();
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          resolve(); // still resolve on error to prevent UI lock
        };
        setIsSpeaking(true);
        audio.play();
      });
    } catch (error) {
      console.error("Error playing TTS:", error);
    }
  };

  const handleNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: "New Conversation",
      lastUpdated: new Date().toISOString(),
      messages: [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newId);
    setMessages([]);
    setSummary("No conversation yet.");
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    // In a real app, you would load the messages for this conversation
    setMessages([]);
    setSummary("Loading conversation summary...");

    // Close sidebar on mobile after selection
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((conv) => conv.id !== id));

    if (id === currentConversationId) {
      if (conversations.length > 1) {
        const remainingConversations = conversations.filter(
          (conv) => conv.id !== id
        );
        setCurrentConversationId(remainingConversations[0].id);
      } else {
        handleNewConversation();
      }
    }
  };

  const handleUpdateConversationTitle = (id: string, title: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id
          ? { ...conv, title, lastUpdated: new Date().toISOString() }
          : conv
      )
    );
  };

  const handleResetMemory = () => {
    setMessages([]);
    setSummary("Conversation memory has been reset.");
    toast({
      title: "Memory Reset",
      description: "The conversation memory has been cleared.",
    });
  };

  const handleRefreshSummary = () => {
    setSummary("Regenerating summary...");

    // Simulate summary regeneration
    setTimeout(() => {
      setSummary(
        "Updated summary: Discussion about AI voice interfaces and user experience design."
      );
      toast({
        title: "Summary Updated",
        description: "The conversation summary has been refreshed.",
      });
    }, 1500);
  };

  const handlePersonaChange = (persona: string) => {
    setSelectedPersona(persona);
    toast({
      title: "Persona Changed",
      description: `Assistant persona set to ${persona}.`,
    });
  };

  const handleSignOut = async () => {
    // In a real app, you would handle sign out logic here
    dispatch(clearToken());
    await persistor.purge();
    toast({
      title: "Signing out",
      description: "You have been signed out successfully.",
    });
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const getCurrentConversationTitle = () => {
    const currentConversation = conversations?.find(
      (conv) => conv?.id === currentConversationId
    );
    return currentConversation?.title || "New Conversation";
  };

  const toggleSummaryPanel = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  // directed routes
  useEffect(() => {
    if (storedToken === null || userId === null) router.back();
  }, []);

  //getting token from localstorage
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   setToken(storedToken);
  // }, []);

  //conversation id
  useEffect(() => {
    const existingId = sessionStorage.getItem("conversationId");
    if (existingId) {
      setCurrentConversationId(existingId);
    } else {
      const newId = uuidv4();
      sessionStorage.setItem("conversationId", newId);
      setCurrentConversationId(newId);
    }
  }, []);

  //integrating websockets
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.current.onmessage = async (event) => {
      const { type, payload } = JSON.parse(event.data);

      if (type === "llm-response") {
        if (autoTTS) {
          const cleanedMessage = cleanForSpeech(payload);
          // const utterance = new SpeechSynthesisUtterance(cleanedMessage);

          // if (voice) {
          //   utterance.voice = voice;
          //   utterance.pitch = 1.1;
          //   utterance.rate = 0.95;
          //   utterance.volume = 1;
          // }
          // speechSynthesis.speak(utterance);
          // setIsSpeaking(true);

          // utterance.onend = () => setIsSpeaking(false);

          await playTTS(cleanedMessage);
        }
        const assistantMessage: Message = {
          id: Date.now().toString(),
          content: payload,
          sender: "assistant",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Optionally trigger summary update here
      }

      if (type === "info") {
        toast({
          title: "Assistant",
          description: payload,
        });
      }
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const Sidebar = () =>
    isLoading ? (
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
            conversations={data?.sessions || []}
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-background/95">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full hidden md:block border-r border-border"
        >
          {/* <Sidebar
            selectedPersona={selectedPersona}
            handleNewConversation={handleNewConversation}
            handlePersonaChange={handlePersonaChange}
            handleSelectConversation={handleSelectConversation}
            currentConversationId={currentConversationId}
            handleDeleteConversation={handleDeleteConversation}
            handleUpdateConversationTitle={handleUpdateConversationTitle}
            handleResetMemory={handleResetMemory}
            handleSignOut={handleSignOut}
          /> */}
          <Sidebar />
        </motion.div>
      )}

      {/* Mobile sidebar with sheet */}
      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent
            side="left"
            className="p-0 w-[300px] bg-sidebar/95 backdrop-blur-xl"
          >
            {/* <Sidebar
              selectedPersona={selectedPersona}
              handleNewConversation={handleNewConversation}
              handlePersonaChange={handlePersonaChange}
              handleSelectConversation={handleSelectConversation}
              currentConversationId={currentConversationId}
              handleDeleteConversation={handleDeleteConversation}
              handleUpdateConversationTitle={handleUpdateConversationTitle}
              handleResetMemory={handleResetMemory}
              handleSignOut={handleSignOut}
            /> */}
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <AppHeader
          title={getCurrentConversationTitle()}
          onToggleSummary={toggleSummaryPanel}
          isSummaryOpen={isSummaryOpen}
          onSignOut={handleSignOut}
          showMenuButton={isMobile}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Message feed */}
          <div className="flex-1 flex flex-col overflow-hidden bg-card rounded-lg m-2 shadow-sm border border-border">
            <div className="flex-1 overflow-y-auto p-4">
              <MessageFeed messages={messages} />
              <div ref={messageEndRef} />
            </div>

            {/* Voice control */}
            {/* <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
              <EnhancedVoiceInput
                isListening={isListening}
                isSpeaking={isSpeaking}
                onStartTalking={handleStartTalking}
                onSendMessage={handleSendMessage}
                autoTTS={autoTTS}
                setAutoTTS={setAutoTTS}
              />
            </div> */}
            <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
              <VoiceControl
                isListening={isListening}
                isSpeaking={isSpeaking}
                onStartTalking={handleStartTalking}
                autoTTS={autoTTS}
                setAutoTTS={setAutoTTS}
              />
            </div>
          </div>

          {/* Summary panel - only visible on desktop when toggled */}
          <AnimatePresence>
            {!isMobile && isSummaryOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-l border-border bg-card rounded-lg m-2 ml-0 shadow-sm overflow-y-auto"
              >
                <SummaryPanel
                  summary={summary}
                  onRefresh={handleRefreshSummary}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Types
interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  lastUpdated: string;
  messages: Message[];
}
