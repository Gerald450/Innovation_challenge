"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ShieldCheck, BarChart3, UserRound, Waypoints } from "lucide-react";

import { cn } from "@/lib/utils";
import RoleSwitcher from "@/components/bridge/RoleSwitcher";
import { Button } from "@/components/ui/button";

const NAV_ITEMS: Array<{
  href: string;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    href: "/student",
    label: "Student Portal",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    href: "/advisor",
    label: "Advisor Portal",
    icon: <UserRound className="h-4 w-4" />,
  },
  {
    href: "/counselor",
    label: "Financial Aid Counselor Portal",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    href: "/institution",
    label: "Institutional Dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    icon: <Waypoints className="h-4 w-4" />,
  },
];

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 pb-3 pt-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/student"
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white/80"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <span className="font-black tracking-tight">B</span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-black tracking-[0.04em] text-foreground">
                BRIDGE
              </span>
              <span className="text-[11px] text-muted-foreground">
                Financial Aid Navigation
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <RoleSwitcher />
          </div>
        </div>

        <nav className="mt-3 flex items-center gap-1 overflow-x-auto pb-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Button
                key={item.href}
                asChild
                variant={active ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 rounded-lg px-3 text-xs sm:h-9 sm:text-sm",
                  active ? "shadow-sm shadow-primary/20" : "text-muted-foreground",
                )}
              >
                <Link href={item.href} className="flex items-center">
                  <span className="mr-1 inline-flex">{item.icon}</span>
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

