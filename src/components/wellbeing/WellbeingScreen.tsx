// ============================================================================
// WellbeingScreen — "Registrar Bem-Estar" (WHO-5)
// ============================================================================

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { WHO5Answers } from '../../types';
import { WHO5_ITEMS, WHO5_SCALE, calcularEscoreBruto, calcularEscorePadronizado, interpretarEscorePadronizado, criarRegistroBemEstar } from '../../utils/who5';
import { useNutriHumor } from '../../data/NutriHumorContext';
import { Card, SectionLabel } from '../ui/Primitives';

type RespostasParciais = Partial<Record<keyof WHO5Answers, number>>;

const RESPOSTA_INICIAL: RespostasParciais = {};

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

export function WellbeingScreen() {
  const { adicionarBemEstar } = useNutriHumor();
  const [respostas, setRespostas] = useState<RespostasParciais>(RESPOSTA_INICIAL);
  const [enviado, setEnviado] = useState(false);

  const todasRespondidas = WHO5_ITEMS.every((item) => (respostas[item.chave] ?? -1) >= 0);

  function responder(chave: keyof WHO5Answers, valor: number) {
    setRespostas((prev) => ({ ...prev, [chave]: valor }));
  }

  function enviar() {
    if (!todasRespondidas) return;
    const registro = criarRegistroBemEstar(hojeISO(), respostas as WHO5Answers);
    adicionarBemEstar(registro);
    setEnviado(true);
  }

  function refazer() {
    setRespostas(RESPOSTA_INICIAL);
    setEnviado(false);
  }

  if (enviado) {
    const escoreBruto = calcularEscoreBruto(respostas as WHO5Answers);
    const escorePadronizado = calcularEscorePadronizado(escoreBruto);
    const interpretacao = interpretarEscorePadronizado(escorePadronizado);

    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display font-semibold text-3xl text-[var(--color-ink)]">Resultado WHO-5</h1>
          <p className="text-[var(--color-olive)] mt-1.5 text-sm">Registrado para hoje, {hojeISO().split('-').reverse().join('/')}.</p>
        </div>

        <Card className="text-center space-y-4 py-8">
          <SectionLabel>Escore padronizado (0–100)</SectionLabel>
          <p className="font-display font-semibold text-6xl text-[var(--color-leaf)]">{escorePadronizado}</p>
          <div className="max-w-xs mx-auto h-2.5 rounded-full bg-[var(--color-sand)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-leaf)] transition-all"
              style={{ width: `${escorePadronizado}%` }}
            />
          </div>
          <div>
            <p className="font-medium text-[var(--color-ink)]">{interpretacao.rotulo}</p>
            <p className="text-sm text-[var(--color-olive)] mt-1 max-w-md mx-auto leading-relaxed">
              {interpretacao.descricao}
            </p>
          </div>
          <p className="text-xs font-mono text-[var(--color-olive)] pt-2">
            Escore bruto: {escoreBruto} / 25 · Padronizado: {escoreBruto} × 4 = {escorePadronizado}
          </p>
        </Card>

        <div className="rounded-xl bg-[var(--color-sand)]/50 px-4 py-3">
          <p className="text-xs text-[var(--color-olive)] leading-relaxed">
            O WHO-5 é um indicador de bem-estar subjetivo, não um instrumento diagnóstico. Em
            caso de escores persistentemente baixos, procure apoio profissional.
          </p>
        </div>

        <button
          onClick={refazer}
          className="w-full rounded-xl py-3.5 font-medium text-sm bg-white border border-[var(--color-sand)] text-[var(--color-ink)] hover:border-[var(--color-leaf)] transition-colors"
        >
          Refazer questionário
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-semibold text-3xl text-[var(--color-ink)]">Registrar bem-estar</h1>
        <p className="text-[var(--color-olive)] mt-1.5 text-sm leading-relaxed">
          Nas últimas duas semanas, em que medida você se sentiu assim?
        </p>
      </div>

      <div className="space-y-4">
        {WHO5_ITEMS.map((item, idx) => (
          <Card key={item.chave}>
            <p className="text-sm font-medium text-[var(--color-ink)] mb-3">
              {idx + 1}. {item.texto}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {WHO5_SCALE.map((escala) => {
                const selecionado = respostas[item.chave] === escala.valor;
                return (
                  <button
                    key={escala.valor}
                    onClick={() => responder(item.chave, escala.valor)}
                    title={escala.texto}
                    className={`rounded-xl py-2.5 px-1 text-xs font-medium border transition-colors flex flex-col items-center gap-1 ${
                      selecionado
                        ? 'bg-[var(--color-leaf)] text-white border-[var(--color-leaf)]'
                        : 'bg-white text-[var(--color-ink)] border-[var(--color-sand)] hover:border-[var(--color-leaf-light)]'
                    }`}
                  >
                    <span className="font-mono text-sm">{escala.valor}</span>
                    <span className="leading-tight text-center hidden sm:block">{escala.texto}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <button
        onClick={enviar}
        disabled={!todasRespondidas}
        className={`w-full rounded-xl py-3.5 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
          todasRespondidas
            ? 'bg-[var(--color-leaf)] text-white hover:bg-[var(--color-ink)]'
            : 'bg-[var(--color-sand)] text-[var(--color-olive)] cursor-not-allowed'
        }`}
      >
        <CheckCircle2 size={18} /> Calcular escore de bem-estar
      </button>
    </div>
  );
}
