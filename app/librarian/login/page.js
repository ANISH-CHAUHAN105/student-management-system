// app/librarian/login/page.js

import AuthForm from "@/components/AuthForm";
import { loginLibrarian } from "@/lib/api/librarian";

export default function LibrarianLogin() {
  const fields = ["email", "password"];

  return (
    <AuthForm
      role="Librarian"
      type="Login"
      fields={fields}
      apiFunction={loginLibrarian}
      submitEndpoint="/librarian/login"
    />
  );
}
