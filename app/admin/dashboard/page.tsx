import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, School, UserCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";

export const dynamic = "force-dynamic";

interface Enrollment {
  id: string;
  student_name: string;
  student_email: string;
  status: string;
  created_at: string;
  course_id: string;
}

interface Course {
  id: string;
  title: string;
}

interface SchoolRequest {
  id: string;
  school_name: string;
  contact_person: string;
  area_of_interest: string;
  status: string;
  created_at: string;
}

interface TutorApplication {
  id: string;
  full_name: string;
  specialization: string;
  status: string;
  created_at: string;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch stats
  const [coursesResult, enrollmentsResult, schoolsResult, tutorsResult] =
    await Promise.all([
      supabase.from("courses").select("*", { count: "exact", head: true }),
      supabase.from("enrollments").select("*", { count: "exact", head: true }),
      supabase.from("school_requests").select("*", { count: "exact", head: true }),
      supabase.from("tutor_applications").select("*", { count: "exact", head: true }),
    ]);

  // Fetch all data for analytics
  const [allEnrollments, allSchools, allTutors, allCourses] = await Promise.all([
    supabase.from("enrollments").select("*").order("created_at", { ascending: true }),
    supabase.from("school_requests").select("*").order("created_at", { ascending: true }),
    supabase.from("tutor_applications").select("*").order("created_at", { ascending: true }),
    supabase.from("courses").select("id, title"),
  ]);

  // Fetch recent items
  const [recentEnrollments, recentSchools, recentTutors] = await Promise.all([
    supabase
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("school_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("tutor_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Process data for charts
  const enrollmentsByMonth = processEnrollmentsByMonth(allEnrollments.data || []);
  const enrollmentsByStatus = processEnrollmentsByStatus(allEnrollments.data || []);
  const schoolRequestsByInterest = processSchoolsByInterest(allSchools.data || []);
  const tutorsBySpecialization = processTutorsBySpecialization(allTutors.data || []);
  const courseDemand = processCourseDemand(
    allEnrollments.data || [],
    allCourses.data || []
  );
  const institutionalInterest = processInstitutionalInterest(
    allSchools.data || [],
    allTutors.data || []
  );

  const stats = [
    {
      name: "Total Courses",
      value: coursesResult.count || 0,
      icon: BookOpen,
      href: "/admin/dashboard/courses",
      color: "bg-blue-500",
    },
    {
      name: "Enrollments",
      value: enrollmentsResult.count || 0,
      icon: Users,
      href: "/admin/dashboard/enrollments",
      color: "bg-green-500",
    },
    {
      name: "School Requests",
      value: schoolsResult.count || 0,
      icon: School,
      href: "/admin/dashboard/schools",
      color: "bg-purple-500",
    },
    {
      name: "Tutor Applications",
      value: tutorsResult.count || 0,
      icon: UserCheck,
      href: "/admin/dashboard/tutors",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your platform activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} text-white`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Analytics Charts */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-foreground">Analytics</h3>
        <AnalyticsCharts
          enrollmentsByMonth={enrollmentsByMonth}
          enrollmentsByStatus={enrollmentsByStatus}
          schoolRequestsByInterest={schoolRequestsByInterest}
          tutorsBySpecialization={tutorsBySpecialization}
          courseDemand={courseDemand}
          institutionalInterest={institutionalInterest}
        />
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-foreground">Recent Activity</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Enrollments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Enrollments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard/enrollments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentEnrollments.data && recentEnrollments.data.length > 0 ? (
                <div className="space-y-4">
                  {(recentEnrollments.data as Enrollment[]).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {enrollment.student_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.student_email}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          enrollment.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : enrollment.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {enrollment.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No enrollments yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent School Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">School Requests</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard/schools">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentSchools.data && recentSchools.data.length > 0 ? (
                <div className="space-y-4">
                  {(recentSchools.data as SchoolRequest[]).map((school) => (
                    <div
                      key={school.id}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {school.school_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {school.contact_person}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          school.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : school.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {school.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No school requests yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Tutor Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Tutor Applications</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard/tutors">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentTutors.data && recentTutors.data.length > 0 ? (
                <div className="space-y-4">
                  {(recentTutors.data as TutorApplication[]).map((tutor) => (
                    <div
                      key={tutor.id}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {tutor.full_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tutor.specialization}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          tutor.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : tutor.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {tutor.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No applications yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper functions for processing chart data
function processEnrollmentsByMonth(enrollments: { created_at: string }[]) {
  const monthCounts: Record<string, number> = {};
  
  enrollments.forEach((e) => {
    const date = new Date(e.created_at);
    const monthKey = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });

  return Object.entries(monthCounts).map(([month, count]) => ({ month, count }));
}

function processEnrollmentsByStatus(enrollments: { status: string }[]) {
  const statusCounts: Record<string, number> = {};
  
  enrollments.forEach((e) => {
    statusCounts[e.status] = (statusCounts[e.status] || 0) + 1;
  });

  return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
}

function processSchoolsByInterest(schools: { area_of_interest: string }[]) {
  const interestCounts: Record<string, number> = {};
  
  schools.forEach((s) => {
    interestCounts[s.area_of_interest] = (interestCounts[s.area_of_interest] || 0) + 1;
  });

  return Object.entries(interestCounts).map(([interest, count]) => ({ interest, count }));
}

function processTutorsBySpecialization(tutors: { specialization: string }[]) {
  const specCounts: Record<string, number> = {};
  
  tutors.forEach((t) => {
    specCounts[t.specialization] = (specCounts[t.specialization] || 0) + 1;
  });

  return Object.entries(specCounts).map(([specialization, count]) => ({ specialization, count }));
}

function processCourseDemand(
  enrollments: { course_id: string }[],
  courses: { id: string; title: string }[]
) {
  const courseCounts: Record<string, number> = {};
  const courseMap = new Map(courses.map((c) => [c.id, c.title]));

  enrollments.forEach((e) => {
    const courseTitle = courseMap.get(e.course_id) || "Unknown Course";
    courseCounts[courseTitle] = (courseCounts[courseTitle] || 0) + 1;
  });

  return Object.entries(courseCounts)
    .map(([course, enrollments]) => ({ course, enrollments }))
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 10); // Top 10 courses
}

function processInstitutionalInterest(
  schools: { created_at: string }[],
  tutors: { created_at: string }[]
) {
  const monthData: Record<string, { schools: number; tutors: number }> = {};

  schools.forEach((s) => {
    const date = new Date(s.created_at);
    const monthKey = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    if (!monthData[monthKey]) monthData[monthKey] = { schools: 0, tutors: 0 };
    monthData[monthKey].schools += 1;
  });

  tutors.forEach((t) => {
    const date = new Date(t.created_at);
    const monthKey = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    if (!monthData[monthKey]) monthData[monthKey] = { schools: 0, tutors: 0 };
    monthData[monthKey].tutors += 1;
  });

  return Object.entries(monthData).map(([month, data]) => ({
    month,
    schools: data.schools,
    tutors: data.tutors,
  }));
}
