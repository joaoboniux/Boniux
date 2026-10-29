import type { ComponentType, CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseHero from "@/components/case/CaseHero";
import MacbookMockup from "@/components/case/MacbookMockup";
import PortalDeProdutos from "@/components/case/PortalDeProdutos";
import { getProject } from "@/data/projects";

const CASES: Record<string, { Body: ComponentType; background: string; screen: string }> = {
  "portal-de-produtos": {
    Body: PortalDeProdutos,
    background: "/projects/portal-de-produtos/hero-bg.png",
    screen: "/projects/portal-de-produtos/mockup-screen.png",
  },
};

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Boni · Designer / UX`,
    description: project.subtitle,
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  const entry = CASES[slug];
  if (!project || !entry) notFound();

  const { Body } = entry;

  return (
    <div
      className="bg-paper"
      style={{ "--case-brand": project.brandColor } as CSSProperties}
    >
      <Navbar />
      <main>
        <CaseHero title={project.title} subtitle={project.subtitle} background={entry.background}>
          <MacbookMockup screen={entry.screen} alt={`Tela do ${project.title}`} />
        </CaseHero>
        <Body />
      </main>
      <div className="rounded-tl-[clamp(40px,4.1vw,88px)] bg-surface">
        <Footer />
      </div>
    </div>
  );
}
