// components/SearchBar.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8 relative flex">
      <Input
        placeholder="Search for meditation, breathing exercises, or wellness activities..."
        value={value}
        onChange={onChange}
        className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300"
      />
    </div>
  );
}
