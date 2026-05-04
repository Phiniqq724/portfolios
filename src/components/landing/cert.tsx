import React from "react";
import ScrollReveal from "../utils/scrollReveal";
import { createServerSideClient } from "@/utils/server";
import CertList from "./certList";

export default async function CertSection() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .contains("tech_stack", ["CERTIFICATE"])
    .order("partner", { ascending: false });
  if (error) {
    console.error("Error fetching projects:", error);
    return null;
  }

  return (
    <ScrollReveal>
      <section
        id="projects"
        className="md:px-12 md:py-32 px-6 py-16 space-y-16"
      >
        <h1
          className="font-sans text-5xl md:text-center text-start animate-item"
          style={{ letterSpacing: -3.6 }}
        >
          CERTIFICATE
        </h1>
        <CertList data={data} />
      </section>
    </ScrollReveal>
  );
}
