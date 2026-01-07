// app/faculty/register/page.js

"use client";

import AuthForm from "@/components/AuthForm";
import { registerFaculty } from "@/lib/api/faculty";

export default function FacultyRegisterPage() {
  const fields = [
    "name",
    "department",
    "college",
    "email",
    "contact",
    "password",
  ];

  return (
    <AuthForm
      role="Faculty"
      type="Register"
      fields={fields}
      apiFunction={registerFaculty}
      redirectAfter="/faculty/login"
    />
  );
}
