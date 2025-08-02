"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function UpgradeTierButton({
  onTierChange,
}: {
  onTierChange: (tier: string) => void;
}) {
  const { user, isSignedIn } = useUser();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  async function upgradeTier(newTier: string) {
    if (!isSignedIn) return toast.error("You must be signed in!");
    setLoadingTier(newTier);

    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTier }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upgrade tier");
      }

      toast.success(`✅ Tier upgraded to ${newTier}`);
      await user?.reload();
      onTierChange(newTier);
    } catch {
      toast.error(`⚠️ Something went wrong`);
    } finally {
      setLoadingTier(null);
    }
  }

  const tierColors: Record<string, string> = {
    free: "bg-green-600 hover:bg-green-700",
    silver: "bg-gray-500 hover:bg-gray-600",
    gold: "bg-yellow-500 hover:bg-yellow-600",
    platinum: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-end gap-2">
      {["free", "silver", "gold", "platinum"].map((tier) => (
        <button
          key={tier}
          disabled={loadingTier === tier}
          onClick={() => upgradeTier(tier)}
          className={`flex items-center gap-2 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-md transition-all duration-200 disabled:opacity-50 ${tierColors[tier]}`}
        >
          {loadingTier === tier ? (
            <span className="flex items-center gap-1 sm:gap-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            `Set ${tier.charAt(0).toUpperCase() + tier.slice(1)}`
          )}
        </button>
      ))}
    </div>
  );
}
