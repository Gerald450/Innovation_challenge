"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Info, Activity, Shield } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  aidHoldResolutionByDepartment,
  atRiskBreakdownDonut,
  aiVsHumanOverrides,
  institutionalKpis,
  unresolvedIssuesHeatmap,
} from "@/lib/mockData/bridgeData";

function formatMoney(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function InstitutionalDashboard() {
  const heatMax = Math.max(...unresolvedIssuesHeatmap.map((d) => d.unresolved));

  const BAR_COLORS = {
    financialAid: "#4C1D95",
    registrar: "#F59E0B",
    studentAccounts: "#7C3AED",
    scholarships: "#10B981",
  };

  const donutColors = ["#4C1D95", "#F59E0B", "#7C3AED", "#10B981"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Institutional Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aggregated, de-identified reporting for executive planning.
          </p>
        </div>
        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
          Role-gated summary
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="border-slate-200 bg-white/85">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Students with Unmet Need
            </CardTitle>
            <CardDescription>Needs additional support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{institutionalKpis.studentsWithUnmetNeed.toLocaleString("en-US")}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white/85">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Active Aid Holds
            </CardTitle>
            <CardDescription>Pending resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{institutionalKpis.activeAidHolds}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white/85">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> At-Risk of Dropout
            </CardTitle>
            <CardDescription>Financially driven risk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{institutionalKpis.atRiskOfDropout}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white/85">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Emergency Funds Disbursed
            </CardTitle>
            <CardDescription>This semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatMoney(institutionalKpis.emergencyFundsThisSemester)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-slate-200 bg-white/85">
          <CardHeader>
            <CardTitle className="text-base">Aid Hold Resolution Time by Department</CardTitle>
            <CardDescription>Average days to resolution (last 6 months).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <BarChart width={900} height={320} data={aidHoldResolutionByDepartment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="financialAid" name="Financial Aid" fill={BAR_COLORS.financialAid} radius={[6, 6, 0, 0]} />
                <Bar dataKey="registrar" name="Registrar" fill={BAR_COLORS.registrar} radius={[6, 6, 0, 0]} />
                <Bar dataKey="studentAccounts" name="Student Accounts" fill={BAR_COLORS.studentAccounts} radius={[6, 6, 0, 0]} />
                <Bar dataKey="scholarships" name="Scholarships" fill={BAR_COLORS.scholarships} radius={[6, 6, 0, 0]} />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white/85">
          <CardHeader>
            <CardTitle className="text-base">At-Risk Breakdown (Demographics)</CardTitle>
            <CardDescription>Share of flagged students by group.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="overflow-x-auto">
                <PieChart width={420} height={300}>
                  <Pie
                    data={atRiskBreakdownDonut}
                    dataKey="value"
                    nameKey="group"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={3}
                  >
                    {atRiskBreakdownDonut.map((entry, index) => (
                      <Cell key={`cell-${entry.group}`} fill={donutColors[index % donutColors.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </div>

              <div className="w-full sm:w-[45%] space-y-2">
                {atRiskBreakdownDonut.map((d, i) => (
                  <div key={d.group} className="flex items-center justify-between rounded-lg border bg-white p-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex h-3.5 w-3.5 rounded-full" style={{ background: donutColors[i % donutColors.length] }} />
                      <div className="truncate text-sm font-semibold">{d.group}</div>
                    </div>
                    <div className="text-sm font-bold">{d.value.toLocaleString("en-US")}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white/85">
        <CardHeader>
          <CardTitle className="text-base">Unresolved Aid Issues Concentration</CardTitle>
          <CardDescription>Heatmap-style view by academic department.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left">
                  <th className="p-3 font-semibold text-muted-foreground">Department</th>
                  <th className="p-3 font-semibold text-muted-foreground">Unresolved Issues</th>
                  <th className="p-3 font-semibold text-muted-foreground">Concentration</th>
                </tr>
              </thead>
              <tbody>
                {unresolvedIssuesHeatmap
                  .slice()
                  .sort((a, b) => b.unresolved - a.unresolved)
                  .map((row) => {
                    const intensity = row.unresolved / heatMax;
                    const bg = `rgba(76, 29, 149, ${0.06 + intensity * 0.18})`;
                    return (
                      <tr key={row.department}>
                        <td className="p-3 font-semibold">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-flex h-2.5 w-2.5 rounded-full"
                              style={{ background: `rgba(76, 29, 149, ${0.35 + intensity * 0.45})` }}
                            />
                            {row.department}
                          </div>
                        </td>
                        <td className="p-3">{row.unresolved}</td>
                        <td className="p-3">
                          <div
                            className="flex items-center gap-2 rounded-md border px-3 py-1.5"
                            style={{ background: bg, borderColor: `rgba(76, 29, 149, ${0.18 + intensity * 0.28})` }}
                          >
                            <span className="font-bold">{Math.round(intensity * 100)}%</span>
                            <span className="text-xs text-muted-foreground">relative concentration</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white/85">
        <CardHeader>
          <CardTitle className="text-base">AI Flags vs. Human Overrides</CardTitle>
          <CardDescription>Counselor modifications are a healthy validation signal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-primary">{aiVsHumanOverrides.modifiedAiRecommendationsPercent}%</div>
              <div>
                <div className="text-sm font-semibold">Counselors modified AI recommendations</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Reflects context-aware review, not system failure.
                </div>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Why this matters
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[340px]">
                  {aiVsHumanOverrides.tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        All individual student data is role-gated. This view shows aggregated, de-identified reporting only.
      </div>
    </div>
  );
}

