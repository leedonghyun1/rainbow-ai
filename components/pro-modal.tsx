"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  MessageSquare,
  Music,
  Image,
  Video,
  Code,
  Check,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Music",
    icon: Music,
    color: "text-emerald-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Image",
    icon: Image,
    color: "text-red-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Video",
    icon: Video,
    color: "text-orange-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Code",
    icon: Code,
    color: "text-sky-500",
    bgcolor: "bg-violet-500/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();

  const [isLoading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gpa-x-2 font-bold py-1">
                Upgrade to Genius
                <Badge className="uppercase text-sm py-1" variant="premium">
                  Pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold  text-sm">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size="lg"
              variant="premium"
              className="w-full"
              onClick={onSubscribe}
              disabled={isLoading}
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
