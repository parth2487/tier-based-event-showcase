"use client";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import EventCard from "@/components/EventCard";
import UpgradeTierButton from "@/components/UpgradeTierButton";
import { useEffect, useState } from "react";

const tierOrder = ["free", "silver", "gold", "platinum"];

export default function EventsPage() {
  const { user } = useUser();
  const userTier = (user?.publicMetadata?.tier as string) || "free";
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from("events").select("*");
        if (error) throw error;

        const processed = data.map((event) => ({
          ...event,
          canAccess:
            tierOrder.indexOf(event.tier) <= tierOrder.indexOf(userTier),
        }));

        setEvents(processed);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userTier]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid"></div>
      </div>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Events for {userTier.toUpperCase()} Tier
        </h1>
        <UpgradeTierButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} canAccess={event.canAccess} />
        ))}
      </div>
    </main>
  );
}
