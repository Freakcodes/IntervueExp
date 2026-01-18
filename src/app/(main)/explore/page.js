import { getExperiences } from "@/app/actions/experience";
import ExperienceCard from "./_components/ExperienceCard";


export default async function ExplorePage() {
  const experiences = await getExperiences();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Interview Experiences</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
