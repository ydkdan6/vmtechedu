"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, User, Upload, FileText, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { sendNotification } from "@/lib/notifications";

const specializations = [
  "Web Development",
  "Python Programming",
  "Data Science & AI",
  "Microsoft Office",
  "Digital Literacy",
  "Graphic Design",
  "Cybersecurity",
  "Mobile Development",
  "Other",
];

const experienceLevels = [
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function TutorApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedExp, setSelectedExp] = useState("");
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must not exceed 5MB");
      return;
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Only PDF and Word documents are allowed");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setResumeUrl(result.url);
      setResumeName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload resume");
    } finally {
      setIsUploading(false);
    }
  };

  const removeResume = () => {
    setResumeUrl(null);
    setResumeName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      qualifications: formData.get("qualifications") as string,
      specialization: selectedSpec,
      experience: selectedExp,
      resume_url: resumeUrl,
    };

    try {
      const supabase = createClient();
      const { data: application, error: insertError } = await supabase
        .from("tutor_applications")
        .insert(data)
        .select()
        .single();

      if (insertError) throw insertError;

      // Send notification
      await sendNotification({
        type: "tutor_application",
        title: `New tutor application: ${data.full_name}`,
        message: `${data.full_name} has applied to become a tutor specializing in ${data.specialization}`,
        referenceId: application?.id,
        details: {
          "Name": data.full_name,
          "Email": data.email,
          "Phone": data.phone || "Not provided",
          "Specialization": data.specialization,
          "Experience": data.experience,
          "Resume": data.resume_url ? "Uploaded" : "Not provided",
        },
      });

      setIsSuccess(true);
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
            Application Submitted!
          </h2>
          <p className="mt-2 text-green-700">
            Thank you for applying to become a VM Tech Edu tutor. Our team will
            review your application and contact you within 3-5 business days.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Application Form</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Specialization *</Label>
              <Select value={selectedSpec} onValueChange={setSelectedSpec} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience *</Label>
              <Select value={selectedExp} onValueChange={setSelectedExp} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((exp) => (
                    <SelectItem key={exp} value={exp}>
                      {exp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications & Experience *</Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              placeholder="Describe your educational background, certifications, and relevant teaching or industry experience..."
              rows={5}
              required
              disabled={isLoading}
            />
          </div>

          {/* Resume/CV Upload */}
          <div className="space-y-2">
            <Label>Resume/CV (PDF or Word, Max 5MB)</Label>
            <div className="flex flex-col gap-2">
              {resumeUrl ? (
                <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {resumeName}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeResume}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeUpload}
                    className="hidden"
                    disabled={isUploading || isLoading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isLoading}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Resume/CV
                      </>
                    )}
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isUploading || !selectedSpec || !selectedExp}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to our terms and conditions. We may contact
            you for additional information during the review process.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
