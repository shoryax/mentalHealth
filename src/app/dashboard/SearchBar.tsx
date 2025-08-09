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
    <div className="max-w-2xl mx-auto mb-8 relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search for meditation, breathing exercises, or wellness activities..."
        value={value}
        onChange={onChange}
        className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300"
      />
    </div>
  );
}
