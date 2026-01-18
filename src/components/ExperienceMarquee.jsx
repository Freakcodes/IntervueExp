import ExperienceMiniCard from "./ExperienceMiniCard";
import { getExperiences } from "@/app/actions/experience";

export default async function ExperienceMarquee() {
  const experiences = await getExperiences();

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden py-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">
          Recently Shared Experiences
        </h2>
        <p className="text-sm text-muted-foreground">
          Click any card to read the full interview experience
        </p>
      </div>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          {[...experiences, ...experiences].map((exp, index) => (
            <ExperienceMiniCard key={`${exp.id}-${index}`} exp={exp} />
          ))}
        </div>
      </div>
    </div>
  );
}
