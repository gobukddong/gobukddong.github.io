"use client";

import { activities } from "@/data/activities";
import ActivityCard from "./ActivityCard";

export default function ActivityGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((act) => (
        <ActivityCard key={act.id} activity={act} />
      ))}
    </div>
  );
}
