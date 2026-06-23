import { siteContent } from "../../content/site";
import { ProofHologramProjection } from "./ProofHologramProjection";

export function ProofProjectionPlaceholder() {
  return <ProofHologramProjection />;
}

export function ProofContent() {
  return (
    <section className="grid gap-5 md:grid-cols-3 md:gap-7">
      {siteContent.strengths.map((item, index) => (
        <article
          key={item.title}
          className="pt-0"
        >
          <div className="space-y-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-inverse/42">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="max-w-[14ch] text-[1.3rem] font-semibold tracking-normal text-text-inverse sm:text-[1.55rem]">
              {item.title}
            </h3>
            <p className="max-w-none text-[1rem] leading-[1.62] text-text-inverse/72">
              {item.body}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
