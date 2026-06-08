"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        yPercent: 120,
        duration: 1,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: root.current,
          start: "top 65%",
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="about"
      ref={root}
      className="px-6 py-32 md:px-10 md:py-48"
    >
      <div className="grid gap-12 md:grid-cols-12">
        <header className="md:col-span-4">
          <div className="flex items-baseline gap-4">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <h2 className="font-sans text-sm uppercase tracking-[0.3em] text-body">
              Philosophy
            </h2>
          </div>
        </header>

        <div className="space-y-8 md:col-span-7 md:col-start-6">
          <p className="overflow-hidden">
            <span className="about-reveal block font-display text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[1.1] text-heading">
              Design não é decoração — é a estrutura invisível que torna o
              complexo inevitável.
            </span>
          </p>

          <div className="max-w-xl space-y-6 font-sans text-lg leading-relaxed text-body">
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Sou João Boni, designer de produto focado em sistemas que escalam
                sem perder a intuição humana. Trabalho na interseção entre
                pesquisa, estratégia e execução — onde decisões de interface
                respondem a problemas reais, não a tendências.
              </span>
            </p>
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Atuando em produtos de alta escala na{" "}
                <span className="text-heading">Magalu</span>, aprendi que
                maturidade sénior não está em adicionar, mas em remover: editar a
                experiência até restar apenas o essencial, com precisão quase
                brutalista.
              </span>
            </p>
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Cada projeto começa por uma pergunta, atravessa um sistema e
                termina numa interface que parece óbvia — porque o trabalho difícil
                aconteceu antes do pixel.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
