// app/student/hostel/page.js

import StudentLayout from "../StudentLayout";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default function HostelPage() {
  return (
    <StudentLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Submit Hostel Details
      </h1>

      <Card className="p-6 bg-card text-foreground shadow-md rounded-xl border border-border">
        <CardTitle className="text-lg md:text-xl font-semibold">
          Hostel Allocation
        </CardTitle>
        <CardContent>
          <form className="flex flex-col gap-4">
            {/* Hostel Name */}
            <label className="flex flex-col text-foreground">
              Hostel Name
              <input
                type="text"
                placeholder="Enter hostel name"
                className="input w-full mt-1 bg-background text-foreground border-border"
              />
            </label>

            {/* Current Year */}
            <label className="flex flex-col text-foreground">
              Current Year
              <select className="input w-full mt-1 bg-background text-foreground border-border">
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </label>

            {/* Current Semester */}
            <label className="flex flex-col text-foreground">
              Current Semester
              <select className="input w-full mt-1 bg-background text-foreground border-border">
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
              </select>
            </label>

            {/* Room Number */}
            <label className="flex flex-col text-foreground">
              Room Number
              <input
                type="text"
                placeholder="Enter room number"
                className="input w-full mt-1 bg-background text-foreground border-border"
              />
            </label>

            {/* Hostel Type */}
            <label className="flex flex-col text-foreground">
              Hostel Type
              <select className="input w-full mt-1 bg-background text-foreground border-border">
                <option>Boys Hostel</option>
                <option>Girls Hostel</option>
              </select>
            </label>

            {/* Scholar Type */}
            <label className="flex flex-col text-foreground">
              Scholar Type
              <select className="input w-full mt-1 bg-background text-foreground border-border">
                <option>Day Scholar</option>
                <option>Hosteler</option>
              </select>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary mt-2 w-full md:w-auto"
            >
              Submit Hostel Details
            </button>
          </form>
        </CardContent>
      </Card>
    </StudentLayout>
  );
}
