import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ExperienceCard({ experience }) {
  const {
    id,
    name,
    company,
    role,
    college,
    interview_type,
    result,
    tags,
    experience: description,
  } = experience;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="space-y-1">
        {/* Title */}
        <h3 className="font-semibold text-lg">
          {company} · {role}
        </h3>

        {/* Meta */}
        <p className="text-sm text-muted-foreground">
          {college || "Unknown College"} · {interview_type}
        </p>

        {/* Name */}
        <p className="text-xs text-muted-foreground">
          Shared by{" "}
          <span className="font-medium">
            {name?.trim() ? name : "Anonymous"}
          </span>
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {tags?.map((tag, index) => (
            <Badge
              key={index}
              variant={index === 0 ? "default" : "secondary"}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Experience Glimpse */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* Result */}
        <Badge
          className={
            result === "Selected"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }
        >
          {result}
        </Badge>

        {/* Read More */}
        <Link href={`/exp/${id}`}>
          <Button size="sm" variant="ghost">
            Read more →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
