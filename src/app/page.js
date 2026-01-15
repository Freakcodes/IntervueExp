import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ExperienceMiniCard from "@/components/ExperienceMiniCard";
import ExperienceMarquee from "@/components/ExperienceMarquee";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-4xl px-6 pt-20 text-center">
        <Badge className="mb-6">
          Real interview experiences • No login required
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Intervue<span className="text-zinc-500">Exp</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Learn from real interview experiences shared by seniors, alumni, and
          candidates — whether they got selected or rejected.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg">
            <Link href={'/create'}>
            Share Your Experience
            </Link>
          </Button>

          <Button variant="outline" size="lg">
            <Link href={'/explore'}>
            Explore Experiences
            </Link>
            
          </Button>
        </div>

        <div className="my-4 grid gap-6 text-left sm:grid-cols-3">
          <FeatureCard
            title="No Login Needed"
            description="Post and read interview experiences instantly without creating an account."
          />
          <FeatureCard
            title="Honest Outcomes"
            description="Selected or rejected — every experience helps someone prepare better."
          />
          <FeatureCard
            title="Edit with Unique ID"
            description="Each post gets a private edit key so you stay in control."
          />
        </div>
        <ExperienceMarquee/>
         <CTA />
      </main>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
