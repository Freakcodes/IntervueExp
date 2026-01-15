import ExperienceMiniCard from "./ExperienceMiniCard";

const experiences = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ExperienceMarquee() {
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
          {[...experiences, ...experiences].map((id, index) => (
            <ExperienceMiniCard key={index} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
}
