// app/faculty/login/page.js

"use client";

import AuthForm from "@/components/AuthForm";
import { loginFaculty } from "@/lib/api/faculty";

export default function FacultyLoginPage() {
  const fields = ["name", "password"];
  return (
    <AuthForm
      role="Faculty"
      type="Login"
      fields={fields}
      apiFunction={loginFaculty}
      redirectAfter="/faculty/dashboard"
    />
  );
}
