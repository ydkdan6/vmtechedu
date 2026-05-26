import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CourseGrid } from "@/components/courses/course-grid";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const supabase = await createClient();
  
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Explore Our Courses
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose from our wide range of digital skills courses designed
                for all skill levels. Start your learning journey today.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {courses && courses.length > 0 ? (
              <CourseGrid courses={courses} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <svg
                    className="h-12 w-12 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  No Courses Available Yet
                </h3>
                <p className="mt-2 max-w-md text-muted-foreground">
                  We are currently preparing exciting courses for you. Please check back soon or contact us for more information about upcoming programs.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
