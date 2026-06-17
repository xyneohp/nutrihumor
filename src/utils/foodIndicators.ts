// ============================================================================
// NutriHumor — Indicadores alimentares
// ----------------------------------------------------------------------------
// Funções puras que derivam indicadores a partir de um FoodItem.
// Mantidas isoladas da UI para que a lógica científica possa ser revisada,
// testada e citada na monografia de forma independente da apresentação.
// ============================================================================

import type {
  FoodItem,
  FormulationComplexity,
  FoodAnalysis,
  NovaGroup,
  NutriScore,
} from '../types';

/** Texto de apoio para cada grupo NOVA (classificação de Monteiro et al., 2019). */
export const NOVA_DESCRIPTIONS: Record<NovaGroup, { titulo: string; resumo: string }> = {
  1: {
    titulo: 'Alimentos in natura ou minimamente processados',
    resumo:
      'Alimentos obtidos diretamente de plantas ou animais, sem alteração ou com processos mínimos (limpeza, moagem, secagem) que não adicionam substâncias.',
  },
  2: {
    titulo: 'Ingredientes culinários processados',
    resumo:
      'Substâncias extraídas de alimentos in natura ou da natureza, usadas para preparar e temperar refeições, como óleos, açúcar, sal e manteiga.',
  },
  3: {
    titulo: 'Alimentos processados',
    resumo:
      'Produtos fabricados com adição de sal, açúcar ou outros ingredientes de uso culinário a um alimento in natura, geralmente com poucos ingredientes.',
  },
  4: {
    titulo: 'Alimentos ultraprocessados',
    resumo:
      'Formulações industriais com muitos ingredientes, incluindo aditivos de uso exclusivamente industrial, com baixa presença de alimentos in natura.',
  },
};

/** Texto de apoio para cada faixa de Nutri-Score. */
export const NUTRISCORE_DESCRIPTIONS: Record<NutriScore, string> = {
  A: 'Perfil nutricional mais favorável dentro da categoria do produto.',
  B: 'Perfil nutricional favorável, com pequenas ressalvas nutricionais.',
  C: 'Perfil nutricional intermediário, equilíbrio entre pontos favoráveis e desfavoráveis.',
  D: 'Perfil nutricional menos favorável, recomenda-se atenção à frequência de consumo.',
  E: 'Perfil nutricional menos favorável dentro da categoria, indicado consumo pontual.',
};

/**
 * Calcula a complexidade da formulação a partir do número de ingredientes
 * e da presença de aditivos alimentares.
 *
 * Critério adotado (heurística pedagógica, não normativa):
 *  - Baixa:       ≤ 3 ingredientes e sem aditivos
 *  - Moderada:    4–7 ingredientes, sem aditivos OU ≤3 ingredientes com aditivos
 *  - Alta:        4–7 ingredientes com aditivos, ou 8–12 ingredientes sem aditivos
 *  - Muito Alta:  > 7 ingredientes com aditivos, ou > 12 ingredientes em qualquer caso
 */
export function calcularComplexidadeFormulacao(item: FoodItem): FormulationComplexity {
  const { numeroIngredientes: n, possuiAditivos: aditivos } = item;

  if (n > 12) return 'Muito Alta';
  if (n > 7) return aditivos ? 'Muito Alta' : 'Alta';
  if (n > 3) return aditivos ? 'Alta' : 'Moderada';
  return aditivos ? 'Moderada' : 'Baixa';
}

/**
 * Gera uma mensagem educativa contextual combinando NOVA, Nutri-Score,
 * perfil nutricional e complexidade da formulação.
 *
 * Diretriz de tom: informativa e baseada no Guia Alimentar para a
 * População Brasileira, evitando linguagem alarmista, prescritiva ou
 * de caráter diagnóstico.
 */
export function gerarMensagemEducativa(item: FoodItem): string {
  const complexidade = calcularComplexidadeFormulacao(item);
  const nutrientesElevados = Object.entries(item.perfilNutricional)
    .filter(([chave, nivel]) => chave !== 'fibraAlimentar' && nivel === 'elevado')
    .length;

  // Alimentos in natura / minimamente processados (NOVA 1) — reforço positivo.
  if (item.grupoNova === 1) {
    return 'Este é um alimento in natura ou minimamente processado. O Guia Alimentar para a População Brasileira recomenda que esses alimentos sejam a base da alimentação.';
  }

  // Ingrediente culinário (NOVA 2) — contexto de uso, não de consumo direto.
  if (item.grupoNova === 2) {
    return 'Este é um ingrediente culinário processado, utilizado em pequenas quantidades para preparar e temperar refeições com alimentos in natura.';
  }

  // NOVA 3 ou 4 com perfil nutricional desfavorável e formulação complexa.
  if (item.grupoNova === 4 && (complexidade === 'Alta' || complexidade === 'Muito Alta') && nutrientesElevados >= 2) {
    return `Este produto apresenta elevado grau de processamento, perfil nutricional pouco favorável (Nutri-Score ${item.nutriScore}) e ${complexidade.toLowerCase()} complexidade de formulação. O Guia Alimentar para a População Brasileira recomenda priorizar alimentos in natura ou minimamente processados.`;
  }

  if (item.grupoNova === 4) {
    return `Este é um alimento ultraprocessado (Nutri-Score ${item.nutriScore}). Observar a frequência de consumo desse tipo de produto pode ser um ponto de atenção dentro de um padrão alimentar saudável.`;
  }

  // NOVA 3 — processado, variação conforme perfil.
  if (nutrientesElevados >= 2) {
    return `Este alimento processado apresenta Nutri-Score ${item.nutriScore}, com alguns nutrientes em níveis elevados. Vale observar a frequência e as quantidades consumidas.`;
  }

  return `Este alimento processado apresenta Nutri-Score ${item.nutriScore} e perfil nutricional, em geral, equilibrado.`;
}

/** Monta a análise completa de um alimento para exibição na tela de registro. */
export function analisarAlimento(item: FoodItem): FoodAnalysis {
  return {
    alimento: item,
    complexidade: calcularComplexidadeFormulacao(item),
    mensagemEducativa: gerarMensagemEducativa(item),
  };
}

/** Cor semântica (token) associada a cada nível de nutriente. */
export function corNivelNutriente(nivel: 'baixo' | 'moderado' | 'elevado'): string {
  switch (nivel) {
    case 'baixo':
      return 'var(--color-success)';
    case 'moderado':
      return 'var(--color-warning)';
    case 'elevado':
      return 'var(--color-alert)';
  }
}
