// app/student/fees/page.js

import StudentLayout from "../StudentLayout";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default function FeesPage() {
  return (
    <StudentLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Submit Fees Details
      </h1>

      <Card className="p-6 bg-card text-foreground shadow-md rounded-xl border border-border">
        <CardTitle className="text-lg md:text-xl font-semibold">
          Fees Payment
        </CardTitle>
        <CardContent>
          <form className="flex flex-col gap-4">
            {/* Amount */}
            <label className="flex flex-col text-foreground">
              Amount
              <input
                type="number"
                placeholder="Enter amount"
                className="input w-full mt-1 bg-background text-foreground border-border"
              />
            </label>

            {/* Date */}
            <label className="flex flex-col text-foreground">
              Date of Payment
              <input
                type="date"
                className="input w-full mt-1 bg-background text-foreground border-border"
              />
            </label>

            {/* Reference Number */}
            <label className="flex flex-col text-foreground">
              Reference Number
              <input
                type="text"
                placeholder="Enter reference number"
                className="input w-full mt-1 bg-background text-foreground border-border"
              />
            </label>

            {/* Year */}
            <label className="flex flex-col text-foreground">
              Year
              <select className="input w-full mt-1 bg-background text-foreground border-border">
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </label>

            {/* Semester */}
            <label className="flex flex-col text-foreground">
              Semester
              <select className="input w-full mt-1 bg-background text-foreground border-border">
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
              </select>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary mt-2 w-full md:w-auto"
            >
              Submit Payment
            </button>
          </form>
        </CardContent>
      </Card>
    </StudentLayout>
  );
}
