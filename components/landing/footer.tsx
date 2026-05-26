import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                          src="/logo.png"
                          alt="VMeduTech Logo"
                          width={32}
                          height={32}
                          className="h-10 w-18"
                          priority
                        />
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering the next generation with essential digital skills for
              the modern world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/schools"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  School Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/tutors"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Programs
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  Web Development
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  AI & Data Science
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Digital Literacy
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Microsoft Office Suite
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +234 800 000 0000
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  info@vmtechedu.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VM Tech Edu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
