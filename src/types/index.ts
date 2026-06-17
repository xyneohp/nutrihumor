// ============================================================================
// NutriHumor — Tipos de domínio
// ----------------------------------------------------------------------------
// Este arquivo concentra todos os contratos de dados usados pelo app.
// Mantê-los centralizados facilita auditoria acadêmica e evita divergência
// entre as camadas de dados simulados, lógica de indicadores e UI.
// ============================================================================

/** Classificação NOVA de processamento de alimentos (Monteiro et al.). */
export type NovaGroup = 1 | 2 | 3 | 4;

/** Faixas do sistema Nutri-Score (perfil nutricional do rótulo frontal). */
export type NutriScore = 'A' | 'B' | 'C' | 'D' | 'E';

/** Classificação qualitativa de um nutriente crítico. */
export type NutrientLevel = 'baixo' | 'moderado' | 'elevado';

/** Complexidade da formulação, derivada de nº de ingredientes + aditivos. */
export type FormulationComplexity = 'Baixa' | 'Moderada' | 'Alta' | 'Muito Alta';

/** Tipos de refeição disponíveis para registro. */
export type MealType =
  | 'Café da manhã'
  | 'Almoço'
  | 'Lanche'
  | 'Jantar'
  | 'Ceia';

/** Perfil nutricional simplificado de um alimento/produto. */
export interface NutrientProfile {
  acucares: NutrientLevel;
  sodio: NutrientLevel;
  gorduraSaturada: NutrientLevel;
  fibraAlimentar: NutrientLevel; // único nutriente "positivo": elevado é desejável
}

/** Um alimento ou produto cadastrado na base (simulada ou futura Open Food Facts). */
export interface FoodItem {
  id: string;
  nome: string;
  grupoNova: NovaGroup;
  nutriScore: NutriScore;
  perfilNutricional: NutrientProfile;
  numeroIngredientes: number;
  possuiAditivos: boolean;
  codigoBarras?: string;
}

/** Um registro de consumo: liga um FoodItem a uma data/horário/refeição. */
export interface MealEntry {
  id: string;
  data: string; // ISO yyyy-mm-dd
  horario: string; // HH:mm
  tipoRefeicao: MealType;
  alimento: FoodItem;
}

/** As cinco perguntas do índice WHO-5, na ordem oficial do instrumento. */
export interface WHO5Answers {
  alegre: number; // 0-5
  calmo: number; // 0-5
  ativo: number; // 0-5
  descansado: number; // 0-5
  interessado: number; // 0-5
}

/** Um registro de bem-estar em uma data específica. */
export interface WellbeingEntry {
  id: string;
  data: string; // ISO yyyy-mm-dd
  respostas: WHO5Answers;
  escoreBruto: number; // soma 0-25
  escorePadronizado: number; // 0-100
}

/** Resultado calculado da análise de um alimento (usado na tela de registro). */
export interface FoodAnalysis {
  alimento: FoodItem;
  complexidade: FormulationComplexity;
  mensagemEducativa: string;
}
