// ============================================================================
// NovaTrack — elemento de assinatura visual do NutriHumor
// ----------------------------------------------------------------------------
// Substitui o badge genérico de classificação por uma trilha horizontal de
// 4 segmentos (um por grupo NOVA), com o segmento correspondente ao
// alimento atual destacado. A mesma trilha aparece em toda a aplicação
// onde um alimento é classificado, dando identidade visual única ao
// sistema NOVA em vez de um selo colorido isolado.
// ============================================================================

import type { NovaGroup } from '../../types';

const SEGMENT_COLORS: Record<NovaGroup, string> = {
  1: 'var(--color-leaf)',
  2: 'var(--color-leaf-light)',
  3: 'var(--color-warning)',
  4: 'var(--color-terracotta)',
};

interface NovaTrackProps {
  grupo: NovaGroup;
  size?: 'sm' | 'md' | 'lg';
}

export function NovaTrack({ grupo, size = 'md' }: NovaTrackProps) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };
  const gaps = { sm: 'gap-0.5', md: 'gap-1', lg: 'gap-1.5' };

  return (
    <div className="flex flex-col gap-1.5" role="img" aria-label={`Classificação NOVA ${grupo} de 4`}>
      <div className={`flex ${gaps[size]} w-full`}>
        {([1, 2, 3, 4] as NovaGroup[]).map((g) => (
          <div
            key={g}
            className={`flex-1 rounded-full ${heights[size]} transition-all`}
            style={{
              backgroundColor: g <= grupo ? SEGMENT_COLORS[grupo] : 'var(--color-sand)',
              opacity: g === grupo ? 1 : g < grupo ? 0.55 : 1,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between font-mono text-[10px] tracking-wide text-[var(--color-olive)]">
        <span>NOVA 1</span>
        <span>NOVA 4</span>
      </div>
    </div>
  );
}
