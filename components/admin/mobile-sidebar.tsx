"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  School,
  UserCheck,
  GraduationCap,
  FolderOpen,
  Menu,
  X,
  Settings,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/admin/dashboard/courses", icon: BookOpen },
  { name: "Categories", href: "/admin/dashboard/categories", icon: FolderOpen },
  { name: "Enrollments", href: "/admin/dashboard/enrollments", icon: Users },
  { name: "School Requests", href: "/admin/dashboard/schools", icon: School },
  { name: "Tutor Applications", href: "/admin/dashboard/tutors", icon: UserCheck },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

interface MobileSidebarProps {
  user: User;
}

export function MobileSidebar({ user }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar text-sidebar-foreground">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold">VM Tech Edu</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
              {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">
                {user.user_metadata?.full_name || "Admin"}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
