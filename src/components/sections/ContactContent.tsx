import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { iconCircleClassName, panelVariants } from "@/components/ui";
import { siteContent } from "@/content/site";
import { trackCtaClick, trackEvent } from "@/lib/analytics";

const CONTACT_REASONS = [
  "Sharper component systems and more consistent UI.",
  "Frontend delivery backed by testing and structure.",
  "Practical modernization without unnecessary churn.",
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
      trackEvent("email_copied", {
        placement: "contact_section",
      });

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
    <div className="grid min-h-0 min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="flex min-h-0 min-w-0 flex-col justify-between gap-6">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <a
              href={`mailto:${siteContent.profile.email}`}
              onClick={() =>
                trackCtaClick({
                  label: "Email Address",
                  href: `mailto:${siteContent.profile.email}`,
                  placement: "contact_section_address",
                })
              }
              className="block min-w-0 flex-1 break-all text-[1.3rem] leading-[0.96] font-medium tracking-[-0.05em] text-text-strong sm:truncate sm:break-normal sm:whitespace-nowrap sm:text-[clamp(1.7rem,3vw,2.5rem)]"
              title={siteContent.profile.email}
            >
              {siteContent.profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={clsx(
                "control-tap-target inline-flex shrink-0 items-center justify-center rounded-[3px] border px-4 py-2.5 text-sm font-medium tracking-[0.04em] transition-colors duration-200 ease-out focus-visible:outline-none sm:px-5",
                isCopied
                  ? "border-accent bg-accent text-white shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
                  : "border-white/10 bg-white/10 text-text-strong hover:bg-white/16 active:bg-white/12 focus-visible:border-white/24 focus-visible:shadow-[0_0_0_1px_rgba(255,255,255,0.34),0_0_0_4px_rgba(255,255,255,0.1)]",
              )}
              aria-label={isCopied ? "Email copied" : "Copy email address"}
            >
              <span className="inline-flex items-center gap-2">
                {isCopied ? (
                  <Check aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Copy aria-hidden="true" className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">Copy</span>
              </span>
            </button>
          </div>
          <p className="mt-6 max-w-xl text-base leading-7 text-text-muted">
            {siteContent.contact.availability}
          </p>
          <ul className="mt-6 space-y-3 border-t border-white/8 pt-5 text-base leading-7 text-text-muted">
            {CONTACT_REASONS.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={panelVariants({ tone: "subtle" })}>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-ghost">
            Public links
          </p>
          <div className="mt-5 space-y-3">
            <a
              href={siteContent.profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackCtaClick({
                  label: "GitHub Public Link",
                  href: siteContent.profile.githubUrl,
                  placement: "contact_section_public_links",
                })
              }
              className={panelVariants({ tone: "link" })}
            >
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-ghost">
                  GitHub
                </p>
                <p className="mt-2 truncate text-base text-text-strong sm:text-[1.05rem]">
                  {siteContent.profile.githubUrl.replace(/^https?:\/\//, "")}
                </p>
              </div>
              <span className={iconCircleClassName}>
                <ExternalLink aria-hidden="true" className="h-5 w-5 text-text-muted" />
              </span>
            </a>
            <a
              href={siteContent.profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackCtaClick({
                  label: "LinkedIn Public Link",
                  href: siteContent.profile.linkedinUrl,
                  placement: "contact_section_public_links",
                })
              }
              className={panelVariants({ tone: "link" })}
            >
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-ghost">
                  LinkedIn
                </p>
                <p className="mt-2 truncate text-base text-text-strong sm:text-[1.05rem]">
                  {siteContent.profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </p>
              </div>
              <span className={iconCircleClassName}>
                <ExternalLink aria-hidden="true" className="h-5 w-5 text-text-muted" />
              </span>
            </a>
            <a
              href={cvHref}
              download
              onClick={() =>
                trackCtaClick({
                  label: "CV Public Link",
                  href: cvHref,
                  placement: "contact_section_public_links",
                })
              }
              className={panelVariants({ tone: "link" })}
            >
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-ghost">
                  CV
                </p>
                <p className="mt-2 text-lg text-text-strong">Download CV</p>
              </div>
              <span className={iconCircleClassName}>
                <ExternalLink aria-hidden="true" className="h-5 w-5 text-text-muted" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
