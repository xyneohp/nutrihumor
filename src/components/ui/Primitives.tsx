// ============================================================================
// Componentes de UI base reutilizáveis
// ============================================================================

import type { ReactNode } from 'react';
import type { NutriScore, NutrientLevel } from '../../types';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white border border-[var(--color-sand)] shadow-[0_1px_2px_rgba(31,42,28,0.04)] p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-olive)] mb-2">
      {children}
    </p>
  );
}

const NUTRISCORE_COLORS: Record<NutriScore, string> = {
  A: '#3d6b4f',
  B: '#6f9a5b',
  C: '#c08a3e',
  D: '#cd6b3e',
  E: '#c1573f',
};

export function NutriScoreBadge({ score, size = 'md' }: { score: NutriScore; size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-7 h-7 text-sm', md: 'w-9 h-9 text-base', lg: 'w-12 h-12 text-xl' };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-display font-semibold text-white ${dims[size]}`}
      style={{ backgroundColor: NUTRISCORE_COLORS[score] }}
      aria-label={`Nutri-Score ${score}`}
    >
      {score}
    </span>
  );
}

const NUTRIENT_LABELS: Record<string, string> = {
  acucares: 'Açúcares',
  sodio: 'Sódio',
  gorduraSaturada: 'Gordura saturada',
  fibraAlimentar: 'Fibra alimentar',
};

const LEVEL_COLOR: Record<NutrientLevel, string> = {
  baixo: 'var(--color-success)',
  moderado: 'var(--color-warning)',
  elevado: 'var(--color-alert)',
};

const LEVEL_WIDTH: Record<NutrientLevel, string> = {
  baixo: '33%',
  moderado: '66%',
  elevado: '100%',
};

export function NutrientLevelBar({ chave, nivel }: { chave: string; nivel: NutrientLevel }) {
  // Fibra é o único nutriente "positivo": inverte a leitura semântica da cor.
  const ehFibra = chave === 'fibraAlimentar';
  const cor = ehFibra
    ? nivel === 'elevado'
      ? 'var(--color-success)'
      : nivel === 'moderado'
      ? 'var(--color-warning)'
      : 'var(--color-alert)'
    : LEVEL_COLOR[nivel];

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm text-[var(--color-ink)]">{NUTRIENT_LABELS[chave] ?? chave}</span>
        <span className="text-xs font-medium capitalize" style={{ color: cor }}>
          {nivel}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--color-sand)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: LEVEL_WIDTH[nivel], backgroundColor: cor }}
        />
      </div>
    </div>
  );
}

export function EthicsNotice() {
  return (
    <div className="rounded-xl bg-[var(--color-sand)]/60 border border-[var(--color-sand)] px-4 py-3">
      <p className="text-xs leading-relaxed text-[var(--color-olive)]">
        Este aplicativo possui finalidade exclusivamente educativa. Não realiza diagnóstico de
        ansiedade, depressão ou qualquer condição de saúde mental. Não substitui acompanhamento
        profissional.
      </p>
    </div>
  );
}
