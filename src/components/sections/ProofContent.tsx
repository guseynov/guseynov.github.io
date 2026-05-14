import { siteContent } from "@/content/site";
import { ProofHologramProjection } from "@/components/sections/ProofHologramProjection";

export function ProofProjectionPlaceholder() {
  return <ProofHologramProjection />;
}

export function ProofContent() {
  return (
    <section className="grid gap-6 md:grid-cols-3 md:gap-8">
      {siteContent.strengths.map((item) => (
        <article key={item.title} className="space-y-4">
          <div className="space-y-3">
            <h3 className="max-w-[14ch] text-[1.3rem] font-semibold tracking-normal text-text-inverse sm:text-[1.55rem]">
              {item.title}
            </h3>
            <p className="max-w-none text-[1rem] leading-7 text-text-inverse/74">
              {item.body}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
