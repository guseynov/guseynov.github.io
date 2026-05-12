import { siteContent } from "@/content/site";

export function ProofContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
      {siteContent.strengths.map((item, index) => (
        <article
          key={item.title}
          className={
            index > 0
              ? "border-t border-black/8 pt-5 md:border-t-0 md:pt-0 md:pl-0 xl:border-l xl:pl-6"
              : undefined
          }
        >
          <h3 className="max-w-[16ch] text-[1.45rem] font-semibold tracking-[-0.04em] text-text-inverse sm:text-[1.65rem]">
            {item.title}
          </h3>
          <p className="mt-4 max-w-[32ch] text-base leading-7 text-text-inverse/72">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
