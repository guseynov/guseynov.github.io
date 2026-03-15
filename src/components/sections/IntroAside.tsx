import { chipVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

export function IntroAside() {
  return (
    <div className="flex flex-wrap gap-2 md:justify-end">
      {siteContent.intro.quickFacts.map((fact) => (
        <span key={fact} className={chipVariants()}>
          {fact}
        </span>
      ))}
    </div>
  );
}
