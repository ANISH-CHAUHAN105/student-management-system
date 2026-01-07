// lib/api/admin.js

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

// Admin registration
export async function registerAdmin(data) {
  try {
    console.log("📦 Admin registration payload:", data);
    const res = await fetch(`${API_BASE}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await safeJson(res);
      throw new Error(
        errData.message || `Registration failed with status ${res.status}`
      );
    }

    const json = await safeJson(res);
    console.log("✅ Admin registration response:", json);
    return json;
  } catch (err) {
    console.error("🚨 Admin registration error:", err);
    throw err;
  }
}

// Admin login
export async function loginAdmin(data) {
  try {
    console.log("📦 Admin login payload:", data);
    const { username, password } = data;

    const basicAuth = btoa(`${username}:${password}`);
    localStorage.setItem("basicAuth", basicAuth);
    localStorage.setItem("role", "admin");

    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errData = await safeJson(res);
      throw new Error(errData.message || "Login failed");
    }

    const json = await safeJson(res);
    console.log("✅ Admin login response:", json);
    return json;
  } catch (err) {
    console.error("🚨 Admin login error:", err);
    throw err;
  }
}

// Get students by status: pending / approved / rejected
export async function getStudentsByStatus(status) {
  try {
    console.log(`📦 Fetching students with status: ${status}`);
    const res = await fetchWithAuth(
      `${API_BASE}/api/admin/students?status=${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Students response:", res);
    return res;
  } catch (err) {
    console.error(`🚨 Error fetching ${status} students:`, err);
    throw err;
  }
}

// Approve or reject a student
export async function approveOrRejectStudent(studentId, action) {
  try {
    console.log(`📦 ${action} student:`, studentId);

    if (!["approve", "reject"].includes(action)) {
      throw new Error("Invalid action. Must be 'approve' or 'reject'.");
    }

    const url = `${API_BASE}/api/admin/students?status=${action}&studentId=${studentId}`;

    const res = await fetchWithAuth(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    console.log(`✅ ${action} student response:`, res);
    return res;
  } catch (err) {
    console.error(`🚨 Error ${action} student:`, err);
    throw err;
  }
}
