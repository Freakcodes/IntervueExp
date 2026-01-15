import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ExperienceCard() {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="space-y-1">
        <h3 className="font-semibold text-lg">Amazon SDE Intern</h3>
        <p className="text-sm text-muted-foreground">
          IIT Delhi · Off-Campus
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex gap-2 flex-wrap">
          <Badge>DSA</Badge>
          <Badge variant="secondary">System Design</Badge>
          <Badge variant="outline">Online Assessment</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          The interview consisted of 3 rounds. First was DSA focused on arrays
          and recursion, followed by a machine coding round...
        </p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Badge className="bg-green-600 text-white">Selected</Badge>
        <Button size="sm" variant="ghost">
          Read more →
        </Button>
      </CardFooter>
    </Card>
  );
}
