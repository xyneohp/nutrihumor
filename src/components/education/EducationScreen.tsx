// ============================================================================
// EducationScreen — "Educação Alimentar"
// ============================================================================

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/Primitives';
import { NovaTrack } from '../ui/NovaTrack';
import { NOVA_DESCRIPTIONS } from '../../utils/foodIndicators';
import { WHO5_ITEMS } from '../../utils/who5';
import type { NovaGroup } from '../../types';

interface EduCard {
  id: string;
  pergunta: string;
  conteudo: React.ReactNode;
}

const CARDS: EduCard[] = [
  {
    id: 'nova',
    pergunta: 'O que é a classificação NOVA?',
    conteudo: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-olive)] leading-relaxed">
          A classificação NOVA agrupa alimentos pelo grau e propósito do processamento
          industrial ao qual são submetidos, e não apenas pelos nutrientes que contêm.
        </p>
        {([1, 2, 3, 4] as NovaGroup[]).map((g) => (
          <div key={g} className="rounded-xl bg-[var(--color-cream)] p-3.5">
            <div className="w-24 mb-2">
              <NovaTrack grupo={g} size="sm" />
            </div>
            <p className="text-sm font-medium text-[var(--color-ink)]">
              NOVA {g} — {NOVA_DESCRIPTIONS[g].titulo}
            </p>
            <p className="text-sm text-[var(--color-olive)] mt-1 leading-relaxed">
              {NOVA_DESCRIPTIONS[g].resumo}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'nutriscore',
    pergunta: 'O que é Nutri-Score?',
    conteudo: (
      <p className="text-sm text-[var(--color-olive)] leading-relaxed">
        O Nutri-Score é um sistema de rotulagem nutricional frontal que resume, em uma escala
        de A (mais favorável) a E (menos favorável), o perfil nutricional de um produto,
        considerando nutrientes como açúcares, sódio, gorduras saturadas e fibras. Ele compara
        produtos dentro de uma mesma categoria, ajudando na escolha entre opções similares.
      </p>
    ),
  },
  {
    id: 'ultraprocessados',
    pergunta: 'Por que observar alimentos ultraprocessados?',
    conteudo: (
      <p className="text-sm text-[var(--color-olive)] leading-relaxed">
        O Guia Alimentar para a População Brasileira recomenda que a base da alimentação seja
        composta por alimentos in natura ou minimamente processados, com uso moderado de
        ingredientes culinários, e que alimentos ultraprocessados sejam evitados. Isso ocorre
        porque, em geral, esses produtos tendem a ter perfil nutricional menos favorável e
        formulações industriais complexas, além de poderem substituir refeições baseadas em
        alimentos frescos.
      </p>
    ),
  },
  {
    id: 'who5',
    pergunta: 'O que é bem-estar subjetivo?',
    conteudo: (
      <div className="space-y-3">
        <p className="text-sm text-[var(--color-olive)] leading-relaxed">
          Bem-estar subjetivo é a forma como uma pessoa avalia a própria vida e estado emocional
          recente. O NutriHumor usa o WHO-5, um questionário curto e validado, que pergunta
          sobre cinco sensações nas últimas duas semanas:
        </p>
        <ul className="space-y-1.5">
          {WHO5_ITEMS.map((item) => (
            <li key={item.chave} className="text-sm text-[var(--color-ink)] flex gap-2">
              <span className="text-[var(--color-leaf)]">•</span> {item.texto}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--color-olive)] leading-relaxed">
          As respostas geram um escore de 0 a 100. É um indicador educativo, não um diagnóstico.
        </p>
      </div>
    ),
  },
  {
    id: 'melhorar',
    pergunta: 'Como melhorar a qualidade da alimentação?',
    conteudo: (
      <ul className="space-y-2">
        {[
          'Priorize alimentos in natura ou minimamente processados como base das refeições.',
          'Use óleos, sal e açúcar com moderação, apenas para temperar e cozinhar.',
          'Limite o consumo de alimentos ultraprocessados, observando rótulos e listas de ingredientes.',
          'Faça refeições em horários regulares, com atenção e sem pressa.',
          'Combine boas escolhas alimentares com sono, atividade física e momentos de descanso.',
        ].map((dica, i) => (
          <li key={i} className="text-sm text-[var(--color-ink)] flex gap-2.5">
            <span className="text-[var(--color-leaf)] font-medium shrink-0">{i + 1}.</span>
            <span className="leading-relaxed">{dica}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export function EducationScreen() {
  const [aberto, setAberto] = useState<string | null>('nova');

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-semibold text-3xl text-[var(--color-ink)]">Educação alimentar</h1>
        <p className="text-[var(--color-olive)] mt-1.5 text-sm">
          Conceitos por trás dos indicadores que o NutriHumor utiliza.
        </p>
      </div>

      <div className="space-y-3">
        {CARDS.map((card) => {
          const expandido = aberto === card.id;
          return (
            <Card key={card.id} className="!p-0 overflow-hidden">
              <button
                onClick={() => setAberto(expandido ? null : card.id)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                aria-expanded={expandido}
              >
                <span className="font-display font-medium text-base text-[var(--color-ink)]">
                  {card.pergunta}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[var(--color-olive)] shrink-0 transition-transform ${expandido ? 'rotate-180' : ''}`}
                />
              </button>
              {expandido && <div className="px-5 pb-5">{card.conteudo}</div>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
