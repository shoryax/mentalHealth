// components/StatsCards.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./CircularProgress";
import { TrendingUp, Sparkles } from "lucide-react";

interface StatsCardsProps {
  completedToday: number;
  dailyGoal: number;
}

export default function StatsCards({ completedToday, dailyGoal }: StatsCardsProps) {
  const progressPercentage = Math.floor((completedToday / dailyGoal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Daily Progress Card */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between my-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Daily Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedToday}/{dailyGoal}
              </p>
              <p className="text-xs text-gray-500">activities completed</p>
            </div>
            <CircularProgress value={progressPercentage} />
          </div>
        </CardContent>
      </Card>

      {/* This Week Card */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 my-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-emerald-600">+3 from last week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 my-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">7 days</p>
              <p className="text-xs text-purple-600">Keep it up!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
