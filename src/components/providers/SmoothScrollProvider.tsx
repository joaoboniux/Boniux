"use client";

/**
 * SmoothScrollProvider
 * -----------------------------------------------------------------------------
 * Regra de Ouro de arquitetura (ver .github/copilot-instructions.md):
 * Toda animação baseada em rolagem DEVE integrar o Lenis (smooth scroll) com o
 * GSAP/ScrollTrigger (movimento). Este provider é a única fonte do loop de
 * animação: o RAF do GSAP conduz o Lenis, e o ScrollTrigger é atualizado a
 * cada evento de scroll do Lenis. Não inicialize outro RAF do Lenis na app.
 *
 * O context do GSAP é mantido limpo via useGSAP, e todos os listeners/ticker
 * são removidos no unmount para evitar memory leaks.
 */

import { useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.1,
      // Curva de easing suave e editorial (exponencial de saída).
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // ScrollTrigger é atualizado a cada scroll do Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    // O ticker do GSAP conduz o RAF do Lenis (fonte única de verdade).
    const raf = (time: number) => {
      // gsap.ticker entrega o tempo em segundos; Lenis espera milissegundos.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Cleanup: remove ticker, listeners e destrói o Lenis (sem memory leaks).
    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  });

  return <>{children}</>;
}
