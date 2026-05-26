import { CourseForm } from "@/components/admin/course-form";

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Add New Course</h2>
        <p className="text-muted-foreground">
          Create a new course for your students.
        </p>
      </div>

      <CourseForm />
    </div>
  );
}
