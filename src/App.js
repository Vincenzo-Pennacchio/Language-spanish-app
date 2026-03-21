import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, GraduationCap, Globe, Mic, Book } from 'lucide-react';

// Import all the learning modules
import HomePage from './components/HomePage';
import VocabularyFoundation from './components/VocabularyFoundation';
import ConversationSimulator from './components/ConversationSimulator';
import GrammarGuide from './components/GrammarGuide';
import ImmersionPlan from './components/ImmersionPlan';
import PronunciationCoach from './components/PronunciationCoach';
import PhraseBank from './components/PhraseBank';
import ProgressTracker from './components/ProgressTracker';

function App() {
  const [currentModule, setCurrentModule] = useState('home');

  const modules = [
    { id: 'home', name: 'Home', icon: Home, component: HomePage },
    { id: 'vocabulary', name: 'Vocabulary', icon: BookOpen, component: VocabularyFoundation },
    { id: 'conversation', name: 'Conversation', icon: MessageCircle, component: ConversationSimulator },
    { id: 'grammar', name: 'Grammar', icon: GraduationCap, component: GrammarGuide },
    { id: 'immersion', name: 'Immersion', icon: Globe, component: ImmersionPlan },
    { id: 'pronunciation', name: 'Pronunciation', icon: Mic, component: PronunciationCoach },
    { id: 'phrases', name: 'Phrases', icon: Book, component: PhraseBank }
  ];

  const ActiveComponent = modules.find(m => m.id === currentModule)?.component || HomePage;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button 
            onClick={() => setCurrentModule('home')}
            className="logo"
          >
            🇪🇸 Aprende Español
          </button>
          <nav className="nav">
            {modules.map(module => {
              const IconComponent = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setCurrentModule(module.id)}
                  className={`nav-link ${currentModule === module.id ? 'active' : ''}`}
                >
                  <IconComponent size={18} />
                  {module.name}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <ActiveComponent onNavigate={setCurrentModule} />
      </main>
      
      <ProgressTracker />
    </div>
  );
}

export default App;