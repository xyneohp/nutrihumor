// ============================================================================
// DashboardScreen — "Meu Painel"
// ----------------------------------------------------------------------------
// Reúne indicadores alimentares e de bem-estar, os 5 gráficos solicitados
// e a seção "Padrões Observados" com textos descritivos automáticos.
// ============================================================================

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useNutriHumor } from '../../data/NutriHumorContext';
import { Card, NutriScoreBadge, SectionLabel } from '../ui/Primitives';
import {
  contarRefeicoesPorDia,
  percentualNova4,
  distribuicaoNova,
  distribuicaoNutriScore,
  mediaNutriScore,
  complexidadeMediaFormulacao,
  complexidadeMediaRotulo,
  evolucaoWHO5,
  mediaSemanalWHO5,
  who5Atual,
  gerarPadroesObservados,
} from '../../utils/dashboardAnalytics';
import { interpretarEscorePadronizado } from '../../utils/who5';
import { AlertCircle } from 'lucide-react';

const NOVA_COLORS = ['#3d6b4f', '#5a8a6c', '#c08a3e', '#d97757'];
const NUTRISCORE_COLORS: Record<string, string> = {
  A: '#3d6b4f',
  B: '#6f9a5b',
  C: '#c08a3e',
  D: '#cd6b3e',
  E: '#c1573f',
};
const COMPLEXITY_COLORS = ['#5a8a6c', '#c08a3e', '#cd6b3e', '#c1573f'];

function StatCard({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <Card className="!p-4 sm:!p-5">
      <p className="text-xs text-[var(--color-olive)] mb-1.5">{label}</p>
      <p className="font-display font-semibold text-3xl text-[var(--color-ink)]">{value}</p>
      {sublabel && <p className="text-xs text-[var(--color-olive)] mt-1">{sublabel}</p>}
    </Card>
  );
}

export function DashboardScreen() {
  const { refeicoes, bemEstar } = useNutriHumor();

  const totalRefeicoes = contarRefeicoesPorDia(refeicoes);
  const pctNova4 = percentualNova4(refeicoes);
  const distNova = distribuicaoNova(refeicoes);
  const distScore = distribuicaoNutriScore(refeicoes).filter((d) => d.quantidade > 0);
  const mediaScore = mediaNutriScore(refeicoes);
  const distComplexidade = complexidadeMediaFormulacao(refeicoes);
  const complexidadeRotulo = complexidadeMediaRotulo(refeicoes);
  const serieWHO5 = evolucaoWHO5(bemEstar);
  const mediaSemanal = mediaSemanalWHO5(bemEstar);
  const atual = who5Atual(bemEstar);
  const padroes = gerarPadroesObservados(refeicoes, bemEstar);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-semibold text-3xl text-[var(--color-ink)]">Meu painel</h1>
        <p className="text-[var(--color-olive)] mt-1.5 text-sm">
          Visão geral da sua alimentação e bem-estar nos últimos 30 dias.
        </p>
      </div>

      {/* Indicadores alimentares */}
      <section>
        <SectionLabel>Indicadores alimentares</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Refeições registradas" value={String(totalRefeicoes)} />
          <StatCard label="Alimentos NOVA 4" value={`${pctNova4}%`} sublabel="do total de registros" />
          <StatCard
            label="Nutri-Score médio"
            value={mediaScore ? mediaScore.letra : '—'}
            sublabel={mediaScore ? `valor médio ${mediaScore.valor}` : undefined}
          />
          <StatCard label="Complexidade média" value={complexidadeRotulo} sublabel="da formulação" />
        </div>
      </section>

      {/* Indicadores de bem-estar */}
      <section>
        <SectionLabel>Indicadores de bem-estar</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            label="WHO-5 atual"
            value={atual ? String(atual.escorePadronizado) : '—'}
            sublabel={atual ? interpretarEscorePadronizado(atual.escorePadronizado).rotulo : undefined}
          />
          <StatCard label="Média semanal" value={mediaSemanal !== null ? String(mediaSemanal) : '—'} sublabel="últimos 7 dias" />
          <StatCard label="Escala" value="0–100" sublabel="escore padronizado WHO-5" />
        </div>
      </section>

      {/* Gráficos */}
      <section className="grid sm:grid-cols-2 gap-4">
        <Card>
          <SectionLabel>1. Distribuição dos grupos NOVA</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={distNova} margin={{ left: -20 }}>
              <CartesianGrid stroke="var(--color-sand)" vertical={false} />
              <XAxis dataKey="grupo" tick={{ fontSize: 12, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sand)', fontSize: 13 }}
              />
              <Bar dataKey="quantidade" radius={[6, 6, 0, 0]}>
                {distNova.map((_, i) => (
                  <Cell key={i} fill={NOVA_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionLabel>2. Evolução semanal do WHO-5</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={serieWHO5} margin={{ left: -20 }}>
              <CartesianGrid stroke="var(--color-sand)" vertical={false} />
              <XAxis dataKey="data" tick={{ fontSize: 11, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} interval={3} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sand)', fontSize: 13 }} />
              <Line type="monotone" dataKey="escore" stroke="var(--color-leaf)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionLabel>3. Frequência de alimentos NOVA 4</SectionLabel>
          <div className="flex items-center justify-center" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { nome: 'NOVA 4', valor: refeicoes.filter((r) => r.alimento.grupoNova === 4).length },
                    { nome: 'Demais grupos', valor: refeicoes.filter((r) => r.alimento.grupoNova !== 4).length },
                  ]}
                  dataKey="valor"
                  nameKey="nome"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  <Cell fill="var(--color-terracotta)" />
                  <Cell fill="var(--color-sand)" />
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sand)', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-2xl font-display font-semibold text-[var(--color-terracotta)] -mt-4">
            {pctNova4}%
          </p>
        </Card>

        <Card>
          <SectionLabel>4. Distribuição do Nutri-Score</SectionLabel>
          <div className="flex flex-wrap gap-3 items-center justify-center py-4">
            {distScore.map((d) => (
              <div key={d.score} className="flex flex-col items-center gap-2">
                <NutriScoreBadge score={d.score} size="lg" />
                <span className="font-mono text-sm text-[var(--color-olive)]">{d.quantidade}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={distScore} margin={{ left: -20 }} layout="vertical">
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis type="category" dataKey="score" tick={{ fontSize: 12, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} width={20} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sand)', fontSize: 13 }} />
              <Bar dataKey="quantidade" radius={[0, 6, 6, 0]}>
                {distScore.map((d) => (
                  <Cell key={d.score} fill={NUTRISCORE_COLORS[d.score]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="sm:col-span-2">
          <SectionLabel>5. Complexidade média da formulação dos alimentos consumidos</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={distComplexidade} margin={{ left: -20 }}>
              <CartesianGrid stroke="var(--color-sand)" vertical={false} />
              <XAxis dataKey="nivel" tick={{ fontSize: 12, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--color-olive)' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sand)', fontSize: 13 }} />
              <Bar dataKey="quantidade" radius={[6, 6, 0, 0]}>
                {distComplexidade.map((_, i) => (
                  <Cell key={i} fill={COMPLEXITY_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* Padrões observados */}
      <section>
        <SectionLabel>Padrões observados</SectionLabel>
        <Card className="space-y-3">
          {padroes.map((texto, i) => (
            <p key={i} className="text-sm text-[var(--color-ink)] leading-relaxed">
              {texto}
            </p>
          ))}
          <div className="flex gap-2.5 items-start bg-[var(--color-sand)]/50 rounded-xl px-4 py-3 mt-2">
            <AlertCircle size={16} className="text-[var(--color-olive)] shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--color-olive)] leading-relaxed font-medium">
              Estas observações são descritivas e não estabelecem relação causal.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
