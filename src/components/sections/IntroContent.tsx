import { panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const INTRO_SIGNALS = [
  { label: "Focus", value: "Design systems, modernization, delivery" },
  { label: "Stack", value: "React, TypeScript, Vue" },
  { label: "Best fit", value: "Product teams hiring for quality and structure" },
];

interface IntroContentProps {
  cvHref: string;
}

export function IntroContent({ cvHref: _cvHref }: IntroContentProps) {
  return (
    <div className="grid min-h-0 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <div className="flex min-h-0 flex-col gap-8 sm:gap-9">
        <div className="space-y-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-ghost">
            01 / OVERVIEW
          </p>
          <p className="max-w-[40ch] text-[1.08rem] leading-7 text-text-strong sm:text-[1.2rem] sm:leading-8">
            I focus on frontend work that makes a product feel clear, coherent,
            and deliberately built.
          </p>
          <dl className="grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-3 sm:gap-5">
            {INTRO_SIGNALS.map((item) => (
              <div key={item.label} className="space-y-2">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-ghost">
                  {item.label}
                </dt>
                <dd className="text-[1rem] leading-7 text-text-muted">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className={panelVariants({ tone: "subtle" })}>
        <div className="space-y-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-ghost">
            Best fit
          </p>
          <p className="max-w-[24ch] text-[1.05rem] leading-7 text-text-muted">
            Teams that care about product detail, maintainable UI systems, and
            frontend decisions that hold up after launch.
          </p>
          <ul className="space-y-3 border-t border-white/8 pt-5 text-base leading-7 text-text-muted">
            <li>Design system work that has to survive real product pressure.</li>
            <li>Legacy modernization where stability matters as much as speed.</li>
            <li>Frontend delivery that needs structure, testing, and sharper implementation judgment.</li>
          </ul>
          <div className="space-y-3 border-t border-white/8 pt-5">
            <div className="flex items-center justify-between gap-4 text-base text-text-muted">
              <span>linkedin.com/in/aguseynov</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-base text-text-muted">
              <span>{siteContent.profile.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
