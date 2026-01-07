// app/student/select-courses/page.js

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StudentLayout from "../StudentLayout";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SelectCoursesPage() {
  const courseCategories = {
    Core: ["Mathematics", "Physics", "Computer Science"],
    OpenElective: ["Economics", "Philosophy", "Psychology"],
    ProfessionalElective: ["AI Basics", "Data Structures", "Web Development"],
    "NSS-NCCC": ["Community Service", "Leadership Training"],
  };

  const categoryColors = {
    Core: "bg-green-500 text-white",
    OpenElective: "bg-blue-500 text-white",
    ProfessionalElective: "bg-purple-500 text-white",
    "NSS-NCCC": "bg-yellow-500 text-black",
  };

  const [openCategories, setOpenCategories] = useState({
    Core: true,
  });

  const [selectedCourses, setSelectedCourses] = useState(
    Object.fromEntries(
      Object.entries(courseCategories).map(([cat, courses]) => [
        cat,
        cat === "Core" ? [...courses] : [],
      ])
    )
  );

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleCourse = (category, course) => {
    setSelectedCourses((prev) => {
      const prevCourses = prev[category];
      if (prevCourses.includes(course)) {
        return {
          ...prev,
          [category]: prevCourses.filter((c) => c !== course),
        };
      } else {
        return {
          ...prev,
          [category]: [...prevCourses, course],
        };
      }
    });
  };

  return (
    <StudentLayout>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Select Courses
      </h1>

      <div className="flex flex-col gap-6">
        {Object.entries(courseCategories).map(([category, courses]) => (
          <Card
            key={category}
            className="bg-card text-foreground shadow-lg rounded-xl border border-border hover:shadow-2xl transition-shadow duration-300"
          >
            <CardTitle
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between text-xl md:text-2xl font-bold mb-2 cursor-pointer select-none"
            >
              <span>{category}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[category]}`}
              >
                {category}
              </span>
              {openCategories[category] ? <ChevronUp /> : <ChevronDown />}
            </CardTitle>

            <AnimatePresence>
              {openCategories[category] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="flex flex-col gap-3 pt-2">
                    {courses.map((course) => (
                      <label
                        key={course}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent/10 transition-colors duration-200 ${
                          category === "Core"
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCourses[category].includes(course)}
                          disabled={category === "Core"}
                          onChange={() => toggleCourse(category, course)}
                          className="w-5 h-5 accent-primary rounded-md transition-transform duration-200 checked:scale-110"
                        />
                        <span className="text-foreground font-medium">
                          {course}
                        </span>
                      </label>
                    ))}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}

        {/* Selected Courses Summary */}
        <Card className="bg-card text-foreground shadow-lg rounded-xl border border-border">
          <CardTitle className="text-xl md:text-2xl font-bold mb-2">
            Selected Courses
          </CardTitle>
          <CardContent className="flex flex-wrap gap-2">
            {Object.entries(selectedCourses).map(([category, courses]) =>
              courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                >
                  {course} ({category})
                </span>
              ))
            )}
            {Object.values(selectedCourses).every(
              (arr) => arr.length === 0
            ) && (
              <p className="text-muted-foreground">No courses selected yet.</p>
            )}
          </CardContent>
        </Card>

        <button type="submit" className="btn btn-primary mt-4 w-full md:w-auto">
          Submit Selected Courses
        </button>
      </div>
    </StudentLayout>
  );
}
