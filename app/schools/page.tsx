import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { SchoolBookingForm } from "@/components/schools/booking-form";
import Image from "next/image";
import { CheckCircle2, Users, BookOpen, Award, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Customized Programs",
    description:
      "Tailored curriculum designed specifically for your school&apos;s needs and student demographics.",
  },
  {
    icon: BookOpen,
    title: "Expert Instructors",
    description:
      "Certified and experienced tutors who specialize in teaching digital skills to young learners.",
  },
  {
    icon: Award,
    title: "Certification",
    description:
      "Students receive certificates upon completion, adding value to their academic portfolio.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Programs designed to fit your academic calendar without disrupting regular classes.",
  },
];

const programs = [
  "Computer Basics & Digital Literacy",
  "Coding for Kids (Scratch, Python)",
  "Web Development Fundamentals",
  "Microsoft Office Suite",
  "Internet Safety & Cybersecurity",
  "AI & Future Technologies",
  "Graphic Design with Canva",
  "Robotics & STEM",
];

export default function SchoolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  For Schools & Institutions
                </span>
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  Bring Digital Skills to Your School
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Partner with VM Tech Edu to equip your students with essential
                  digital skills. We offer customized programs that complement
                  your curriculum and prepare students for the future.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/school-partnership.jpg"
                  alt="School partnership"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
              Why Partner With Us?
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Available Programs
              </h2>
              <p className="mt-4 text-muted-foreground">
                Choose from our range of programs or let us create a custom
                curriculum for your school.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => (
                <div
                  key={program}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{program}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Book a Consultation Call
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Let&apos;s discuss how we can bring digital skills training to
                  your institution. Fill out the form below and our team will
                  reach out within 24 hours.
                </p>
              </div>
              <SchoolBookingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
