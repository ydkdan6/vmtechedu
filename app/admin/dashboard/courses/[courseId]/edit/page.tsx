import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { CourseForm } from "@/components/admin/course-form";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.user_metadata?.is_admin) {
    redirect("/admin/login");
  }

  // Fetch course data
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error || !course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit Course</h1>
        <p className="text-muted-foreground">
          Update course details and settings.
        </p>
      </div>

      <CourseForm course={course} />
    </div>
  );
}
