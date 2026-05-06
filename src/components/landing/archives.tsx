import React from "react";

export default function ArchiveSection() {
  return (
    <section
      className="md:px-12 md:py-32 px-6 py-16 space-y-16 flex justify-between gap-12"
      id="archives"
    >
      <div className="space-y-4 animate-item">
        <h1 className="font-sans text-5xl" style={{ letterSpacing: -3.6 }}>
          ARCHIVES
        </h1>
        <p className="text-secondary-foreground font-sans">
          Functional aesthetic in development
        </p>
      </div>
    </section>
  );
}
