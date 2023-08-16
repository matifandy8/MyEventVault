"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../app/database.types";

export default function AuthForm() {
  const isProduction = process.env.NODE_ENV === "production";
  const redirectUrl = isProduction
    ? "https://my-event-vault.vercel.app/auth/callback"
    : "http://localhost:3000/auth/callback";
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={redirectUrl}
    />
  );
}
