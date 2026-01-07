// app/librarian/register/page.js

"use client";

import AuthForm from "@/components/AuthForm";
import { registerLibrarian } from "@/lib/api/librarian";

export default function LibrarianRegisterPage() {
  const fields = ["name", "college", "email", "contact", "password"];

  return (
    <AuthForm
      role="Librarian"
      type="Register"
      fields={fields}
      apiFunction={registerLibrarian}
      redirectAfter="/librarian/login"
    />
  );
}
