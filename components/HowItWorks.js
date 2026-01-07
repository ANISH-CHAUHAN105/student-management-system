// components/HowItWorks.js

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pencil, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Register",
    description: "Students and faculty register easily.",
    icon: <Pencil className="w-8 h-8 text-blue-400" />,
  },
  {
    step: "2",
    title: "Manage",
    description: "Track courses, fees, hostel, and exams.",
    icon: <Calendar className="w-8 h-8 text-green-400" />,
  },
  {
    step: "3",
    title: "Analyze",
    description: "Get insights from dashboards and reports.",
    icon: <CheckCircle className="w-8 h-8 text-purple-400" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        How It Works
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {steps.map((step) => (
          <Card
            key={step.step}
            className="relative cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg border border-border bg-card"
          >
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent to-primary/30 dark:to-primary/50 pointer-events-none"></div>
            <CardHeader className="flex items-center gap-4 z-10 relative">
              {step.icon}
              <CardTitle className="text-white">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="z-10 relative">
              <p className="text-white/70">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
