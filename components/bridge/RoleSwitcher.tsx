"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type PortalRole = "student" | "advisor" | "counselor" | "institution";

const ROLE_META: Record<
  PortalRole,
  { label: string; path: string; loggedInAs: string }
> = {
  student: {
    label: "Student Portal",
    path: "/student",
    loggedInAs: "Maya Johnson",
  },
  advisor: {
    label: "Advisor Portal",
    path: "/advisor",
    loggedInAs: "Dr. Renee Okafor",
  },
  counselor: {
    label: "Financial Aid Counselor Portal",
    path: "/counselor",
    loggedInAs: "Darnell Washington",
  },
  institution: {
    label: "Institutional Dashboard",
    path: "/institution",
    loggedInAs: "BRIDGE Analytics",
  },
};

function roleFromPath(pathname: string): PortalRole {
  if (pathname.startsWith("/advisor")) return "advisor";
  if (pathname.startsWith("/counselor")) return "counselor";
  if (pathname.startsWith("/institution")) return "institution";
  return "student";
}

export default function RoleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = roleFromPath(pathname);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="hidden sm:flex sm:flex-col sm:leading-tight">
        <span className="text-xs text-muted-foreground">Role view</span>
        <span className="text-sm font-semibold">{ROLE_META[role].loggedInAs}</span>
      </div>
      <Select
        value={role}
        onValueChange={(nextRole) => {
          const next = nextRole as PortalRole;
          router.push(ROLE_META[next].path);
        }}
      >
        <SelectTrigger className="w-[240px] bg-white/90">
          <SelectValue placeholder="Switch role" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ROLE_META).map(([key, meta]) => (
            <SelectItem key={key} value={key}>
              {meta.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

