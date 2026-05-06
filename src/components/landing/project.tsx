import { Project } from "@/utils/supabase";
import { createServerSideClient } from "@/utils/server";
import ErrorToast from "../utils/errorHandler";
import ProjectList from "../utils/projectList";
import ButtonRandom from "../ui/buttonRandom";
import ScrollReveal from "../utils/scrollReveal";

export default async function ProjectSection() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false });

  const projects: Project[] = (data ?? []).map((p) => ({
    ...p,
    techStack: p.tech_stack,
  }));
  return (
    <ScrollReveal>
      <section
        id="projects"
        className="md:px-12 md:py-32 px-6 py-16 space-y-16 "
      >
        {error && (
          <ErrorToast message="Failed to load projects. Please try again later." />
        )}
        <div className=" space-y-16">
          <ProjectList projects={projects} />
        </div>
        <div className="w-full flex justify-center animate-items">
          <ButtonRandom />
        </div>
      </section>
    </ScrollReveal>
  );
}
