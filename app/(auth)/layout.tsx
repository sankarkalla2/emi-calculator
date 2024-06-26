import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session && session.user) return redirect("/");
  return <>{children}</>;
};

export default AuthLayout;
