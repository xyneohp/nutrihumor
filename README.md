# NutriHumor

Protótipo acadêmico (TCC em Nutrição) para monitorar consumo alimentar, grau de
processamento (classificação NOVA), qualidade nutricional (Nutri-Score) e
bem-estar subjetivo (índice WHO-5).

**Finalidade exclusivamente educativa. Não realiza diagnóstico clínico.**

## Deploy no GitHub Pages

Este projeto já inclui o workflow `.github/workflows/deploy.yml`, que builda e
publica o app automaticamente a cada push na branch `main`.

Passos:

1. Crie um repositório no GitHub chamado **nutrihumor** e suba todo o
   conteúdo deste projeto para ele (branch `main`).
2. No repositório, vá em **Settings → Pages** e, em "Build and deployment",
   defina a origem (Source) como **GitHub Actions**.
3. Faça um push (ou rode o workflow manualmente em **Actions → Deploy
   NutriHumor no GitHub Pages → Run workflow**).
4. Após o workflow terminar, o app estará disponível em:
   `https://SEU-USUARIO.github.io/nutrihumor/`

O `vite.config.ts` já está configurado com `base: '/nutrihumor/'`, que é o
subcaminho que o GitHub Pages usa para repositórios não-raiz. Se você criar
o repositório com outro nome, ajuste esse valor para `/nome-do-repo/`.

## Como executar localmente

Requer Node.js 18+.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (geralmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam em `dist/`. Por usarem caminhos relativos, podem ser
hospedados em qualquer servidor estático (Netlify, Vercel, GitHub Pages, ou
até abertos localmente a partir de `dist/index.html` após o build).

## Stack técnica

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Recharts (gráficos)
- lucide-react (ícones)

Não há login, banco de dados externo ou backend: todo o estado vive em
memória durante a sessão, inicializado com 30 dias de dados simulados
(ver `src/data/simulatedData.ts`).

## Estrutura

```
src/
  types/                 Contratos de dados (FoodItem, MealEntry, WHO5Answers...)
  data/
    foodCatalog.ts        Catálogo fictício de alimentos (NOVA 1-4, Nutri-Score A-E)
    simulatedData.ts       Gerador de 30 dias de refeições + bem-estar
    NutriHumorContext.tsx  Estado global em memória (React Context)
  utils/
    foodIndicators.ts      Complexidade de formulação + mensagem educativa
    who5.ts                 Cálculo do índice WHO-5 (bruto e padronizado)
    dashboardAnalytics.ts    Agregações para os gráficos e "Padrões Observados"
  components/
    layout/                Casco da aplicação e navegação
    home/, meal/, wellbeing/, dashboard/, education/   Telas do app
    ui/                     Componentes visuais reutilizáveis (NovaTrack, Card...)
```
