// utils/auth.js

// Hardcoded Basic Auth for student registration
export const STUDENT_REG_CREDS = btoa("60448:rahulbhatt"); // example sId:password

//  Login with role-based credentials
// export const login = async (username, password, role) => {
//   try {
//     const basicAuth = btoa(`${username}:${password}`);

//     const res = await fetch(`/api/${role.toLowerCase()}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!res.ok) {
//       const error = await res.json().catch(() => ({}));
//       throw new Error(error.message || "Login failed");
//     }

//     // Store Basic Auth and role for future requests
//     localStorage.setItem("basicAuth", basicAuth);
//     localStorage.setItem("role", role.toLowerCase());

//     return await res.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// Fetch wrapper that automatically sends Basic Auth
export const fetchWithAuth = async (url, options = {}) => {
  const basicAuth = localStorage.getItem("basicAuth");
  const role = localStorage.getItem("role");
  if (!basicAuth || !role) throw new Error("No stored credentials");

  const headers = {
    ...options.headers,
    Authorization: `Basic ${basicAuth}`,
  };

  const res = await fetch(url, { ...options, headers });

  // Safe JSON parsing
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok)
    throw new Error(data.message || `Request failed with status ${res.status}`);
  return data;
};
