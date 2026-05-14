import { useId, useState, type ComponentType } from "react";
import {
  Accessibility,
  Blocks,
  Bot,
  Braces,
  ClipboardList,
  Component,
  Gauge,
  GitBranch,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Radio,
  type LucideProps,
} from "lucide-react";
import codeigniterIcon from "simple-icons/icons/codeigniter.svg?raw";
import cssIcon from "simple-icons/icons/css.svg?raw";
import cssModulesIcon from "simple-icons/icons/cssmodules.svg?raw";
import cursorIcon from "simple-icons/icons/cursor.svg?raw";
import cypressIcon from "simple-icons/icons/cypress.svg?raw";
import dotnetIcon from "simple-icons/icons/dotnet.svg?raw";
import figmaIcon from "simple-icons/icons/figma.svg?raw";
import gitIcon from "simple-icons/icons/git.svg?raw";
import githubActionsIcon from "simple-icons/icons/githubactions.svg?raw";
import htmlIcon from "simple-icons/icons/html5.svg?raw";
import javascriptIcon from "simple-icons/icons/javascript.svg?raw";
import jestIcon from "simple-icons/icons/jest.svg?raw";
import lighthouseIcon from "simple-icons/icons/lighthouse.svg?raw";
import nextIcon from "simple-icons/icons/nextdotjs.svg?raw";
import nodeIcon from "simple-icons/icons/nodedotjs.svg?raw";
import nuxtIcon from "simple-icons/icons/nuxt.svg?raw";
import openApiIcon from "simple-icons/icons/openapiinitiative.svg?raw";
import phpIcon from "simple-icons/icons/php.svg?raw";
import reactIcon from "simple-icons/icons/react.svg?raw";
import reactHookFormIcon from "simple-icons/icons/reacthookform.svg?raw";
import reactQueryIcon from "simple-icons/icons/reactquery.svg?raw";
import reduxIcon from "simple-icons/icons/redux.svg?raw";
import sassIcon from "simple-icons/icons/sass.svg?raw";
import sentryIcon from "simple-icons/icons/sentry.svg?raw";
import socketIoIcon from "simple-icons/icons/socketdotio.svg?raw";
import storybookIcon from "simple-icons/icons/storybook.svg?raw";
import styledComponentsIcon from "simple-icons/icons/styledcomponents.svg?raw";
import tailwindIcon from "simple-icons/icons/tailwindcss.svg?raw";
import testingLibraryIcon from "simple-icons/icons/testinglibrary.svg?raw";
import typescriptIcon from "simple-icons/icons/typescript.svg?raw";
import viteIcon from "simple-icons/icons/vite.svg?raw";
import vueIcon from "simple-icons/icons/vuedotjs.svg?raw";
import webpackIcon from "simple-icons/icons/webpack.svg?raw";
import { siteContent } from "@/content/site";

const SIMPLE_ICONS: Record<string, string> = {
  react: reactIcon,
  typescript: typescriptIcon,
  javascript: javascriptIcon,
  html: htmlIcon,
  css: cssIcon,
  next: nextIcon,
  vue: vueIcon,
  nuxt: nuxtIcon,
  "design-systems": figmaIcon,
  "component-libraries": storybookIcon,
  performance: lighthouseIcon,
  redux: reduxIcon,
  "react-query": reactQueryIcon,
  rest: openApiIcon,
  websockets: socketIoIcon,
  forms: reactHookFormIcon,
  tailwind: tailwindIcon,
  "css-modules": cssModulesIcon,
  "styled-components": styledComponentsIcon,
  scss: sassIcon,
  vite: viteIcon,
  webpack: webpackIcon,
  "ci-cd": githubActionsIcon,
  sentry: sentryIcon,
  git: gitIcon,
  "ai-development": cursorIcon,
  jest: jestIcon,
  "testing-library": testingLibraryIcon,
  cypress: cypressIcon,
  node: nodeIcon,
  aspnet: dotnetIcon,
  php: phpIcon,
  codeigniter: codeigniterIcon,
};

const SEMANTIC_ICONS: Record<string, ComponentType<LucideProps>> = {
  "responsive-ui": MonitorSmartphone,
  accessibility: Accessibility,
  "product-ui": LayoutDashboard,
  interactive: MousePointerClick,
  "design-tokens": Layers3,
  zustand: Blocks,
  csharp: Braces,
  playwright: Radio,
  "component-model": Component,
  "form-architecture": ClipboardList,
  "delivery-pipeline": GitBranch,
  "ai-automation": Bot,
  "visual-systems": Palette,
  "runtime-health": Gauge,
};

function SkillIcon({ iconKey }: { iconKey: string }) {
  const simpleIcon = SIMPLE_ICONS[iconKey];
  const SemanticIcon = SEMANTIC_ICONS[iconKey];

  if (simpleIcon) {
    return (
      <span
        aria-hidden="true"
        className="[&>svg]:h-5 [&>svg]:w-5 [&_path]:fill-current"
        dangerouslySetInnerHTML={{ __html: simpleIcon }}
      />
    );
  }

  if (iconKey === "csharp") {
    return (
      <svg aria-hidden="true" className="h-6 w-6" role="img" viewBox="0 0 24 24">
        <path
          d="M12 2.35 20.45 7.2v9.6L12 21.65 3.55 16.8V7.2L12 2.35Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <text
          fill="currentColor"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="6.8"
          fontWeight="700"
          x="6"
          y="14.2"
        >
          C#
        </text>
      </svg>
    );
  }

  if (iconKey === "zustand") {
    return (
      <svg aria-hidden="true" className="h-6 w-6" role="img" viewBox="0 0 24 24">
        <path
          d="M5.2 5.2h13.6L9.15 18.8H18.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.3"
        />
      </svg>
    );
  }

  if (iconKey === "playwright") {
    return (
      <svg aria-hidden="true" className="h-6 w-6" role="img" viewBox="0 0 24 24">
        <path
          d="M4.7 6.4c2.2-1.05 4.7-1.05 7 0 2.3-1.05 4.8-1.05 7.1 0-.15 6.45-2.35 10.7-7.1 11.9-4.7-1.2-6.9-5.45-7-11.9Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M8.25 10.15h.01M15.75 10.15h.01M9 14.2c1.8.9 4.2.9 6 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (SemanticIcon) {
    return <SemanticIcon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />;
  }

  return <Component aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />;
}

export function CapabilitiesContent() {
  const skillsId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedGroup = siteContent.skills[selectedIndex] ?? siteContent.skills[0];
  const panelId = `${skillsId}-panel`;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(14rem,0.38fr)_1fr] lg:gap-7">
      <div
        aria-label="Skill categories"
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
        role="tablist"
      >
        {siteContent.skills.map((group, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={group.title}
              aria-controls={panelId}
              aria-selected={isSelected}
              className={[
                "group flex min-w-[13rem] items-center rounded-[1rem] border px-4 py-3 text-left transition duration-200 ease-out focus-visible:outline-none lg:min-w-0",
                isSelected
                  ? "border-white/28 bg-white text-text-inverse"
                  : "border-white/10 bg-white/[0.035] text-text-muted hover:border-white/20 hover:bg-white/[0.065] hover:text-text-strong",
              ].join(" ")}
              id={`${skillsId}-tab-${index}`}
              onClick={() => setSelectedIndex(index)}
              role="tab"
              type="button"
            >
              <span className="min-w-0 truncate text-[0.98rem] font-semibold">
                {group.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`${skillsId}-tab-${selectedIndex}`}
        className="min-w-0"
        id={panelId}
        role="tabpanel"
      >
        <div className="border-b border-white/10 pb-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-ghost">
            Selected category
          </p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-display-title text-[clamp(1.7rem,3vw,2.7rem)] text-text-strong">
                {selectedGroup.title}
              </h3>
              <p className="mt-2 max-w-[58ch] text-base leading-7 text-text-muted">
                {selectedGroup.summary}
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-2 grid gap-x-5 md:grid-cols-2">
          {selectedGroup.items.map((item) => {
            const skillBody = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.8rem] border border-white/12 bg-white/[0.045] text-text-strong">
                  <SkillIcon iconKey={item.icon} />
                </span>
                <span className="min-w-0 text-[1.02rem] font-semibold leading-6 text-text-strong">
                  {item.label}
                </span>
              </>
            );

            return (
              <li key={item.label} className="border-b border-white/10">
                {item.href ? (
                  <a
                    className="group flex min-h-20 items-center gap-4 py-4 transition-colors duration-200 ease-out hover:text-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {skillBody}
                  </a>
                ) : (
                  <div className="flex min-h-20 items-center gap-4 py-4">{skillBody}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
