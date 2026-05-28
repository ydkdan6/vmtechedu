"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  School,
  UserCheck,
  FolderOpen,
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

interface AdminSidebarProps {
  user: User;
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Image
            src="/logo.png"
            alt="VMeduTech Logo"
            width={32}
            height={32}
            className="h-10 w-18"
            priority
          />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-8">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
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
      <div className="border-t border-sidebar-border p-10">
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
    </aside>
  );
}
