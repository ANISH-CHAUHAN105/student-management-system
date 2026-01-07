// app/student/dashboard/page.js

"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Bell, Menu, X } from "lucide-react";

export default function StudentDashboard() {
  const studentName = "John Doe";
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-md transition-transform duration-300 md:translate-x-0 md:static md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h1 className="text-lg font-bold">StudentERP</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-accent/20 rounded-md transition-colors"
          >
            <X />
          </button>
        </div>
        <nav className="flex-1 mt-4 px-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className="block px-4 py-2 rounded-md hover:bg-accent/30 hover:scale-105 transition-all text-sm md:text-base font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-sidebar-border bg-sidebar">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-accent/20 transition-colors"
          >
            <Menu />
          </button>
          <h2 className="font-semibold text-lg">Student Dashboard</h2>
        </div>

        <main className="flex-1 p-6 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {studentName}
              </span>
            </h2>
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-accent/20 transition-colors relative"
              >
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div
                className={`absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 p-4 transition-transform transform ${
                  notificationsOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <h4 className="font-semibold mb-2 text-card-foreground">
                  Notifications
                </h4>
                <p className="text-sm text-muted-foreground">
                  No new notifications.
                </p>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className="p-6 rounded-xl bg-gradient-to-tr from-blue-50/60 to-purple-50/60 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardTitle className="text-lg md:text-xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Your Dashboard is Ready
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-center">
              Use the sidebar to navigate through your student portal.
            </p>
          </Card>
        </main>
      </div>
    </div>
  );
}
