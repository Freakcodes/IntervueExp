import { notFound } from "next/navigation";
// import EditExperienceForm from "./EditExperienceForm";
import { getExperienceByEditToken } from "@/app/actions/experience";
import EditExperienceForm from "@/components/EditExperienceForm";

export default async function EditPage({ params }) {
  const { token } = params;

  const experience = await getExperienceByEditToken(token);

  if (!experience) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <EditExperienceForm initialData={experience} token={token} />
    </div>
  );
}
