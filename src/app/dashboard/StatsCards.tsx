"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./CircularProgress";
import { TrendingUp, Sparkles } from "lucide-react";

interface StatsCardsProps {
  completedToday: number;
  dailyGoal: number;
  weeklyCompleted: number;
}

export default function StatsCards({ completedToday, dailyGoal, weeklyCompleted }: StatsCardsProps) {
  const progressPercentage = Math.floor((completedToday / dailyGoal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Daily Progress Card */}
      <Card className="bg-[#262430] backdrop-blur-sm border-white/30 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center my-3">
            <p className="text-sm font-medium text-gray-600 mb-1">Daily Progress</p>
            <p className="text-3xl font-bold text-white/80 mb-2">
              {completedToday}/{dailyGoal}
            </p>
            <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 mb-2">
              activities completed
            </span>
            <div className="flex justify-center mt-2">
              <CircularProgress value={progressPercentage} size={64} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This Week Card */}
      <Card className="bg-[#262430] backdrop-blur-sm border-white/30 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 my-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md border border-emerald-300">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-white/80">{weeklyCompleted}</p>
              {/* Placeholder growth badge; replace with dynamic comparison when lastWeekAvailable */}
              <span className="inline-block px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 mt-1">
                keep going
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="bg-[#262430] backdrop-blur-sm border-white/30 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 my-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-md border border-pink-300">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-white/80">7 days</p>
              <span className="inline-block px-2 py-1 text-xs rounded bg-purple-100 text-purple-700 mt-1">
                Keep it up!
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
