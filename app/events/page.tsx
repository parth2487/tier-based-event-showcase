"use client";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import EventCard from "@/components/EventCard";
import UpgradeTierButton from "@/components/UpgradeTierButton";
import { useEffect, useState } from "react";

const tierOrder = ["free", "silver", "gold", "platinum"];

export default function EventsPage() {
  const { user, isLoaded } = useUser(); // ✅ Check if Clerk is loaded
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userTier, setUserTier] = useState<string>("");

  async function fetchEvents(selectedTier: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("events").select("*");
      if (error) throw error;

      const processed = data.map((event) => ({
        ...event,
        canAccess:
          tierOrder.indexOf(event.tier) <= tierOrder.indexOf(selectedTier),
      }));

      setEvents(processed);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (isLoaded) {
      const tier = (user?.publicMetadata?.tier as string) || "free";
      setUserTier(tier);
      fetchEvents(tier);
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <main className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Events for {userTier.toUpperCase()} Tier
        </h1>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <UpgradeTierButton
            onTierChange={(tier) => {
              setUserTier(tier);
              fetchEvents(tier);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} canAccess={event.canAccess} />
        ))}
      </div>
    </main>
  );
}
