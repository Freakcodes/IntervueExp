import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-4xl px-6 pt-20 text-center space-y-8 animate-pulse">
        {/* Badge */}
        <div className="flex justify-center">
          <Skeleton className="h-6 w-72 rounded-full" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-10 w-48 mx-auto" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-4 w-5/6 max-w-2xl mx-auto" />
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Skeleton className="h-11 w-56 rounded-md" />
          <Skeleton className="h-11 w-56 rounded-md" />
        </div>

        {/* Feature Cards */}
        <div className="my-4 grid gap-6 text-left sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Marquee Placeholder */}
        <div className="space-y-3 pt-6">
          <Skeleton className="h-5 w-64 mx-auto" />
          <div className="flex gap-4 overflow-hidden justify-center">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="h-32 w-[200px] rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* CTA Placeholder */}
        <div className="mt-10">
          <Card>
            <CardContent className="p-8 space-y-4 text-center">
              <Skeleton className="h-6 w-64 mx-auto" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-11 w-48 mx-auto rounded-md" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
