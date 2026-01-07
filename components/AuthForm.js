// components/AuthForm.js

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Client-side API imports (SAFE)
import { loginLibrarian } from "@/lib/api/librarian";

export default function AuthForm({
  role,
  type,
  fields,
  redirectAfter,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      let response;

      // 🔐 Dispatch API call based on role & type
      if (role === "Librarian" && type === "Login") {
        response = await loginLibrarian(formData);
      } else {
        throw new Error("Unsupported authentication operation");
      }

      console.log("✅ API response:", response);

      setSuccessMessage(`${type} successful`);
      localStorage.setItem("role", role.toLowerCase());
      router.push(redirectAfter);
    } catch (err) {
      console.error("🚨 Auth error:", err);
      setError(err?.message || `${type} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="card shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {role} {type}
        </h1>

        {error && <p className="text-center text-destructive mb-4">{error}</p>}
        {successMessage && (
          <p className="text-center text-success mb-4">{successMessage}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {fields.map((field) => (
            <div key={field} className="relative flex flex-col">
              <label className="mb-2 font-medium capitalize">
                {field}
              </label>

              <input
                type={
                  field === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : "text"
                }
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`px-4 py-3 rounded-lg border ${
                  field === "password" ? "pr-10" : ""
                }`}
                required
              />

              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-11 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-lg bg-primary text-primary-foreground ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? `${type}ing...` : type}
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-muted-foreground text-center">
          {type === "Login" ? (
            role.toLowerCase() !== "admin" && (
              <>
                Don’t have an account?{" "}
                <a
                  href={`/${role.toLowerCase()}/register`}
                  className="text-accent hover:underline"
                >
                  Register
                </a>
              </>
            )
          ) : (
            <>
              Already have an account?{" "}
              <a
                href={`/${role.toLowerCase()}/login`}
                className="text-accent hover:underline"
              >
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
