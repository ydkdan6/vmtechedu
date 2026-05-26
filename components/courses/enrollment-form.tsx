"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { sendNotification } from "@/lib/notifications";

interface EnrollmentFormProps {
  courseId: string;
  courseName: string;
}

export function EnrollmentForm({ courseId, courseName }: EnrollmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      course_id: courseId,
      student_name: formData.get("name") as string,
      student_email: formData.get("email") as string,
      student_phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    try {
      const supabase = createClient();
      const { data: enrollment, error: insertError } = await supabase
        .from("enrollments")
        .insert(data)
        .select()
        .single();

      if (insertError) throw insertError;

      // Send notification
      await sendNotification({
        type: "enrollment",
        title: `New enrollment: ${data.student_name}`,
        message: `${data.student_name} has enrolled in ${courseName}`,
        referenceId: enrollment?.id,
        details: {
          "Student Name": data.student_name,
          "Email": data.student_email,
          "Phone": data.student_phone || "Not provided",
          "Course": courseName,
        },
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/courses?enrolled=true");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
          <h2 className="mt-4 text-2xl font-bold text-green-800">
            Enrollment Submitted!
          </h2>
          <p className="mt-2 text-green-700">
            Thank you for enrolling in {courseName}. We&apos;ll contact you shortly
            with next steps.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll in This Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Any questions or special requirements?"
              rows={3}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Enrollment"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By enrolling, you agree to our terms and conditions. Our team will
            contact you within 24-48 hours.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
