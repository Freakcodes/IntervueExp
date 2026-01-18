import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExperienceMiniCard({ exp }) {
  const glimpse =
    exp.experience.length > 120
      ? exp.experience.substring(0, 120) + "..."
      : exp.experience;

  const primaryTag = exp.tags?.[0] ?? "General";

  return (
    <Link href={`/exp/${exp.id}`}>
      <Card className="w-[200px] cursor-pointer hover:shadow-md transition-shadow">
        <div className="p-3 space-y-1.5">
          {/* Title */}
          <h3 className="font-semibold text-xs leading-tight">
            {exp.company} · {exp.role}
          </h3>

          {/* Meta */}
          <p className="text-[10px] text-muted-foreground">
            {exp.college || "Anonymous"} · {exp.interviewType}
          </p>

          {/* Status + Tag */}
          <div className="flex gap-1 flex-wrap">
            <Badge
              className={
                exp.result === "Selected"
                  ? "bg-green-600 text-white text-[10px] px-1.5 py-0"
                  : "bg-red-600 text-white text-[10px] px-1.5 py-0"
              }
            >
              {exp.result}
            </Badge>

            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0"
            >
              {primaryTag}
            </Badge>
          </div>

          {/* Experience Glimpse */}
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
            {glimpse}
          </p>
        </div>
      </Card>
    </Link>
  );
}
