// app/student/StudentLayout.js

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", link: "/student/dashboard" },
    { name: "Submit Fees Details", link: "/student/fees" },
    { name: "Submit Hostel Details", link: "/student/hostel" },
    {
      name: "Select Courses and Registration",
      link: "/student/select-courses",
    },
    { name: "Submit Courses", link: "/student/course-registration" },
    { name: "Print Results / Course Registration", link: "/student/results" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card backdrop-blur-md border-r border-border shadow-lg transition-transform duration-300 md:translate-x-0 md:static md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-lg font-bold text-foreground">StudentERP</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-accent/20 rounded-md"
          >
            <X className="text-foreground" />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className="block px-4 py-2 rounded-md hover:bg-accent/20 transition-colors text-sm md:text-base font-medium text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Top Bar (mobile) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-accent/20"
          >
            <Menu className="text-foreground" />
          </button>
          <h2 className="font-semibold text-lg text-foreground">
            Student Dashboard
          </h2>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
