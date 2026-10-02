import type { AnchorHTMLAttributes } from "react";

export function ShareLink({
  href,
  children,
  ariaLabel,
}: Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & { ariaLabel: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" aria-label={ariaLabel}>
      {children}
    </a>
  );
}
