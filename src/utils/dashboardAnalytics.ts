// ============================================================================
// NutriHumor — Agregações para o Painel
// ----------------------------------------------------------------------------
// Funções que transformam as listas brutas de refeições e bem-estar em
// estruturas prontas para os gráficos (recharts) e para os textos
// descritivos da seção "Padrões Observados".
// ============================================================================

import type { MealEntry, NovaGroup, NutriScore, WellbeingEntry } from '../types';
import { calcularComplexidadeFormulacao } from './foodIndicators';

const COMPLEXITY_ORDER = ['Baixa', 'Moderada', 'Alta', 'Muito Alta'] as const;
const COMPLEXITY_SCORE: Record<string, number> = { Baixa: 1, Moderada: 2, Alta: 3, 'Muito Alta': 4 };
const NUTRISCORE_VALUE: Record<NutriScore, number> = { A: 5, B: 4, C: 3, D: 2, E: 1 };

export function contarRefeicoesPorDia(refeicoes: MealEntry[]) {
  return refeicoes.length;
}

export function percentualNova4(refeicoes: MealEntry[]): number {
  if (refeicoes.length === 0) return 0;
  const nova4 = refeicoes.filter((r) => r.alimento.grupoNova === 4).length;
  return Math.round((nova4 / refeicoes.length) * 100);
}

export function distribuicaoNova(refeicoes: MealEntry[]) {
  const contagem: Record<NovaGroup, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  refeicoes.forEach((r) => {
    contagem[r.alimento.grupoNova]++;
  });
  return ([1, 2, 3, 4] as NovaGroup[]).map((grupo) => ({
    grupo: `NOVA ${grupo}`,
    quantidade: contagem[grupo],
  }));
}

export function distribuicaoNutriScore(refeicoes: MealEntry[]) {
  const contagem: Record<NutriScore, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  refeicoes.forEach((r) => {
    contagem[r.alimento.nutriScore]++;
  });
  return (['A', 'B', 'C', 'D', 'E'] as NutriScore[]).map((score) => ({
    score,
    quantidade: contagem[score],
  }));
}

export function mediaNutriScore(refeicoes: MealEntry[]): { letra: NutriScore; valor: number } | null {
  if (refeicoes.length === 0) return null;
  const soma = refeicoes.reduce((acc, r) => acc + NUTRISCORE_VALUE[r.alimento.nutriScore], 0);
  const media = soma / refeicoes.length;
  // converte média numérica (1-5) de volta para a letra mais próxima
  const letras: NutriScore[] = ['E', 'D', 'C', 'B', 'A'];
  const indice = Math.max(0, Math.min(4, Math.round(media) - 1));
  return { letra: letras[indice], valor: Math.round(media * 10) / 10 };
}

export function complexidadeMediaFormulacao(refeicoes: MealEntry[]) {
  const contagem: Record<string, number> = { Baixa: 0, Moderada: 0, Alta: 0, 'Muito Alta': 0 };
  refeicoes.forEach((r) => {
    const c = calcularComplexidadeFormulacao(r.alimento);
    contagem[c]++;
  });
  return COMPLEXITY_ORDER.map((nivel) => ({ nivel, quantidade: contagem[nivel] }));
}

export function complexidadeMediaRotulo(refeicoes: MealEntry[]): string {
  if (refeicoes.length === 0) return '—';
  const soma = refeicoes.reduce(
    (acc, r) => acc + COMPLEXITY_SCORE[calcularComplexidadeFormulacao(r.alimento)],
    0
  );
  const media = soma / refeicoes.length;
  if (media < 1.5) return 'Baixa';
  if (media < 2.5) return 'Moderada';
  if (media < 3.5) return 'Alta';
  return 'Muito Alta';
}

/** Série temporal do WHO-5 padronizado, ordenada por data (formato curto p/ eixo X). */
export function evolucaoWHO5(bemEstar: WellbeingEntry[]) {
  return [...bemEstar]
    .sort((a, b) => a.data.localeCompare(b.data))
    .map((b) => ({
      data: b.data.slice(5).replace('-', '/'), // MM/DD
      escore: b.escorePadronizado,
    }));
}

export function mediaSemanalWHO5(bemEstar: WellbeingEntry[]): number | null {
  if (bemEstar.length === 0) return null;
  const ultimos7 = [...bemEstar].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 7);
  const soma = ultimos7.reduce((acc, b) => acc + b.escorePadronizado, 0);
  return Math.round(soma / ultimos7.length);
}

export function who5Atual(bemEstar: WellbeingEntry[]): WellbeingEntry | null {
  if (bemEstar.length === 0) return null;
  return [...bemEstar].sort((a, b) => b.data.localeCompare(a.data))[0];
}

/**
 * Agrupa refeições e bem-estar por semana (blocos de 7 dias a partir do
 * início da série) e calcula, para cada semana: % de itens NOVA 4 e a
 * média do escore WHO-5 padronizado. Usado para gerar os textos
 * descritivos de "Padrões Observados".
 */
export function agruparPorSemana(refeicoes: MealEntry[], bemEstar: WellbeingEntry[]) {
  const todasDatas = [...new Set([...refeicoes.map((r) => r.data), ...bemEstar.map((b) => b.data)])].sort();
  if (todasDatas.length === 0) return [];

  const inicio = new Date(todasDatas[0]);
  const semanas: { label: string; pctNova4: number; mediaWHO5: number | null; pctScoreAB: number }[] = [];

  for (let semanaIdx = 0; semanaIdx * 7 < todasDatas.length; semanaIdx++) {
    const inicioSemana = new Date(inicio);
    inicioSemana.setDate(inicio.getDate() + semanaIdx * 7);
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);

    const inicioStr = inicioSemana.toISOString().slice(0, 10);
    const fimStr = fimSemana.toISOString().slice(0, 10);

    const refeicoesSemana = refeicoes.filter((r) => r.data >= inicioStr && r.data <= fimStr);
    const bemEstarSemana = bemEstar.filter((b) => b.data >= inicioStr && b.data <= fimStr);

    const pctNova4 =
      refeicoesSemana.length > 0
        ? (refeicoesSemana.filter((r) => r.alimento.grupoNova === 4).length / refeicoesSemana.length) * 100
        : 0;

    const pctScoreAB =
      refeicoesSemana.length > 0
        ? (refeicoesSemana.filter((r) => r.alimento.nutriScore === 'A' || r.alimento.nutriScore === 'B').length /
            refeicoesSemana.length) *
          100
        : 0;

    const mediaWHO5 =
      bemEstarSemana.length > 0
        ? bemEstarSemana.reduce((acc, b) => acc + b.escorePadronizado, 0) / bemEstarSemana.length
        : null;

    semanas.push({
      label: `Semana ${semanaIdx + 1}`,
      pctNova4: Math.round(pctNova4),
      mediaWHO5: mediaWHO5 !== null ? Math.round(mediaWHO5) : null,
      pctScoreAB: Math.round(pctScoreAB),
    });
  }

  return semanas;
}

/**
 * Gera os textos descritivos da seção "Padrões Observados" comparando a
 * semana com maior % de NOVA 4 e a semana com maior % de Nutri-Score A/B
 * com seus respectivos escores médios de WHO-5. Puramente descritivo —
 * nenhuma inferência causal é feita ou sugerida no texto gerado.
 */
export function gerarPadroesObservados(refeicoes: MealEntry[], bemEstar: WellbeingEntry[]): string[] {
  const semanas = agruparPorSemana(refeicoes, bemEstar).filter((s) => s.mediaWHO5 !== null);
  if (semanas.length < 2) {
    return ['Ainda não há dados suficientes ao longo de múltiplas semanas para gerar observações descritivas.'];
  }

  const observacoes: string[] = [];

  const semanaMaisUltra = [...semanas].sort((a, b) => b.pctNova4 - a.pctNova4)[0];
  const semanaMenosUltra = [...semanas].sort((a, b) => a.pctNova4 - b.pctNova4)[0];
  if (
    semanaMaisUltra.label !== semanaMenosUltra.label &&
    semanaMaisUltra.mediaWHO5 !== null &&
    semanaMenosUltra.mediaWHO5 !== null
  ) {
    observacoes.push(
      `Na ${semanaMaisUltra.label}, ${semanaMaisUltra.pctNova4}% dos alimentos registrados eram NOVA 4 e o escore médio de bem-estar foi ${semanaMaisUltra.mediaWHO5}. Na ${semanaMenosUltra.label}, com apenas ${semanaMenosUltra.pctNova4}% de NOVA 4, o escore médio foi ${semanaMenosUltra.mediaWHO5}.`
    );
  }

  const semanaMaisAB = [...semanas].sort((a, b) => b.pctScoreAB - a.pctScoreAB)[0];
  if (semanaMaisAB.mediaWHO5 !== null) {
    observacoes.push(
      `A semana com maior proporção de alimentos Nutri-Score A ou B (${semanaMaisAB.label}, ${semanaMaisAB.pctScoreAB}%) registrou escore médio de bem-estar de ${semanaMaisAB.mediaWHO5}.`
    );
  }

  return observacoes;
}
