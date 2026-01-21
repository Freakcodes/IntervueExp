// import { getExperiencesById } from "@/app/actions/experience";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getExperiencesById } from "@/app/actions/experience";



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
  console.log(id);
  const exp = await getExperiencesById(id);
  
  
  if (!exp) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight">
            {exp.company} · {exp.role}
          </h1>

          <p className="text-sm text-muted-foreground">
            {exp.college || "Anonymous"} · {exp.interviewType}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Badge
              className={
                exp.result === "Selected"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }
            >
              {exp.result}
            </Badge>

            {exp.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {exp.experienceLevel && (
              <Badge variant="secondary">{exp.experienceLevel}</Badge>
            )}
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
