// ============================================================================
// NutriHumor — Contexto global de dados (em memória)
// ----------------------------------------------------------------------------
// Como o protótipo não utiliza login nem banco de dados externo, todo o
// estado da aplicação vive em memória, inicializado com 30 dias de dados
// simulados. Novos registros feitos pelo usuário durante a sessão são
// adicionados a este mesmo estado e refletidos imediatamente no painel.
// ============================================================================

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MealEntry, WellbeingEntry } from '../types';
import { gerarDadosSimulados } from '../data/simulatedData';

interface NutriHumorContextValue {
  refeicoes: MealEntry[];
  bemEstar: WellbeingEntry[];
  adicionarRefeicao: (refeicao: MealEntry) => void;
  adicionarBemEstar: (registro: WellbeingEntry) => void;
}

const NutriHumorContext = createContext<NutriHumorContextValue | null>(null);

export function NutriHumorProvider({ children }: { children: ReactNode }) {
  const dadosIniciais = useMemo(() => gerarDadosSimulados(30), []);
  const [refeicoes, setRefeicoes] = useState<MealEntry[]>(dadosIniciais.refeicoes);
  const [bemEstar, setBemEstar] = useState<WellbeingEntry[]>(dadosIniciais.bemEstar);

  function adicionarRefeicao(refeicao: MealEntry) {
    setRefeicoes((prev) => [...prev, refeicao]);
  }

  function adicionarBemEstar(registro: WellbeingEntry) {
    setBemEstar((prev) => {
      // Substitui registro existente do mesmo dia, caso o usuário refaça o teste.
      const semDuplicata = prev.filter((r) => r.data !== registro.data);
      return [...semDuplicata, registro];
    });
  }

  const value: NutriHumorContextValue = {
    refeicoes,
    bemEstar,
    adicionarRefeicao,
    adicionarBemEstar,
  };

  return <NutriHumorContext.Provider value={value}>{children}</NutriHumorContext.Provider>;
}

export function useNutriHumor() {
  const ctx = useContext(NutriHumorContext);
  if (!ctx) throw new Error('useNutriHumor deve ser usado dentro de NutriHumorProvider');
  return ctx;
}
