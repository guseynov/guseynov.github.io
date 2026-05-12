import clsx from "clsx";
import {
  Cpu,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import { chipVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const SKILL_ITEM_ICONS = {
  terminal: Terminal,
  spark: Sparkles,
  nodes: Workflow,
  chip: Cpu,
} as const;

export function CapabilitiesContent() {
  return (
    <div className="grid gap-5">
      {siteContent.skills.map((group) => (
        <article
          key={group.title}
          className={clsx(
            "flex flex-col gap-4 border-b border-white/8 pb-5 last:border-b-0 last:pb-0",
          )}
        >
          <div className="space-y-2">
            <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-text-strong">
              {group.title}
            </h3>
            <p className="max-w-[62ch] text-base leading-7 text-text-muted">{group.summary}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const Icon =
                typeof item === "string" || !item.icon ? null : SKILL_ITEM_ICONS[item.icon];

              return (
                <li key={label} className={clsx(chipVariants(), "inline-flex items-center gap-2")}>
                  {Icon ? <Icon aria-hidden="true" className="h-4 w-4 text-text-muted" /> : null}
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
