// ============================================================================
// HomeScreen — tela inicial
// ============================================================================

import { UtensilsCrossed, Heart, LayoutDashboard, BookOpen, ArrowRight } from 'lucide-react';
import type { Screen } from '../layout/AppLayout';
import { EthicsNotice } from '../ui/Primitives';
import { NovaTrack } from '../ui/NovaTrack';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ACTIONS: {
  id: Screen;
  titulo: string;
  descricao: string;
  icon: typeof UtensilsCrossed;
  destaque?: boolean;
}[] = [
  {
    id: 'meal',
    titulo: 'Registrar refeição',
    descricao: 'Anote o que você comeu e veja a classificação NOVA, Nutri-Score e perfil nutricional.',
    icon: UtensilsCrossed,
    destaque: true,
  },
  {
    id: 'wellbeing',
    titulo: 'Registrar bem-estar',
    descricao: 'Responda o índice WHO-5 e acompanhe seu escore de bem-estar subjetivo.',
    icon: Heart,
  },
  {
    id: 'dashboard',
    titulo: 'Meu painel',
    descricao: 'Veja gráficos e padrões da sua alimentação e bem-estar ao longo do tempo.',
    icon: LayoutDashboard,
  },
  {
    id: 'education',
    titulo: 'Educação alimentar',
    descricao: 'Entenda NOVA, Nutri-Score e como esses conceitos se relacionam com o bem-estar.',
    icon: BookOpen,
  },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="space-y-8">
      <section className="pt-4 sm:pt-8 pb-2">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-terracotta)] mb-3">
            Protótipo acadêmico · TCC em Nutrição
          </p>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight text-[var(--color-ink)] leading-[1.05]">
            NutriHumor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-olive)] leading-relaxed max-w-xl">
            Compreenda melhor sua alimentação e acompanhe seu bem-estar ao longo do tempo.
          </p>
        </div>
      </section>

      <section
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        aria-label="Ações principais"
      >
        {ACTIONS.map((acao) => {
          const Icon = acao.icon;
          return (
            <button
              key={acao.id}
              onClick={() => onNavigate(acao.id)}
              className={`text-left rounded-2xl p-5 sm:p-6 border transition-all hover:-translate-y-0.5 hover:shadow-md group ${
                acao.destaque
                  ? 'bg-[var(--color-leaf)] border-[var(--color-leaf)] text-white'
                  : 'bg-white border-[var(--color-sand)] text-[var(--color-ink)]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    acao.destaque ? 'bg-white/15' : 'bg-[var(--color-sand)]/60'
                  }`}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <ArrowRight
                  size={18}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <h3 className="font-display font-semibold text-lg mt-4">{acao.titulo}</h3>
              <p
                className={`text-sm mt-1.5 leading-relaxed ${
                  acao.destaque ? 'text-white/85' : 'text-[var(--color-olive)]'
                }`}
              >
                {acao.descricao}
              </p>
            </button>
          );
        })}
      </section>

      <section className="grid sm:grid-cols-[1.2fr_1fr] gap-4">
        <div className="rounded-2xl bg-white border border-[var(--color-sand)] p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-olive)] mb-3">
            Sobre a classificação NOVA
          </p>
          <p className="text-sm text-[var(--color-ink)] leading-relaxed mb-4">
            O NutriHumor usa a classificação NOVA para indicar o grau de processamento dos
            alimentos — de in natura (NOVA 1) a ultraprocessados (NOVA 4).
          </p>
          <NovaTrack grupo={4} size="md" />
        </div>
        <div className="rounded-2xl bg-[var(--color-sand)]/50 border border-[var(--color-sand)] p-5 sm:p-6 flex flex-col justify-center">
          <p className="text-sm text-[var(--color-ink)] leading-relaxed">
            Este protótipo já está populado com <strong>30 dias de dados simulados</strong> para
            demonstração — explore o painel para ver os gráficos em ação.
          </p>
        </div>
      </section>

      <div className="md:hidden">
        <EthicsNotice />
      </div>
    </div>
  );
}
