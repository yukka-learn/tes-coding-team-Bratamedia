"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prev: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email === "admin@example.com" && password === "admin") {
    cookies().set("session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    redirect("/dashboard");
  }

  return { error: "Invalid credentials" };
}

export async function logout() {
  cookies().delete("session");

  redirect("/login");
}
