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
    <section className="projects" id="projects">
      <div className="projects__header">
        <h2>
          Projects<sup>(8)</sup>
        </h2>
        <p>
          A selected set of public repositories that show product surfaces,
          interactive tools.
        </p>
      </div>

      <div className="projects__list">
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
              className="project-card"
              key={project.name}
              ref={(card) => {
                cardRefs.current[index] = card;
              }}
              style={cardStyle}
            >
              <div className="project-card__content">
                <div className="project-card__details">
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>

                  <ul
                    aria-label={`${project.name} technologies`}
                    className="project-card__tags"
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <div className="project-card__actions">
                    <CornerButton
                      ariaLabel={`View ${project.name} source code`}
                      className="project-card__link"
                      href={project.codeUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Code →
                    </CornerButton>
                    <CornerButton
                      ariaLabel={`Open the live ${project.name} project`}
                      className="project-card__link"
                      href={project.liveUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Live →
                    </CornerButton>
                  </div>
                </div>

                <div className="project-card__preview">
                  <img
                    alt={`${project.name} interface`}
                    className="project-card__preview-image"
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
