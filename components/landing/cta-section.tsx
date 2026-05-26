import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schoolBenefits = [
  "Customized curriculum for your institution",
  "Flexible scheduling to fit your academic calendar",
  "Certified and experienced instructors",
  "Progress tracking and detailed reports",
  "Hands-on projects and real-world applications",
  "Certificate of completion for students",
];

const tutorBenefits = [
  "Competitive compensation packages",
  "Flexible work hours and locations",
  "Access to teaching resources and materials",
  "Professional development opportunities",
  "Be part of a growing tech education community",
  "Make a real impact on students lives",
];

export function CTASection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* For Schools */}
          <div className="relative overflow-hidden rounded-2xl bg-card p-8 shadow-lg">
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                For Schools
              </span>
              <h3 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
                Partner With Us
              </h3>
              <p className="mt-2 text-muted-foreground">
                Bring digital skills training to your institution. We work with
                schools to create customized programs that prepare students for
                the future.
              </p>
              <ul className="mt-6 space-y-3">
                {schoolBenefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6" asChild>
                <Link href="/schools">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5" />
          </div>

          {/* For Tutors */}
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-primary-foreground/20 px-3 py-1 text-sm font-medium text-primary-foreground">
                For Tutors
              </span>
              <h3 className="mt-4 text-2xl font-bold md:text-3xl">
                Join Our Team
              </h3>
              <p className="mt-2 text-primary-foreground/80">
                Share your expertise and help shape the next generation of tech
                professionals. We&apos;re looking for passionate educators.
              </p>
              <ul className="mt-6 space-y-3">
                {tutorBenefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                className="mt-6"
                asChild
              >
                <Link href="/tutors">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10" />
          </div>
        </div>

        {/* Image Banner */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/school-partnership.jpg"
              alt="School partnership meeting"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/tutor-teaching.jpg"
              alt="Tutor teaching students"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
