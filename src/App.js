import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, GraduationCap, Globe, Mic, Book, Gamepad2, Settings as SettingsIcon } from 'lucide-react';

// Import all the learning modules
import HomePage from './components/HomePage';
import VocabularyFoundation from './components/VocabularyFoundation';
import ConversationSimulator from './components/ConversationSimulator';
import GrammarGuide from './components/GrammarGuide';
import ImmersionPlan from './components/ImmersionPlan';
import PronunciationCoach from './components/PronunciationCoach';
import PhraseBank from './components/PhraseBank';
import ProgressTracker from './components/ProgressTracker';
import MiniGames from './components/MiniGames';
import Settings from './components/Settings';

// Import context
import { AppProvider, useApp } from './context/AppContext';

// Main app component wrapped with context
const AppContent = () => {
  const { state, actions } = useApp();
  const [currentModule, setCurrentModule] = useState(state.app.currentModule);

  const modules = [
    { id: 'home', name: 'Home', icon: Home, component: HomePage },
    { id: 'vocabulary', name: 'Vocabulary', icon: BookOpen, component: VocabularyFoundation },
    { id: 'conversation', name: 'Conversation', icon: MessageCircle, component: ConversationSimulator },
    { id: 'grammar', name: 'Grammar', icon: GraduationCap, component: GrammarGuide },
    { id: 'immersion', name: 'Immersion', icon: Globe, component: ImmersionPlan },
    { id: 'pronunciation', name: 'Pronunciation', icon: Mic, component: PronunciationCoach },
    { id: 'phrases', name: 'Phrases', icon: Book, component: PhraseBank },
    { id: 'games', name: 'Giochi', icon: Gamepad2, component: MiniGames },
    { id: 'settings', name: 'Impostazioni', icon: SettingsIcon, component: Settings }
  ];

  const handleModuleChange = (moduleId) => {
    setCurrentModule(moduleId);
    actions.setCurrentModule(moduleId);
  };

  const ActiveComponent = modules.find(m => m.id === currentModule)?.component || HomePage;

  return (
    <div className={`app ${state.settings.darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-content">
          <button 
            onClick={() => handleModuleChange('home')}
            className="logo"
          >
            🇪🇸 Aprende Español
          </button>
          <nav className="nav">
            {modules.filter(module => module.id !== 'settings').map(module => {
              const IconComponent = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleChange(module.id)}
                  className={`nav-link ${currentModule === module.id ? 'active' : ''}`}
                >
                  <IconComponent size={18} />
                  {module.name}
                </button>
              );
            })}
            <button
              onClick={() => handleModuleChange('settings')}
              className={`nav-link ${currentModule === 'settings' ? 'active' : ''}`}
              style={{ marginLeft: 'auto' }}
            >
              <SettingsIcon size={18} />
              Impostazioni
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <ActiveComponent onNavigate={handleModuleChange} />
      </main>
      
      <ProgressTracker />
    </div>
  );
};

// Main App component with provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;