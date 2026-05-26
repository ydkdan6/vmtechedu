import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CategoriesTable } from "@/components/admin/categories-table";

export default async function CategoriesPage() {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.user_metadata?.is_admin) {
    redirect("/admin/login");
  }

  // Fetch all categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">
            Manage course categories for the platform.
          </p>
        </div>
      </div>

      <CategoriesTable categories={categories || []} />
    </div>
  );
}
