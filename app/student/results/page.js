// app/student/results/page.js

"use client";

import { useState } from "react";
import StudentLayout from "../StudentLayout";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default function ResultsPage() {
  const [view, setView] = useState("result"); // "result" or "registration"
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");

  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

  const results = [
    { id: "MATH101", name: "Mathematics", gpa: 9.0 },
    { id: "PHY101", name: "Physics", gpa: 8.5 },
    { id: "CS101", name: "Computer Science", gpa: 9.2 },
  ];

  const registration = [
    {
      id: "MATH101",
      name: "Mathematics",
      credits: 4,
      instructor: "Dr. Smith",
      advisorApproved: true,
      registrarApproved: true,
      controllerApproved: true,
    },
    {
      id: "CS101",
      name: "Computer Science",
      credits: 3,
      instructor: "Prof. John",
      advisorApproved: true,
      registrarApproved: false,
      controllerApproved: false,
    },
  ];

  return (
    <StudentLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Results & Registration
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("result")}
          className={`btn ${view === "result" ? "btn-primary" : "btn-outline"}`}
        >
          Print Result
        </button>
        <button
          onClick={() => setView("registration")}
          className={`btn ${
            view === "registration" ? "btn-primary" : "btn-outline"
          }`}
        >
          Registration Status
        </button>
      </div>

      {view === "result" && (
        <Card className="p-4 shadow-lg bg-card text-foreground border border-border rounded-xl">
          <CardTitle className="text-lg font-semibold mb-4">
            Semester-wise Result
          </CardTitle>
          <div className="mb-4">
            <label className="flex flex-col text-foreground">
              Select Semester:
              <select
                className="input mt-1 w-full bg-background text-foreground border-border"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((sem) => (
                  <option key={sem}>{sem}</option>
                ))}
              </select>
            </label>
          </div>

          <table className="w-full border-collapse border border-border text-foreground mb-4">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="border border-border px-2 py-1">Course ID</th>
                <th className="border border-border px-2 py-1">Course Name</th>
                <th className="border border-border px-2 py-1">GPA</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-accent/10">
                  <td className="border border-border px-2 py-1">{r.id}</td>
                  <td className="border border-border px-2 py-1">{r.name}</td>
                  <td className="border border-border px-2 py-1">{r.gpa}</td>
                </tr>
              ))}
              <tr className="bg-muted text-muted-foreground font-semibold">
                <td colSpan={2} className="border border-border px-2 py-1">
                  Semester GPA
                </td>
                <td className="border border-border px-2 py-1">
                  {(
                    results.reduce((acc, r) => acc + r.gpa, 0) / results.length
                  ).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn btn-primary mt-2">Print Results</button>
        </Card>
      )}

      {view === "registration" && (
        <Card className="p-4 shadow-lg bg-card text-foreground border border-border rounded-xl">
          <CardTitle className="text-lg font-semibold mb-4">
            Registration Status
          </CardTitle>

          <table className="w-full border-collapse border border-border text-foreground mb-4">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="border border-border px-2 py-1">Course ID</th>
                <th className="border border-border px-2 py-1">Course Name</th>
                <th className="border border-border px-2 py-1">Credits</th>
                <th className="border border-border px-2 py-1">Instructor</th>
                <th className="border border-border px-2 py-1">Advisor</th>
                <th className="border border-border px-2 py-1">Registrar</th>
                <th className="border border-border px-2 py-1">Controller</th>
              </tr>
            </thead>
            <tbody>
              {registration.map((r) => (
                <tr key={r.id} className="hover:bg-accent/10">
                  <td className="border border-border px-2 py-1">{r.id}</td>
                  <td className="border border-border px-2 py-1">{r.name}</td>
                  <td className="border border-border px-2 py-1">
                    {r.credits}
                  </td>
                  <td className="border border-border px-2 py-1">
                    {r.instructor}
                  </td>
                  <td className="border border-border px-2 py-1">
                    {r.advisorApproved ? "✅" : "❌"}
                  </td>
                  <td className="border border-border px-2 py-1">
                    {r.registrarApproved ? "✅" : "❌"}
                  </td>
                  <td className="border border-border px-2 py-1">
                    {r.controllerApproved ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-primary mt-2">Submit Registration</button>
        </Card>
      )}
    </StudentLayout>
  );
}
