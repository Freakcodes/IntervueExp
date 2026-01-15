import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExperienceCard from "./_components/ExperienceCard";
// import ExperienceCard from "@/app/_components/ExperienceCard";

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      {/* Search + Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search by company, role, or college..."
          className="sm:max-w-sm"
        />

        <div className="flex gap-2">
          <Button variant="outline">On-Campus</Button>
          <Button variant="outline">Off-Campus</Button>
          <Button variant="outline">Selected</Button>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </div>
  );
}
