import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Leaf, Moon, BookOpen, Zap, Play, Star, Badge, Clock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export interface Activity {
    id: string;
    title: string;
    description: string;
    duration: number;
    tags: string[];
    difficulty: string;
    isFavorite: boolean;
    category: string;
    link?: string;
}

interface ActivityCardProps {
    activity: Activity;
    onToggleFavorite: (id: string) => void;
    userId: string;
    onIncrementDoneToday?: () => void; // callback to bump doneToday state in parent (also used to bump weekly)
}

const getCategoryGradient = (category: string) => {
    const gradients = {
        meditation: "from-purple-400 via-violet-400 to-indigo-400",
        breathing: "from-emerald-400 via-teal-400 to-cyan-400",
        mindfulness: "from-rose-400 via-pink-400 to-red-400",
        sleep: "from-blue-400 via-indigo-400 to-purple-400",
        journal: "from-amber-400 via-orange-400 to-red-400",
        exercise: "from-lime-400 via-green-400 to-emerald-400",
    }
    return gradients[category as keyof typeof gradients] || "from-gray-400 via-slate-400 to-gray-400"
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

export default function ActivityCard({ activity, userId, onToggleFavorite, onIncrementDoneToday }: ActivityCardProps) {
    const [showModal, setShowModal] = useState(false);
    const Icon = getCategoryIcon(activity.category);

    const handleStart = async () => {
        const { error: insertError } = await supabase
            .from("userStats")
            .insert([
                {
                    user_id: userId,
                    activity_id: activity.id,
                    category: activity.category,
                    started_at: new Date().toISOString(),
                }
            ]);
        if (insertError) {
            console.error("Error inserting into userStats:", insertError.message);
        }
        try {
            const { data: statRow, error: selectError } = await supabase
                .from("userStats")
                .select("id, compToday")
                .eq("user_id", userId)
                .order("id", { ascending: true })
                .limit(1)
                .maybeSingle();

            if (selectError) {
                console.warn("Could not fetch existing compToday:", selectError.message);
            } else if (statRow?.id) {
                const current = statRow.compToday || 0;
                const { error: updateError } = await supabase
                    .from("userStats")
                    .update({ compToday: current + 1 })
                    .eq("id", statRow.id);
                if (updateError) {
                    console.error("Failed to update compToday:", updateError.message);
                }
            } else {
                // If no row found, optionally create one with compToday = 1 (comment out if undesired)
                const { error: createError } = await supabase
                    .from("userStats")
                    .insert([
                        {
                            user_id: userId,
                            activity_id: activity.id,
                            category: activity.category,
                            started_at: new Date().toISOString(),
                            compToday: 1,
                        }
                    ]);
                if (createError) {
                    console.error("Failed to create initial compToday row:", createError.message);
                }
            }
        } catch (e) {
            console.error("Unexpected error updating compToday", e);
        }

    // 3. Notify parent so local UI state (doneToday & weekly) increments immediately
    onIncrementDoneToday && onIncrementDoneToday();
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Card className="w-full rounded-2xl shadow-lg border border-gray-200 bg-white/90 hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[340px]">
                <CardContent className="p-6 flex flex-col gap-3 flex-grow">
                    <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryGradient(activity.category)} border border-white/30 flex items-center my-3 justify-center`}>
                            <Icon className="h-6 w-6 text-gray-700" />
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100/50"
                            onClick={() => onToggleFavorite(activity.id)}
                        >
                            <Star
                                className={`h-5 w-5 transition-colors ${activity.isFavorite
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-400 hover:text-amber-400"
                                    }`}
                            />
                        </Button>
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 text-xl leading-tight mb-1">{activity.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(activity.difficulty)}`}>
                            {activity.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{activity.duration}m</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex flex-wrap gap-2">
                            {activity.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <Button
                            size="sm"
                            className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm rounded-full px-4"
                            onClick={handleStart}
                        >
                            <Play className="h-4 w-4 mr-2" />
                            Start
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto flex flex-col items-center">
                        {activity.link ? (
                            <>
                                <h4 className="text-lg font-semibold text-pink-500 mb-4 text-center">{activity.title}</h4>
                                <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden bg-black">
                                    <iframe
                                        className="w-full h-full"
                                        src={(function(){
                                            const url = activity.link || '';
                                            // Basic YouTube ID extraction
                                            const ytMatch = url.match(/(?:youtu.be\/|v=|embed\/)([A-Za-z0-9_-]{6,12})/);
                                            const id = ytMatch ? ytMatch[1] : '';
                                            return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';
                                        })()}
                                        title={activity.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </>
                        ) : (
                            <>
                                <h4 className="text-lg font-semibold text-pink-500 mb-2">Activity Started!</h4>
                                <p className="mb-4 text-pink-500 text-center">You have started: <span className="font-bold">{activity.title}</span></p>
                                <Button
                                    size="sm"
                                    className="bg-pink-700 hover:bg-gray-800 text-white rounded-full px-6"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}