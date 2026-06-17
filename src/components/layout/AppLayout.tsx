// ============================================================================
// AppLayout — casco visual compartilhado por todas as telas
// ----------------------------------------------------------------------------
// Header fixo com identidade do app + navegação que se adapta: barra
// horizontal no topo em telas largas, barra fixa inferior em mobile
// (padrão de apps de saúde/bem-estar para navegação com o polegar).
// ============================================================================

import type { ReactNode } from 'react';
import { Leaf, UtensilsCrossed, Heart, LayoutDashboard, BookOpen } from 'lucide-react';
import { EthicsNotice } from '../ui/Primitives';

export type Screen = 'home' | 'meal' | 'wellbeing' | 'dashboard' | 'education';

const NAV_ITEMS: { id: Screen; label: string; icon: typeof Leaf }[] = [
  { id: 'home', label: 'Início', icon: Leaf },
  { id: 'meal', label: 'Refeição', icon: UtensilsCrossed },
  { id: 'wellbeing', label: 'Bem-estar', icon: Heart },
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
  { id: 'education', label: 'Educação', icon: BookOpen },
];

interface AppLayoutProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  children: ReactNode;
}

export function AppLayout({ screen, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-cream)]">
      <header className="sticky top-0 z-20 bg-[var(--color-cream)]/95 backdrop-blur-sm border-b border-[var(--color-sand)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
            aria-label="Ir para a tela inicial"
          >
            <span className="w-8 h-8 rounded-full bg-[var(--color-leaf)] flex items-center justify-center">
              <Leaf size={16} className="text-white" strokeWidth={2.25} />
            </span>
            <span className="font-display font-semibold text-lg tracking-tight">NutriHumor</span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => {
              const ativo = screen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                    ativo
                      ? 'bg-[var(--color-leaf)] text-white'
                      : 'text-[var(--color-ink)] hover:bg-[var(--color-sand)]/70'
                  }`}
                  aria-current={ativo ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-10">
        {children}
      </main>

      <footer className="hidden md:block max-w-6xl w-full mx-auto px-6 pb-8">
        <EthicsNotice />
      </footer>

      {/* Navegação inferior — mobile */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-[var(--color-sand)] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        aria-label="Navegação principal"
      >
        <div className="flex justify-between">
          {NAV_ITEMS.map((item) => {
            const ativo = screen === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-lg flex-1"
                aria-current={ativo ? 'page' : undefined}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  color={ativo ? 'var(--color-leaf)' : 'var(--color-olive)'}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: ativo ? 'var(--color-leaf)' : 'var(--color-olive)' }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
