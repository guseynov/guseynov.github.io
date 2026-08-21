import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CornerButton } from "./CornerButton";

type Project = {
  codeUrl: string;
  image: string;
  liveUrl: string;
  name: string;
  summary: string;
  tags: string[];
};

const projects: Project[] = [
  {
    codeUrl: "https://github.com/guseynov/offer-flow",
    image: "offer-flow-index.png",
    liveUrl: "https://offer-flow-console.vercel.app/dashboard",
    name: "OfferFlow",
    summary:
      "A commerce-style product surface for browsing and managing community deal flows.",
    tags: ["Next.js", "TypeScript", "Zustand", "TanStack", "Query"],
  },
  {
    codeUrl: "https://github.com/guseynov/atlas",
    image: "atlas-index.png",
    liveUrl: "https://atlas-explorer-delta.vercel.app",
    name: "Earth Event Atlas",
    summary:
      "A data-led Earth events explorer for browsing and comparing active natural events.",
    tags: ["Next.js", "TypeScript", "MapLibre", "NASA EONET"],
  },
  {
    codeUrl: "https://github.com/guseynov/scout",
    image: "scout-index.png",
    liveUrl: "https://scout-deals-fawn.vercel.app",
    name: "Scout",
    summary:
      "A curated commerce experience for discovering useful community recommendations.",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Zustand"],
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const mix = (from: number, to: number, amount: number) =>
  Math.round(from + (to - from) * amount);

const mixColor = (
  from: [number, number, number],
  to: [number, number, number],
  amount: number,
) =>
  `rgb(${mix(from[0], to[0], amount)} ${mix(from[1], to[1], amount)} ${mix(from[2], to[2], amount)})`;

function getCardSurface(index: number, arrivals: number[]) {
  const white: [number, number, number] = [255, 255, 255];
  const middle: [number, number, number] = [184, 180, 192];
  const back: [number, number, number] = [123, 120, 132];
  const firstDepth = arrivals[index + 1] ?? 0;
  const secondDepth = arrivals[index + 2] ?? 0;

  if (secondDepth > 0) {
    return mixColor(middle, back, secondDepth);
  }

  return mixColor(white, middle, firstDepth);
}

export function ProjectsSection() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [arrivals, setArrivals] = useState(() => projects.map(() => 0));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const syncMotionPreference = () =>
      setPrefersReducedMotion(reducedMotionQuery.matches);

    syncMotionPreference();
    reducedMotionQuery.addEventListener("change", syncMotionPreference);

    return () =>
      reducedMotionQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setArrivals(projects.map(() => 0));
      return;
    }

    let animationFrame = 0;

    const updateCards = () => {
      animationFrame = 0;
      const animationStart = window.innerHeight * 0.75;
      const firstCard = cardRefs.current[0];
      const animationEnd = firstCard
        ? Number.parseFloat(window.getComputedStyle(firstCard).top) || 32
        : 32;
      const animationDistance = Math.max(1, animationStart - animationEnd);
      const nextArrivals = cardRefs.current.map((card) => {
        if (!card) {
          return 0;
        }

        return clamp(
          (animationStart - card.getBoundingClientRect().top) /
            animationDistance,
        );
      });

      setArrivals((currentArrivals) =>
        nextArrivals.every(
          (arrival, index) =>
            Math.abs(arrival - (currentArrivals[index] ?? 0)) < 0.001,
        )
          ? currentArrivals
          : nextArrivals,
      );
    };

    const requestCardUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateCards);
      }
    };

    updateCards();
    window.addEventListener("resize", requestCardUpdate);
    window.addEventListener("scroll", requestCardUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", requestCardUpdate);
      window.removeEventListener("scroll", requestCardUpdate);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative bg-background" id="projects">
      <div className="mx-auto h-[250px] w-[calc(100%-24px)] pt-[31px] md:h-[259px] md:w-[min(calc(100%-176px),1104px)] md:pt-11 md:max-[901px]:w-[calc(100%-80px)]">
        <h2 className="m-0 font-sans text-5xl leading-[58px] font-medium tracking-[-2.4px] md:text-[64px] md:leading-[1.06] md:tracking-[-3.2px]">
          Projects
          <sup className="relative -top-1 align-top text-2xl leading-none tracking-[-1.2px] md:-top-[7px] md:text-[32px] md:tracking-[-1.6px]">
            (8)
          </sup>
        </h2>
        <p className="mt-4 mb-0 w-[min(100%,350px)] font-sans text-[15px] leading-[22px] font-normal md:mt-5 md:w-[348px] md:text-base md:leading-[26px]">
          A selected set of public repositories that show product surfaces,
          interactive tools.
        </p>
      </div>

      <div className="flex flex-col gap-24 px-3 pb-24 md:gap-40 md:px-9 md:pb-40 motion-reduce:gap-6 motion-reduce:px-9 motion-reduce:pb-[60px]">
        {projects.map((project, index) => {
          const arrival = arrivals[index] ?? 0;
          const nextArrival = arrivals[index + 1] ?? 0;
          const cardStyle: CSSProperties | undefined = prefersReducedMotion
            ? undefined
            : {
                backgroundColor: getCardSurface(index, arrivals),
                boxShadow: `0 ${mix(0, -64, arrival)}px ${mix(0, 160, arrival)}px rgb(0 0 0 / ${arrival * 0.25})`,
                transform: `scale(${1 - nextArrival * 0.2})`,
                zIndex: index + 1,
              };

          return (
            <article
              className="sticky top-4 mx-auto h-[calc(100dvh-32px)] min-h-0 w-full origin-top overflow-hidden bg-white text-black will-change-[transform,box-shadow] md:top-8 md:h-[548px] md:max-w-[1188px] md:max-[1280px]:h-[min(548px,calc(100vh-84px))] md:max-[1280px]:max-w-none motion-reduce:relative motion-reduce:top-auto motion-reduce:transform-none"
              key={project.name}
              ref={(card) => {
                cardRefs.current[index] = card;
              }}
              style={cardStyle}
            >
              <div className="relative flex h-full flex-col gap-6 overflow-y-auto px-6 pt-[58px] pb-6 md:grid md:grid-cols-[360px_minmax(0,1fr)] md:gap-x-12 md:gap-y-0 md:overflow-visible md:px-[50px] md:pt-24 md:pb-[50px] md:max-[901px]:grid-cols-[300px_minmax(0,1fr)] md:max-[901px]:gap-x-10 md:max-[901px]:px-[42px] md:max-[901px]:pt-[86px] md:max-[901px]:pb-12 xl:block xl:p-0">
                <div className="relative min-w-0 text-[#010101] xl:absolute xl:top-[104px] xl:left-[68px] xl:w-[344px]">
                  <h3 className="m-0 font-sans text-4xl leading-[1.05] font-semibold tracking-[-1.4px] md:text-5xl md:tracking-normal md:max-[901px]:text-[42px] xl:leading-[62px]">
                    {project.name}
                  </h3>
                  <p className="mt-3.5 mb-0 w-[344px] font-sans text-[15px] leading-[22px] font-normal md:mt-2 md:text-base md:leading-[26px]">
                    {project.summary}
                  </p>

                  <ul
                    aria-label={`${project.name} technologies`}
                    className="mt-[18px] mb-0 flex w-[314px] list-none flex-wrap gap-1.5 p-0 text-[#bdbbc1] md:mt-6 md:gap-2"
                  >
                    {project.tags.map((tag) => (
                      <li
                        className="min-h-[25px] rounded-full border border-current px-2 py-px font-mono text-sm leading-[21px] font-medium whitespace-nowrap md:h-[29px] md:min-h-0 md:px-2.5 md:py-1 md:text-base md:leading-[19px]"
                        key={tag}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex h-10 w-56 gap-2 md:mt-[61px] md:max-[901px]:mt-[42px] xl:absolute xl:top-[301px] xl:left-0 xl:m-0">
                    <CornerButton
                      ariaLabel={`View ${project.name} source code`}
                      className="!h-[38px] !w-[104px] bg-surface !text-[13px] !leading-[18.24px] !font-medium text-white md:!h-10 md:!w-[108px] md:!text-sm"
                      href={project.codeUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Code →
                    </CornerButton>
                    <CornerButton
                      ariaLabel={`Open the live ${project.name} project`}
                      className="!h-[38px] !w-[104px] bg-surface !text-[13px] !leading-[18.24px] !font-medium text-white md:!h-10 md:!w-[108px] md:!text-sm"
                      href={project.liveUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Live →
                    </CornerButton>
                  </div>
                </div>

                <div className="relative mt-0 aspect-[599/306] h-auto w-full self-start overflow-hidden rounded-[8.528px] border-[1.03px] border-[#cccfda] md:mt-[25px] xl:absolute xl:top-[121px] xl:left-[489px] xl:mt-0 xl:h-[306px] xl:w-[599px]">
                  <img
                    alt={`${project.name} interface`}
                    className="absolute block w-full select-none"
                    draggable="false"
                    loading="lazy"
                    src={`${import.meta.env.BASE_URL}images/${project.image}`}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
