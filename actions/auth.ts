"use server";

import { signIn } from "@/auth";

export const login = async (provider: "github" | "google") => {
  await signIn(provider, { redirectTo: "/" });
};
