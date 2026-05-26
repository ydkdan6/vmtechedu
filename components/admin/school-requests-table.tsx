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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, Check, X, Mail, Eye, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SchoolRequest {
  id: string;
  school_name: string;
  contact_person: string;
  email: string;
  phone: string;
  area_of_interest: string;
  message: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

interface SchoolRequestsTableProps {
  requests: SchoolRequest[];
}

export function SchoolRequestsTable({
  requests: initialRequests,
}: SchoolRequestsTableProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [viewRequest, setViewRequest] = useState<SchoolRequest | null>(null);

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("school_requests")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
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
      case "contacted":
        return <Badge className="bg-blue-100 text-blue-800">Contacted</Badge>;
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
              <TableHead>School</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Preferred Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.school_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.contact_person}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{request.email}</p>
                      <p className="text-muted-foreground">{request.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.area_of_interest}</Badge>
                  </TableCell>
                  <TableCell>
                    {request.preferred_date
                      ? `${formatDate(request.preferred_date)} ${
                          request.preferred_time || ""
                        }`
                      : "Not specified"}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setViewRequest(request)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStatus(request.id, "contacted")}
                        >
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Mark Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStatus(request.id, "approved")}
                        >
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStatus(request.id, "rejected")}
                        >
                          <X className="mr-2 h-4 w-4 text-red-600" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`mailto:${request.email}`)
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
                  <p className="text-muted-foreground">
                    No school requests yet.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewRequest} onOpenChange={() => setViewRequest(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewRequest?.school_name}</DialogTitle>
          </DialogHeader>
          {viewRequest && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    School Name
                  </p>
                  <p className="font-medium">{viewRequest.school_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Contact Person
                  </p>
                  <p>{viewRequest.contact_person}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p>{viewRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p>{viewRequest.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Area of Interest
                  </p>
                  <p>{viewRequest.area_of_interest}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  {getStatusBadge(viewRequest.status)}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Preferred Date
                  </p>
                  <p>{viewRequest.preferred_date ? formatDate(viewRequest.preferred_date) : "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Preferred Time
                  </p>
                  <p>{viewRequest.preferred_time || "Not specified"}</p>
                </div>
              </div>
              {viewRequest.message && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Message
                  </p>
                  <p className="whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">{viewRequest.message}</p>
                </div>
              )}
              {viewRequest.admin_notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Admin Notes
                  </p>
                  <p className="whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">{viewRequest.admin_notes}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Submitted On
                </p>
                <p>{formatDate(viewRequest.created_at)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
