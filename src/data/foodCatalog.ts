// ============================================================================
// NutriHumor — Catálogo de alimentos simulados
// ----------------------------------------------------------------------------
// Base local fictícia, construída para fins de demonstração acadêmica.
// Cobre deliberadamente os 4 grupos NOVA e as 5 faixas de Nutri-Score,
// para que os gráficos do painel tenham variação representativa.
// No protótipo, substitui uma futura integração com a API Open Food Facts.
// ============================================================================

import type { FoodItem } from '../types';

export const FOOD_CATALOG: FoodItem[] = [
  // ---------- NOVA 1 — in natura / minimamente processados ----------
  {
    id: 'f01',
    nome: 'Banana',
    grupoNova: 1,
    nutriScore: 'A',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'elevado' },
  },
  {
    id: 'f02',
    nome: 'Arroz branco cozido',
    grupoNova: 1,
    nutriScore: 'A',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'moderado' },
  },
  {
    id: 'f03',
    nome: 'Feijão carioca cozido',
    grupoNova: 1,
    nutriScore: 'A',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'elevado' },
  },
  {
    id: 'f04',
    nome: 'Peito de frango grelhado',
    grupoNova: 1,
    nutriScore: 'A',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f05',
    nome: 'Alface e tomate (salada)',
    grupoNova: 1,
    nutriScore: 'A',
    numeroIngredientes: 2,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'moderado' },
  },
  {
    id: 'f06',
    nome: 'Mamão papaia',
    grupoNova: 1,
    nutriScore: 'A',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'moderado', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'moderado' },
  },
  {
    id: 'f07',
    nome: 'Ovo cozido',
    grupoNova: 1,
    nutriScore: 'B',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'moderado', fibraAlimentar: 'baixo' },
  },

  // ---------- NOVA 2 — ingredientes culinários processados ----------
  {
    id: 'f08',
    nome: 'Azeite de oliva extravirgem',
    grupoNova: 2,
    nutriScore: 'C',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'baixo', gorduraSaturada: 'moderado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f09',
    nome: 'Açúcar refinado',
    grupoNova: 2,
    nutriScore: 'E',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'elevado', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f10',
    nome: 'Sal de cozinha',
    grupoNova: 2,
    nutriScore: 'E',
    numeroIngredientes: 1,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'elevado', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },

  // ---------- NOVA 3 — alimentos processados ----------
  {
    id: 'f11',
    nome: 'Pão francês',
    grupoNova: 3,
    nutriScore: 'B',
    numeroIngredientes: 4,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'moderado', gorduraSaturada: 'baixo', fibraAlimentar: 'moderado' },
  },
  {
    id: 'f12',
    nome: 'Queijo minas frescal',
    grupoNova: 3,
    nutriScore: 'C',
    numeroIngredientes: 3,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'moderado', gorduraSaturada: 'moderado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f13',
    nome: 'Sardinha em lata (água e sal)',
    grupoNova: 3,
    nutriScore: 'B',
    numeroIngredientes: 3,
    possuiAditivos: false,
    perfilNutricional: { acucares: 'baixo', sodio: 'moderado', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f14',
    nome: 'Pão de forma integral',
    grupoNova: 3,
    nutriScore: 'B',
    numeroIngredientes: 6,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'baixo', sodio: 'moderado', gorduraSaturada: 'baixo', fibraAlimentar: 'elevado' },
  },

  // ---------- NOVA 4 — ultraprocessados ----------
  {
    id: 'f15',
    nome: 'Refrigerante de cola',
    grupoNova: 4,
    nutriScore: 'E',
    numeroIngredientes: 9,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'elevado', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f16',
    nome: 'Salgadinho de milho (snack industrializado)',
    grupoNova: 4,
    nutriScore: 'D',
    numeroIngredientes: 14,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'baixo', sodio: 'elevado', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f17',
    nome: 'Macarrão instantâneo (lámen)',
    grupoNova: 4,
    nutriScore: 'D',
    numeroIngredientes: 18,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'baixo', sodio: 'elevado', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f18',
    nome: 'Biscoito recheado',
    grupoNova: 4,
    nutriScore: 'E',
    numeroIngredientes: 16,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'elevado', sodio: 'moderado', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f19',
    nome: 'Nuggets de frango congelados',
    grupoNova: 4,
    nutriScore: 'D',
    numeroIngredientes: 13,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'baixo', sodio: 'elevado', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f20',
    nome: 'Achocolatado em pó',
    grupoNova: 4,
    nutriScore: 'D',
    numeroIngredientes: 11,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'elevado', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f21',
    nome: 'Salsicha tipo hot dog',
    grupoNova: 4,
    nutriScore: 'E',
    numeroIngredientes: 15,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'baixo', sodio: 'elevado', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f22',
    nome: 'Suco em pó sabor laranja',
    grupoNova: 4,
    nutriScore: 'E',
    numeroIngredientes: 10,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'elevado', sodio: 'baixo', gorduraSaturada: 'baixo', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f23',
    nome: 'Pizza congelada',
    grupoNova: 4,
    nutriScore: 'D',
    numeroIngredientes: 17,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'moderado', sodio: 'elevado', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
  {
    id: 'f24',
    nome: 'Sorvete industrializado',
    grupoNova: 4,
    nutriScore: 'D',
    numeroIngredientes: 12,
    possuiAditivos: true,
    perfilNutricional: { acucares: 'elevado', sodio: 'baixo', gorduraSaturada: 'elevado', fibraAlimentar: 'baixo' },
  },
];

/** Busca um alimento do catálogo por nome (busca simples, case-insensitive). */
export function buscarAlimentos(termo: string): FoodItem[] {
  const t = termo.trim().toLowerCase();
  if (!t) return FOOD_CATALOG;
  return FOOD_CATALOG.filter((f) => f.nome.toLowerCase().includes(t));
}
