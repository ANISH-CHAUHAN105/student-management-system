// app/admin/register/page.js

"use client";

import AuthForm from "@/components/AuthForm";
import { registerAdmin } from "@/lib/api/admin";

export default function AdminRegisterPage() {
  const fields = ["username", "password"];

  return (
    <AuthForm
      role="Faculty"
      type="Register"
      fields={fields}
      apiFunction={registerAdmin}
      redirectAfter="/admin/login"
    />
  );
}
