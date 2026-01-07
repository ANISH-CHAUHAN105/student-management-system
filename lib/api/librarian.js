// lib/api/librarian.js

import { fetchWithAuth } from "@/utils/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper to safely parse JSON
async function safeJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

// Librarian registration
export async function registerLibrarian(data) {
  try {
    console.log("📦 Librarian registration payload:", data);
    const res = await fetchWithAuth(
      `${API_BASE}/api/librarian/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      "librarian"
    );
    console.log("✅ Librarian registration response:", res);
    return res;
  } catch (err) {
    console.error("🚨 Librarian registration error:", err);
    throw err;
  }
}

// Get all books
export async function getAllBooks() {
  try {
    console.log("📦 Fetching all books for librarian");
    const res = await fetchWithAuth(
      `${API_BASE}/api/librarian/books`,
      { method: "GET" },
      "librarian"
    );
    console.log("✅ Librarian books response:", res);
    return res;
  } catch (err) {
    console.error("🚨 Error fetching books:", err);
    throw err;
  }
}

// Librarian login
export async function loginLibrarian(data) {
  try {
    console.log("📦 Librarian login payload:", data);
    const { email, password } = data;
    const basicAuth = btoa(`${email}:${password}`);
    localStorage.setItem("librarianToken", basicAuth);
    localStorage.setItem("role", "librarian");

    const res = await fetch(`${API_BASE}/librarian/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errData = await safeJson(res);
      throw new Error(errData.message || "Login failed");
    }

    const json = await safeJson(res);
    console.log("✅ Librarian login response:", json);
    return json;
  } catch (err) {
    console.error("🚨 Librarian login error:", err);
    throw err;
  }
}
