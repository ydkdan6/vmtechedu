"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  BrainCircuit,
  MonitorSmartphone,
  FileSpreadsheet,
  Palette,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Learn HTML, CSS, JavaScript, and modern frameworks to build stunning websites and applications.",
    accent: "from-violet-500/20 to-purple-500/10",
    iconBg: "bg-violet-500/15 text-violet-400",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-violet-500/10",
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Science",
    description:
      "Master machine learning, data analysis, and AI tools to solve real-world problems.",
    accent: "from-cyan-500/20 to-blue-500/10",
    iconBg: "bg-cyan-500/15 text-cyan-400",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-cyan-500/10",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Literacy",
    description:
      "Essential computer skills for the modern workplace - from basics to advanced productivity.",
    accent: "from-emerald-500/20 to-teal-500/10",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-emerald-500/10",
  },
  {
    icon: FileSpreadsheet,
    title: "Microsoft Office",
    description:
      "Become proficient in Word, Excel, PowerPoint, and other essential office applications.",
    accent: "from-orange-500/20 to-amber-500/10",
    iconBg: "bg-orange-500/15 text-orange-400",
    border: "hover:border-orange-500/40",
    glow: "hover:shadow-orange-500/10",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Create stunning visuals with Canva, Photoshop, and other design tools.",
    accent: "from-pink-500/20 to-rose-500/10",
    iconBg: "bg-pink-500/15 text-pink-400",
    border: "hover:border-pink-500/40",
    glow: "hover:shadow-pink-500/10",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Learn to protect digital assets and understand online security fundamentals.",
    accent: "from-red-500/20 to-orange-500/10",
    iconBg: "bg-red-500/15 text-red-400",
    border: "hover:border-red-500/40",
    glow: "hover:shadow-red-500/10",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative flex-shrink-0 w-72 md:w-80
        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-8 blur-sm"
        }
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Glassmorphism card */}
      <div
        className={`
          relative h-full rounded-2xl p-6
          backdrop-blur-md
          bg-white/5 dark:bg-white/[0.03]
          border border-white/10 dark:border-white/[0.08]
          ${feature.border}
          shadow-xl ${feature.glow}
          hover:shadow-2xl
          transition-all duration-500
          hover:-translate-y-1.5
          cursor-default
          overflow-hidden
        `}
      >
        {/* Gradient top-left glow blob */}
        <div
          className={`absolute -top-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-br ${feature.accent} blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`
              inline-flex h-12 w-12 items-center justify-center
              rounded-xl ${feature.iconBg}
              ring-1 ring-white/10
              mb-4 transition-transform duration-300 group-hover:scale-110
            `}
          >
            <feature.icon className="h-6 w-6" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            {feature.description}
          </p>

          {/* Bottom subtle divider + CTA hint */}
          <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center gap-1.5 text-xs text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors duration-300">
            <span>Explore course</span>
            <svg
              className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      {/* Background ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Comprehensive Digital Skills Training
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From beginner to advanced, we offer courses designed to equip you
            with the skills needed in today&apos;s digital economy.
          </p>
        </div>

        {/* Scroll controls */}
        <div className="flex items-center justify-end gap-2 mb-4 px-1">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`
              h-8 w-8 rounded-full flex items-center justify-center
              border border-white/10 bg-white/5 backdrop-blur-sm
              text-muted-foreground transition-all duration-200
              hover:bg-white/10 hover:text-foreground
              disabled:opacity-30 disabled:cursor-not-allowed
            `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`
              h-8 w-8 rounded-full flex items-center justify-center
              border border-white/10 bg-white/5 backdrop-blur-sm
              text-muted-foreground transition-all duration-200
              hover:bg-white/10 hover:text-foreground
              disabled:opacity-30 disabled:cursor-not-allowed
            `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Scroll track with fade edges */}
        <div className="relative">
          {/* Left fade */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
          />
          {/* Right fade */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
          />

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {/* Leading spacer */}
            <div className="flex-shrink-0 w-px" />
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
            {/* Trailing spacer */}
            <div className="flex-shrink-0 w-px" />
          </div>
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {features.map((f, i) => (
            <button
              key={f.title}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = 320 + 16;
                el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
              }}
              aria-label={`Go to ${f.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 bg-foreground/20 hover:bg-foreground/40`}
              style={{ width: "24px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}