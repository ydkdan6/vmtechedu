import { createClient } from "@/lib/supabase/server";
import { CoursesTable } from "@/components/admin/courses-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Courses</h2>
          <p className="text-muted-foreground">
            Manage your course offerings and curriculum.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <CoursesTable courses={courses || []} />
    </div>
  );
}
