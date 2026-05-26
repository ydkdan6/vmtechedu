import { createClient } from "@/lib/supabase/server";
import { EnrollmentsTable } from "@/components/admin/enrollments-table";

export const dynamic = "force-dynamic";

export default async function AdminEnrollmentsPage() {
  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(title)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Enrollments</h2>
        <p className="text-muted-foreground">
          Manage student course enrollments and applications.
        </p>
      </div>

      <EnrollmentsTable enrollments={enrollments || []} />
    </div>
  );
}
