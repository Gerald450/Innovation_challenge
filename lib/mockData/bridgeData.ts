export type UrgencyColor = "red" | "yellow" | "green";

export type PortalRole = "student" | "advisor" | "counselor" | "institution";

export const studentMaya = {
  name: "Maya Johnson",
  age: 20,
  major: "Social Work",
  gpa: 2.9,
  classYear: "Sophomore",
  institution: "Meridian State University",
};

export const mayaAidStatus = {
  fafsaStatus: "FAFSA verified",
  expectedFamilyContribution: 0,
  unmetNeed: 4200,
  aidPackage: 9800,
};

export const deadlineAlerts = [
  {
    id: "sap-appeal",
    title: "Satisfactory Academic Progress (SAP) appeal deadline",
    details: "Appeal deadline in 6 days",
    days: 6,
    color: "red" as const,
  },
  {
    id: "emergency-grant",
    title: "Emergency Grant application open",
    details: "Open now — review required documents",
    days: 10,
    color: "yellow" as const,
  },
  {
    id: "pell-renewal",
    title: "Pell Grant renewal",
    details: "Complete",
    days: 0,
    color: "green" as const,
  },
];

export type StudentDocument = {
  id: "proof-of-income" | "fall-enrollment" | "sap-appeal-letter";
  label: string;
  description: string;
};

export const documentsNeeded: StudentDocument[] = [
  {
    id: "proof-of-income",
    label: "Proof of income",
    description: "Recent income statement (uploaded document scan).",
  },
  {
    id: "fall-enrollment",
    label: "Fall enrollment verification",
    description: "Enrollment verification for the upcoming term.",
  },
  {
    id: "sap-appeal-letter",
    label: "SAP appeal letter",
    description: "A short statement explaining the circumstances and plan.",
  },
];

export const supportTeam = {
  counselor: {
    name: "Darnell Washington",
    availability: "Replies within 2 business days • Mon-Thu",
  },
  advisor: {
    name: "Dr. Samuel Lee",
    availability: "Office hours weekly • Appointment recommended",
  },
};

export const aiAssistant = {
  previousMessages: [
    {
      id: "q1",
      role: "user" as const,
      content: "Why is my aid on hold?",
    },
    {
      id: "a1",
      role: "assistant" as const,
      label: "AI-generated — counselor review required",
      content:
        "Your aid is on hold because a required SAP appeal item and/or supporting documents have not been fully confirmed yet. Upload the requested materials and your file will be reviewed by a counselor. I can’t guarantee outcomes, but connecting you to a counselor will help someone verify your eligibility steps.",
    },
  ],
};

export const counselorQueueCases = [
  {
    id: "case-maya",
    studentName: "Maya Johnson",
    issueType: "SAP appeal review • Aid hold",
    daysUntilDeadline: 6,
    urgencyScore: 9,
  },
  {
    id: "case-1",
    studentName: "Jordan Williams",
    issueType: "Document mismatch • Proof of income",
    daysUntilDeadline: 12,
    urgencyScore: 7,
  },
  {
    id: "case-2",
    studentName: "Avery Chen",
    issueType: "Pell renewal pending • Verification",
    daysUntilDeadline: 18,
    urgencyScore: 5,
  },
  {
    id: "case-3",
    studentName: "Sophia Rodriguez",
    issueType: "Emergency grant review",
    daysUntilDeadline: 9,
    urgencyScore: 8,
  },
  {
    id: "case-4",
    studentName: "Malik Johnson",
    issueType: "FAFSA verification follow-up",
    daysUntilDeadline: 15,
    urgencyScore: 4,
  },
];

export const mayaCaseDetail = {
  timelineEvents: [
    { id: "t1", label: "Missed portal login", relative: "4 days ago" },
    { id: "t2", label: "Document not uploaded", relative: "6 days ago" },
    { id: "t3", label: "Aid hold triggered", relative: "2 days ago" },
  ],
  aiGeneratedSummaryLabel: "AI-generated — counselor review required",
  aiSummary:
    "The system detected an SAP appeal that is not yet complete and supporting documents that are still pending pre-screening. These gaps are consistent with why your aid hold has been activated.",
  recommendedAction:
    "Confirm the missing SAP appeal document(s), verify supporting context, and request any revision needed before a final human ruling.",
  documentReview: [
    { id: "doc-income", name: "Proof of income", status: "Pending pre-screening" },
    { id: "doc-enrollment", name: "Fall enrollment verification", status: "Ready for counselor review" },
    { id: "doc-sap", name: "SAP appeal letter", status: "Human decision required" },
  ],
  sapAppealHumanDecision: {
    bannerTitle: "Human Decision Required",
    appealType: "SAP appeal",
    counselorRuling: undefined as "approve" | "request_revision" | "deny" | undefined,
    rationalePlaceholder: "Explain the ruling (policy, evidence reviewed, and next steps).",
  },
  internalNotesPlaceholder:
    "Internal notes for the case file. This is not shown to students.",
  actions: ["referAdvisor", "scheduleAppointment"] as const,
};

export type AdvisorWatchStudent = {
  id: string;
  name: string;
  riskScore: number;
  riskReason: string;
  lastContact: string;
  referredByFinancialAid?: boolean;
  contacted?: boolean;
};

export const advisorWatchlist: AdvisorWatchStudent[] = [
  {
    id: "w-maya",
    name: studentMaya.name,
    riskScore: 86,
    riskReason: "Aid hold pending SAP review • registration risk",
    lastContact: "2 days ago",
    referredByFinancialAid: true,
    contacted: false,
  },
  {
    id: "w-2",
    name: "Jordan Williams",
    riskScore: 78,
    riskReason: "Verification document lag",
    lastContact: "1 week ago",
    contacted: true,
  },
  {
    id: "w-3",
    name: "Avery Chen",
    riskScore: 73,
    riskReason: "Pell renewal steps incomplete",
    lastContact: "5 days ago",
    contacted: false,
  },
  {
    id: "w-4",
    name: "Sophia Rodriguez",
    riskScore: 71,
    riskReason: "Emergency grant review needed",
    lastContact: "3 days ago",
    contacted: false,
  },
  {
    id: "w-5",
    name: "Malik Johnson",
    riskScore: 68,
    riskReason: "FAFSA verification follow-up overdue",
    lastContact: "9 days ago",
    contacted: true,
  },
  {
    id: "w-6",
    name: "Emma Patel",
    riskScore: 65,
    riskReason: "Missing enrollment verification",
    lastContact: "4 days ago",
    contacted: false,
  },
  {
    id: "w-7",
    name: "Liam Thompson",
    riskScore: 61,
    riskReason: "SAP appeal draft incomplete",
    lastContact: "2 weeks ago",
    contacted: false,
  },
  {
    id: "w-8",
    name: "Zoe Martinez",
    riskScore: 58,
    riskReason: "Document pre-screening queued",
    lastContact: "6 days ago",
    contacted: true,
  },
];

export const mayaAdvisorDrawer = {
  academicStanding: "At-risk • improving trend after course repeat",
  creditLoad: "Currently 11 credits (target: 15)",
  aidHoldImpactOnRegistration:
    "Unresolved aid hold may delay registration confirmation for required courses.",
  notesContactLog: [
    { id: "n1", date: "Mar 12", note: "Sent reminders for SAP appeal steps." },
    { id: "n2", date: "Mar 15", note: "Checked document status; awaiting upload confirmation." },
    { id: "n3", date: "Mar 17", note: "Escalated to financial aid counselor queue." },
  ],
};

export const institutionalKpis = {
  studentsWithUnmetNeed: 1847,
  activeAidHolds: 312,
  atRiskOfDropout: 89,
  emergencyFundsThisSemester: 142000,
};

export const aidHoldResolutionByDepartment = [
  { month: "Sep", financialAid: 8.1, registrar: 6.9, studentAccounts: 7.6, scholarships: 9.2 },
  { month: "Oct", financialAid: 7.4, registrar: 6.2, studentAccounts: 7.0, scholarships: 8.8 },
  { month: "Nov", financialAid: 7.9, registrar: 5.8, studentAccounts: 7.3, scholarships: 9.0 },
  { month: "Dec", financialAid: 6.8, registrar: 5.4, studentAccounts: 6.7, scholarships: 8.2 },
  { month: "Jan", financialAid: 6.3, registrar: 5.1, studentAccounts: 6.4, scholarships: 7.9 },
  { month: "Feb", financialAid: 5.9, registrar: 4.8, studentAccounts: 6.1, scholarships: 7.4 },
];

export const atRiskBreakdownDonut = [
  { group: "First-Gen", value: 382 },
  { group: "Pell-Eligible", value: 418 },
  { group: "Underrepresented Minority", value: 295 },
  { group: "Transfer Students", value: 212 },
];

export const unresolvedIssuesHeatmap = [
  { department: "Education", unresolved: 64 },
  { department: "Business", unresolved: 58 },
  { department: "Computer Science", unresolved: 53 },
  { department: "Humanities", unresolved: 49 },
  { department: "Public Health", unresolved: 41 },
  { department: "Biology & Pre-Health", unresolved: 39 },
  { department: "Engineering", unresolved: 35 },
  { department: "Social Work", unresolved: 32 },
];

export const aiVsHumanOverrides = {
  modifiedAiRecommendationsPercent: 14,
  tooltip:
    "Counselors adjust AI recommendations to reflect individual context, policy nuance, and document quality. Human modifications are a healthy signal that the system supports, rather than replaces, professional judgment.",
};

