import React from "react";
import { createServerSideClient } from "@/utils/server";
import HeroSection from "@/components/detailProject/hero";
import DescSection from "@/components/detailProject/description";
import CTASection from "@/components/projects/cta";
import { notFound } from "next/navigation";

export default async function DetailArchive({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createServerSideClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <>
      <HeroSection project={project} />
      <DescSection project={project} />
      <CTASection />
    </>
  );
}
