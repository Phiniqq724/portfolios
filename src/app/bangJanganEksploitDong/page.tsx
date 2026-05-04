"use client";

import { createClient } from "@/utils/client";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/bangJanganEksploitDong/dashboard`,
      },
    });

    if (error) {
      console.error("OAuth error:", error);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <button
        className="px-4 py-2 border border-primary/20 text-[#71717A] bg-background font-mono text-xs hover:border-primary hover:text-primary transition-colors duration-200"
        onClick={handleGoogleSignIn}
      >
        LOGIN WITH GOOGLE
      </button>
    </section>
  );
}
