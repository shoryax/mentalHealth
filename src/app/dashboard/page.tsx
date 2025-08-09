"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Search, Star, Clock, Heart, Brain, Leaf, Moon, Sun, Sunrise, Sunset, Play, BookOpen, Zap, TrendingUp, Sparkles, ArrowRight, Settings, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';

// Types
interface Activity {
  id: string
  title: string
  description: string
  category: "meditation" | "breathing" | "mindfulness" | "sleep" | "journal" | "exercise"
  duration: number
  tags: string[]
  isFavorite: boolean
  completedToday?: boolean
  difficulty: "beginner" | "intermediate" | "advanced"
}

// Sample data
const activities: Activity[] = [
  {
    id: "1",
    title: "Morning Mindfulness",
    description: "Start your day with gentle awareness and intention setting",
    category: "mindfulness",
    duration: 10,
    tags: ["morning", "awareness", "intention"],
    isFavorite: true,
    completedToday: true,
    difficulty: "beginner",
  },
  {
    id: "2",
    title: "Deep Breathing Exercise",
    description: "Calm your nervous system with guided breathing techniques",
    category: "breathing",
    duration: 5,
    tags: ["calm", "anxiety", "quick"],
    isFavorite: false,
    difficulty: "beginner",
  },
  {
    id: "3",
    title: "Body Scan Meditation",
    description: "Release tension and connect with your physical self",
    category: "meditation",
    duration: 20,
    tags: ["relaxation", "body", "tension"],
    isFavorite: true,
    difficulty: "intermediate",
  },
  {
    id: "4",
    title: "Gratitude Journal",
    description: "Reflect on positive moments and cultivate appreciation",
    category: "journal",
    duration: 15,
    tags: ["gratitude", "reflection", "positivity"],
    isFavorite: false,
    completedToday: true,
    difficulty: "beginner",
  },
  {
    id: "5",
    title: "Evening Wind Down",
    description: "Prepare your mind and body for restful sleep",
    category: "sleep",
    duration: 12,
    tags: ["evening", "sleep", "relaxation"],
    isFavorite: true,
    difficulty: "beginner",
  },
  {
    id: "6",
    title: "Advanced Meditation",
    description: "Deep contemplative practice for experienced practitioners",
    category: "meditation",
    duration: 30,
    tags: ["advanced", "contemplation", "focus"],
    isFavorite: false,
    difficulty: "advanced",
  },
]

const quickActions = [
  { icon: Brain, label: "Start Meditation", category: "meditation" },
  { icon: Leaf, label: "Breathing Exercise", category: "breathing" },
  { icon: Heart, label: "Mindful Moment", category: "mindfulness" },
  { icon: BookOpen, label: "Journal Entry", category: "journal" },
]


const getTimeBasedGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 6) return { greeting: "Good night", icon: Moon, message: "Time for rest and reflection" }
  if (hour < 12) return { greeting: "Good morning", icon: Sunrise, message: "Start your day mindfully" }
  if (hour < 17) return { greeting: "Good afternoon", icon: Sun, message: "Take a mindful break" }
  if (hour < 21) return { greeting: "Good evening", icon: Sunset, message: "Wind down peacefully" }
  return { greeting: "Good night", icon: Moon, message: "Prepare for restful sleep" }
}

const getCategoryIcon = (category: string) => {
  const icons = {
    meditation: Brain,
    breathing: Leaf,
    mindfulness: Heart,
    sleep: Moon,
    journal: BookOpen,
    exercise: Zap,
  }
  return icons[category as keyof typeof icons] || Heart
}

const getCategoryGradient = (category: string) => {
  const gradients = {
    meditation: "from-purple-500/20 via-violet-500/20 to-indigo-500/20",
    breathing: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    mindfulness: "from-rose-500/20 via-pink-500/20 to-red-500/20",
    sleep: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    journal: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    exercise: "from-lime-500/20 via-green-500/20 to-emerald-500/20",
  }
  return gradients[category as keyof typeof gradients] || "from-gray-500/20 via-slate-500/20 to-gray-500/20"
}

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    beginner: "bg-green-150 text-green-700 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    advanced: "bg-red-100 text-red-700 border-red-200",
  }
  return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200"
}

// Components
function ActivityCard({ activity, onToggleFavorite }: { activity: Activity; onToggleFavorite: (id: string) => void }) {
  const Icon = getCategoryIcon(activity.category)
  return (
    <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4 my-4">
          <div
            className={`p-3 rounded-2xl bg-gradient-to-br ${getCategoryGradient(activity.category)} border border-white/20`}
          >
            <Icon className="h-5 w-5 text-gray-700" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100/50"
            onClick={() => onToggleFavorite(activity.id)}
          >
            <Star
              className={`h-4 w-4 transition-colors ${activity.isFavorite ? "fill-amber-400 text-amber-400" : "text-gray-400 hover:text-amber-400"
                }`}
            />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{activity.title}</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{activity.description}</p>
          </div>

          <div className="flex items-center gap-2 ">
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(activity.difficulty)}`}>
              {activity.difficulty}
            </Badge>
            <div className="flex items-center gap-1 my-3 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{activity.duration}m</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-wrap gap-1">
              {activity.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm">
              <Play className="h-3 w-3 mr-1" />
              Start
            </Button>
          </div>
        </div>

        {activity.completedToday && (
          <div className="absolute top-4 right-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CircularProgress({ value, size = 80 }: { value: number; size?: number }) {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const offset = Math.floor(circumference - (value / 100) * circumference);

  return (

    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={4}
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={4}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-700">{value}%</span>
      </div>
    </div>
  )
}

export default function MentalWellnessDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>(activities.filter((a) => a.isFavorite).map((a) => a.id))

  const { greeting, icon: GreetingIcon, message } = getTimeBasedGreeting()

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || activity.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const completedToday = activities.filter((a) => a.completedToday).length
  const dailyGoal = 3
  const progressPercentage = Math.floor((completedToday / dailyGoal) * 100)
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
      const fullName = data.user?.user_metadata?.full_name;
      setDisplayName(fullName ? fullName.split(' ')[0] : data.user?.email || null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark">
        <Header />
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">You are not logged in</h2>
          <p className="mb-6 text-gray-400">Please log in to access your dashboard.</p>
          <a href="/signin">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg shadow backdrop-blur-lg shadow-xl rounded-2xl z-50 transition-colors duration-300">
              Log In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Header />

      <main className="max-w-7xl mt-14 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mt-10 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GreetingIcon className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-medium text-gray-700">{greeting}, {displayName}</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            What would you like to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              focus on{" "}
            </span>
            today?
          </h2>
          <p className="text-lg text-gray-600 mb-8">{message}</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for meditation, breathing exercises, or wellness activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200"
                onClick={() => setSelectedCategory(selectedCategory === action.category ? null : action.category)}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between my-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedToday}/{dailyGoal}
                  </p>
                  <p className="text-xs text-gray-500">activities completed</p>
                </div>
                <CircularProgress value={progressPercentage} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 my-4">
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

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 my-4">
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

        {/* Activities Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 ">
              {selectedCategory ? `${selectedCategory} Activities` : "Recommended for You"}
            </h3>
            {selectedCategory && (
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onToggleFavorite={toggleFavorite} />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-6 w-6 text-gray-400 " />
              </div>
              <p className="text-gray-500 text-lg">No activities found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && !selectedCategory && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Favorites</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((activity) => favorites.includes(activity.id))
                .slice(0, 3)
                .map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} onToggleFavorite={toggleFavorite} />
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}