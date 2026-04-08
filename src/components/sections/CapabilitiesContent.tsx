import clsx from "clsx";
import {
  ChipIcon,
  NodesIcon,
  SparkIcon,
  TerminalIcon,
} from "@/components/SanityIcons";
import { chipVariants, panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const SKILL_ITEM_ICONS = {
  terminal: TerminalIcon,
  spark: SparkIcon,
  nodes: NodesIcon,
  chip: ChipIcon,
} as const;

export function CapabilitiesContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {siteContent.skills.map((group) => (
        <article
          key={group.title}
          className={clsx(panelVariants({ tone: "surface" }), "flex h-full flex-col")}
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
            {group.title}
          </p>
          <p className="mt-4 text-base leading-7 text-text-muted">{group.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {group.items.map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const Icon =
                typeof item === "string" || !item.icon ? null : SKILL_ITEM_ICONS[item.icon];

              return (
                <li key={label} className={clsx(chipVariants(), "inline-flex items-center gap-2")}>
                  {Icon ? <Icon aria-hidden="true" className="h-4 w-4 text-[#8fd0ff]" /> : null}
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
