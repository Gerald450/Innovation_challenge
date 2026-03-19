"use client";

import * as React from "react";
import { CalendarDays, FileText, AlertTriangle, Clock3, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  counselorQueueCases,
  mayaCaseDetail,
} from "@/lib/mockData/bridgeData";

type DocReviewState = Record<string, "pending" | "approved" | "revision_requested">;

function urgencyBadge(urgencyScore: number) {
  if (urgencyScore >= 9) return "bg-red-600 text-white border-none";
  if (urgencyScore >= 7) return "bg-amber-500 text-black border-none";
  return "bg-emerald-600 text-white border-none";
}

export default function CounselorPortal() {
  const [selectedCaseId, setSelectedCaseId] = React.useState<string>("case-maya");
  const [docStates, setDocStates] = React.useState<DocReviewState>(() => {
    const initial: DocReviewState = {};
    for (const d of mayaCaseDetail.documentReview) initial[d.id] = "pending";
    return initial;
  });

  const [humanOverride, setHumanOverride] = React.useState("");
  const [sapRuling, setSapRuling] = React.useState<"approve" | "request_revision" | "deny" | "">("");
  const [sapRationale, setSapRationale] = React.useState("");
  const [internalNotes, setInternalNotes] = React.useState("");

  const [bannerMessage, setBannerMessage] = React.useState<string | null>(null);

  const selectedIsMaya = selectedCaseId === "case-maya";

  const handleDocAction = (docId: string, next: DocReviewState[string]) => {
    setDocStates((prev) => ({ ...prev, [docId]: next }));
  };

  return (
    <div className="space-y-6">
      <div className="bridge-hero">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary/90">
          Financial Aid Counselor Portal
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Case Management Workspace</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Prioritize urgent student cases while keeping all final rulings human-led.
        </p>
      </div>

      {bannerMessage ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="font-semibold text-amber-900">Recorded (mock)</div>
          <div className="mt-1 text-amber-900/90">{bannerMessage}</div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <aside className="space-y-4">
          <Card className="bridge-card">
            <CardHeader>
              <CardTitle className="text-base">Queue Metrics</CardTitle>
              <CardDescription>Operational snapshot for active cases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-white p-4">
                <div className="text-xs font-semibold text-muted-foreground">Total Active Cases</div>
                <div className="mt-2 text-2xl font-bold">47</div>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <div className="text-xs font-semibold text-muted-foreground">Avg Days to Resolution</div>
                <div className="mt-2 text-2xl font-bold">8.3</div>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <div className="text-xs font-semibold text-muted-foreground">Appeals Pending Human Review</div>
                <div className="mt-2 text-2xl font-bold">12</div>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <div className="text-xs font-semibold text-muted-foreground">Documents Awaiting Approval</div>
                <div className="mt-2 text-2xl font-bold">23</div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[420px,1fr]">
            <div className="space-y-4">
              <Card className="bridge-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Case Queue</CardTitle>
                  <CardDescription>AI-ranked urgency (1–10). Review to open the case detail panel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {counselorQueueCases.map((c) => (
                    <div
                      key={c.id}
                      className={cn(
                        "flex items-start justify-between gap-3 rounded-lg border bg-white p-4",
                        c.id === selectedCaseId ? "ring-2 ring-ring" : "",
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{c.studentName}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{c.issueType}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge className={urgencyBadge(c.urgencyScore)} variant="outline">
                            {c.urgencyScore}/10
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock3 className="h-3.5 w-3.5" />
                            <span>{c.daysUntilDeadline} days</span>
                            <span className="hidden sm:inline">to deadline</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={c.id === selectedCaseId ? "default" : "outline"}
                        onClick={() => setSelectedCaseId(c.id)}
                      >
                        Review
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="bridge-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Case Detail</CardTitle>
                    <CardDescription>
                      {selectedIsMaya ? "Maya Johnson • SAP appeal and document review" : "Select a case from the queue"}
                    </CardDescription>
                  </div>
                  {selectedIsMaya ? (
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-800">
                      Urgency high
                    </Badge>
                  ) : null}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {!selectedIsMaya ? (
                  <div className="rounded-lg border bg-white p-4 text-sm text-muted-foreground">
                    This demo only includes the full detail panel for <span className="font-semibold text-foreground">Maya Johnson</span>.
                    Use the queue to preview selection.
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <div className="text-sm font-semibold">Timeline of AI-flagged events</div>
                      </div>
                      <div className="space-y-2 rounded-lg border bg-white p-4">
                        {mayaCaseDetail.timelineEvents.map((t) => (
                          <div key={t.id} className="flex items-center justify-between gap-4">
                            <div className="text-sm">{t.label}</div>
                            <div className="text-xs text-muted-foreground">{t.relative}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 rounded-lg border bg-white p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-semibold">AI Case Summary</div>
                        <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                          {mayaCaseDetail.aiGeneratedSummaryLabel}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{mayaCaseDetail.aiSummary}</div>
                      <div className="mt-2">
                        <div className="text-xs font-semibold text-muted-foreground">Recommended action</div>
                        <div className="mt-1 text-sm">{mayaCaseDetail.recommendedAction}</div>
                      </div>

                      <div className="mt-3">
                        <div className="text-xs font-semibold text-muted-foreground">Human override (what you want to do)</div>
                        <Textarea
                          value={humanOverride}
                          onChange={(e) => setHumanOverride(e.target.value)}
                          placeholder="Type your override here. This demo does not auto-apply any decision."
                          className="mt-2 min-h-[110px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="font-semibold">Document Review</div>
                      <div className="space-y-2 rounded-lg border bg-white p-4">
                        {mayaCaseDetail.documentReview.map((d) => {
                          const st = docStates[d.id];
                          const statusBadge =
                            st === "approved" ? (
                              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200" variant="outline">
                                Approved
                              </Badge>
                            ) : st === "revision_requested" ? (
                              <Badge className="bg-amber-100 text-amber-800 border-amber-200" variant="outline">
                                Revision requested
                              </Badge>
                            ) : (
                              <Badge variant="outline">{d.status}</Badge>
                            );

                          return (
                            <div key={d.id} className="rounded-lg border bg-white p-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <div className="truncate text-sm font-semibold">{d.name}</div>
                                  </div>
                                  <div className="mt-2 flex flex-wrap items-center gap-2">
                                    {statusBadge}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDocAction(d.id, "approved")}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleDocAction(d.id, "revision_requested")}
                                  >
                                    Request Revision
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-700" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-red-900">
                            {mayaCaseDetail.sapAppealHumanDecision.bannerTitle} • {mayaCaseDetail.sapAppealHumanDecision.appealType}
                          </div>
                          <div className="mt-1 text-xs text-red-900/80">
                            Final appeal rulings are never automated. Select a ruling and add rationale before any downstream approvals.
                          </div>

                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <div>
                              <div className="text-xs font-semibold text-red-900/90">Counselor ruling</div>
                              <Select
                                value={sapRuling}
                                onValueChange={(v) => {
                                  if (v === "approve" || v === "request_revision" || v === "deny") {
                                    setSapRuling(v);
                                  } else {
                                    setSapRuling("");
                                  }
                                }}
                              >
                                <SelectTrigger className="mt-2 bg-white">
                                  <SelectValue placeholder="Choose a ruling" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="approve">Approve</SelectItem>
                                  <SelectItem value="request_revision">Request Revision</SelectItem>
                                  <SelectItem value="deny">Deny</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-red-900/90">Rationale</div>
                              <Textarea
                                value={sapRationale}
                                onChange={(e) => setSapRationale(e.target.value)}
                                placeholder={mayaCaseDetail.sapAppealHumanDecision.rationalePlaceholder}
                                className="mt-2 min-h-[92px] bg-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="font-semibold">Internal Notes</div>
                      <Textarea
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        placeholder={mayaCaseDetail.internalNotesPlaceholder}
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ArrowRight className="h-3.5 w-3.5" />
                        <span>Next steps are human-confirmed.</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setBannerMessage("Referred Maya to her academic advisor for coordinated outreach (mock).");
                          }}
                        >
                          Refer to Advisor
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => {
                            setBannerMessage("Scheduled an appointment workflow for Maya (mock).");
                          }}
                        >
                          Schedule Appointment
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

