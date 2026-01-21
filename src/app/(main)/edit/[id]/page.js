import { notFound } from "next/navigation";
// import EditExperienceForm from "./EditExperienceForm";
import { getExperienceByEditToken } from "@/app/actions/experience";
import EditExperienceForm from "@/components/EditExperienceForm";



export async function generateMetadata({ params }) {
  const { id } = await params;
  const token = id;

  const exp = await getExperienceByEditToken(token);

  if (!exp) {
    return {
      title: "Interview Experience Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `Edit Interview Experience – ${exp.company} | ${exp.role}`;

  const description =
    exp.experience?.replace(/\s+/g, " ").slice(0, 155) ||
    "Edit your previously submitted interview experience.";

  return {
    title,
    description,

    // 🚫 Do NOT index edit pages
    robots: {
      index: false,
      follow: false,
    },

    // Optional but clean
    alternates: {
      canonical: `/explore/${exp.id}`,
    },
  };
}

export default async function EditPage({ params }) {
 
  
  const  {id} =await params;
   const token=id;
 
  
  const experience = await getExperienceByEditToken(token);

  if (!experience) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <EditExperienceForm initialData={experience} token={token} />
    </div>
  );
}
