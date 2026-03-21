import React from 'react';
import { BookOpen, MessageCircle, GraduationCap, Globe, Mic, Book } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const modules = [
    {
      id: 'vocabulary',
      title: 'Fluent Foundation Builder',
      description: 'Master the 100 most important Spanish words for daily conversation. Perfect for building your foundation quickly.',
      icon: BookOpen,
      features: [
        '100 most used words grouped by category',
        'Pronunciation guides for Italian speakers',
        'Interactive exercises and quizzes',
        'Progress tracking'
      ],
      color: '#4CAF50'
    },
    {
      id: 'conversation',
      title: 'Daily Conversation Simulator',
      description: 'Practice real Spanish conversations about your experiences in Valencia and across Spain.',
      icon: MessageCircle,
      features: [
        'AI-powered conversation practice',
        'Real-time mistake correction',
        'Beginner-friendly topics',
        'Contextual explanations'
      ],
      color: '#2196F3'
    },
    {
      id: 'grammar',
      title: 'Grammar Shortcut Guide',
      description: 'Learn essential Spanish grammar with shortcuts, patterns, and memory tricks. No textbook fluff!',
      icon: GraduationCap,
      features: [
        'Practical grammar rules only',
        'Memory tricks and patterns',
        'Quick reference guide',
        'Italian-Spanish comparisons'
      ],
      color: '#FF9800'
    },
    {
      id: 'immersion',
      title: 'Immersion Without Travel',
      description: 'Complete 30-day Spanish immersion plan you can follow from home with curated resources.',
      icon: Globe,
      features: [
        '30-day structured plan',
        'Curated podcasts & YouTube channels',
        'Daily exercises and drills',
        'Speaking practice routines'
      ],
      color: '#9C27B0'
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Coach',
      description: 'Master the 20 Spanish sounds that challenge Italian speakers most with targeted practice.',
      icon: Mic,
      features: [
        '20 challenging sounds for Italians',
        'Mouth position guides',
        'Practice words and phrases',
        'Audio comparison tools'
      ],
      color: '#E91E63'
    },
    {
      id: 'phrases',
      title: 'Real-World Phrase Bank',
      description: 'Learn 50 phrases locals actually use - including slang, filler words, and casual expressions.',
      icon: Book,
      features: [
        '50 authentic Spanish phrases',
        'Local slang and expressions',
        'Cultural context explanations',
        'Regional variations'
      ],
      color: '#607D8B'
    }
  ];

  return (
    <div>
      <section className="hero">
        <h1>Benvenuto! 🇮🇹➡️🇪🇸</h1>
        <p>
          The complete Spanish learning app designed specifically for Italian speakers. 
          From beginner basics to fluent conversations - your journey to Spanish fluency starts here.
        </p>
      </section>

      <div className="modules-grid">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <div 
              key={module.id} 
              className="module-card"
              onClick={() => onNavigate(module.id)}
            >
              <h3 style={{ color: module.color }}>
                <IconComponent size={24} />
                {module.title}
              </h3>
              <p>{module.description}</p>
              
              <ul className="features">
                {module.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <button 
                className="btn" 
                style={{ background: `linear-gradient(135deg, ${module.color}, ${module.color}cc)` }}
              >
                Start Module
              </button>
            </div>
          );
        })}
      </div>

      <div className="content-container">
        <h2>Why This App is Perfect for Italians Learning Spanish</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h3>🎯 Language Similarities</h3>
            <p>Leverage your Italian knowledge to learn Spanish faster. We highlight similarities and important differences between the languages.</p>
          </div>
          <div>
            <h3>🗣️ Pronunciation Focus</h3>
            <p>Specific guidance for sounds that Italian speakers find challenging, with mouth position guides and practice exercises.</p>
          </div>
          <div>
            <h3>🏛️ Cultural Context</h3>
            <p>Learn Spanish as it's actually spoken in Spain, with cultural insights that help you understand when and how to use different expressions.</p>
          </div>
          <div>
            <h3>📱 Progressive Learning</h3>
            <p>Start with essential vocabulary and build up to complex conversations. Track your progress and celebrate your achievements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;