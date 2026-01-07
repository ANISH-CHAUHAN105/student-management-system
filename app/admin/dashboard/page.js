// app/admin/dashboard/page.js

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStudentsByStatus, approveOrRejectStudent } from "@/lib/api/admin";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingIds, setActionLoadingIds] = useState([]);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    fetchStudents(statusFilter);
  }, [statusFilter]);

  const fetchStudents = async (status) => {
    setLoading(true);
    setError("");
    try {
      const data = await getStudentsByStatus(status);
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (sId, action) => {
    setActionLoadingIds((prev) => [...prev, sId]);
    try {
      await approveOrRejectStudent(sId, action);
      setStudents((prev) => prev.filter((s) => s.sId !== sId));
    } catch (err) {
      setError(err.message || "Action failed");
    } finally {
      setActionLoadingIds((prev) => prev.filter((id) => id !== sId));
    }
  };

  const handleBulkAction = async (action) => {
    const pendingIds = students.map((s) => s.sId);
    setActionLoadingIds(pendingIds);
    try {
      await Promise.all(
        pendingIds.map((id) => approveOrRejectStudent(id, action))
      );
      setStudents([]);
    } catch (err) {
      setError(err.message || `Bulk ${action} failed`);
    } finally {
      setActionLoadingIds([]);
    }
  };

  const isBulkLoading = actionLoadingIds.length > 0;

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-background dark:bg-background transition-colors">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground text-center sm:text-left">
        Admin Dashboard
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-center sm:justify-start">
        <label className="text-foreground font-medium">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded border border-border bg-input text-foreground"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        {statusFilter === "pending" && students.length > 0 && (
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button
              onClick={() => handleBulkAction("approve")}
              disabled={isBulkLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              {isBulkLoading ? "Processing..." : "Approve All"}
            </Button>
            <Button
              onClick={() => handleBulkAction("reject")}
              disabled={isBulkLoading}
              className="bg-destructive text-primary-foreground hover:bg-destructive/90 transition-all"
            >
              {isBulkLoading ? "Processing..." : "Reject All"}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-destructive text-center sm:text-left mb-6">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-muted-foreground text-center">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-muted-foreground text-center">No students found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student, idx) => {
            const isActionLoading = actionLoadingIds.includes(student.sId);
            return (
              <Card
                key={student.sId}
                className="bg-card dark:bg-card-foreground shadow-lg rounded-lg flex flex-col justify-between p-4 transition-colors"
              >
                <CardContent className="flex-1">
                  <CardTitle className="text-lg sm:text-xl text-foreground dark:text-black font-semibold mb-2">
                    {student.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground dark:text-black mb-1">
                    Branch: {student.branch}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-black mb-1">
                    College: {student.college}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-black mb-1">
                    Batch: {student.batch}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-black mb-1">
                    Contact: {student.contact}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-black">
                    Email: {student.email}
                  </p>
                </CardContent>

                {statusFilter === "pending" && (
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button
                      onClick={() => handleAction(student.sId, "approve")}
                      disabled={isActionLoading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex-1"
                    >
                      {isActionLoading ? "Processing..." : "Approve"}
                    </Button>
                    <Button
                      onClick={() => handleAction(student.sId, "reject")}
                      disabled={isActionLoading}
                      className="bg-destructive text-primary-foreground hover:bg-destructive/90 transition-all flex-1"
                    >
                      {isActionLoading ? "Processing..." : "Reject"}
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
