import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.2"
        d="M14.5 17 10 12.5 14.5 8"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.2"
        d="m10.5 8 4.5 4.5-4.5 4.5"
      />
    </svg>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        d="M20.5 18.5H4.5V6.5H20.5V18.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M20.5 18.5L17.75 15.5L15 12.5M4.5 18.5L10 12.5M20.5 6.5L12.5 15L4.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function LaunchIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        d="M14 6.5H5.5V19.5H18.5V11M20.5 4.5L10.5 14.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M16 4.5H20.5V9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        d="M9 8.5V6.5H18.5V16H16.5M6.5 9H16V18.5H6.5V9Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        d="M7.5 12.5L10.75 15.75L17.5 9"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        d="M12.5 5.5V15M8.5 11L12.5 15L16.5 11M6 18.5H19"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function DragHandleIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M15.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M15.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" {...props}>
      <path d="M4.5 7.5H20.5V17.5H4.5V7.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 10 10.75 12.5 8 15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 15H17" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" {...props}>
      <path
        d="M12.5 5.5 14.3 10.7 19.5 12.5 14.3 14.3 12.5 19.5 10.7 14.3 5.5 12.5 10.7 10.7 12.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function NodesIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" {...props}>
      <path d="M8 8.5H17M8 16.5H17M8 8.5V16.5M17 8.5V16.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="17" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="17" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ChipIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" {...props}>
      <path
        d="M9 6.5H16V8.5H18V15.5H16V17.5H9V15.5H7V8.5H9V6.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M5.5 10.5H7M5.5 13.5H7M18 10.5H19.5M18 13.5H19.5M10.5 5V6.5M14.5 5V6.5M10.5 17.5V20M14.5 17.5V20" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
