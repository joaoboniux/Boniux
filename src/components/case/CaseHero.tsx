"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CaseHeroProps = {
  title: string;
  subtitle?: string;
  background: string;
  children: ReactNode;
};

export default function CaseHero({ title, subtitle, background, children }: CaseHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".case-hero-line__inner", {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.from(".case-hero-stage", {
        y: 80,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.to(".case-hero-device", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero-stage",
          start: "top 60%",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    // Grid de 3 linhas: o fundo escuro cobre as linhas 1–2 e o bloco de marca
    // ocupa as linhas 2–3, então o fundo termina exatamente na metade do bloco.
    <section ref={root} className="grid grid-cols-1 grid-rows-[auto_auto_auto]">
      <div
        className="relative col-start-1 row-start-1 row-end-3 overflow-hidden rounded-br-[clamp(40px,4.1vw,88px)] bg-background"
        aria-hidden="true"
      >
        <Image
          src={background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="case-container relative col-start-1 row-start-1 pb-[clamp(2rem,3vw,3rem)] pt-[clamp(8rem,14vw,18.75rem)]">
        <h1 className="font-display text-heading">
          <span className="block overflow-hidden">
            <span className="case-hero-line__inner block text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.15]">
              {title}
              {subtitle && ":"}
            </span>
          </span>
          {subtitle && (
            <span className="block overflow-hidden">
              <span className="case-hero-line__inner block text-[clamp(1.25rem,2.6vw,2.5rem)] font-normal leading-[1.25]">
                {subtitle}
              </span>
            </span>
          )}
        </h1>
      </div>

      <div className="case-hero-stage case-wide relative col-start-1 row-start-2 row-end-4 overflow-hidden rounded-bl-[clamp(40px,4.1vw,88px)] bg-[var(--case-brand)] px-4 pb-[clamp(1.5rem,1.8vw,2.45rem)] pt-[clamp(1.25rem,1.6vw,2.125rem)]">
        <div className="case-hero-device mx-auto w-full max-w-[915px] md:w-[55%]">{children}</div>
      </div>
    </section>
  );
}
