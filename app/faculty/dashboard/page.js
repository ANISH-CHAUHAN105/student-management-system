// app/faculty/dashboard/page.js

"use client";

import { useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { UserCheck, UserX, Menu } from "lucide-react";

export default function FacultyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const [studentRequests, setStudentRequests] = useState([
    { id: 1, name: "John Doe", course: "B.Tech CS", status: "Pending" },
    { id: 2, name: "Jane Smith", course: "B.Tech IT", status: "Pending" },
    { id: 3, name: "Alice Johnson", course: "BBA", status: "Pending" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setStudentRequests((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // Filtered requests
  const filteredRequests =
    filter === "All"
      ? studentRequests
      : studentRequests.filter((student) => student.status === filter);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border w-full">
        <h1 className="text-xl font-bold">Faculty Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded hover:bg-muted"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-background border-r border-border p-5 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-6 hidden md:block">
          Faculty Panel
        </h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-primary">
            Dashboard
          </a>
          <a href="#" className="hover:text-primary">
            Student Requests
          </a>
          <a href="#" className="hover:text-primary">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 md:ml-64">
        <h2 className="text-3xl font-bold mb-4">Welcome, Faculty</h2>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Student Requests Table */}
        <section>
          <Card>
            <CardTitle>Student Requests</CardTitle>
            <CardContent>
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="p-2">Student Name</th>
                    <th className="p-2">Course</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((student) => (
                    <tr key={student.id} className="border-b border-border">
                      <td className="p-2">{student.name}</td>
                      <td className="p-2">{student.course}</td>
                      <td
                        className={`p-2 font-semibold ${
                          student.status === "Approved"
                            ? "text-green-600"
                            : student.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {student.status}
                      </td>
                      <td className="p-2 flex gap-2 flex-wrap">
                        <button
                          className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() =>
                            handleStatusChange(student.id, "Approved")
                          }
                        >
                          <UserCheck className="w-4 h-4" /> Approve
                        </button>
                        <button
                          className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() =>
                            handleStatusChange(student.id, "Rejected")
                          }
                        >
                          <UserX className="w-4 h-4" /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRequests.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center p-4 text-muted-foreground"
                      >
                        No {filter} requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
