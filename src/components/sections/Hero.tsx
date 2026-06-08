"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LINES = [
  "Crafting digital",
  "systems with human",
  "intuition & brutalist",
  "precision.",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reveal linha por linha: cada linha sobe de dentro da sua máscara.
      gsap.from(".hero-line__inner", {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.from(".hero-meta", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col justify-end px-6 pb-20 pt-40 md:px-10 md:pb-28"
    >
      <p className="hero-meta mb-10 max-w-xs font-sans text-sm leading-relaxed text-body md:mb-16 md:ml-[55%]">
        <span className="text-accent">/</span> João Boni — Designer / UX
        operando entre estratégia e pixel.
      </p>

      <h1 className="font-display text-[clamp(2.75rem,11vw,11rem)] font-semibold leading-[0.92] tracking-tight text-heading">
        {LINES.map((line, i) => (
          <span
            key={line}
            className="hero-line block overflow-hidden"
            // Assimetria intencional: linhas com recuos diferentes.
            style={{ paddingLeft: i === 1 ? "8%" : i === 3 ? "22%" : "0" }}
          >
            <span className="hero-line__inner block">{line}</span>
          </span>
        ))}
      </h1>
    </section>
  );
}
