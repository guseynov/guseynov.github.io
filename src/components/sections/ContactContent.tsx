import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  EnvelopeIcon,
  LaunchIcon,
} from "@/components/SanityIcons";
import { ButtonLink, iconCircleClassName, panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";

const CONTACT_REASONS = [
  "Sharper component systems and stronger UI consistency.",
  "Reliable frontend delivery backed by testing and structure.",
  "Practical modernization without unnecessary disruption.",
];

interface ContactContentProps {
  cvHref: string;
}

const COPY_FEEDBACK_DURATION_MS = 2000;

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");

  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.append(textArea);
  textArea.select();

  const didCopy = document.execCommand("copy");

  textArea.remove();

  if (!didCopy) {
    throw new Error("Copy command failed.");
  }
}

export function ContactContent({ cvHref }: ContactContentProps) {
  const [isCopied, setIsCopied] = useState(false);
  const resetCopyTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetCopyTimeoutRef.current !== null) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await copyTextToClipboard(siteContent.profile.email);
      setIsCopied(true);

      if (resetCopyTimeoutRef.current !== null) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }

      resetCopyTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, COPY_FEEDBACK_DURATION_MS);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="grid min-h-0 min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_25rem]">
      <div
        className={clsx(
          panelVariants({ tone: "surface" }),
          "flex min-h-0 min-w-0 flex-col justify-between gap-6",
        )}
      >
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
            Contact
          </p>
          <div className="mt-6 flex min-w-0 items-center gap-3">
            <a
              href={`mailto:${siteContent.profile.email}`}
              className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold tracking-[-0.05em] text-text-strong sm:overflow-visible sm:whitespace-normal sm:text-4xl"
              title={siteContent.profile.email}
            >
              {siteContent.profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={clsx(
                "inline-flex shrink-0 items-center justify-center rounded-full border p-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition sm:px-5 sm:py-2",
                isCopied
                  ? "border-text-strong bg-text-strong text-text-inverse"
                  : "border-border bg-canvas/80 text-text-strong hover:-translate-y-0.5 hover:border-text-strong",
              )}
              aria-label={isCopied ? "Email copied" : "Copy email address"}
            >
              <span className="inline-flex items-center gap-2">
                {isCopied ? (
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <CopyIcon aria-hidden="true" className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">Copy</span>
              </span>
            </button>
          </div>
          <p className="mt-6 max-w-xl text-base leading-7 text-text-muted">
            {siteContent.contact.availability}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={`mailto:${siteContent.profile.email}`}
            tone="primary"
            icon={<EnvelopeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />}
          >
            {siteContent.contact.primaryCtaLabel}
          </ButtonLink>
          <ButtonLink
            href={siteContent.profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            icon={<LaunchIcon aria-hidden="true" className="h-5 w-5 shrink-0" />}
          >
            {siteContent.contact.secondaryCtaLabel}
          </ButtonLink>
          <ButtonLink
            href={cvHref}
            download
            icon={<DownloadIcon aria-hidden="true" className="h-5 w-5 shrink-0" />}
          >
            {siteContent.contact.tertiaryCtaLabel}
          </ButtonLink>
        </div>
      </div>
      <div className="grid min-w-0 gap-4">
        <div className={panelVariants({ tone: "subtle" })}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
            Why teams bring me in
          </p>
          <ul className="mt-5 space-y-3 text-base leading-7 text-text-strong">
            {CONTACT_REASONS.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        <div className={panelVariants({ tone: "subtle" })}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
            Public links
          </p>
          <div className="mt-5 space-y-3">
            <a
              href={siteContent.profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={panelVariants({ tone: "link" })}
            >
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
                  GitHub
                </p>
                <p className="mt-2 truncate text-base text-text-strong sm:text-[1.05rem]">
                  {siteContent.profile.githubUrl.replace(/^https?:\/\//, "")}
                </p>
              </div>
              <span className={iconCircleClassName}>
                <LaunchIcon aria-hidden="true" className="h-5 w-5 text-text-strong" />
              </span>
            </a>
            <a href={cvHref} download className={panelVariants({ tone: "link" })}>
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
                  CV
                </p>
                <p className="mt-2 text-lg text-text-strong">Download the latest CV</p>
              </div>
              <span className={iconCircleClassName}>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-text-strong" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
