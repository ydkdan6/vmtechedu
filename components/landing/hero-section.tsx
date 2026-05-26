"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, School, BookOpen, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "https://images.pexels.com/photos/5940713/pexels-photo-5940713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Students learning collaboratively on a laptop in class",
  },
  {
    src: "https://images.pexels.com/photos/5940707/pexels-photo-5940707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Tutor helping a student with a laptop in a library",
  },
  {
    src: "https://images.pexels.com/photos/5940829/pexels-photo-5940829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Group of students working on laptops during a tech session",
  },
  {
    src: "https://images.pexels.com/photos/5940845/pexels-photo-5940845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Students presenting their work in a university classroom",
  },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActiveSlide(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3800);
  };

  // Parallax blobs
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 14;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      el.querySelectorAll<HTMLElement>(".parallax-blob").forEach((blob, i) => {
        const f = i % 2 === 0 ? 1 : -1;
        blob.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, value: "500+", label: "Students Trained" },
    { icon: School, value: "20+", label: "Partner Schools" },
    { icon: BookOpen, value: "15+", label: "Expert Tutors" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* Ambient blobs */}
      <div
        className="parallax-blob pointer-events-none absolute -top-40 right-1/4 h-[600px] w-[600px] rounded-full opacity-[0.15] blur-3xl transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />
      <div
        className="parallax-blob pointer-events-none absolute -bottom-32 -left-24 h-[480px] w-[480px] rounded-full opacity-[0.08] blur-3xl transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container relative mx-auto flex min-h-[calc(100vh-64px)] items-center px-4 py-16 md:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT ── */}
          <div className="space-y-7">

            <div
              className="hero-item inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
              style={{ animationDelay: "0ms" }}
            >
              {/* <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span> */}
              Now Enrolling for 2026
            </div>

            <h1
              className="hero-item text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]"
              style={{ animationDelay: "70ms", lineHeight: "1.08" }}
            >
              Empowering{" "}
              <span className="relative inline-block">
                <span className="text-primary">Digital Skills</span>
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/25"
                  style={{
                    animation: "underline-grow 0.9s 0.7s ease forwards",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </span>{" "}
              for Everyone
            </h1>

            <p
              className="hero-item max-w-[440px] text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
              style={{ animationDelay: "150ms" }}
            >
              Join thousands of students across Nigeria learning web
              development, AI, data science, and essential digital literacy
              skills. Transform your future with VM Tech Edu.
            </p>

            <div
              className="hero-item flex flex-wrap gap-3"
              style={{ animationDelay: "230ms" }}
            >
              <Button size="lg" asChild className="group h-12 px-6 text-sm font-semibold">
                <Link href="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group h-12 gap-2 px-6 text-sm font-semibold">
                <Link href="/schools">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Play className="h-3 w-3 fill-primary text-primary" />
                  </span>
                  Partner With Us
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="hero-item flex gap-6 border-t border-border/40 pt-6 sm:gap-10"
              style={{ animationDelay: "310ms" }}
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <p className="text-2xl font-bold text-foreground md:text-3xl">{value}</p>
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-primary/60" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Carousel + rotated cards ── */}
          <div
            className="hero-item relative flex items-center justify-center"
            style={{ animationDelay: "180ms" }}
          >
            {/* Outer padding so rotated cards don't clip */}
            <div className="relative w-full" style={{ padding: "40px 48px" }}>

              {/* ── Carousel ── */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                {SLIDES.map((slide, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: i === activeSlide ? 1 : 0,
                      transform: i === activeSlide ? "scale(1)" : "scale(1.04)",
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}

                {/* Vignette */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />

                {/* Slide counter */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeSlide ? "20px" : "6px",
                        height: "6px",
                        background: i === activeSlide ? "white" : "rgba(255,255,255,0.45)",
                      }}
                    />
                  ))}
                </div>

                {/* Prev / Next arrows */}
                <button
                  aria-label="Previous slide"
                  onClick={() => goTo((activeSlide - 1 + SLIDES.length) % SLIDES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button
                  aria-label="Next slide"
                  onClick={() => goTo((activeSlide + 1) % SLIDES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>

              {/* ── Rotated card: bottom-left ── */}
              <div
                className="absolute bottom-4 -left-2 z-10 flex items-center gap-3 rounded-xl border border-border/60 bg-card/95 p-3.5 shadow-xl backdrop-blur-sm"
                style={{
                  transform: "rotate(-4deg)",
                  animation: "float 4s ease-in-out infinite",
                  minWidth: "180px",
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Detailed Courses</p>
                  <p className="text-xs text-muted-foreground">Hands-on learning</p>
                </div>
              </div>

              {/* ── Rotated card: top-right (avatar stack) ── */}
              <div
                className="absolute -top-2 -right-2 z-10 rounded-xl border border-border/60 bg-card/95 p-3.5 shadow-xl backdrop-blur-sm"
                style={{
                  transform: "rotate(3.5deg)",
                  animation: "float 4s 1.6s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-card bg-primary/20"
                      >
                        <Image
                          src="/placeholder-user.jpg"
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">500+ learners</p>
                    <p className="text-[10px] text-muted-foreground">joined this month</p>
                  </div>
                </div>
              </div>

              {/* ── Rotated card: mid-right (rating) ── */}
              <div
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-xl border border-border/60 bg-card/95 p-3 shadow-xl backdrop-blur-sm"
                style={{
                  transform: "translateX(40%) translateY(-50%) rotate(5deg)",
                  animation: "float 4s 0.8s ease-in-out infinite",
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-bold leading-none">4.9</p>
                  <p className="text-[10px] text-muted-foreground">avg rating</p>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute -inset-2 -z-10 rounded-3xl border border-primary/10" />
              <div className="absolute -inset-4 -z-10 rounded-[2rem] border border-primary/5" />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: rotate(var(--rot, 0deg)) translateY(0px); }
          50%       { transform: rotate(var(--rot, 0deg)) translateY(-7px); }
        }
        @keyframes underline-grow {
          to { transform: scaleX(1); }
        }
        .hero-item {
          opacity: 0;
          animation: hero-fade-up 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}