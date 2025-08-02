import TierBadge from "./TierBadge";

export default function EventCard({
  event,
  canAccess,
}: {
  event: any;
  canAccess: boolean;
}) {
  return (
    <div
      className={`border rounded-lg p-4 shadow bg-white relative ${
        !canAccess ? "opacity-70" : ""
      }`}
    >
      <img
        src={event.image_url || "https://via.placeholder.com/300"}
        alt={event.title}
        className="w-full h-40 object-cover rounded mb-3"
      />

      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-gray-500">
        {new Date(event.event_date).toLocaleDateString()}
      </p>

      <TierBadge tier={event.tier} />

      {!canAccess && (
        <p className="mt-2 text-red-500 text-sm">
          🔒 Upgrade to {event.tier} to access this event
        </p>
      )}
    </div>
  );
}
