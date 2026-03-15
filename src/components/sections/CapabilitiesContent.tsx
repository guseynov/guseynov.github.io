import clsx from "clsx";
import { chipVariants, panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

export function CapabilitiesContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {siteContent.skills.map((group) => (
        <article
          key={group.title}
          className={clsx(panelVariants({ tone: "surface" }), "flex h-full flex-col")}
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
            {group.title}
          </p>
          <p className="mt-4 text-base leading-7 text-text-strong">{group.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item} className={chipVariants()}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
