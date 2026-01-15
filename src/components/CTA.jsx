import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="relative overflow-hidden border bg-gradient-to-br from-background via-muted/40 to-background">
          
          {/* Soft glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_60%)]" />

          <div className="relative p-10 text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Share Your Interview Experience
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help thousands of aspirants prepare better. Whether you were
              selected or not, your interview experience can guide someone
              else’s journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/create">
                  Share Experience
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">
                  Explore Experiences
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              No account required • Takes less than 3 minutes
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
