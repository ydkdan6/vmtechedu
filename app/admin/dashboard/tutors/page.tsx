import { createClient } from "@/lib/supabase/server";
import { TutorApplicationsTable } from "@/components/admin/tutor-applications-table";

export const dynamic = "force-dynamic";

export default async function AdminTutorsPage() {
  const supabase = await createClient();

  const { data: applications } = await supabase
    .from("tutor_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Tutor Applications
        </h2>
        <p className="text-muted-foreground">
          Review and manage tutor applications.
        </p>
      </div>

      <TutorApplicationsTable applications={applications || []} />
    </div>
  );
}
