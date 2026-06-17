// ============================================================================
// MealScreen — "Registrar Refeição"
// ----------------------------------------------------------------------------
// Formulário com data, horário, tipo de refeição, busca de alimento
// (catálogo local simulando uma futura integração Open Food Facts via
// código de barras) e exibição do Perfil do Produto ao selecionar.
// ============================================================================

import { useMemo, useState } from 'react';
import { Search, Barcode, CheckCircle2 } from 'lucide-react';
import type { FoodItem, MealEntry, MealType } from '../../types';
import { buscarAlimentos } from '../../data/foodCatalog';
import { useNutriHumor } from '../../data/NutriHumorContext';
import { Card, SectionLabel } from '../ui/Primitives';
import { NovaTrack } from '../ui/NovaTrack';
import { ProductProfile } from './ProductProfile';

const MEAL_TYPES: MealType[] = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar', 'Ceia'];

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

function agoraHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function MealScreen() {
  const { adicionarRefeicao } = useNutriHumor();

  const [data, setData] = useState(hojeISO());
  const [horario, setHorario] = useState(agoraHHMM());
  const [tipoRefeicao, setTipoRefeicao] = useState<MealType>('Almoço');
  const [busca, setBusca] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<FoodItem | null>(null);
  const [salvo, setSalvo] = useState(false);

  const resultados = useMemo(() => (busca ? buscarAlimentos(busca) : []), [busca]);

  function selecionarAlimento(item: FoodItem) {
    setAlimentoSelecionado(item);
    setBusca(item.nome);
    setSalvo(false);
  }

  function registrarRefeicao() {
    if (!alimentoSelecionado) return;
    const entry: MealEntry = {
      id: `meal-${Date.now()}`,
      data,
      horario,
      tipoRefeicao,
      alimento: alimentoSelecionado,
    };
    adicionarRefeicao(entry);
    setSalvo(true);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-semibold text-3xl text-[var(--color-ink)]">Registrar refeição</h1>
        <p className="text-[var(--color-olive)] mt-1.5 text-sm">
          Anote o que você comeu para acompanhar o grau de processamento e a qualidade nutricional.
        </p>
      </div>

      <Card className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-[var(--color-ink)] mb-1.5 block">Data</span>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-sand)] px-3.5 py-2.5 text-sm bg-white focus:border-[var(--color-leaf)] outline-none transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[var(--color-ink)] mb-1.5 block">Horário</span>
            <input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-sand)] px-3.5 py-2.5 text-sm bg-white focus:border-[var(--color-leaf)] outline-none transition-colors"
            />
          </label>
        </div>

        <div>
          <span className="text-sm font-medium text-[var(--color-ink)] mb-2 block">Tipo de refeição</span>
          <div className="flex flex-wrap gap-2">
            {MEAL_TYPES.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoRefeicao(tipo)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                  tipoRefeicao === tipo
                    ? 'bg-[var(--color-leaf)] text-white border-[var(--color-leaf)]'
                    : 'bg-white text-[var(--color-ink)] border-[var(--color-sand)] hover:border-[var(--color-leaf-light)]'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        <label className="block relative">
          <span className="text-sm font-medium text-[var(--color-ink)] mb-1.5 block">
            Nome do alimento ou produto
          </span>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-olive)]" />
            <input
              type="text"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setAlimentoSelecionado(null);
                setSalvo(false);
              }}
              placeholder="Digite para buscar, ex: arroz, biscoito, banana..."
              className="w-full rounded-xl border border-[var(--color-sand)] pl-10 pr-3.5 py-2.5 text-sm bg-white focus:border-[var(--color-leaf)] outline-none transition-colors"
            />
          </div>
          {resultados.length > 0 && !alimentoSelecionado && (
            <ul className="absolute z-10 mt-1.5 w-full bg-white border border-[var(--color-sand)] rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {resultados.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => selecionarAlimento(item)}
                    className="w-full text-left px-4 py-2.5 hover:bg-[var(--color-cream)] flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="text-sm text-[var(--color-ink)]">{item.nome}</span>
                    <span className="shrink-0 w-20">
                      <NovaTrack grupo={item.grupoNova} size="sm" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-[var(--color-ink)] mb-1.5 block flex items-center gap-1.5">
            <Barcode size={14} /> Código de barras (opcional)
          </span>
          <input
            type="text"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
            placeholder="Ex: 7891000100103"
            className="w-full rounded-xl border border-[var(--color-sand)] px-3.5 py-2.5 text-sm bg-white focus:border-[var(--color-leaf)] outline-none transition-colors"
          />
          <span className="text-xs text-[var(--color-olive)] mt-1.5 block">
            Em versões futuras, este campo permitirá busca automática via Open Food Facts.
          </span>
        </label>
      </Card>

      {alimentoSelecionado && (
        <>
          <ProductProfile alimento={alimentoSelecionado} />

          <button
            onClick={registrarRefeicao}
            disabled={salvo}
            className={`w-full rounded-xl py-3.5 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              salvo
                ? 'bg-[var(--color-sand)] text-[var(--color-olive)] cursor-default'
                : 'bg-[var(--color-leaf)] text-white hover:bg-[var(--color-ink)]'
            }`}
          >
            {salvo ? (
              <>
                <CheckCircle2 size={18} /> Refeição registrada
              </>
            ) : (
              'Registrar refeição'
            )}
          </button>
        </>
      )}

      {!alimentoSelecionado && (
        <Card>
          <SectionLabel>Como funciona</SectionLabel>
          <p className="text-sm text-[var(--color-olive)] leading-relaxed">
            Busque um alimento pelo nome para ver automaticamente sua classificação NOVA,
            Nutri-Score, perfil nutricional e complexidade de formulação antes de registrar.
          </p>
        </Card>
      )}
    </div>
  );
}
