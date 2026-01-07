// app/student/register/page.js

"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { registerStudent } from "@/lib/api/student";

export default function StudentRegisterPage() {
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const fields = [
    "studentid",
    "name",
    "branch",
    "college",
    "batch",
    "contact",
    "email",
    "password",
  ];

  // Wrap the API function to handle success/failure messages
  const handleRegisterStudent = async (data) => {
    try {
      const res = await registerStudent(data);
      setRegistrationStatus({
        success: true,
        message: "Registration successful! You can now login.",
      });
      return res;
    } catch (err) {
      setRegistrationStatus({
        success: false,
        message: err.message || "Registration failed",
      });
      throw err;
    }
  };

  return (
    <div>
      {registrationStatus && (
        <p
          className={`text-center py-3 mb-4 rounded ${
            registrationStatus.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {registrationStatus.message}
        </p>
      )}

      <AuthForm
        role="Student"
        type="Register"
        fields={fields}
        apiFunction={handleRegisterStudent}
        redirectAfter="/student/login"
      />
    </div>
  );
}
