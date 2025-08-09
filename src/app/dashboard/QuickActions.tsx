// components/QuickActions.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Leaf, Heart, Moon, BookOpen, Zap } from "lucide-react";

export const quickActions = [
  { icon: Brain, label: "Start Meditation", category: "meditation" },
  { icon: Leaf, label: "Breathing Exercises", category: "breathing" },
  { icon: Heart, label: "Mindfulness", category: "mindfulness" },
  { icon: Moon, label: "Sleep", category: "sleep" },
  { icon: BookOpen, label: "Journaling", category: "journal" },
  { icon: Zap, label: "Exercise", category: "exercise" },
];

interface QuickActionsProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function QuickActions({ selectedCategory, setSelectedCategory }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {quickActions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200"
          onClick={() =>
            setSelectedCategory(selectedCategory === action.category ? null : action.category)
          }
        >
          <action.icon className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
