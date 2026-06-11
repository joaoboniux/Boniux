"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const G = 90;

export function HeroBackground() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;

      const layers: { sel: string; fx: number; fy: number }[] = [
        { sel: ".hbg-layer-far",    fx: 0.006, fy: 0.004 },
        { sel: ".hbg-layer-mid",    fx: 0.018, fy: 0.012 },
        { sel: ".hbg-layer-near",   fx: 0.038, fy: 0.026 },
        { sel: ".hbg-layer-accent", fx: 0.055, fy: 0.036 },
      ];

      const movers = layers.map(({ sel, fx, fy }) => {
        const els = svg.querySelectorAll<SVGElement>(sel);
        if (!els.length) return null;
        return {
          x: gsap.quickTo(els, "x", { duration: 1.1, ease: "power2.out" }),
          y: gsap.quickTo(els, "y", { duration: 1.1, ease: "power2.out" }),
          fx,
          fy,
        };
      });

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const onMove = (e: MouseEvent) => {
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        movers.forEach((m) => {
          if (!m) return;
          m.x(dx * m.fx);
          m.y(dy * m.fy);
        });
      };

      window.addEventListener("mousemove", onMove, { passive: true });

      gsap.to(".hbg-grid", {
        opacity: 0.07, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1,
      });

      svg.querySelectorAll<SVGPathElement>(".hbg-curve").forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 14 + i * 5,
          ease: "none",
          repeat: -1,
          repeatDelay: 2.5,
          delay: i * 3.5,
        });
      });

      // Timeline sequencial: 1 aparece → aguarda → 2 aparece → 1 some/3 aparece → 2 some/1 aparece → 3 some → loop
      gsap.set([".hbg-hatch-a", ".hbg-hatch-b", ".hbg-hatch-c"], { opacity: 0 });
      const htl = gsap.timeline({ repeat: -1 });
      htl.to(".hbg-hatch-a", { opacity: 0.22, duration: 1.8, ease: "sine.inOut" })
         .to(".hbg-hatch-b", { opacity: 0.22, duration: 1.8, ease: "sine.inOut" }, "+=3")
         .to(".hbg-hatch-a", { opacity: 0,    duration: 1.8, ease: "sine.inOut" }, "+=2.5")
         .to(".hbg-hatch-c", { opacity: 0.18, duration: 1.8, ease: "sine.inOut" }, "<")
         .to(".hbg-hatch-b", { opacity: 0,    duration: 1.8, ease: "sine.inOut" }, "+=2.5")
         .to(".hbg-hatch-a", { opacity: 0.22, duration: 1.8, ease: "sine.inOut" }, "<")
         .to(".hbg-hatch-c", { opacity: 0,    duration: 1.8, ease: "sine.inOut" }, "+=3");

      gsap.set(".hbg-dot", { opacity: 0.03 });
      gsap.to(".hbg-dot", {
        opacity: 0.16, duration: 4, ease: "sine.inOut",
        stagger: { amount: 9, grid: "auto", from: "random" }, yoyo: true, repeat: -1,
      });

      gsap.to(".hbg-shape-b", { y: -12, duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 7 });

      gsap.to(".hbg-accent", {
        opacity: 0.9, duration: 3.5, ease: "sine.inOut", stagger: 1.4, yoyo: true, repeat: -1,
      });

      return () => { window.removeEventListener("mousemove", onMove); };
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <g className="hbg-grid hbg-layer-far" opacity={0.04}>
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * G} x2="1440" y2={i * G} stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`v${i}`} x1={i * G} y1="0" x2={i * G} y2="900" stroke="white" strokeWidth="0.5" />
          ))}
        </g>

        <g className="hbg-shape-b hbg-layer-mid">
          <rect x="666" y="0" width="72" height="504" fill="#131313" />
          <circle cx="702" cy="504" r="36" fill="#131313" />
        </g>

        <rect className="hbg-shape-b hbg-layer-mid" x="1116" y="504" width="162" height="108" fill="#121212" opacity={0.7} />

        <g className="hbg-hatch-a hbg-layer-mid">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`vh1-${i}`} x1={63 + i * 13} y1="0" x2={63 + i * 13} y2="360" stroke="white" strokeWidth="0.75" />
          ))}
        </g>

        <g className="hbg-hatch-b hbg-layer-near">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`hh1-${i}`} x1="1080" y1={666 + i * 13} x2="1440" y2={666 + i * 13} stroke="white" strokeWidth="0.75" />
          ))}
        </g>

        <g className="hbg-hatch-c hbg-layer-mid">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`vh2-${i}`} x1={1350 + i * 13} y1="180" x2={1350 + i * 13} y2="504" stroke="white" strokeWidth="0.7" />
          ))}
        </g>

        <g className="hbg-layer-near">
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <circle key={`d1-${row}-${col}`} className="hbg-dot" cx={1233 + col * 21} cy={90 + row * 21} r="1.8" fill="white" opacity={0.03} />
            ))
          )}
        </g>

        <g className="hbg-layer-near">
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <circle key={`d2-${row}-${col}`} className="hbg-dot" cx={18 + col * 18} cy={738 + row * 18} r="1.4" fill="white" opacity={0.03} />
            ))
          )}
        </g>

        <path className="hbg-curve hbg-layer-far" d="M 432 0 Q 648 198 504 432" stroke="white" strokeWidth="0.6" fill="none" opacity={0.09} />
        <path className="hbg-curve hbg-layer-near" d="M 0 648 C 270 720 558 576 864 702 S 1188 828 1440 666" stroke="#c46a55" strokeWidth="0.85" fill="none" opacity={0.38} />
        <path className="hbg-curve hbg-layer-far" d="M 1098 54 Q 1440 450 1098 846" stroke="white" strokeWidth="0.5" fill="none" opacity={0.06} />
        <path className="hbg-curve hbg-layer-mid" d="M 0 252 Q 198 90 360 198" stroke="white" strokeWidth="0.5" fill="none" opacity={0.07} />

        <rect className="hbg-accent hbg-layer-accent" x="450" y="306" width="14" height="33" fill="#c46a55" opacity={0.55} />
        <rect className="hbg-accent hbg-layer-accent" x="36" y="450" width="14" height="23" fill="#c46a55" opacity={0.4} />
      </svg>
  );
}
