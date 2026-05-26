import { createClient } from "@/lib/supabase/server";
import { SchoolRequestsTable } from "@/components/admin/school-requests-table";

export const dynamic = "force-dynamic";

export default async function AdminSchoolsPage() {
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("school_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">School Requests</h2>
        <p className="text-muted-foreground">
          Manage partnership requests from schools and institutions.
        </p>
      </div>

      <SchoolRequestsTable requests={requests || []} />
    </div>
  );
}
