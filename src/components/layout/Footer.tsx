const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-48">
      <div className="flex items-baseline gap-4">
        <span className="h-px w-10 bg-accent" aria-hidden="true" />
        <p className="font-sans text-sm uppercase tracking-[0.3em] text-body">
          Get in touch
        </p>
      </div>

      <a
        href="mailto:hello@boniux.com.br"
        className="mt-10 block font-display text-[clamp(2.25rem,8vw,7rem)] font-medium leading-none tracking-tight text-heading transition-colors duration-300 hover:text-accent"
      >
        hello@boniux.com.br
      </a>

      <div className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <ul className="flex gap-6">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-body transition-colors duration-300 hover:text-heading"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-sans text-sm text-body">
          © {year} Boniux — www.boniux.com.br
        </p>
      </div>
    </footer>
  );
}
