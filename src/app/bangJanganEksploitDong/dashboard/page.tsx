"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import { Project } from "@/utils/supabase";
import ReactMarkdown from "react-markdown";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    year: new Date().getFullYear(),
    description: "",
    tech_stack: "",
    link: "",
    partner: "",
    images: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("year", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls: string[] = [];
    setUploading(true);

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

      const { error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file);
      if (error) {
        setError(error.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    setUploading(false);
    setUploadedImages((prev) => [...prev, ...urls]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(uploadedImages);

    const projectPayload = {
      name: formData.name,
      role: formData.role,
      year: formData.year,
      description: formData.description,
      tech_stack: formData.tech_stack.split(",").map((t) => t.trim()),
      link: formData.link || null,
      partner: formData.partner || null,
      images: uploadedImages,
    };

    console.log("Project payload:", projectPayload);
    try {
      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectPayload)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectPayload]);

        if (error) throw error;
      }

      resetForm();
      fetchProjects();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      name: project.name,
      role: project.role,
      year: project.year,
      description: project.description,
      tech_stack: project.tech_stack.join(", "),
      link: project.link || "",
      partner: project.partner || "",
      images: project.images?.join(",") || "",
    });

    console.log(formData);

    console.log("Existing images:", project.images);
    console.log("Uploaded images:", uploadedImages);

    setEditingId(project.id);
    setShowForm(true);
    setPreviewMode(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Beneran mau delete project ini?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;
      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      year: new Date().getFullYear(),
      description: "",
      tech_stack: "",
      link: "",
      partner: "",
      images: "",
    });
    setUploadedImages([]);
    setEditingId(null);
    setShowForm(false);
    setPreviewMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center font-mono">
        <div className="text-sm tracking-widest">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="  w-full text-black p-8  font-mono">
      <div className="-mx-[calc((100vw-100%)/2)] px-64 ">
        {/* Header */}
        <div className="mb-12 border-b border-primary/10 pb-8">
          <h1 className="text-4xl font-bold mb-2 tracking-tighter">
            PROJECT CONTROL
          </h1>
          <p className="text-primary/60 text-sm">Manage your project archive</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        {/* Add Project Button */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="mb-8 px-4 py-2 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-200 text-sm tracking-widest"
          >
            + ADD PROJECT
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-12 p-6 border border-primary/20 bg-primary/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl tracking-widest">
                {editingId ? "EDIT PROJECT" : "NEW PROJECT"}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`px-3 py-1 text-xs border transition-all ${
                    previewMode
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-primary/20 text-primary/60 hover:text-primary"
                  }`}
                >
                  {previewMode ? "EDIT" : "PREVIEW"}
                </button>
                <button
                  onClick={resetForm}
                  className="px-3 py-1 text-xs border border-primary/20 text-primary/60 hover:text-primary transition-all"
                >
                  CANCEL
                </button>
              </div>
            </div>

            {!previewMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Project name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 bg-background border border-primary/20 text-primary p-3 text-sm placeholder-primary/40 focus:outline-none focus:border-primary/60"
                  />

                  <input
                    type="text"
                    name="role"
                    placeholder="Your role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="bg-background border border-primary/20 text-primary p-3 text-sm placeholder-primary/40 focus:outline-none focus:border-primary/60"
                  />

                  <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="bg-background border border-primary/20 text-primary p-3 text-sm placeholder-primary/40 focus:outline-none focus:border-primary/60"
                  />

                  <input
                    type="text"
                    name="partner"
                    placeholder="Partner (optional)"
                    value={formData.partner}
                    onChange={handleInputChange}
                    className="col-span-2 bg-background border border-primary/20 text-primary p-3 text-sm placeholder-primary/40 focus:outline-none focus:border-primary/60"
                  />

                  <input
                    type="text"
                    name="link"
                    placeholder="Project link (optional)"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="col-span-2 bg-background border border-primary/20 text-primary p-3 text-sm placeholder-primary/40 focus:outline-none focus:border-primary/60"
                  />

                  <textarea
                    name="tech_stack"
                    placeholder="Tech stack (comma separated: React, Node.js, etc)"
                    value={formData.tech_stack}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 bg-background border border-primary/20 text-primary p-3 text-sm placeholder-primary/40 focus:outline-none focus:border-primary/60 h-12"
                  />
                </div>
                <div>
                  <label className="block text-xs text-primary/60 mb-2">
                    IMAGES
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full bg-background border border-primary/20 text-primary p-3 text-sm focus:outline-none focus:border-primary/60"
                  />
                </div>

                <div>
                  <label className="block text-xs text-primary/60 mb-2">
                    DESCRIPTION (MARKDOWN)
                  </label>
                  <MDEditor
                    value={formData.description}
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: val ?? "",
                      }))
                    }
                    height={300}
                    data-color-mode="light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full px-4 py-3 bg-primary text-white border border-primary hover:bg-background hover:text-primary transition-all duration-200 text-sm font-bold tracking-widest disabled:bg-primary/50 disabled:border-0  disabled:text-white/70 disabled:cursor-wait"
                >
                  {editingId ? "UPDATE PROJECT" : "CREATE PROJECT"}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-primary/60 mb-2">
                    {formData.name}
                  </h3>
                  <p className="text-xs text-primary/40">
                    {formData.role} • {formData.year}
                  </p>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown>{formData.description}</ReactMarkdown>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tech_stack.split(",").map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-primary/20 text-primary/80"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-sm text-primary/60 tracking-widest mb-4">
            ARCHIVES ({projects.length})
          </h2>

          {projects.length === 0 ? (
            <div className="p-8 border border-primary/10 text-center text-primary/40 text-sm">
              No projects yet. Create your first one!
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group p-4 border border-primary/10 hover:border-primary/40 bg-primary/2 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold mb-1 truncate">
                        {project.name}
                      </h3>
                      <p className="text-xs text-primary/60 mb-2">
                        {project.role} • {project.year}
                      </p>
                      <p className="text-xs text-primary/40 line-clamp-2 mb-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 text-xs border border-primary/10 text-primary/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-3 py-1 text-xs border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 text-xs border border-primary/30 text-primary hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
