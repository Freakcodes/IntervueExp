import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExperienceMiniCard({ id }) {
  return (
    <Link href={`/exp/${id}`}>
      <Card className="w-[200px] cursor-pointer hover:shadow-md transition-shadow">
        <div className="p-3 space-y-1.5">
          {/* Title */}
          <h3 className="font-semibold text-xs leading-tight">
            Amazon · SDE Intern
          </h3>

          {/* Meta */}
          <p className="text-[10px] text-muted-foreground">
            Off-Campus · 3 Rounds
          </p>

          {/* Status */}
          <div className="flex gap-1 flex-wrap">
            <Badge className="bg-green-600 text-white text-[10px] px-1.5 py-0">
              Selected
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0"
            >
              DSA
            </Badge>
          </div>

          {/* Experience Glimpse */}
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
            Online assessment followed by two DSA rounds and one HR discussion.
          </p>
        </div>
      </Card>
    </Link>
  );
}
