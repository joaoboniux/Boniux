"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "trabalhos", href: "#work" },
  { label: "sobre", href: "#about" },
  { label: "contato", href: "#footer" },
];

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
}

function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Navbar() {
  const isHome = usePathname() === "/";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${isHome ? "" : "mix-blend-difference"}`}>
      <nav className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link
          href="/"
          onClick={isHome ? handleLogoClick : undefined}
          className="font-display text-lg font-semibold tracking-tight text-heading"
        >
          Boniux<span className="text-accent">.</span>
        </Link>

        <ul className="flex items-center gap-6 md:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-[15px] font-medium lowercase text-body transition-colors duration-300 hover:text-heading"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
