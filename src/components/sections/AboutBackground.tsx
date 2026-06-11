"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const G = 90;

export function AboutBackground() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;

      // Grid: mesma respiração suave do hero
      gsap.to(".abg-grid", {
        opacity: 0.06,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Formas geométricas — drift lento
      gsap.to(".abg-shape-a", { y: -14, duration: 30, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".abg-shape-b", { y: 10,  duration: 24, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 5 });

      // Hatches: mesma sequência do hero mas com delays diferentes
      gsap.set([".abg-hatch-a", ".abg-hatch-b", ".abg-hatch-c"], { opacity: 0 });
      const htl = gsap.timeline({ repeat: -1, delay: 2 });
      htl.to(".abg-hatch-b", { opacity: 0.20, duration: 1.8, ease: "sine.inOut" })
         .to(".abg-hatch-a", { opacity: 0.20, duration: 1.8, ease: "sine.inOut" }, "+=3.5")
         .to(".abg-hatch-b", { opacity: 0,    duration: 1.8, ease: "sine.inOut" }, "+=2")
         .to(".abg-hatch-c", { opacity: 0.16, duration: 1.8, ease: "sine.inOut" }, "<")
         .to(".abg-hatch-a", { opacity: 0,    duration: 1.8, ease: "sine.inOut" }, "+=3")
         .to(".abg-hatch-c", { opacity: 0,    duration: 1.8, ease: "sine.inOut" }, "+=2");

      // Dots — pulso aleatório
      gsap.set(".abg-dot", { opacity: 0.02 });
      gsap.to(".abg-dot", {
        opacity: 0.14,
        duration: 5,
        ease: "sine.inOut",
        stagger: { amount: 10, grid: "auto", from: "random" },
        yoyo: true,
        repeat: -1,
      });

      // Curvas — desenho em loop como no hero
      svg.querySelectorAll<SVGPathElement>(".abg-curve").forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 18 + i * 6,
          ease: "none",
          repeat: -1,
          repeatDelay: 3,
          delay: i * 4,
        });
      });

      // Accent — pulso suave
      gsap.to(".abg-accent", {
        opacity: 0.85,
        duration: 4,
        ease: "sine.inOut",
        stagger: 2,
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 1200"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Grid — mesmo padrão do hero */}
      <g className="abg-grid" opacity={0.035}>
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * G} x2="1440" y2={i * G} stroke="white" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={i * G} y1="0" x2={i * G} y2="1200" stroke="white" strokeWidth="0.5" />
        ))}
      </g>

      {/* Shapes — mesma linguagem, posições diferentes */}
      <g className="abg-shape-a">
        {/* Barra vertical direita */}
        <rect x="1278" y="0" width="54" height="630" fill="#131313" />
        <circle cx="1305" cy="630" r="27" fill="#131313" />
      </g>

      <g className="abg-shape-b">
        {/* Bloco horizontal inferior esquerdo */}
        <rect x="0" y="900" width="270" height="126" fill="#141414" opacity={0.8} />
      </g>

      {/* Hatches */}
      <g className="abg-hatch-a">
        {/* Verticais canto superior direito */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`va-${i}`} x1={1350 + i * 13} y1="90" x2={1350 + i * 13} y2="450"
            stroke="white" strokeWidth="0.75" />
        ))}
      </g>

      <g className="abg-hatch-b">
        {/* Horizontais meio esquerdo */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`hb-${i}`} x1="90" y1={540 + i * 13} x2="360" y2={540 + i * 13}
            stroke="white" strokeWidth="0.75" />
        ))}
      </g>

      <g className="abg-hatch-c">
        {/* Verticais centro-baixo */}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`vc-${i}`} x1={720 + i * 13} y1="900" x2={720 + i * 13} y2="1200"
            stroke="white" strokeWidth="0.7" />
        ))}
      </g>

      {/* Dots */}
      <g>
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <circle key={`d1-${row}-${col}`} className="abg-dot"
              cx={108 + col * 21} cy={180 + row * 21}
              r="1.8" fill="white" opacity={0.02} />
          ))
        )}
      </g>
      <g>
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => (
            <circle key={`d2-${row}-${col}`} className="abg-dot"
              cx={990 + col * 21} cy={756 + row * 21}
              r="1.5" fill="white" opacity={0.02} />
          ))
        )}
      </g>

      {/* Curvas — variações das do hero */}
      <path className="abg-curve"
        d="M 0 360 C 180 270 450 450 630 360 S 900 180 1080 270"
        stroke="white" strokeWidth="0.55" fill="none" opacity={0.07} />
      <path className="abg-curve"
        d="M 1440 720 Q 1170 540 900 720 T 360 630"
        stroke="#c46a55" strokeWidth="0.8" fill="none" opacity={0.32} />
      <path className="abg-curve"
        d="M 270 1080 Q 540 900 810 1080"
        stroke="white" strokeWidth="0.5" fill="none" opacity={0.06} />

      {/* Accents terracota */}
      <rect className="abg-accent" x="630" y="180" width="12" height="28" fill="#c46a55" opacity={0.45} />
      <rect className="abg-accent" x="90"  y="720" width="10" height="20" fill="#c46a55" opacity={0.35} />
    </svg>
  );
}
