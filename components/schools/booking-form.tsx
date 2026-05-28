"use client";

import { useState, useEffect } from "react";
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
import { Loader2, CheckCircle2, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { sendNotification } from "@/lib/notifications";

// ← removed hardcoded areasOfInterest array

export function SchoolBookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data } = await supabase
        .from("categories")
        .select("id, name")
        .eq("is_active", true)
        .order("name");

      if (data) setCategories(data);
      setCategoriesLoading(false);
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      school_name: formData.get("school_name") as string,
      contact_person: formData.get("contact_person") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      area_of_interest: selectedArea,
      message: formData.get("message") as string,
      preferred_date: formData.get("preferred_date") as string || null,
      preferred_time: formData.get("preferred_time") as string || null,
    };

    try {
      const supabase = createClient();
      const { data: schoolRequest, error: insertError } = await supabase
        .from("school_requests")
        .insert(data)
        .select()
        .single();

      if (insertError) throw insertError;

      await sendNotification({
        type: "school_request",
        title: `New school request: ${data.school_name}`,
        message: `${data.school_name} is interested in ${data.area_of_interest}`,
        referenceId: schoolRequest?.id,
        details: {
          "School Name": data.school_name,
          "Contact Person": data.contact_person,
          "Email": data.email,
          "Phone": data.phone,
          "Area of Interest": data.area_of_interest,
          "Preferred Date": data.preferred_date || "Not specified",
          "Preferred Time": data.preferred_time || "Not specified",
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
          <h2 className="mt-4 text-2xl font-bold text-green-800">Request Submitted!</h2>
          <p className="mt-2 text-green-700">
            Thank you for your interest in partnering with VM Tech Edu. Our team
            will contact you within 24 hours to schedule your consultation.
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
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>School Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school_name">School Name *</Label>
            <Input
              id="school_name"
              name="school_name"
              placeholder="Enter school name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_person">Contact Person *</Label>
              <Input
                id="contact_person"
                name="contact_person"
                placeholder="Full name"
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
                placeholder="school@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Area of Interest *</Label>
              <Select
                value={selectedArea}
                onValueChange={setSelectedArea}
                disabled={categoriesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={categoriesLoading ? "Loading..." : "Select program"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                  {!categoriesLoading && categories.length === 0 && (
                    <SelectItem value="" disabled>
                      No programs available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="preferred_date">Preferred Call Date</Label>
              <Input
                id="preferred_date"
                name="preferred_date"
                type="date"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferred_time">Preferred Time</Label>
              <Select name="preferred_time">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</SelectItem>
                  <SelectItem value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</SelectItem>
                  <SelectItem value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</SelectItem>
                  <SelectItem value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your school, number of students, specific requirements, etc."
              rows={4}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || !selectedArea}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Book Consultation Call"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}