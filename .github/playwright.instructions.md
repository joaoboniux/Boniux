---
applyTo: "**"
---

# Playwright Browser Automation

Use estas instruções sempre que o usuário pedir para testar um site, automatizar interações no navegador, validar funcionalidades web, tirar screenshots ou qualquer tarefa de automação de browser.

O diretório da skill no projeto é:
`SKILL_DIR = /Users/magalu/Documents/www/Landing/skills/playwright-skill-main/skills/playwright-skill`

---

## Setup (primeira vez)

```bash
cd /Users/magalu/Documents/www/Landing/skills/playwright-skill-main/skills/playwright-skill
npm run setup
```

Instala o Playwright e o Chromium. Necessário apenas uma vez.

---

## Workflow obrigatório (seguir esta ordem)

### 1. Detectar servidores dev (para localhost)

Sempre execute PRIMEIRO antes de escrever qualquer script:

```bash
cd /Users/magalu/Documents/www/Landing/skills/playwright-skill-main/skills/playwright-skill && node -e "require('./lib/helpers').detectDevServers().then(servers => console.log(JSON.stringify(servers)))"
```

- **1 servidor encontrado** → usar automaticamente e informar o usuário
- **Múltiplos servidores** → perguntar ao usuário qual usar
- **Nenhum servidor** → pedir URL ou oferecer ajuda para iniciar o servidor

### 2. Escrever o script em /tmp

NUNCA escrever arquivos de teste no diretório da skill ou no projeto. Sempre usar `/tmp/playwright-test-*.js`.

Sempre colocar a URL em uma constante `TARGET_URL` no topo do script.

### 3. Executar via run.js

```bash
cd /Users/magalu/Documents/www/Landing/skills/playwright-skill-main/skills/playwright-skill && node run.js /tmp/playwright-test-NOME.js
```

### 4. Configurações padrão

- Sempre usar `headless: false` (browser visível), a menos que o usuário peça headless explicitamente
- Usar `slowMo: 100` para tornar as ações visíveis
- Preferir `waitForURL`, `waitForSelector`, `waitForLoadState` em vez de timeouts fixos
- Sempre usar try-catch para tratamento de erros

---

## Padrões de scripts comuns

### Screenshot de página

```javascript
// /tmp/playwright-test-screenshot.js
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000'; // detectado automaticamente

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });
    console.log('Screenshot salvo em /tmp/screenshot.png');
  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await browser.close();
  }
})();
```

### Design responsivo (múltiplos viewports)

```javascript
// /tmp/playwright-test-responsive.js
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet',  width: 768,  height: 1024 },
    { name: 'Mobile',  width: 375,  height: 667  },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(TARGET_URL);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `/tmp/${vp.name.toLowerCase()}.png`, fullPage: true });
    console.log(`${vp.name} (${vp.width}x${vp.height}) - capturado`);
  }

  console.log('Todos os viewports testados');
  await browser.close();
})();
```

### Preencher e submeter formulário

```javascript
// /tmp/playwright-test-form.js
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  await page.goto(`${TARGET_URL}/contact`);
  await page.fill('input[name="name"]', 'João Silva');
  await page.fill('input[name="email"]', 'joao@exemplo.com');
  await page.fill('textarea[name="message"]', 'Mensagem de teste');
  await page.click('button[type="submit"]');

  await page.waitForSelector('.success-message');
  console.log('Formulário enviado com sucesso');

  await browser.close();
})();
```

### Testar fluxo de login

```javascript
// /tmp/playwright-test-login.js
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`${TARGET_URL}/login`);
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard');
  console.log('Login realizado com sucesso, redirecionado para dashboard');

  await browser.close();
})();
```

### Verificar links quebrados

```javascript
// /tmp/playwright-test-links.js
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(TARGET_URL);

  const links = await page.locator('a[href^="http"]').all();
  const results = { working: 0, broken: [] };

  for (const link of links) {
    const href = await link.getAttribute('href');
    try {
      const response = await page.request.head(href);
      if (response.ok()) {
        results.working++;
      } else {
        results.broken.push({ url: href, status: response.status() });
      }
    } catch (e) {
      results.broken.push({ url: href, error: e.message });
    }
  }

  console.log(`Links funcionando: ${results.working}`);
  console.log(`Links quebrados:`, results.broken);

  await browser.close();
})();
```

---

## Helpers disponíveis (lib/helpers.js)

```javascript
const helpers = require('./lib/helpers');

// Detectar servidores dev em execução
const servers = await helpers.detectDevServers();

// Clique seguro com retry
await helpers.safeClick(page, 'button.submit', { retries: 3 });

// Digitar com limpeza prévia
await helpers.safeType(page, '#username', 'testuser');

// Screenshot com timestamp
await helpers.takeScreenshot(page, 'resultado');

// Lidar com banners de cookies
await helpers.handleCookieBanner(page);

// Extrair dados de tabela
const data = await helpers.extractTableData(page, 'table.results');
```

---

## Execução inline (tarefas rápidas)

```bash
cd /Users/magalu/Documents/www/Landing/skills/playwright-skill-main/skills/playwright-skill && node run.js "
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.goto('http://localhost:3000');
await page.screenshot({ path: '/tmp/quick.png', fullPage: true });
console.log('Screenshot salvo');
await browser.close();
"
```

---

## Solução de problemas

| Problema | Solução |
|---|---|
| Playwright não instalado | `cd SKILL_DIR && npm run setup` |
| Módulo não encontrado | Garantir que está executando via `run.js` a partir do SKILL_DIR |
| Browser não abre | Verificar `headless: false` e display disponível |
| Elemento não encontrado | Adicionar espera: `await page.waitForSelector('.elemento', { timeout: 10000 })` |
