export type Project = {
  codeUrl: string;
  image: string;
  liveUrl: string;
  name: string;
  summary: string;
  tags: string[];
};

export const projects: Project[] = [
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
