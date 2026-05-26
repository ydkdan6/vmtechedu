import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { TutorApplicationForm } from "@/components/tutors/application-form";
import Image from "next/image";
import { CheckCircle2, Briefcase, Clock, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Competitive Pay",
    description: "Earn competitive rates for your expertise with regular payments.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Set your own schedule and work at times that suit you best.",
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join a network of passionate educators making a difference.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Access training resources and professional development opportunities.",
  },
];

const requirements = [
  "Bachelor degree or equivalent professional experience",
  "Minimum 2 years teaching or industry experience",
  "Strong communication and presentation skills",
  "Passion for education and technology",
  "Reliable internet connection for online sessions",
  "Ability to create engaging learning materials",
];

const specializations = [
  "Web Development (HTML, CSS, JavaScript, React)",
  "Python Programming & Data Science",
  "Microsoft Office Suite",
  "Digital Literacy & Computer Basics",
  "Graphic Design & Multimedia",
  "Cybersecurity Fundamentals",
  "AI & Machine Learning",
  "Mobile App Development",
];

export default function TutorsPage() {
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
                  Join Our Team
                </span>
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  Become a VM Tech Edu Tutor
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Share your knowledge and make a real impact on the next
                  generation. We&apos;re looking for passionate educators to join our
                  growing team of tech tutors.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/tutor-teaching.jpg"
                  alt="Tutor teaching"
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
              Why Teach With Us?
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

        {/* Requirements & Specializations */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Requirements
                </h2>
                <ul className="mt-6 space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  We&apos;re Hiring For
                </h2>
                <ul className="mt-6 space-y-3">
                  {specializations.map((spec) => (
                    <li key={spec} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Apply to Become a Tutor
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Fill out the application form below. Our team will review your
                  application and get back to you within 3-5 business days.
                </p>
              </div>
              <TutorApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
