import Link from "next/link";

const NAV_LINKS = [
  { label: "trabalhos", href: "#work" },
  { label: "sobre", href: "#about" },
  { label: "contato", href: "#footer" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-heading"
        >
          Boniux<span className="text-accent">.</span>
        </Link>

        <ul className="flex items-center gap-6 md:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-sm lowercase text-body transition-colors duration-300 hover:text-heading"
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
