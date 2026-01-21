import CreateExperienceForm from "./_components/CreateExperienceForm";

export default function CreatePage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Share Your Interview Experience
        </h1>
        <p className="text-muted-foreground mt-1">
          Help Job Aspirants by sharing your real interview journey. No account needed.
        </p>
      </div>

      <CreateExperienceForm />
    </div>
  );
}
