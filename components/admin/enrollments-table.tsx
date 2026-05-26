"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Check, X, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Enrollment {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
  courses: { title: string } | null;
}

interface EnrollmentsTableProps {
  enrollments: Enrollment[];
}

export function EnrollmentsTable({
  enrollments: initialEnrollments,
}: EnrollmentsTableProps) {
  const [enrollments, setEnrollments] = useState(initialEnrollments);

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("enrollments")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setEnrollments(
        enrollments.map((e) => (e.id === id ? { ...e, status } : e))
      );
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{enrollment.student_name}</p>
                    {enrollment.message && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {enrollment.message}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>{enrollment.courses?.title || "N/A"}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{enrollment.student_email}</p>
                    {enrollment.student_phone && (
                      <p className="text-muted-foreground">
                        {enrollment.student_phone}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDate(enrollment.created_at)}</TableCell>
                <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => updateStatus(enrollment.id, "approved")}
                      >
                        <Check className="mr-2 h-4 w-4 text-green-600" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateStatus(enrollment.id, "rejected")}
                      >
                        <X className="mr-2 h-4 w-4 text-red-600" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          window.open(`mailto:${enrollment.student_email}`)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center">
                <p className="text-muted-foreground">No enrollments yet.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
