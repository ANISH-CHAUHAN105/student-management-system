// app/admin/login/page.js

"use client";

import AuthForm from "@/components/AuthForm";
import { loginAdmin } from "@/lib/api/admin";

export default function AdminLoginPage() {
  const fields = ["username", "password"];

  return (
    <AuthForm
      role="Admin"
      type="Login"
      fields={fields}
      apiFunction={loginAdmin}
      redirectAfter="/admin/dashboard"
    />
  );
}
