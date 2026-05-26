"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, Check, X, Mail, Eye, UserPlus, FileText, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TutorApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  qualifications: string;
  specialization: string;
  experience: string;
  resume_url: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

interface TutorApplicationsTableProps {
  applications: TutorApplication[];
}

export function TutorApplicationsTable({
  applications: initialApplications,
}: TutorApplicationsTableProps) {
  const router = useRouter();
  const [applications, setApplications] = useState(initialApplications);
  const [viewApplication, setViewApplication] =
    useState<TutorApplication | null>(null);
  const [isApproving, setIsApproving] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("tutor_applications")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setApplications(
        applications.map((a) => (a.id === id ? { ...a, status } : a))
      );
    }
  };

  const approveAndAddTutor = async (application: TutorApplication) => {
    setIsApproving(application.id);
    const supabase = createClient();

    try {
      // First, add to tutors table
      const { error: tutorError } = await supabase.from("tutors").insert({
        application_id: application.id,
        full_name: application.full_name,
        email: application.email,
        phone: application.phone,
        specialization: application.specialization,
        experience: application.experience,
        qualifications: application.qualifications,
        resume_url: application.resume_url,
        is_active: true,
      });

      if (tutorError) {
        // Check if email already exists
        if (tutorError.code === "23505") {
          alert("A tutor with this email already exists.");
          return;
        }
        throw tutorError;
      }

      // Update application status to approved
      const { error: statusError } = await supabase
        .from("tutor_applications")
        .update({ status: "approved" })
        .eq("id", application.id);

      if (!statusError) {
        setApplications(
          applications.map((a) =>
            a.id === application.id ? { ...a, status: "approved" } : a
          )
        );
        alert(`${application.full_name} has been approved and added as a tutor!`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error approving tutor:", error);
      alert("Failed to approve tutor. Please try again.");
    } finally {
      setIsApproving(null);
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
      case "interviewing":
        return (
          <Badge className="bg-blue-100 text-blue-800">Interviewing</Badge>
        );
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.full_name}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{application.email}</p>
                      {application.phone && (
                        <p className="text-muted-foreground">
                          {application.phone}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{application.specialization}</Badge>
                  </TableCell>
                  <TableCell>{application.experience}</TableCell>
                  <TableCell>
                    {application.resume_url ? (
                      <a
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        View
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={isApproving === application.id}>
                          {isApproving === application.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setViewApplication(application)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {application.resume_url && (
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(application.resume_url!, "_blank")
                            }
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(application.id, "interviewing")
                          }
                        >
                          <Eye className="mr-2 h-4 w-4 text-blue-600" />
                          Mark Interviewing
                        </DropdownMenuItem>
                        {application.status !== "approved" && (
                          <DropdownMenuItem
                            onClick={() => approveAndAddTutor(application)}
                          >
                            <UserPlus className="mr-2 h-4 w-4 text-green-600" />
                            Approve & Add as Tutor
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(application.id, "rejected")
                          }
                        >
                          <X className="mr-2 h-4 w-4 text-red-600" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`mailto:${application.email}`)
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
                <TableCell colSpan={7} className="py-8 text-center">
                  <p className="text-muted-foreground">No applications yet.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!viewApplication}
        onOpenChange={() => setViewApplication(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewApplication?.full_name}</DialogTitle>
          </DialogHeader>
          {viewApplication && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </p>
                  <p className="font-medium">{viewApplication.full_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p>{viewApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p>{viewApplication.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Specialization
                  </p>
                  <p>{viewApplication.specialization}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Experience
                  </p>
                  <p>{viewApplication.experience}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  {getStatusBadge(viewApplication.status)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Qualifications
                </p>
                <p className="whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">
                  {viewApplication.qualifications}
                </p>
              </div>
              {viewApplication.resume_url && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Resume/CV
                  </p>
                  <a
                    href={viewApplication.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary hover:bg-primary/20"
                  >
                    <FileText className="h-4 w-4" />
                    Download Resume
                  </a>
                </div>
              )}
              {viewApplication.admin_notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Admin Notes
                  </p>
                  <p className="whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">{viewApplication.admin_notes}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Submitted On
                </p>
                <p>{formatDate(viewApplication.created_at)}</p>
              </div>
              
              {viewApplication.status !== "approved" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      approveAndAddTutor(viewApplication);
                      setViewApplication(null);
                    }}
                    className="flex-1"
                    disabled={isApproving === viewApplication.id}
                  >
                    {isApproving === viewApplication.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Approve & Add as Tutor
                      </>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      updateStatus(viewApplication.id, "rejected");
                      setViewApplication(null);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
