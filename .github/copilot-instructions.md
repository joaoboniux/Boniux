# Boniux — Instruções de Arquitetura para o Copilot

Portfólio de **João Boni ("Boni")** · Designer / UX · `www.boniux.com.br`.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v3** (config em `tailwind.config.ts`)
- **GSAP** + plugin **ScrollTrigger**
- **Lenis** (smooth scroll unificado)
- **@gsap/react** (`useGSAP` para contexts limpos)

## 🥇 Regra de Ouro (obrigatória)

> **Toda e qualquer animação baseada em rolagem deve obrigatoriamente integrar o
> Lenis para o smooth scroll e o GSAP/ScrollTrigger para o movimento. Mantenha os
> contexts do GSAP limpos para evitar memory leaks.**

### O que isso significa na prática

1. **Fonte única do loop de animação.** O RAF do Lenis é conduzido pelo
   `gsap.ticker` em [`src/components/providers/SmoothScrollProvider.tsx`](../src/components/providers/SmoothScrollProvider.tsx).
   Nunca crie um segundo `requestAnimationFrame` para o Lenis em outro lugar.
2. **ScrollTrigger sempre sincronizado.** O `ScrollTrigger.update` é chamado no
   evento `scroll` do Lenis. Não use o scroll nativo do browser para animações.
3. **Contexts limpos.** Use sempre o hook `useGSAP` (de `@gsap/react`) para criar
   timelines/ScrollTriggers. Ele faz `revert()` automático no unmount. Quando
   registrar listeners/tickers manualmente, remova-os na função de cleanup.
4. **Sem memory leaks.** Todo `ScrollTrigger`, listener do Lenis e callback do
   `gsap.ticker` criado deve ter cleanup correspondente.

### Padrão de referência

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MinhaSecao() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".alvo", {
        y: -100,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref } // context limpo, revert automático no unmount
  );

  return <div ref={ref}>{/* ... */}</div>;
}
```

## Diretriz de Design (Anti-IA)

Evitar estética genérica de IA: nada de grelhas perfeitamente simétricas, cards
com cantos arredondados padrão, sombras roxas/azuis brilhantes ou gradientes
neon. O design é **editorial, de vanguarda, humano** — tipografia pesada,
assimetria intencional e uso generoso de espaços vazios (negative space).
Referência estética: `studiodirection.com`.

Tokens e regras visuais completas: ver [`docs/DESIGN-SYSTEM.md`](../docs/DESIGN-SYSTEM.md).
