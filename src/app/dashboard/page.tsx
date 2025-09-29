"use client";
import React, { useEffect, useState } from "react";
import { Search, Moon, Sun, Sunrise, Sunset, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import ActivityCard from "./ActivityCard";
import QuickActions from "./QuickActions";
import SearchBar from "./SearchBar";
import StatsCards from "./StatsCards";
import { activities as rawActivities, dailyGoal } from "../../../data/data";

interface Activity {
  id: string;
  title: string;
  description: string;
  category: "meditation" | "breathing" | "mindfulness" | "sleep" | "journal" | "exercise";
  duration: number;
  tags: string[];
  isFavorite: boolean;
  completedToday?: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  link?: string;
}

const activities: Activity[] = rawActivities.map((activity: any) => ({
  ...activity,
  completedToday: activity.completedToday === "true" || activity.completedToday === true,
}));

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return { greeting: "Good night", icon: Moon, message: "Time for rest and reflection" };
  if (hour < 12) return { greeting: "Good morning", icon: Sunrise, message: "Start your day mindfully" };
  if (hour < 17) return { greeting: "Good afternoon", icon: Sun, message: "Take a mindful break" };
  if (hour < 21) return { greeting: "Good evening", icon: Sunset, message: "Wind down peacefully" };
  return { greeting: "Good night", icon: Moon, message: "Prepare for restful sleep" };
};

export default function MentalWellnessDashboard() {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [doneToday, setDoneToday] = useState(0);
  const [weeklyCompleted, setWeeklyCompleted] = useState<any>(0);

  const incrementCount = async (activity: Activity) => {
    //what's activity and Activity here? or what's its type?
    if (!user) return;

    const { data, error } = await supabase
      .from('userStats')
      .select('done_today')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching done_today:', error);
      return;
    }

    const currentCount = data?.done_today || 0;
    const newCount = currentCount + 1;

    const { error: upsertError } = await supabase
      .from('userStats')
      .upsert({ 
        user_id: user.id, 
        done_today: newCount,
        activity_id: activity.id,
        category: activity.category 
      }, { onConflict: 'user_id' });

    if (upsertError) {
      console.error('Error updating done_today:', upsertError);
    } else {
      console.log('✨ Updated done_today count!');
      setDoneToday(newCount);
    }
  };

  const filteredActivities = activities.filter((activity: Activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? activity.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(id) ? prev.filter((fav: string) => fav !== id) : [...prev, id]
    );
    setActivities((prev: Activity[]) =>
      prev.map((activity: Activity) =>
        activity.id === id ? { ...activity, isFavorite: !activity.isFavorite } : activity
      )
    );
  };

  const [activitiesState, setActivities] = useState<Activity[]>(
    activities.map((activity: Activity) => ({
      ...activity,
      isFavorite: favorites.includes(activity.id),
    }))
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: statsData, error: statsError } = await supabase
          .from('userStats')
          .select('done_today')
          .eq('user_id', user.id)
          .single();

        if (statsError && statsError.code !== 'PGRST116') {
          console.error('Error fetching initial done_today:', statsError);
        } else if (statsData) {
          setDoneToday(statsData.done_today || 0);
        }

        const { data } = await supabase
          .from("dataTable")
          .select("activity_id")
          .eq("user_id", user.id);
        if (data) {
          setFavorites(data.map((item: any) => item.activity_id));
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const updateFavorites = async () => {
        await supabase.from("user_favorites").delete().eq("user_id", user.id);
        await supabase.from("user_favorites").insert(
          favorites.map((activityId: string) => ({
            user_id: user.id,
            activity_id: activityId,
          }))
        );
      };
      updateFavorites();
    }
  }, [favorites, user]);

  const { greeting, icon: GreetingIcon, message } = getTimeBasedGreeting();
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || "Guest";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">You're not logged in</h2>
          <p className="mb-6 text-gray-400">Please log in to access your dashboard.</p>
          <a href="/signin">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg backdrop-blur-lg shadow-xl z-50 transition-colors duration-300">
              Log In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="max-w-7xl mt-14 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mt-10 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GreetingIcon className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-medium text-gray-600">{greeting}, {displayName}</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-500 mb-2">
            What would you like to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              focus on{" "}
            </span>
            today?
          </h2>
          <p className="text-lg text-gray-600 mb-8">{message}</p>

          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          <QuickActions selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>

        <StatsCards completedToday={doneToday} dailyGoal={dailyGoal} weeklyCompleted={weeklyCompleted} />

        {/* Activities Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-700">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredActivities.map((activity: Activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onToggleFavorite={() => toggleFavorite}
                userId={user?.id || ''}
              />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-6 w-6 text-gray-400" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {activitiesState
                .filter((activity: Activity) => favorites.includes(activity.id))
                .slice(0, 3)
                .map((activity: Activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onToggleFavorite={toggleFavorite}
                    userId={user?.id || ''}
                  />
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}