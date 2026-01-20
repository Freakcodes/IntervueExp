import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  // show 6 placeholder cards
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6 animate-pulse">
      {/* Page Title */}
      <Skeleton className="h-7 w-64" />

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {placeholders.map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            {/* Company + Role */}
            <Skeleton className="h-5 w-3/4" />

            {/* Meta */}
            <Skeleton className="h-4 w-1/2" />

            {/* Badges */}
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            {/* Experience preview */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
