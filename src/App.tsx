// ============================================================================
// App — ponto de entrada da aplicação, controla a tela ativa
// ----------------------------------------------------------------------------
// Navegação simples por estado local (sem react-router), adequada a um
// protótipo de página única. NutriHumorProvider envolve toda a árvore para
// que os dados (simulados + registros da sessão) fiquem disponíveis a
// qualquer tela.
// ============================================================================

import { useState } from 'react';
import { NutriHumorProvider } from './data/NutriHumorContext';
import { AppLayout, type Screen } from './components/layout/AppLayout';
import { HomeScreen } from './components/home/HomeScreen';
import { MealScreen } from './components/meal/MealScreen';
import { WellbeingScreen } from './components/wellbeing/WellbeingScreen';
import { DashboardScreen } from './components/dashboard/DashboardScreen';
import { EducationScreen } from './components/education/EducationScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('home');

  function renderScreen() {
    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={setScreen} />;
      case 'meal':
        return <MealScreen />;
      case 'wellbeing':
        return <WellbeingScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'education':
        return <EducationScreen />;
    }
  }

  return (
    <NutriHumorProvider>
      <AppLayout screen={screen} onNavigate={setScreen}>
        {renderScreen()}
      </AppLayout>
    </NutriHumorProvider>
  );
}

export default App;
