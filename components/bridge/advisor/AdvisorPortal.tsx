"use client";

import * as React from "react";
import { Info, Megaphone, CalendarDays, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  advisorWatchlist,
  mayaAdvisorDrawer,
  studentMaya,
} from "@/lib/mockData/bridgeData";

function formatRiskScore(score: number) {
  return `${score}`;
}

function riskTone(score: number) {
  if (score >= 80) return "bg-red-50 text-red-800 border-red-200";
  if (score >= 65) return "bg-amber-50 text-amber-900 border-amber-200";
  return "bg-emerald-50 text-emerald-800 border-emerald-200";
}

export default function AdvisorPortal() {
  const [rows, setRows] = React.useState(() => advisorWatchlist);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>("w-maya");

  const mayaRow = rows.find((r) => r.id === "w-maya");
  const selected = selectedId === "w-maya" ? studentMaya.name : null;

  const bannerDate = "Mar 28, 2026";

  const onOpenProfile = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const onOutreachSent = () => {
    setRows((prev) =>
      prev.map((r) => (r.id === "w-maya" ? { ...r, contacted: true, lastContact: "Today" } : r)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 text-primary" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground">
              3 students at risk of registration block due to unresolved aid holds — act before{" "}
              <span className="text-primary">{bannerDate}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              This view focuses on outreach planning. Individual decisions happen in the counselor workflow.
            </div>
          </div>
        </div>
      </div>

      <Card className="border-slate-200 bg-white/85">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">Student Watchlist</CardTitle>
              <CardDescription>Students flagged by AI as financially at-risk.</CardDescription>
            </div>
            <div className="flex flex-col items-end text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Dr. Renee Okafor</span>
              <span className="mt-1 inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> Outreach planning
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Risk Reason</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const isMaya = r.id === "w-maya";
                return (
                  <TableRow key={r.id}>
                    <TableCell className="min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{r.name}</div>
                          {isMaya && r.referredByFinancialAid ? (
                            <div className="mt-1">
                              <Badge
                                variant="outline"
                                className="border-primary/30 bg-primary/5 text-primary"
                              >
                                Referred by Financial Aid
                              </Badge>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("border", riskTone(r.riskScore))}
                      >
                        {formatRiskScore(r.riskScore)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="text-sm text-muted-foreground">{r.riskReason}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{r.lastContact}</div>
                      {r.contacted ? (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Contacted
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant={isMaya ? "default" : "outline"}
                          onClick={() => onOpenProfile(r.id)}
                        >
                          {isMaya ? "View Profile" : "Open"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed right-0 top-0 left-auto z-50 h-screen w-full max-w-md translate-x-0 translate-y-0 rounded-none border-l p-6">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>
              {selected ? selected : "Select a student to view details"}
            </DialogDescription>
          </DialogHeader>

          {selectedId === "w-maya" ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{studentMaya.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{studentMaya.major}</div>
                  </div>
                  {mayaRow?.contacted ? (
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800" variant="outline">
                      Outreach sent
                    </Badge>
                  ) : (
                    <Badge className="border-amber-200 bg-amber-50 text-amber-900" variant="outline">
                      Needs outreach
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2 rounded-lg border bg-white p-4">
                <div className="text-sm font-semibold">Academic standing</div>
                <div className="text-sm text-muted-foreground">{mayaAdvisorDrawer.academicStanding}</div>
              </div>
              <div className="space-y-2 rounded-lg border bg-white p-4">
                <div className="text-sm font-semibold">Credit load</div>
                <div className="text-sm text-muted-foreground">{mayaAdvisorDrawer.creditLoad}</div>
              </div>
              <div className="space-y-2 rounded-lg border bg-white p-4">
                <div className="text-sm font-semibold">Aid hold impact on registration</div>
                <div className="text-sm text-muted-foreground">{mayaAdvisorDrawer.aidHoldImpactOnRegistration}</div>
              </div>

              <div className="space-y-2 rounded-lg border bg-white p-4">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-primary" />
                  <div className="text-sm font-semibold">Notes / Contact log</div>
                </div>
                <div className="space-y-2">
                  {mayaAdvisorDrawer.notesContactLog.map((n) => (
                    <div key={n.id} className="rounded-lg border bg-background p-3">
                      <div className="text-xs font-semibold text-muted-foreground">
                        {n.date}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{n.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!!mayaRow?.contacted}
                  onClick={onOutreachSent}
                >
                  {mayaRow?.contacted ? "Outreach Sent" : "Outreach Sent"}
                </Button>
                <div className="mt-2 text-xs text-muted-foreground">
                  Mock action: updates contact status in this demo only.
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-lg border bg-white p-4 text-sm text-muted-foreground">
              Drawer details are implemented for <span className="font-semibold text-foreground">Maya Johnson</span> in this prototype.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

