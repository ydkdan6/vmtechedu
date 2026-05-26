import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { EnrollmentForm } from "@/components/courses/enrollment-form";

export const dynamic = "force-dynamic";

// Sample course for demo
const sampleCourse = {
  id: "sample-1",
  title: "Web Development Fundamentals",
  description:
    "Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and understand core web technologies.",
  duration: "12 weeks",
  price: 50000,
  level: "Beginner",
  category: "Web Development",
};

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function EnrollPage({ params }: PageProps) {
  const { courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .eq("is_active", true)
    .single();

  // Use sample course for demo if course not found in DB
  const displayCourse = course || (courseId.startsWith("sample") ? sampleCourse : null);

  if (!displayCourse) {
    notFound();
  }

  const formatPrice = (price: number | null) => {
    if (!price) return "Free";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {displayCourse.category}
                </span>
                <h1 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
                  {displayCourse.title}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {displayCourse.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="rounded-full bg-muted px-3 py-1">
                    {displayCourse.duration}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1">
                    {displayCourse.level}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(displayCourse.price)}
                  </span>
                </div>
              </div>

              <EnrollmentForm courseId={displayCourse.id} courseName={displayCourse.title} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
