// components/StudentSidebar.js
"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function StudentSidebar({ sidebarOpen, setSidebarOpen }) {
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
    <aside
      className={`fixed md:relative z-50 top-0 left-0 h-full bg-sidebar dark:bg-sidebar-dark text-foreground transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-lg font-bold">StudentERP</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1 hover:bg-accent/20 rounded-md transition-colors"
        >
          <X />
        </button>
      </div>

      <nav className="flex-1 mt-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.link}
            className="flex items-center gap-3 p-3 mx-2 rounded-md hover:bg-accent/20 transition-colors"
          >
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
