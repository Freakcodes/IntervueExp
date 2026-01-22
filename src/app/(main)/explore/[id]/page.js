
import {
  Eye,
  Building2,
  Briefcase,
  GraduationCap,
  CheckCircle,
  XCircle,
  Tag,
  User,
} from "lucide-react";
import ViewTracker from "@/components/ViewTracker";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getExperiencesById,
  incrementExperienceView,
} from "@/app/actions/experience";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const exp = await getExperiencesById(id);

  if (!exp) {
    return {
      title: "Interview Experience Not Found",
    };
  }

  return {
    title: `${exp.company} ${exp.role} Interview Experience`,
    description: exp.experience.slice(0, 150),
  };
}

export default async function ExperiencePage({ params }) {
  const { id } = await params;

  const exp = await getExperiencesById(id);

  if (!exp) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <ViewTracker id={id} />
      {/* Header */}
      <Card>
        <CardHeader className="space-y-3">
          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            {exp.company}
            <span className="text-muted-foreground font-medium">·</span>
            <Briefcase size={18} className="text-muted-foreground" />
            {exp.role}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User size={14} />
              {exp.college || "Anonymous"}
            </span>

            <span className="flex items-center gap-1">
              <GraduationCap size={14} />
              {exp.interviewType}
            </span>

            <span className="flex items-center gap-1">
              <Eye size={14} />
              {exp.views} views
            </span>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap pt-1">
            {/* Result */}
            <Badge
              className={`flex items-center gap-1 ${
                exp.result === "Selected"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {exp.result === "Selected" ? (
                <CheckCircle size={12} />
              ) : (
                <XCircle size={12} />
              )}
              {exp.result}
            </Badge>

            {/* Experience Level */}
            {exp.experienceLevel && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <User size={12} />
                {exp.experienceLevel}
              </Badge>
            )}

            {/* Tags */}
            {exp.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Tag size={12} />
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Experience Content */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Interview Experience</h2>

          <Separator />

          <p className="text-sm leading-relaxed whitespace-pre-line">
            {exp.experience}
          </p>
        </CardContent>
      </Card>
      {exp.additionalTips && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">Additional Tips</h2>

            <Separator />

            <p className="text-sm leading-relaxed whitespace-pre-line">
              {exp.additionalTips}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="text-sm text-muted-foreground">
          {exp.name && (
            <p>
              — Shared by <span className="font-medium">{exp.name}</span>
            </p>
          )}
          <p>Posted on {new Date(exp.created_at).toLocaleDateString()}</p>
        </div>

        <Button variant="outline" asChild>
          <Link href="/explore">← Back to Explore</Link>
        </Button>
      </div>
    </div>
  );
}
