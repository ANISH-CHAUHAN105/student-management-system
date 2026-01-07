// components/DashboardStats.js

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, BookOpen, DollarSign } from "lucide-react";

const stats = [
  {
    name: "Students",
    value: "1,245",
    icon: <Users className="w-8 h-8 text-blue-400" />,
  },
  {
    name: "Courses",
    value: "58",
    icon: <BookOpen className="w-8 h-8 text-green-400" />,
  },
  {
    name: "Fees Collected",
    value: "$120,450",
    icon: <DollarSign className="w-8 h-8 text-purple-400" />,
  },
];

export default function DashboardStats() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.name}
          className="relative cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg border border-border bg-card"
        >
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br from-transparent to-primary/30 dark:to-primary/50 pointer-events-none"></div>
          <CardHeader className="flex items-center gap-4 z-10 relative">
            {stat.icon}
            <CardTitle className="text-white">{stat.name}</CardTitle>
          </CardHeader>
          <CardContent className="z-10 relative">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
