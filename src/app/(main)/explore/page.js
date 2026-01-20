import { searchExperiences } from "@/app/actions/experience";
import ExperienceCard from "./_components/ExperienceCard";
import SearchBar from "./_components/SearchBar";
import PaginationControls from "./_components/PaginationControls";

export default async function ExplorePage({ searchParams }) {
  const { query, result,page } = await searchParams;
  const limit=10;
  const currentPage = Number(page) || 1;
  const experiences = await searchExperiences({
    query: query || "",
    result: result || "all",
    page:currentPage,
    limit
  });

  

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Interview Experiences</h1>

      <SearchBar />

      {experiences.length === 0 && (
        <p className="text-muted-foreground">No experiences found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>

      <PaginationControls
        page={currentPage}
        hasNext={experiences.length === limit}
      />
    </div>
  );
}
