import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { siteContent } from "@/content/site";
import { trackCtaClick, trackEvent } from "@/lib/analytics";

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
  const [copyStatusMessage, setCopyStatusMessage] = useState("");
  const resetCopyTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const supportLinks = [
    {
      label: "GitHub",
      href: siteContent.profile.githubUrl,
      title: "Code samples and side projects",
      detail: "github.com/guseynov/",
    },
    {
      label: "LinkedIn",
      href: siteContent.profile.linkedinUrl,
      title: "Career history and hiring context",
      detail: siteContent.profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""),
    },
    {
      label: "CV",
      href: cvHref,
      title: "Full experience in one document",
      detail: "PDF download",
      download: true,
    },
  ];

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
      setCopyStatusMessage("Email address copied to clipboard.");
      trackEvent("email_copied", {
        placement: "contact_section",
      });

      if (resetCopyTimeoutRef.current !== null) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }

      resetCopyTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
        setCopyStatusMessage("");
      }, COPY_FEEDBACK_DURATION_MS);
    } catch {
      setIsCopied(false);
      setCopyStatusMessage("Copy failed. Use the email address shown below.");
    }
  };

  return (
    <div className="grid min-h-0 min-w-0 gap-8 lg:grid-cols-[minmax(0,1.22fr)_minmax(15rem,0.78fr)] xl:gap-10">
      <div className="flex min-h-0 min-w-0 flex-col gap-6">
        <div className="space-y-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-text-inverse/46">
            Best first step
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink
              href={`mailto:${siteContent.profile.email}`}
              tone="primary"
              className="border-black bg-text-inverse text-text-strong hover:bg-black/88 active:bg-black/82 focus-visible:shadow-[0_0_0_1px_rgba(15,15,15,0.9),0_0_0_4px_rgba(15,15,15,0.12)]"
              onClick={() =>
                trackCtaClick({
                  label: siteContent.contact.primaryCtaLabel,
                  href: `mailto:${siteContent.profile.email}`,
                  placement: "contact_section_primary_cta",
                })
              }
            >
              {siteContent.contact.primaryCtaLabel}
            </ButtonLink>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={clsx(
                "control-tap-target inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] transition-colors duration-200 ease-out focus-visible:outline-none",
                isCopied
                  ? "border-accent bg-accent text-white shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
                  : "border-black/12 bg-black/[0.045] text-text-inverse hover:bg-black/[0.085] active:bg-black/[0.11] focus-visible:border-black/22 focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.24),0_0_0_4px_rgba(0,0,0,0.08)]",
              )}
              aria-label={isCopied ? "Email copied" : "Copy email address"}
            >
              {isCopied ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Copy aria-hidden="true" className="h-4 w-4" />
              )}
              <span>{isCopied ? "Copied" : siteContent.contact.secondaryCtaLabel}</span>
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {copyStatusMessage}
          </p>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-text-inverse/34">
            Direct email
          </p>
          <p
            className="mt-2 break-all font-mono text-[1.18rem] leading-[1.15] text-text-inverse sm:text-[1.28rem]"
            title={siteContent.profile.email}
          >
            {siteContent.profile.email}
          </p>
          <p className="mt-3 max-w-[44ch] text-[1.02rem] leading-7 text-text-inverse/72">
            {siteContent.contact.availability}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-text-inverse/46">
          If you want more context first
        </p>
        <div className="mt-3 divide-y divide-black/10 border-y border-black/10">
          {supportLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              rel={link.download ? undefined : "noreferrer"}
              download={link.download}
              onClick={() =>
                trackCtaClick({
                  label: `${link.label} Public Link`,
                  href: link.href,
                  placement: "contact_section_public_links",
                })
              }
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 px-0 py-4 text-text-inverse transition-colors duration-200 ease-out hover:bg-black/[0.02]"
            >
              <p className="pt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-inverse/34">
                0{index + 1}
              </p>
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-inverse/42">
                  {link.label}
                </p>
                <p className="mt-1.5 text-[1.02rem] leading-6 text-text-inverse sm:text-[1.06rem]">
                  {link.title}
                </p>
                <p className="mt-0.5 truncate text-sm leading-6 text-text-inverse/50">{link.detail}</p>
              </div>
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-text-inverse transition group-hover:border-black/16 group-hover:bg-black group-hover:text-text-strong">
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
