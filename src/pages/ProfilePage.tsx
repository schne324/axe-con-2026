import { useState } from "react";
import { useAuth } from "../auth/authContext";

type Trip = {
  id: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  fare: string;
  status: "Confirmed" | "Completed";
  image: string;
};

const TRIPS: Trip[] = [
  {
    id: "t-001",
    from: "Boston, MA",
    to: "New York, NY",
    date: "2026-06-12",
    departureTime: "8:15 AM",
    fare: "$89",
    status: "Confirmed",
    image: "new-york.svg",
  },
  {
    id: "t-002",
    from: "Chicago, IL",
    to: "Denver, CO",
    date: "2026-04-02",
    departureTime: "6:00 AM",
    fare: "$215",
    status: "Completed",
    image: "denver.svg",
  },
  {
    id: "t-003",
    from: "Seattle, WA",
    to: "Portland, OR",
    date: "2026-07-20",
    departureTime: "9:45 AM",
    fare: "$54",
    status: "Confirmed",
    image: "portland.svg",
  },
  {
    id: "t-004",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    date: "2026-02-18",
    departureTime: "7:30 AM",
    fare: "$129",
    status: "Completed",
    image: "los-angeles.svg",
  },
];

function initialsFor(displayName: string, email: string): string {
  const source = displayName || email;
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatMemberSince(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTripDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
  >
    <path d="M12 2.5l2.95 6 6.6.96-4.78 4.65 1.13 6.57L12 17.6l-5.9 3.1 1.13-6.57L2.45 9.46l6.6-.96L12 2.5z" />
  </svg>
);

export default function ProfilePage() {
  const { session, logout } = useAuth();
  const [filter, setFilter] = useState("");

  // RequireAuth guards this route, but narrow the type defensively.
  if (!session) return null;

  const tripImageBase = `${import.meta.env.BASE_URL}trips/`;
  const visibleTrips = TRIPS.filter((trip) => {
    const q = filter.trim().toLowerCase();
    if (!q) return true;
    return (
      trip.from.toLowerCase().includes(q) ||
      trip.to.toLowerCase().includes(q) ||
      trip.status.toLowerCase().includes(q)
    );
  });

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a2e4a]/20 to-transparent px-8 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="w-16 h-16 rounded-full bg-[#1a2e4a] text-white flex items-center justify-center text-xl font-bold"
            >
              {initialsFor(session.displayName, session.email)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {session.displayName}
              </h1>
              <p className="text-gray-500 text-sm">{session.email}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex flex-col gap-8">
          <section>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Account
            </h2>
            <dl className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
              <dt className="text-gray-500">Email</dt>
              <dd className="text-gray-900">{session.email}</dd>
              <dt className="text-gray-500">Display name</dt>
              <dd className="text-gray-900">{session.displayName}</dd>
              <dt className="text-gray-500">Member since</dt>
              <dd className="text-gray-900">
                {formatMemberSince(session.memberSince)}
              </dd>
            </dl>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Trip History
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#fef3c7] text-[#92400e] hover:bg-[#fde68a] transition-colors"
                >
                  <StarIcon />
                  Featured
                </button>

                {/* AXE: label — no <label>, no aria-label, no aria-labelledby */}
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter trips"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 bg-white w-40 focus:outline-none focus:ring-2 focus:ring-[#1a2e4a] focus:border-transparent"
                />
              </div>
            </div>

            {/* AXE: empty-heading — placeholder section heading was never filled in */}
            <h3 className="text-base font-semibold text-gray-900 mb-3"></h3>

            {visibleTrips.length === 0 ? (
              <p className="text-sm text-gray-500">
                No trips match that filter.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
                {visibleTrips.map((trip) => (
                  <li
                    key={trip.id}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col"
                  >
                    {/* AXE: image-alt — no alt attribute on the destination image */}
                    <img
                      src={`${tripImageBase}${trip.image}`}
                      className="w-full h-32 object-cover"
                    />

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-base font-semibold text-gray-900 leading-tight">
                            {trip.from} <span aria-hidden="true">→</span>{" "}
                            {trip.to}
                          </p>
                          <p className="text-xs mt-1">
                            {formatTripDate(trip.date)} · {trip.departureTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-sm font-semibold text-[#1a2e4a]">
                          {trip.fare}
                        </span>
                        {trip.status === "Completed" ? (
                          // AXE: color-contrast — gray-200 text on gray-100 background is ~1.2:1
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-200">
                            Completed
                          </span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Confirmed
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div>
            <button
              type="button"
              onClick={logout}
              className="py-2 px-5 rounded-lg border-2 border-gray-300 text-[#1a2e4a] hover:bg-[#1a2e4a]/5 transition-colors font-semibold"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
