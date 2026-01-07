// lib/api/student.js

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Safe JSON parser
async function safeJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

// Student registration
export async function registerStudent(data) {
  try {
    console.log("📦 Register payload:", data);

    const payload = {
      student: {
        sId: data.studentid,
        password: data.password,
      },
      studentCollegeDetails: {
        name: data.name,
        branch: data.branch,
        college: data.college,
        batch: Number(data.batch),
        contact: Number(data.contact),
        email: data.email,
      },
    };

    const res = await fetch(`${API_BASE}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await safeJson(res);
    console.log("✅ Register response:", responseData);

    if (!res.ok) {
      throw new Error(
        responseData.message || `Registration failed with status ${res.status}`
      );
    }

    return responseData;
  } catch (err) {
    console.error("🚨 Register error:", err);
    throw err;
  }
}

// Student login
export async function loginStudent(data) {
  try {
    console.log("📦 Login payload:", data);

    const { studentid, password } = data;
    const basicAuth = btoa(`${studentid}:${password}`);
    localStorage.setItem("basicAuth", basicAuth);
    localStorage.setItem("role", "student");

    const res = await fetch(`${API_BASE}/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ sId: studentid, password }),
    });

    const responseData = await safeJson(res);
    console.log("✅ Login response:", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Login failed");
    }

    return responseData;
  } catch (err) {
    console.error("🚨 Login error:", err);
    throw err;
  }
}
