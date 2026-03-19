import { ArrowRight } from "lucide-react";

const NODE_THEME = {
  border: "border-white/15",
  bg: "bg-white/5",
  card: "bg-white/5 hover:bg-white/7",
};

function Node({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
  return (
    <div className={`flex min-w-[240px] flex-1 flex-col gap-3 rounded-2xl border ${NODE_THEME.border} p-5 ${NODE_THEME.card}`}>
      <div className="text-sm font-semibold text-white">{title}</div>
      <ul className="space-y-2">
        {bullets.map((b, idx) => (
          <li key={idx} className="text-xs leading-relaxed text-white/85">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          How It Works
        </h1>
        <p className="mt-2 text-sm text-white/75 max-w-3xl">
          BRIDGE is designed for early intervention. AI supports navigation and triage, while sensitive decisions always require human oversight.
        </p>
      </div>

      <div className="flex items-stretch gap-4 overflow-x-auto pb-2">
        <div className="flex min-w-max items-stretch gap-4">
          <Node
            title="INPUT"
            bullets={[
              "SIS data",
              "LMS login activity",
              "Aid portal behavior",
              "Document upload status",
              "Deadline calendar",
            ]}
          />
          <div className="flex items-center justify-center px-2">
            <ArrowRight className="h-10 w-10 text-amber-400" />
          </div>
          <Node
            title="AI LAYER"
            bullets={[
              "Eligibility gap detection",
              "Urgency scoring",
              "Plain-language explanation generation",
              "Counselor queue routing",
            ]}
          />
          <div className="flex items-center justify-center px-2">
            <ArrowRight className="h-10 w-10 text-amber-400" />
          </div>
          <Node
            title="ACTION"
            bullets={[
              "Student alerts",
              "Counselor case creation",
              "Advisor referrals",
              "Document pre-screening",
            ]}
          />
          <div className="flex items-center justify-center px-2">
            <ArrowRight className="h-10 w-10 text-amber-400" />
          </div>
          <Node
            title="HUMAN OVERSIGHT"
            bullets={[
              "All appeals",
              "Exception rulings",
              "Sensitive disclosures",
              "Final disbursement approvals — never automated",
            ]}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-semibold text-white">Design constraint</div>
        <div className="mt-2 text-sm text-white/75">
          This prototype never displays final appeal rulings from AI, and every AI-generated recommendation includes a counselor review label.
        </div>
      </div>
    </div>
  );
}

