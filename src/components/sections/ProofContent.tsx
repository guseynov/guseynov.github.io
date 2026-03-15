import { panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

export function ProofContent() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {siteContent.strengths.map((item) => (
        <article key={item.title} className={panelVariants({ tone: "surface" })}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
            Strength
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-text-strong">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-text-muted">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
