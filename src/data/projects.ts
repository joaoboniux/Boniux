export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  discipline: string;
  image: string;
  /** Cor de marca usada nos blocos de destaque do case. */
  brandColor?: string;
  /** Projetos com página de case publicada em /trabalhos/[slug]. */
  hasCase?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "portal-de-produtos",
    title: "Portal de produtos",
    subtitle: "Uma redução de 82% do Time-to-Market de produtos",
    year: "2022",
    discipline: "Design de Produto",
    image: "/projects/portal-de-produtos/mockup-screen.png",
    brandColor: "#0054FF",
    hasCase: true,
  },
  { slug: "pulse", title: "Pulse", year: "2024", discipline: "Design System", image: "/projects/pulse.svg" },
  { slug: "vertice", title: "Vértice", year: "2024", discipline: "Pesquisa UX", image: "/projects/vertice.svg" },
  { slug: "marola", title: "Marola", year: "2023", discipline: "Marca & UI", image: "/projects/marola.svg" },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function projectHref(project: Project) {
  return project.hasCase ? `/trabalhos/${project.slug}` : "#work";
}
