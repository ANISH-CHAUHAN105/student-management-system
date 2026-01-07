// app/student/course-registration/page.js

"use client";

import { useState } from "react";
import StudentLayout from "../StudentLayout";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default function CourseRegistrationPage() {
  const [courses, setCourses] = useState([
    {
      code: "CS101",
      name: "Mathematics",
      credits: 4,
      instructor: "Dr. A",
      registered: false,
    },
    {
      code: "CS102",
      name: "Physics",
      credits: 3,
      instructor: "Dr. B",
      registered: false,
    },
    {
      code: "CS103",
      name: "Computer Science",
      credits: 4,
      instructor: "Dr. C",
      registered: false,
    },
    {
      code: "CS104",
      name: "English",
      credits: 2,
      instructor: "Dr. D",
      registered: false,
    },
  ]);

  const toggleRegister = (index) => {
    const updated = [...courses];
    updated[index].registered = !updated[index].registered;
    setCourses(updated);
  };

  const registeredCount = courses.filter((c) => c.registered).length;

  return (
    <StudentLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Course Registration
      </h1>

      <Card className="p-6 bg-card text-foreground shadow-md rounded-xl border border-border">
        <CardTitle className="text-lg md:text-xl font-semibold mb-4">
          Selected Courses: {registeredCount}
        </CardTitle>

        <CardContent className="overflow-x-auto">
          <table className="w-full text-foreground border border-border rounded-lg">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-2 border border-border">Code</th>
                <th className="p-2 border border-border">Course Name</th>
                <th className="p-2 border border-border">Credits</th>
                <th className="p-2 border border-border">Instructor</th>
                <th className="p-2 border border-border">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={course.code}
                  className={`hover:bg-accent/10 transition-colors ${
                    course.registered ? "bg-accent/20" : ""
                  }`}
                >
                  <td className="p-2 border border-border text-center">
                    {course.code}
                  </td>
                  <td className="p-2 border border-border">{course.name}</td>
                  <td className="p-2 border border-border text-center">
                    {course.credits}
                  </td>
                  <td className="p-2 border border-border">
                    {course.instructor}
                  </td>
                  <td className="p-2 border border-border text-center">
                    <button
                      onClick={() => toggleRegister(index)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        course.registered
                          ? "bg-destructive text-foreground hover:bg-destructive/80"
                          : "bg-primary text-primary-foreground hover:bg-primary/80"
                      } transition-colors`}
                    >
                      {course.registered ? "Unregister" : "Register"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <button className="btn btn-primary px-6 py-2 rounded-lg">
              Submit Registration
            </button>
          </div>
        </CardContent>
      </Card>
    </StudentLayout>
  );
}
