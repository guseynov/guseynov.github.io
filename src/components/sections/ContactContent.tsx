import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
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
  const mailtoHref = `mailto:${siteContent.profile.email}`;
  const supportLinks = [
    {
      label: "GitHub",
      href: siteContent.profile.githubUrl,
    },
    {
      label: "LinkedIn",
      href: siteContent.profile.linkedinUrl,
    },
    {
      label: "CV",
      href: cvHref,
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
    <div className="grid min-h-0 min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.46fr)] xl:gap-6">
      <div className="relative isolate flex min-h-[13rem] min-w-0 items-center overflow-hidden rounded-[1rem] bg-[color:oklch(0.055_0_0)] p-5 text-text-strong shadow-[inset_0_0_0_1px_oklch(0.96_0_0_/_0.12)] sm:p-6 xl:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.96_0_0_/_0.48),transparent)]" />
      <div className="grid w-full gap-7">
        <div className="min-w-0">
          <a
            href={mailtoHref}
            className="group inline-flex max-w-full items-center gap-3 whitespace-nowrap font-display text-[clamp(1.8rem,4.7vw,4rem)] leading-[0.9] tracking-[0em] text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[color:oklch(0.055_0_0)]"
            onClick={() =>
              trackCtaClick({
                label: siteContent.contact.primaryCtaLabel,
                href: mailtoHref,
                placement: "contact_section_primary_cta",
              })
            }
          >
            <span>{siteContent.profile.email}</span>
            <ExternalLink
              aria-hidden="true"
              className="mt-2 hidden h-7 w-7 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
            />
          </a>
        </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={mailtoHref}
              className="control-tap-target inline-flex min-h-12 items-center justify-center rounded-full bg-text-strong px-5 py-3 font-mono text-sm font-medium uppercase leading-none tracking-[0.14em] text-text-inverse transition-colors duration-200 ease-out hover:bg-[color:oklch(0.9_0_0)] active:bg-[color:oklch(0.84_0_0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[color:oklch(0.055_0_0)]"
              onClick={() =>
                trackCtaClick({
                  label: siteContent.contact.primaryCtaLabel,
                  href: mailtoHref,
                  placement: "contact_section_primary_cta_button",
                })
              }
            >
              {siteContent.contact.primaryCtaLabel}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={clsx(
                "control-tap-target inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border px-5 py-3 font-mono text-sm font-medium uppercase leading-none tracking-[0.14em] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[color:oklch(0.055_0_0)]",
                isCopied
                  ? "border-text-strong bg-transparent text-text-strong"
                  : "border-white/14 bg-white/[0.055] text-text-strong hover:bg-white/[0.095] active:bg-white/[0.13]",
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
      </div>

      <div className="grid min-w-0 gap-2">
        {supportLinks.map((link) => (
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
            className="group grid min-h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[0.72rem] border border-black/8 bg-[color:oklch(0.975_0_0)] p-4 text-text-inverse transition-colors duration-200 ease-out hover:bg-[color:oklch(0.985_0_0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:oklch(0.08_0_0)] focus-visible:ring-offset-3 focus-visible:ring-offset-[color:oklch(0.975_0_0)]"
          >
            <p className="min-w-0 font-mono text-sm font-medium uppercase tracking-[0.16em] text-text-inverse">
              {link.label}
            </p>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[color:oklch(0.99_0_0)] text-text-inverse transition group-hover:border-black/20 group-hover:bg-[color:oklch(0.08_0_0)] group-hover:text-text-strong">
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
