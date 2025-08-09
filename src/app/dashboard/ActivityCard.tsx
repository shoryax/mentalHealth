import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Leaf, Moon, BookOpen, Zap } from "lucide-react"; // Removed unnecessary icons

export interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: number;
    tags: string[];
    isFavorite: boolean;
    completedToday?: boolean;
    difficulty: string;
}

interface ActivityCardProps {
    activity: Activity;
    onToggleFavorite: (id: string) => void;
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
        beginner: "bg-green-100 text-green-700 border-green-200",
        intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
        advanced: "bg-red-100 text-red-700 border-red-200",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200"
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

export default function ActivityCard({ activity, onToggleFavorite }: ActivityCardProps) {
    const Icon = getCategoryIcon(activity.category);

    return (
        <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/5">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
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

                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(activity.difficulty)}`}>
                            {activity.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
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