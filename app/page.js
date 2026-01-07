// app/page.js

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Book, GraduationCap } from "lucide-react";

export default function Home() {
  const loginSections = [
    {
      role: "Student",
      description: "Access your courses, dashboard, and personal profile.",
      link: "/student/login",
      icon: <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-400" />,
      cardClasses: "border-blue-400 group",
      titleColor: "text-blue-400 group-hover:text-blue-300",
      buttonColor:
        "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    },
    {
      role: "Faculty",
      description: "Manage classes, track student progress, and access tools.",
      link: "/faculty/login",
      icon: <User className="w-12 h-12 mx-auto mb-4 text-green-400" />,
      cardClasses: "border-green-400 group",
      titleColor: "text-green-400 group-hover:text-green-300",
      buttonColor:
        "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
    },
    {
      role: "Librarian",
      description:
        "Manage books, track inventory, and assist users efficiently.",
      link: "/librarian/login",
      icon: <Book className="w-12 h-12 mx-auto mb-4 text-purple-400" />,
      cardClasses: "border-purple-400 group",
      titleColor: "text-purple-400 group-hover:text-purple-300",
      buttonColor:
        "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    },
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900/90 dark:from-black dark:via-black/70 dark:to-black/90 blur-xl -z-10"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          🎓 ERP-Based Student Management
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Streamline admissions, fees, hostel allocation, and examinations with
          a modern, integrated system – lightweight and user-friendly.
        </p>
      </section>

      {/* Login Sections */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {loginSections.map((section) => (
          <Card
            key={section.role}
            className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg ${section.cardClasses}`}
          >
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent to-primary/30 pointer-events-none"></div>

            <CardHeader className="relative z-10">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {section.icon}
              </div>
              <CardTitle className={`text-xl font-bold ${section.titleColor}`}>
                {section.role}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-4">
                {section.description}
              </p>
              <Link href={section.link}>
                <button
                  className={`${section.buttonColor} text-white px-6 py-2 rounded-lg shadow-lg transition-all font-medium`}
                >
                  Login
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
