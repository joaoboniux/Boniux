"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LINES = [
  "Criando sistemas",
  "digitais com intuição",
  "humana & precisão",
  "brutalista.",
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
      className="relative flex min-h-screen flex-col justify-end pb-20 pt-40 md:pb-28"
    >
      {/* Linha decorativa + meta — alinhados com o heading */}
      <div className="md:ml-[50%] md:pr-10 px-6 md:px-0">
        <span
          className="hero-meta mb-3 block h-px w-full bg-heading/30"
          aria-hidden="true"
        />
        <p className="hero-meta mb-8 font-display text-[20px] font-light leading-normal text-heading">
          <span className="text-accent">/ </span>
          Olá, me chamo João Boni e tenho 15 anos de experiência
        </p>
      </div>

      <h1 className="font-display text-[clamp(2rem,4vw,5.5rem)] font-semibold leading-[1] tracking-tight text-heading md:ml-[50%] px-6 md:px-0">
        {LINES.map((line) => (
          <span
            key={line}
            className="hero-line block overflow-hidden"
          >
            <span className="hero-line__inner block">{line}</span>
          </span>
        ))}
      </h1>
    </section>
  );
}
