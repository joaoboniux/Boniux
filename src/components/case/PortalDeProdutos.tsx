"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ASSETS = "/projects/portal-de-produtos";

const H2 = "font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none text-ink";
const BODY = "font-sans text-lg font-medium leading-normal text-ink-soft md:text-[22px]";
const LIST = "list-disc space-y-0 pl-[1.5em]";

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`case-reveal flex w-full flex-col rounded-[12px] bg-[var(--case-brand)] p-5 font-sans font-medium text-paper md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default function PortalDeProdutos() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".case-reveal").forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="case-container flex flex-col gap-12 pb-[clamp(4rem,6vw,6rem)] pt-[clamp(3rem,4vw,4.5rem)] md:gap-14"
    >
      <h2 className="case-reveal font-display text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-none text-ink">
        Resumo
      </h2>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,781fr)_minmax(0,455fr)] lg:gap-16">
        <div className="flex flex-col gap-12">
          <section className="case-reveal flex flex-col gap-6">
            <h3 className={H2}>Contexto</h3>
            <p className={BODY}>
              Em 2022, o cadastro de produtos próprios (1P) no Magalu dependia do upload de planilhas
              manuais que alimentavam tabelas de um sistema legado.
            </p>
            <p className={BODY}>
              O time de produto trouxe um briefing inicial focado em uma funcionalidade isolada: o
              desenvolvimento de &ldquo;atributos flexíveis&rdquo; para que variações de um mesmo
              produto fossem cadastradas de uma só vez.
            </p>
            <p className={BODY}>
              Como designer especialista, entendi que antes de desenhar a funcionalidade, era
              necessário investigar a jornada de ponta a ponta para validar se a dor real era apenas
              a falta dessa feature.
            </p>
          </section>

          <section className="case-reveal flex flex-col gap-6">
            <h3 className={H2}>Minha contribuição</h3>
            <p className={BODY}>
              <strong className="font-bold">UX Research Investigativo:</strong> Preparei um roteiro
              estruturado de perguntas e conduzi entrevistas em profundidade com analistas e
              coordenadores de todas as áreas envolvidas no ecossistema.
            </p>
            <p className={BODY}>
              <strong className="font-bold">Mapeamento de Processos Complexos:</strong> Consegui
              documentar o fluxo completo de tarefas e ramificações que cada área executava para
              colocar um produto no ar.
            </p>
            <div className={BODY}>
              <p className="mb-[1.35em] font-bold">O Baseline Identificado:</p>
              <ul className={LIST}>
                <li>35 dias era o tempo médio para concluir o cadastro de um único produto.</li>
                <li>8 áreas e 73 pessoas operavam de forma descentralizada e manual.</li>
                <li>11 aplicações diferentes eram utilizadas ao longo do processo.</li>
              </ul>
            </div>
            <p className={BODY}>
              <strong className="font-bold">O Diagnóstico das Dores:</strong> A pesquisa revelou que
              o problema real ia muito além do atributo flexível; havia alto ruído de comunicação,
              falta de controle, ausência de histórico e fragmentação excessiva de sistemas.
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-12">
          <section className="case-reveal flex flex-col gap-6">
            <h3 className={H2}>Meu papel</h3>
            <ul className={`${BODY} ${LIST}`}>
              <li>UX Designer</li>
              <li>Discovery</li>
              <li>Direção de Design</li>
              <li>Arquitetura da Informação</li>
              <li>Concepção de Produto</li>
            </ul>
          </section>
          <section className="case-reveal flex flex-col gap-6">
            <h3 className={H2}>Desafio</h3>
            <p className={BODY}>
              Reduzir o tempo médio extremamente alto para o cadastro de produtos 1P.
            </p>
          </section>
          <section className="case-reveal flex flex-col gap-6">
            <h3 className={H2}>Impacto</h3>
            <p className={BODY}>
              Redução drástica de 35 para apenas 6 dias no processo de cadastro (-29 dias),
              centralização de sistemas e rollout de 100% da operação.
            </p>
          </section>
        </aside>
      </div>

      <Panel className="gap-10">
        <figure className="flex flex-col gap-2">
          <figcaption className="text-lg md:text-[22px]">
            Uma parte do fluxo de cadastro de produto mapeado no discovery.
          </figcaption>
          <Image
            src={`${ASSETS}/discovery-fluxo.png`}
            alt="Fluxo de cadastro de produto mapeado no discovery (desfocado)"
            width={1343}
            height={381}
            sizes="(min-width: 1024px) 1236px, 100vw"
            className="h-auto w-full blur-[2px]"
          />
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className="text-lg md:text-[22px]">Solução proposta</figcaption>
          <Image
            src={`${ASSETS}/discovery-solucao.png`}
            alt="Fluxo da solução proposta (desfocado)"
            width={1664}
            height={407}
            sizes="(min-width: 768px) 589px, 100vw"
            className="h-auto w-full blur-[2px] md:w-[47.7%]"
          />
        </figure>
        <p className="text-sm">*Imagens com blur para proteção de dados.</p>
      </Panel>

      <section className="flex flex-col gap-10 md:gap-16">
        <h2 className={`case-reveal ${H2}`}>A Virada Estratégica</h2>
        <dl className="flex flex-col gap-10 md:gap-16">
          <div className="case-reveal grid gap-3 md:grid-cols-[minmax(0,420fr)_minmax(0,816fr)] md:gap-16">
            <dt className={BODY}>Visão de Produto vs. Visão de Feature:</dt>
            <dd className={BODY}>
              Com os dados do Discovery, demonstrei que criar apenas o atributo flexível traria um
              ganho marginal, enquanto o verdadeiro ganho estaria em projetar um{" "}
              <span className="underline">Workflow Automatizado</span>.
            </dd>
          </div>
          <div className="case-reveal grid gap-3 md:grid-cols-[minmax(0,420fr)_minmax(0,816fr)] md:gap-16">
            <dt className={BODY}>Liderança e Alinhamento:</dt>
            <dd className={BODY}>
              Apresentei a visão estratégica de um ecossistema unificado para o Product Manager (PM)
              e o Tribe Lead, conquistando total apoio da liderança para mudar o escopo e construir a
              nova solução.
            </dd>
          </div>
        </dl>
      </section>

      <section className="case-reveal flex flex-col gap-6">
        <h2 className={H2}>A Solução: Portal de produtos</h2>
        <p className={`${BODY} lg:w-[60%]`}>
          Projetei uma plataforma de workflow focada em dar visibilidade à governança de prazos,
          mitigar erros e acelerar a produtividade em massa.
        </p>
      </section>

      <Panel className="gap-2">
        <p className="text-lg md:text-[22px]">Interface final do Portal de produtos</p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,749fr)_minmax(0,455fr)] lg:gap-8">
          <div className="relative aspect-[749/410] w-full overflow-hidden">
            <Image
              src={`${ASSETS}/interface-listagem.png`}
              alt="Listagem principal do Portal de produtos com abas Todos, Pendentes, Divergentes, Acompanhar e Arquivados"
              fill
              sizes="(min-width: 1024px) 749px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-[1.2em] text-base">
            <h3 className="mb-[0.2em] font-sans text-lg font-medium text-paper md:text-[22px]">
              Gestão de Processo e Visibilidade
            </h3>
            <p>
              <strong className="font-bold">Pendentes:</strong> Centralização de itens prontos para o
              enriquecimento de dados.
            </p>
            <p>
              <strong className="font-bold">Divergentes:</strong> Sinalização clara de produtos que
              exigem correções solicitadas por outras áreas.
            </p>
            <p>
              <strong className="font-bold">Acompanhar:</strong> Visibilidade em tempo real de qual
              área e etapa do fluxo o produto se encontra, mitigando a falta de controle.
            </p>
            <p>
              <strong className="font-bold">Arquivados:</strong> Histórico preservado para itens
              descontinuados que podem ser reativados sem perda de progresso.
            </p>
          </div>
        </div>
      </Panel>

      <Panel className="gap-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,749fr)_minmax(0,455fr)] lg:gap-8">
          <Image
            src={`${ASSETS}/acoes-em-massa.png`}
            alt="Listagem com produtos selecionados e menu de ações em massa aberto"
            width={891}
            height={578}
            sizes="(min-width: 1024px) 749px, 100vw"
            className="h-auto w-full"
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-[1.2em] text-base">
              <h3 className="font-sans text-base font-medium text-paper">Ações em massa</h3>
              <p>Possibilita fazer aprovações, edições e mais em grande lotes.</p>
              <p>
                Funcionalidade de editar em fila uma seleção de produtos sem a necessidade de voltar
                para listagem principal.
              </p>
            </div>
            <Image
              src={`${ASSETS}/editar-em-massa.png`}
              alt="Modal de edição em massa para os produtos selecionados"
              width={492}
              height={530}
              sizes="(min-width: 1024px) 299px, 66vw"
              className="h-auto w-[65.7%]"
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,386fr)_minmax(0,744fr)] md:gap-10">
          <Image
            src={`${ASSETS}/solicitar-correcao.png`}
            alt="Modal de solicitação de correção com etapa responsável e motivo da divergência"
            width={601}
            height={613}
            sizes="(min-width: 768px) 386px, 100vw"
            className="h-auto w-full"
          />
          <Image
            src={`${ASSETS}/editar-em-fila.png`}
            alt="Tela de edição em fila com informações do produto e lista de itens selecionados"
            width={1105}
            height={587}
            sizes="(min-width: 768px) 744px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </Panel>
    </div>
  );
}
