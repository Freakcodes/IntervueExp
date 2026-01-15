export default function ExploreLayout({ children }) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Interview Experiences
        </h1>
        <p className="text-muted-foreground mt-1">
          Learn from real interview journeys shared by seniors and alumni.
        </p>
      </div>

      {children}
    </section>
  );
}
