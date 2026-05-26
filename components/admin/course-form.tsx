"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
}

interface Tutor {
  id: string;
  full_name: string;
  specialization: string;
}

interface Course {
  id?: string;
  title: string;
  description: string;
  duration: string;
  price: number | null;
  level: string;
  category: string;
  image_url: string | null;
  is_active: boolean;
  tutor_id?: string | null;
}

interface CourseFormProps {
  course?: Course;
}

const levels = ["Beginner", "Intermediate", "Advanced"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [formData, setFormData] = useState<Course>({
    title: course?.title || "",
    description: course?.description || "",
    duration: course?.duration || "",
    price: course?.price || null,
    level: course?.level || "Beginner",
    category: course?.category || "",
    image_url: course?.image_url || null,
    is_active: course?.is_active ?? true,
    tutor_id: course?.tutor_id || null,
  });

  // Fetch categories and tutors from database
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      
      const [categoriesRes, tutorsRes] = await Promise.all([
        supabase
          .from("categories")
          .select("id, name")
          .eq("is_active", true)
          .order("name"),
        supabase
          .from("tutors")
          .select("id, full_name, specialization")
          .eq("is_active", true)
          .order("full_name"),
      ]);
      
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (tutorsRes.data) setTutors(tutorsRes.data);
    }
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must not exceed 5MB");
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, and GIF images are allowed");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setFormData({ ...formData, image_url: result.url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image_url: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      if (course?.id) {
        // Update existing course
        const { error: updateError } = await supabase
          .from("courses")
          .update({
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            price: formData.price,
            level: formData.level,
            category: formData.category,
            image_url: formData.image_url,
            is_active: formData.is_active,
            tutor_id: formData.tutor_id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", course.id);

        if (updateError) throw updateError;
      } else {
        // Create new course
        const { error: insertError } = await supabase
          .from("courses")
          .insert({
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            price: formData.price,
            level: formData.level,
            category: formData.category,
            image_url: formData.image_url,
            is_active: formData.is_active,
            tutor_id: formData.tutor_id,
          });

        if (insertError) throw insertError;
      }

      router.push("/admin/dashboard/courses");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label>Course Image</Label>
              <div className="flex items-start gap-4">
                {formData.image_url ? (
                  <div className="relative">
                    <Image
                      src={formData.image_url}
                      alt="Course preview"
                      width={200}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex h-[120px] w-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isUploading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                )}
                <div className="space-y-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  {!formData.image_url && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Max file size: 5MB. Formats: JPEG, PNG, WebP, GIF
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Web Development Fundamentals"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what students will learn..."
                rows={4}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Level *</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 12 weeks"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (NGN)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="Leave empty for free"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Assign Tutor</Label>
              <Select
                value={formData.tutor_id || "none"}
                onValueChange={(value) =>
                  setFormData({ ...formData, tutor_id: value === "none" ? null : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tutor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No tutor assigned</SelectItem>
                  {tutors.map((tutor) => (
                    <SelectItem key={tutor.id} value={tutor.id}>
                      {tutor.full_name} ({tutor.specialization})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">
                Course is active and visible to students
              </Label>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {course?.id ? "Updating..." : "Creating..."}
                </>
              ) : course?.id ? (
                "Update Course"
              ) : (
                "Create Course"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
