import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import { Target, Eye, Heart, Users, BookOpen, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, delivering high-quality education that meets global standards.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our team is passionate about technology and education, driving us to create impactful learning experiences.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We build a supportive community of learners, educators, and partners working together for success.",
  },
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "20+", label: "Partner Schools" },
  { value: "15+", label: "Expert Tutors" },
  { value: "10+", label: "Course Programs" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                About Us
              </span>
              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Empowering Africa&apos;s Digital Future
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                VM Tech Edu is dedicated to bridging the digital skills gap by
                providing accessible, quality technology education to students,
                schools, and communities across Nigeria and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Target className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Our Mission
                </h2>
                <p className="mt-4 text-muted-foreground">
                  To democratize digital education by making quality technology
                  training accessible to everyone, regardless of their
                  background or location. We believe that digital literacy is a
                  fundamental skill for success in the 21st century.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Eye className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Our Vision
                </h2>
                <p className="mt-4 text-muted-foreground">
                  To become Africa&apos;s leading digital skills education
                  provider, creating a generation of tech-savvy individuals who
                  can compete globally and contribute to the digital economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-primary py-12 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
              Our Core Values
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Our Story
              </h2>
              <p className="mt-6 text-muted-foreground">
                VM Tech Edu was founded with a simple belief: that every person
                deserves access to quality digital education. Starting as a
                small initiative to teach basic computer skills, we have grown
                into a comprehensive tech education platform serving students,
                schools, and aspiring professionals.
              </p>
              <p className="mt-4 text-muted-foreground">
                Today, we offer a wide range of courses from basic digital
                literacy to advanced programming and AI. Our network of
                passionate tutors and school partnerships enables us to reach
                more learners every day. We&apos;re proud to be part of Africa&apos;s
                digital transformation journey.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-center text-primary-foreground md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to Start Your Digital Journey?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Join thousands of students who are transforming their futures
                with VM Tech Edu.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-lg bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
                >
                  Explore Courses
                </a>
                <a
                  href="/schools"
                  className="inline-flex items-center justify-center rounded-lg border border-primary-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  Partner With Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
