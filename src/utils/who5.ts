// ============================================================================
// NutriHumor — Indicador WHO-5 de Bem-Estar
// ----------------------------------------------------------------------------
// Implementação fiel ao WHO-5 Well-Being Index (Organização Mundial da
// Saúde / Centro Colaborador OMS em Saúde Mental, Psychiatric Research
// Unit, Hospital Psiquiátrico de Frederiksborg).
//
// Cálculo oficial:
//   escoreBruto = soma das 5 respostas (cada 0-5)        → intervalo 0-25
//   escorePadronizado = escoreBruto * 4                   → intervalo 0-100
// ============================================================================

import type { WHO5Answers, WellbeingEntry } from '../types';

/** As cinco afirmações oficiais do WHO-5, na ordem do instrumento original. */
export const WHO5_ITEMS: { chave: keyof WHO5Answers; texto: string }[] = [
  { chave: 'alegre', texto: 'Alegre e de bom humor.' },
  { chave: 'calmo', texto: 'Calmo e relaxado.' },
  { chave: 'ativo', texto: 'Ativo e cheio de energia.' },
  { chave: 'descansado', texto: 'Acordando descansado.' },
  { chave: 'interessado', texto: 'Interessado pelas atividades do dia a dia.' },
];

/** Escala de resposta oficial do WHO-5. */
export const WHO5_SCALE = [
  { valor: 0, texto: 'Nunca' },
  { valor: 1, texto: 'Raramente' },
  { valor: 2, texto: 'Menos da metade do tempo' },
  { valor: 3, texto: 'Mais da metade do tempo' },
  { valor: 4, texto: 'A maior parte do tempo' },
  { valor: 5, texto: 'O tempo todo' },
];

/** Soma as cinco respostas, resultando em um valor de 0 a 25. */
export function calcularEscoreBruto(respostas: WHO5Answers): number {
  return (
    respostas.alegre +
    respostas.calmo +
    respostas.ativo +
    respostas.descansado +
    respostas.interessado
  );
}

/** Converte o escore bruto (0-25) para a escala padronizada (0-100). */
export function calcularEscorePadronizado(escoreBruto: number): number {
  return escoreBruto * 4;
}

/** Classificação textual de apoio para o escore padronizado (uso educativo). */
export function interpretarEscorePadronizado(escorePadronizado: number): {
  rotulo: string;
  descricao: string;
} {
  if (escorePadronizado >= 70) {
    return {
      rotulo: 'Bem-estar elevado',
      descricao: 'Escore consistente com bom nível de bem-estar subjetivo nas últimas duas semanas.',
    };
  }
  if (escorePadronizado >= 50) {
    return {
      rotulo: 'Bem-estar moderado',
      descricao: 'Escore dentro de uma faixa intermediária de bem-estar subjetivo.',
    };
  }
  return {
    rotulo: 'Atenção ao bem-estar',
    descricao:
      'Escore mais baixo nas últimas duas semanas. Este indicador é educativo e não substitui avaliação profissional.',
  };
}

/** Cria um WellbeingEntry completo a partir das respostas brutas. */
export function criarRegistroBemEstar(
  data: string,
  respostas: WHO5Answers,
  id?: string
): WellbeingEntry {
  const escoreBruto = calcularEscoreBruto(respostas);
  const escorePadronizado = calcularEscorePadronizado(escoreBruto);
  return {
    id: id ?? `we-${data}-${Math.random().toString(36).slice(2, 8)}`,
    data,
    respostas,
    escoreBruto,
    escorePadronizado,
  };
}
