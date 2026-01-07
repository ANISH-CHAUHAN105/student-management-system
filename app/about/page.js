// app/about/page.js

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
        About StudentERP
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6 hover:scale-105 transform transition-all duration-300 border border-border shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To simplify and unify student management processes for educational
              institutions using lightweight, cost-effective, and intuitive
              software.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 hover:scale-105 transform transition-all duration-300 border border-border shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Empower colleges with real-time insights and automated processes,
              reducing manual work while improving accuracy and decision-making.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 hover:scale-105 transform transition-all duration-300 border border-border shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Our Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Combining familiar tools like forms, spreadsheets, and lightweight
              scripting to create a cohesive, low-cost ERP system accessible to
              all staff.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 hover:scale-105 transform transition-all duration-300 border border-border shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Security & Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Role-based access, encrypted data, and regular backups ensure that
              all student and institutional data remains secure and reliable.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
