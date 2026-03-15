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
