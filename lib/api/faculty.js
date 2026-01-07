// lib/api/faculty.js

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

// Faculty registration
export async function registerFaculty(data) {
  try {
    console.log("📦 Faculty registration payload:", data);
    const res = await fetchWithAuth(
      `${API_BASE}/api/faculty/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      "faculty"
    );

    console.log("✅ Faculty registration response:", res);
    return res;
  } catch (err) {
    console.error("🚨 Faculty registration error:", err);
    throw err;
  }
}

// Get all students (faculty dashboard)
export async function getAllStudents() {
  try {
    console.log("📦 Fetching all students for faculty");
    const res = await fetchWithAuth(
      `${API_BASE}/api/faculty/students`,
      { method: "GET" },
      "faculty"
    );

    console.log("✅ Faculty students response:", res);
    return res;
  } catch (err) {
    console.error("🚨 Error fetching faculty students:", err);
    throw err;
  }
}

// Faculty login
export async function loginFaculty(data) {
  try {
    console.log("📦 Faculty login payload:", data);
    const { email, password } = data;
    const basicAuth = btoa(`${email}:${password}`);
    localStorage.setItem("facultyToken", basicAuth);
    localStorage.setItem("role", "faculty");

    const res = await fetch(`${API_BASE}/faculty/login`, {
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
    console.log("✅ Faculty login response:", json);
    return json;
  } catch (err) {
    console.error("🚨 Faculty login error:", err);
    throw err;
  }
}
