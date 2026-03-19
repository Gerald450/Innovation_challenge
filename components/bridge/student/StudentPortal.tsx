"use client";

import * as React from "react";
import { Upload, CheckCircle2, Clock3, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  aiAssistant,
  deadlineAlerts,
  documentsNeeded,
  mayaAidStatus,
  studentMaya,
  supportTeam,
} from "@/lib/mockData/bridgeData";

type DocStatus = "missing" | "loading" | "complete";

function colorBadge(color: "red" | "yellow" | "green") {
  switch (color) {
    case "red":
      return "bg-red-600 text-white";
    case "yellow":
      return "bg-amber-500 text-black";
    case "green":
      return "bg-emerald-600 text-white";
  }
}

function formatMoney(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function PreScreenUploadRow({
  id,
  label,
  description,
  status,
  onUpload,
}: {
  id: string;
  label: string;
  description: string;
  status: DocStatus;
  onUpload: (id: string) => void;
}) {
  const isLoading = status === "loading";
  const isDone = status === "complete";

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border bg-white/70 p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {isDone ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
          ) : (
            <Clock3 className={cn("h-4 w-4", status === "loading" ? "text-amber-700" : "text-muted-foreground")} />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {isDone ? (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200" variant="outline">
              Pre-screening complete
            </Badge>
          ) : status === "loading" ? (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200" variant="outline">
              Pre-screening in progress (2s)
            </Badge>
          ) : (
            <Badge variant="outline">Not uploaded</Badge>
          )}
        </div>
      </div>

      <Button
        variant={isDone ? "secondary" : "outline"}
        disabled={isLoading || isDone}
        onClick={() => onUpload(id)}
        className="shrink-0"
      >
        <Upload className={cn("h-4 w-4", isLoading && "animate-spin")} />
        {isLoading ? "Uploading..." : isDone ? "Uploaded" : "Upload"}
      </Button>
    </div>
  );
}

function AiAssistantWidget() {
  const [connected, setConnected] = React.useState(false);

  return (
    <Card className="border-slate-200 bg-white/85">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">AI Assistant</CardTitle>
        </div>
        <CardDescription>
          Plain-language support with counselor review required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 rounded-xl border bg-white p-4">
          {aiAssistant.previousMessages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={cn(
                  "rounded-lg p-3",
                  isUser ? "bg-primary/5" : "bg-slate-50",
                )}
              >
                {!isUser && "label" in m && m.label ? (
                  <div className="mb-1 text-xs font-semibold text-primary">
                    {m.label}
                  </div>
                ) : null}
                <div className="text-sm leading-relaxed">{m.content}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            I can’t share other students’ details and I can’t guarantee aid outcomes.
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setConnected(true)}
          >
            Connect me to a counselor
          </Button>
        </div>

        {connected ? (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
            <div className="font-semibold text-amber-900">Connection request created (mock).</div>
            <div className="mt-1 text-amber-900/90">
              A counselor will review your file next. This demo does not perform real eligibility decisions.
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function StudentPortal() {
  const [docStatus, setDocStatus] = React.useState<Record<string, DocStatus>>({
    "proof-of-income": "missing",
    "fall-enrollment": "missing",
    "sap-appeal-letter": "missing",
  });

  const handleUpload = React.useCallback((id: string) => {
    setDocStatus((prev) => ({ ...prev, [id]: "loading" }));
    window.setTimeout(() => {
      setDocStatus((prev) => ({ ...prev, [id]: "complete" }));
    }, 2000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bridge-hero flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm shadow-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Meridian State University</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            Hi {studentMaya.name} — your financial aid check-in is ready.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Major: <span className="font-semibold">{studentMaya.major}</span> • GPA:{" "}
            <span className="font-semibold">{studentMaya.gpa.toFixed(1)}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <div className="space-y-6">
          <Card className="bridge-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Aid Status</CardTitle>
              <CardDescription>Your current financial aid pipeline at a glance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-xs font-semibold text-muted-foreground">FAFSA</p>
                  <p className="mt-2 text-sm font-semibold">{mayaAidStatus.fafsaStatus}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Expected Family Contribution</p>
                  <p className="mt-2 text-sm font-semibold">{mayaAidStatus.expectedFamilyContribution === 0 ? "$0" : formatMoney(mayaAidStatus.expectedFamilyContribution)}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Unmet Need</p>
                  <p className="mt-2 text-sm font-semibold">{formatMoney(mayaAidStatus.unmetNeed)}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Aid Package</p>
                  <p className="mt-2 text-sm font-semibold">{formatMoney(mayaAidStatus.aidPackage)}</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Some items require counselor review; completion of documents helps reduce delays.
              </div>
            </CardContent>
          </Card>

          <Card className="bridge-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Deadline Alerts</CardTitle>
              <CardDescription>Color-coded urgency based on your timeline.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deadlineAlerts.map((a) => (
                  <div key={a.id} className="flex items-start justify-between gap-4 rounded-lg border bg-white p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{a.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{a.details}</p>
                    </div>
                    <Badge className={cn(colorBadge(a.color), "border-none")} variant="outline">
                      {a.color === "red" ? "URGENT" : a.color === "yellow" ? "UPCOMING" : "COMPLETE"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bridge-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Documents Needed</CardTitle>
              <CardDescription>Upload required items. Each upload runs a mock 2-second pre-screening.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {documentsNeeded.map((d) => (
                <PreScreenUploadRow
                  key={d.id}
                  id={d.id}
                  label={d.label}
                  description={d.description}
                  status={docStatus[d.id]}
                  onUpload={handleUpload}
                />
              ))}
            </CardContent>
          </Card>

          <AiAssistantWidget />
        </div>

        <div className="space-y-6">
          <Card className="bridge-card">
            <CardHeader>
              <CardTitle className="text-base">My Support Team</CardTitle>
              <CardDescription>Assigned to help you avoid registration delays.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 rounded-lg border bg-white p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <span className="text-sm font-bold text-primary">DW</span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{supportTeam.counselor.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Financial Aid Counselor</div>
                  <div className="mt-2 text-xs">{supportTeam.counselor.availability}</div>
                </div>
              </div>

              <div className="flex gap-3 rounded-lg border bg-white p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <span className="text-sm font-bold text-accent-foreground">SL</span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{supportTeam.advisor.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Academic Advisor</div>
                  <div className="mt-2 text-xs">{supportTeam.advisor.availability}</div>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900/90">
                Tip: Upload your SAP appeal item first to reduce delays for upcoming registration.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

