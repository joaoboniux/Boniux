# Boniux — Design System

Documentação de consulta do sistema visual do portfólio de **João Boni ("Boni")**.
Os tokens estão implementados em [`tailwind.config.ts`](../tailwind.config.ts).

> Princípio guia: estética **editorial de vanguarda**, humana e disruptiva
> (referência: `studiodirection.com`). **Anti-IA**: sem grelhas perfeitamente
> simétricas, sem cards com cantos arredondados padrão, sem sombras/gradientes
> neon. Tipografia pesada, assimetria intencional e negative space generoso.

---

## 1. Cores

Fundo **ultra-dark orgânico**. **Sem gradientes de fundo digitais.**

| Token         | Hex       | Classe Tailwind        | Uso                                                   |
| ------------- | --------- | ---------------------- | ----------------------------------------------------- |
| `background`  | `#0D0D0D` | `bg-background`        | Fundo principal da página                             |
| `surface`     | `#141414` | `bg-surface`           | Superfícies / cards                                   |
| `accent`      | `#C46A55` | `text-accent`/`bg-accent` | Washed terracotta / rust — **uso cirúrgico**        |
| `heading`     | `#FAFAFA` | `text-heading`         | Títulos (branco suave)                                |
| `body`        | `#A1A1AA` | `text-body`            | Corpo de texto (cinza editorial)                      |

### Uso do Accent (`#C46A55`) — analógico e cirúrgico

Aplicar **apenas** em:

- pequenos indicadores (bullets, marcadores, números de índice);
- linhas finas de divisão (`h-px bg-accent`);
- estados ativos subtis (link ativo, foco, hover discreto).

❌ Não usar o accent como cor de preenchimento de grandes áreas, fundos de
botões grandes, ou blocos inteiros.

---

## 2. Tipografia

**Sem Inter.** Fontes self-hosted via `next/font/local` (Fontshare), definidas
em [`src/fonts/index.ts`](../src/fonts/index.ts).

| Papel             | Fonte           | Classe Tailwind | CSS var          |
| ----------------- | --------------- | --------------- | ---------------- |
| Headings grandes  | **Clash Display** | `font-display`  | `--font-display` |
| Texto de apoio    | **Satoshi**       | `font-sans`     | `--font-sans`    |

- Headings (`h1`–`h6`) já usam `font-display` + `text-heading` por padrão
  (ver [`src/app/globals.css`](../src/app/globals.css)).
- Corpo usa `font-sans` + `text-body` por padrão no `body`.

---

## 3. Princípios de Layout (Anti-IA)

- **Assimetria intencional** — evitar centralização e grelhas perfeitamente
  simétricas; usar offsets e composições editoriais.
- **Negative space generoso** — o vazio é elemento de composição.
- **Tipografia pesada** — títulos grandes e marcantes como âncora visual.
- **Cantos** — preferir cantos retos; evitar o `rounded-*` padrão difundido.
- **Sombras** — discretas e orgânicas; nunca neon/roxo/azul brilhante.

---

## 4. Animação

Todo movimento de scroll integra **Lenis + GSAP/ScrollTrigger**. Ver a Regra de
Ouro em [`.github/copilot-instructions.md`](../.github/copilot-instructions.md).
