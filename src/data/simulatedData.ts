// ============================================================================
// NutriHumor — Gerador de dados simulados (30 dias)
// ----------------------------------------------------------------------------
// Gera registros fictícios de refeições e de bem-estar para os últimos 30
// dias, permitindo demonstrar todos os gráficos e indicadores do painel
// sem necessidade de banco de dados externo ou login.
//
// Para tornar a seção "Padrões Observados" plausível, o gerador introduz uma
// correlação leve e determinística entre a proporção diária de itens NOVA 4
// e o escore WHO-5 do dia seguinte (mais ultraprocessados → leve tendência de
// queda no bem-estar). Trata-se de uma simulação didática, não de uma relação
// causal real — o aplicativo deixa essa ressalva explícita na interface.
// ============================================================================

import type { MealEntry, MealType, WellbeingEntry } from '../types';
import { FOOD_CATALOG } from './foodCatalog';
import { criarRegistroBemEstar } from '../utils/who5';

const MEAL_TYPES: MealType[] = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar', 'Ceia'];

const HORARIOS: Record<MealType, string[]> = {
  'Café da manhã': ['07:00', '07:30', '08:15'],
  Almoço: ['12:00', '12:30', '13:00'],
  Lanche: ['15:30', '16:00', '16:30'],
  Jantar: ['19:30', '20:00', '20:30'],
  Ceia: ['22:00', '22:30'],
};

/** PRNG simples e determinístico (mulberry32) para reprodutibilidade dos dados simulados. */
function criarGeradorSeed(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function escolher<T>(rng: () => number, lista: T[]): T {
  return lista[Math.floor(rng() * lista.length)];
}

function formatarData(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface DadosSimulados {
  refeicoes: MealEntry[];
  bemEstar: WellbeingEntry[];
}

/** Gera ~3-4 refeições por dia ao longo de N dias, com tendência diária de "qualidade". */
export function gerarDadosSimulados(dias = 30, seed = 42): DadosSimulados {
  const rng = criarGeradorSeed(seed);
  const refeicoes: MealEntry[] = [];
  const bemEstar: WellbeingEntry[] = [];

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Itens "saudáveis" (NOVA 1/2) e "ultraprocessados" (NOVA 4), para sortear
  // proporções diferentes por dia, simulando dias melhores e piores.
  const itensLeves = FOOD_CATALOG.filter((f) => f.grupoNova <= 2);
  const itensProcessados = FOOD_CATALOG.filter((f) => f.grupoNova === 3);
  const itensUltra = FOOD_CATALOG.filter((f) => f.grupoNova === 4);

  // Tendência semanal: alterna blocos de ~5 dias com mais/menos ultraprocessados,
  // para que o painel mostre variação clara entre semanas.
  for (let i = dias - 1; i >= 0; i--) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() - i);
    const dataStr = formatarData(data);

    const blocoSemanal = Math.floor((dias - 1 - i) / 6) % 2; // alterna 0/1 a cada ~6 dias
    const probUltra = blocoSemanal === 0 ? 0.18 : 0.42; // semanas "melhores" vs "piores"

    const refeicoesHoje = 3 + Math.floor(rng() * 2); // 3 ou 4 refeições/dia
    const tiposHoje = MEAL_TYPES.slice(0, refeicoesHoje);
    let ultraCount = 0;

    for (const tipo of tiposHoje) {
      const r = rng();
      let pool = itensLeves;
      if (r < probUltra) {
        pool = itensUltra;
        ultraCount++;
      } else if (r < probUltra + 0.3) {
        pool = itensProcessados;
      }
      const alimento = escolher(rng, pool);
      const horario = escolher(rng, HORARIOS[tipo]);

      refeicoes.push({
        id: `meal-${dataStr}-${tipo}`,
        data: dataStr,
        horario,
        tipoRefeicao: tipo,
        alimento,
      });
    }

    // Escore de bem-estar do dia, com leve influência da proporção de
    // ultraprocessados do próprio dia (mais ultra → tendência de escore menor),
    // somada a ruído aleatório para realismo. Resultado sempre dentro de 0-5.
    const proporcaoUltra = ultraCount / tiposHoje.length;
    const baseHumor = blocoSemanal === 0 ? 3.6 : 2.6; // semana "melhor" parte de base mais alta
    const penalidade = proporcaoUltra * 1.4;

    const gerarResposta = () => {
      const valor = baseHumor - penalidade + (rng() - 0.5) * 1.6;
      return Math.max(0, Math.min(5, Math.round(valor)));
    };

    const respostas = {
      alegre: gerarResposta(),
      calmo: gerarResposta(),
      ativo: gerarResposta(),
      descansado: gerarResposta(),
      interessado: gerarResposta(),
    };

    bemEstar.push(criarRegistroBemEstar(dataStr, respostas, `we-${dataStr}`));
  }

  return { refeicoes, bemEstar };
}
