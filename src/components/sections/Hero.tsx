"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { HeroBackground } from "@/components/sections/HeroBackground";

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

      gsap.from(".hero-cta", {
        autoAlpha: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        delay: 1.4,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-44 pt-40 md:pb-60"
    >
      {/* Fade inferior — funde o hero com o background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%]"
        style={{ background: "linear-gradient(to bottom, transparent, #0d0d0d)" }}
        aria-hidden="true"
      />
      <HeroBackground />
      {/* Linha decorativa + meta — alinhados com o heading */}
      <div className="md:ml-[50%] md:pr-10 px-6 md:px-0">
        <span
          className="hero-meta mb-3 block h-px w-full bg-heading/30"
          aria-hidden="true"
        />
        <p className="hero-meta mb-8 font-display text-[20px] font-medium leading-normal text-heading">
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

      {/* CTA */}
      <div className="hero-cta md:ml-[50%] px-6 md:px-0 mt-10">
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
          className="group relative inline-flex items-center gap-3 overflow-hidden border border-heading/20 px-7 py-4 font-display text-[15px] font-medium tracking-wide text-heading transition-colors duration-500 hover:border-heading/60"
        >
          {/* fundo deslizante no hover */}
          <span
            className="absolute inset-0 -translate-x-full bg-heading/8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"
            aria-hidden="true"
          />
          {/* seta que sai e reaparece */}
          <span className="relative flex items-center gap-3">
            <span className="inline-block translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1">
              →
            </span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1">
              Conheça meu trabalho
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
