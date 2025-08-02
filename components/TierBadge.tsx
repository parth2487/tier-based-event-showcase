export default function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    free: "bg-green-100 text-green-700",
    silver: "bg-gray-200 text-gray-700",
    gold: "bg-yellow-200 text-yellow-700",
    platinum: "bg-blue-200 text-blue-700",
  };

  return (
    <span
      className={`inline-block px-2 py-1 mt-2 rounded text-xs font-semibold ${colors[tier]}`}
    >
      {tier.toUpperCase()}
    </span>
  );
}
