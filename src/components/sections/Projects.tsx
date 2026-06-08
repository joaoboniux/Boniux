"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  title: string;
  year: string;
  discipline: string;
  image: string;
};

const PROJECTS: Project[] = [
  { title: "Órbita", year: "2025", discipline: "Product Design", image: "/projects/orbita.svg" },
  { title: "Pulse", year: "2024", discipline: "Design System", image: "/projects/pulse.svg" },
  { title: "Vértice", year: "2024", discipline: "UX Research", image: "/projects/vertice.svg" },
  { title: "Marola", year: "2023", discipline: "Brand & UI", image: "/projects/marola.svg" },
];

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);
  // Última posição conhecida do ponteiro (em coordenadas de viewport).
  const pointer = useRef({ x: -1, y: -1 });
  // Índice atualmente exibido (fonte única de verdade) — evita re-triggers.
  const activeIndex = useRef<number | null>(null);

  // Define qual capa está visível. Só age quando o índice muda, o que elimina
  // o efeito de "piscar" causado por enter/leave repetidos durante o scroll.
  const setActive = useCallback((index: number | null) => {
    if (index === activeIndex.current) return;
    activeIndex.current = index;

    // Destaque da linha ativa (fundo surface + texto accent), conduzido pela
    // mesma fonte de verdade do scroll/hover para evitar flicker.
    const rows =
      root.current?.querySelectorAll<HTMLElement>("[data-project-index]");
    rows?.forEach((row) => {
      row.classList.toggle(
        "is-active",
        Number(row.dataset.projectIndex) === index
      );
    });

    if (index === null) {
      gsap.to(floatRef.current, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      return;
    }

    gsap.to(floatRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(`.project-thumb-${index}`, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(`.project-thumb:not(.project-thumb-${index})`, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  // Recalcula a linha sob o cursor a partir da última posição conhecida.
  // Funciona tanto no movimento do mouse quanto durante o scroll (Lenis),
  // mantendo um comportamento consistente e fluido sem travamentos.
  const syncFromPoint = useCallback(() => {
    const { x, y } = pointer.current;
    if (x < 0 && y < 0) return;
    const el = document.elementFromPoint(x, y);
    const row = el?.closest<HTMLElement>("[data-project-index]");
    if (!row) {
      setActive(null);
      return;
    }
    setActive(Number(row.dataset.projectIndex));
  }, [setActive]);

  useGSAP(
    () => {
      // Imagem flutuante segue o cursor com delay fluido (quickTo).
      moveX.current = gsap.quickTo(floatRef.current, "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(floatRef.current, "y", {
        duration: 0.6,
        ease: "power3.out",
      });

      // Reveal das linhas da lista no scroll.
      gsap.from(".project-row", {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      // Durante o scroll, a linha sob o cursor muda mesmo sem mover o mouse.
      // Reavaliamos a partir do ponto para manter a capa correta — ou escondê-la.
      const onScroll = () => syncFromPoint();
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    },
    { scope: root }
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    moveX.current?.(e.clientX);
    moveY.current?.(e.clientY);
    syncFromPoint();
  };

  const handlePointerLeave = () => {
    pointer.current = { x: -1, y: -1 };
    setActive(null);
  };

  return (
    <section
      id="work"
      ref={root}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative px-6 py-32 md:px-10 md:py-48"
    >
      <header className="mb-16 flex items-baseline gap-4 md:mb-24">
        <span className="h-px w-10 bg-accent" aria-hidden="true" />
        <h2 className="font-sans text-sm uppercase tracking-[0.3em] text-body">
          Selected Work
        </h2>
      </header>

      <ul className="border-t border-white/10">
        {PROJECTS.map((project, index) => (
          <li
            key={project.title}
            className="project-row overflow-hidden border-b border-white/10"
          >
            <a
              href="#work"
              data-project-index={index}
              className="project-link group flex items-baseline justify-between gap-6 py-7 md:py-10"
            >
              <span className="flex items-baseline gap-5 md:gap-8">
                <span className="project-index font-sans text-xs text-body transition-colors duration-500 md:text-sm">
                  0{index + 1}
                </span>
                <span className="project-title font-display text-[clamp(2rem,7vw,5.5rem)] font-medium leading-none text-heading transition-[transform,color] duration-500 ease-out group-hover:translate-x-3">
                  {project.title}
                </span>
              </span>
              <span className="project-meta hidden font-sans text-sm text-body transition-colors duration-500 md:block">
                {project.discipline} — {project.year}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Imagem flutuante única que segue o cursor. */}
      <div
        ref={floatRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[22rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 opacity-0 md:block"
        style={{ transform: "translate(-50%, -50%) scale(0.92)" }}
        aria-hidden="true"
      >
        {PROJECTS.map((project, index) => (
          <Image
            key={project.title}
            src={project.image}
            alt=""
            fill
            sizes="272px"
            className={`project-thumb project-thumb-${index} absolute inset-0 object-cover opacity-0`}
          />
        ))}
      </div>
    </section>
  );
}
