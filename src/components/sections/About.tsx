"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { AboutBackground } from "@/components/sections/AboutBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Título — cada linha tem seu próprio ScrollTrigger com scrub
      const lines = titleRef.current?.querySelectorAll<HTMLElement>(".about-title-line");
      if (lines?.length) {
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { clipPath: "inset(0 0 50% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 90%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        });
      }

      // Foto — já entra mostrando 40%, revela por completo quando o último parágrafo aparece
      gsap.fromTo(
        photoRef.current,
        { clipPath: "inset(0 0 60% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top bottom",        // inicia ao entrar na viewport
            endTrigger: ".about-last-para", // termina quando o último parágrafo aparece
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Subtítulo e parágrafos — sem efeito de entrada
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative overflow-x-hidden">

      {/* Fundo animado */}
      <AboutBackground />

      {/* Gradiente topo — funde com seção anterior */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48"
        style={{ background: "linear-gradient(to bottom, #0d0d0d, transparent)" }}
        aria-hidden="true"
      />

      {/* Gradiente base — funde com seção seguinte */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48"
        style={{ background: "linear-gradient(to top, #0d0d0d, transparent)" }}
        aria-hidden="true"
      />

      {/* Título gigante — beira esquerda da tela */}
      <div ref={titleRef} className="px-1 pt-20 md:pt-32">
        {["DESIGN", "NÃO É", "DECORAÇÃO."].map((word) => (
          <div key={word} className="-my-[0.14em]">
            <span className="about-title-line block py-[0.14em] font-display text-[clamp(4.5rem,9vw,12rem)] font-semibold uppercase leading-[0.92] tracking-tight text-heading">
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* Grid: foto (esq) + conteúdo (dir) */}
      <div className="grid md:grid-cols-[36%_1fr]">

        {/* Foto de perfil — placeholder cinza com reveal no scroll */}
        <div
          ref={photoRef}
          className="hidden md:block min-h-[44vw] rounded-tr-[5vw] bg-[#141414]"
          aria-label="Foto de perfil"
        />

        {/* Subtítulo + Corpo */}
        <div className="space-y-12 px-6 py-12 md:py-16 md:pl-[8%] md:pr-16">

          <div className="overflow-hidden">
            <span className="about-reveal block font-display text-[clamp(1.75rem,2.6vw,3.5rem)] font-medium leading-[1.1] text-heading">
              Design é a estrutura invisível{" "}
              que torna o complexo inevitável.
            </span>
          </div>

          <div className="space-y-6 font-sans text-[1.1rem] leading-relaxed text-body md:text-[1.25rem]">
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Sou João Boni, designer de produto focado em sistemas que escalam
                sem perder a intuição humana. Trabalho na interseção entre
                pesquisa, estratégia e execução, onde decisões de interface
                respondem a problemas reais.
              </span>
            </p>
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Atuando em produtos de alta escala no{" "}
                <span className="text-heading">Magalu</span>, aprendi que
                maturidade sênior não está em adicionar, mas em remover: editar a
                experiência até restar apenas o essencial.
              </span>
            </p>
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Minha trajetória tem uma base sólida: comecei no design
                gráfico/digital, evoluí para o web design e desenvolvimento
                frontend, e hoje atuo como Designer Especialista. Essa bagagem
                híbrida me permite transitar com facilidade entre a estratégia de
                produto e a viabilidade técnica.
              </span>
            </p>
            <p className="overflow-hidden">
              <span className="about-reveal block">
                Atualmente, vejo a Inteligência Artificial não apenas como uma
                ferramenta de produtividade, mas como uma camada essencial de
                experiência do usuário. No meu dia a dia, conecto design e
                engenharia ao desenhar e estruturar processos de criação de
                agentes de IA. Utilizo ferramentas como Github Copilot, Google AI
                Studio e MCP para integrar ao Figma e criar soluções inteligentes,
                com a utilização de skills e arquiteturas baseadas em RAG para
                garantir que as interfaces entreguem respostas contextuais.
              </span>
            </p>
            <p className="overflow-hidden about-last-para">
              <span className="about-reveal block">
                Adoro trabalhar em equipe, facilitando dinâmicas de design,
                discovery e pesquisa com stakeholders. Minhas habilidades também
                incluem Design System, testes de usabilidade e análise de dados
                (GA/Hotjar). Sou apaixonado por compartilhar conhecimento e apoiar
                colegas a integrarem novas tecnologias em seus fluxos de trabalho.
              </span>
            </p>
          </div>

        </div>
      </div>

      <div className="pb-20 md:pb-32" />
    </section>
  );
}
