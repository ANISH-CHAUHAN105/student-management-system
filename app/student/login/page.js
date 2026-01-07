// app/student/login/page.js

"use client";

import AuthForm from "@/components/AuthForm";
import { loginStudent } from "@/lib/api/student";

export default function StudentLoginPage() {
  const fields = ["studentid", "password"];

  return (
    <AuthForm
      role="Student"
      type="Login"
      fields={fields}
      apiFunction={loginStudent}
      redirectAfter="/student/dashboard"
    />
  );
}
