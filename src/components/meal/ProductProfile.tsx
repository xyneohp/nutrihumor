// ============================================================================
// ProductProfile — "Perfil do Produto"
// ----------------------------------------------------------------------------
// Exibido após a seleção de um alimento na tela de Registrar Refeição.
// Reúne os 4 indicadores solicitados (NOVA, Nutri-Score, perfil
// nutricional, complexidade da formulação) e a mensagem educativa.
// ============================================================================

import type { FoodItem } from '../../types';
import { NovaTrack } from '../ui/NovaTrack';
import { Card, NutriScoreBadge, NutrientLevelBar, SectionLabel } from '../ui/Primitives';
import { NOVA_DESCRIPTIONS, NUTRISCORE_DESCRIPTIONS, analisarAlimento } from '../../utils/foodIndicators';
import { Info } from 'lucide-react';

export function ProductProfile({ alimento }: { alimento: FoodItem }) {
  const analise = analisarAlimento(alimento);

  return (
    <Card className="space-y-6">
      <div>
        <SectionLabel>Perfil do produto</SectionLabel>
        <h3 className="font-display font-semibold text-xl text-[var(--color-ink)]">{alimento.nome}</h3>
      </div>

      {/* 1. Classificação NOVA */}
      <div className="grid sm:grid-cols-[1fr_1.4fr] gap-4 items-start pt-2 border-t border-[var(--color-sand)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)] mb-2">
            Classificação NOVA
          </p>
          <NovaTrack grupo={alimento.grupoNova} size="md" />
        </div>
        <div className="bg-[var(--color-sand)]/40 rounded-xl p-3.5">
          <p className="text-sm font-medium text-[var(--color-ink)]">
            NOVA {alimento.grupoNova} — {NOVA_DESCRIPTIONS[alimento.grupoNova].titulo}
          </p>
          <p className="text-sm text-[var(--color-olive)] mt-1 leading-relaxed">
            {NOVA_DESCRIPTIONS[alimento.grupoNova].resumo}
          </p>
        </div>
      </div>

      {/* 2. Nutri-Score */}
      <div className="grid sm:grid-cols-[1fr_1.4fr] gap-4 items-start pt-5 border-t border-[var(--color-sand)]">
        <div className="flex items-center gap-3">
          <NutriScoreBadge score={alimento.nutriScore} size="lg" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)]">
              Nutri-Score
            </p>
            <p className="text-sm text-[var(--color-olive)]">Faixa {alimento.nutriScore}</p>
          </div>
        </div>
        <div className="bg-[var(--color-sand)]/40 rounded-xl p-3.5">
          <p className="text-sm text-[var(--color-ink)] leading-relaxed">
            {NUTRISCORE_DESCRIPTIONS[alimento.nutriScore]}
          </p>
        </div>
      </div>

      {/* 3. Perfil nutricional */}
      <div className="pt-5 border-t border-[var(--color-sand)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)] mb-4">
          Perfil nutricional
        </p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          <NutrientLevelBar chave="acucares" nivel={alimento.perfilNutricional.acucares} />
          <NutrientLevelBar chave="sodio" nivel={alimento.perfilNutricional.sodio} />
          <NutrientLevelBar chave="gorduraSaturada" nivel={alimento.perfilNutricional.gorduraSaturada} />
          <NutrientLevelBar chave="fibraAlimentar" nivel={alimento.perfilNutricional.fibraAlimentar} />
        </div>
      </div>

      {/* 4. Complexidade da formulação */}
      <div className="pt-5 border-t border-[var(--color-sand)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)] mb-3">
          Complexidade da formulação
        </p>
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold text-lg text-[var(--color-ink)]">
            {analise.complexidade}
          </span>
          <span className="text-xs text-[var(--color-olive)] font-mono">
            {alimento.numeroIngredientes} ingrediente{alimento.numeroIngredientes > 1 ? 's' : ''} ·{' '}
            {alimento.possuiAditivos ? 'com aditivos' : 'sem aditivos'}
          </span>
        </div>
      </div>

      {/* Mensagem educativa */}
      <div className="pt-5 border-t border-[var(--color-sand)]">
        <div className="flex gap-3 bg-[var(--color-leaf)]/8 rounded-xl p-4" style={{ backgroundColor: 'rgba(61,107,79,0.07)' }}>
          <Info size={18} className="text-[var(--color-leaf)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-ink)] leading-relaxed">{analise.mensagemEducativa}</p>
        </div>
      </div>
    </Card>
  );
}
