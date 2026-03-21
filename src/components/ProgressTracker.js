import React from 'react';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';

const ProgressTracker = () => {
  // In a real app, this would come from a global state management system
  // For now, we'll simulate some progress data
  const getStoredProgress = () => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('spanishAppProgress');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return {
      totalWordsLearned: 0,
      conversationsPracticed: 0,
      grammarRulesStudied: 0,
      pronunciationSoundsLearned: 0,
      phrasesLearned: 0,
      daysActive: 0,
      currentStreak: 0,
      lastActiveDate: null,
      startDate: new Date().toISOString()
    };
  };

  const progress = getStoredProgress();

  const calculateLevel = () => {
    const totalPoints = (
      progress.totalWordsLearned * 2 +
      progress.conversationsPracticed * 10 +
      progress.grammarRulesStudied * 15 +
      progress.pronunciationSoundsLearned * 8 +
      progress.phrasesLearned * 5 +
      progress.daysActive * 3
    );

    if (totalPoints < 50) return { level: 'Principiante', badge: '🌱', color: '#4CAF50', next: 50 };
    if (totalPoints < 150) return { level: 'Elementare', badge: '🌿', color: '#8BC34A', next: 150 };
    if (totalPoints < 300) return { level: 'Intermedio', badge: '🌳', color: '#FF9800', next: 300 };
    if (totalPoints < 500) return { level: 'Intermedio-Alto', badge: '🏔️', color: '#FF5722', next: 500 };
    if (totalPoints < 800) return { level: 'Avanzato', badge: '⭐', color: '#9C27B0', next: 800 };
    return { level: 'Esperto', badge: '🏆', color: '#F44336', next: null };
  };

  const currentLevel = calculateLevel();
  const totalPoints = (
    progress.totalWordsLearned * 2 +
    progress.conversationsPracticed * 10 +
    progress.grammarRulesStudied * 15 +
    progress.pronunciationSoundsLearned * 8 +
    progress.phrasesLearned * 5 +
    progress.daysActive * 3
  );

  const achievements = [
    { 
      name: 'Prime Parole', 
      description: 'Impara le prime 10 parole', 
      unlocked: progress.totalWordsLearned >= 10,
      icon: '📝',
      progress: Math.min(progress.totalWordsLearned, 10),
      target: 10
    },
    { 
      name: 'Chiacchierone', 
      description: 'Completa 5 conversazioni', 
      unlocked: progress.conversationsPracticed >= 5,
      icon: '💬',
      progress: Math.min(progress.conversationsPracticed, 5),
      target: 5
    },
    { 
      name: 'Grammatico', 
      description: 'Studia 3 regole grammaticali', 
      unlocked: progress.grammarRulesStudied >= 3,
      icon: '📚',
      progress: Math.min(progress.grammarRulesStudied, 3),
      target: 3
    },
    { 
      name: 'Pronuncia Perfetta', 
      description: 'Padroneggia 5 suoni difficili', 
      unlocked: progress.pronunciationSoundsLearned >= 5,
      icon: '🎤',
      progress: Math.min(progress.pronunciationSoundsLearned, 5),
      target: 5
    },
    { 
      name: 'Esperto di Slang', 
      description: 'Impara 20 frasi autentiche', 
      unlocked: progress.phrasesLearned >= 20,
      icon: '🎯',
      progress: Math.min(progress.phrasesLearned, 20),
      target: 20
    },
    { 
      name: 'Dedizione', 
      description: 'Studia per 7 giorni', 
      unlocked: progress.daysActive >= 7,
      icon: '🔥',
      progress: Math.min(progress.daysActive, 7),
      target: 7
    },
    { 
      name: 'Maestro del Vocabolario', 
      description: 'Impara 50 parole', 
      unlocked: progress.totalWordsLearned >= 50,
      icon: '🎓',
      progress: Math.min(progress.totalWordsLearned, 50),
      target: 50
    },
    { 
      name: 'Fluenza in Vista', 
      description: 'Raggiungi 100 punti', 
      unlocked: totalPoints >= 100,
      icon: '🚀',
      progress: Math.min(totalPoints, 100),
      target: 100
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  // Don't render if no progress yet
  if (totalPoints === 0) {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      maxWidth: '300px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <TrendingUp size={20} color="#667eea" />
        <h3 style={{ margin: 0, color: '#667eea', fontSize: '1.1rem' }}>I Tuoi Progressi</h3>
      </div>

      {/* Current Level */}
      <div style={{ 
        background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}cc)`,
        borderRadius: '12px',
        padding: '1rem',
        color: 'white',
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{currentLevel.badge}</div>
        <div style={{ fontWeight: '600', fontSize: '1rem' }}>{currentLevel.level}</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{totalPoints} punti</div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontWeight: '600', color: '#667eea', fontSize: '1.2rem' }}>{progress.totalWordsLearned}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>Parole</div>
        </div>
        <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontWeight: '600', color: '#667eea', fontSize: '1.2rem' }}>{progress.currentStreak}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>Serie</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Award size={16} color="#667eea" />
          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>
            Traguardi ({unlockedAchievements}/8)
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.3rem' }}>
          {achievements.slice(0, 4).map((achievement, index) => (
            <div 
              key={index}
              style={{ 
                padding: '0.5rem',
                background: achievement.unlocked ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '1.2rem',
                opacity: achievement.unlocked ? 1 : 0.3,
                filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
              }}
              title={`${achievement.name}: ${achievement.description} (${achievement.progress}/${achievement.target})`}
            >
              {achievement.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Next Level Progress */}
      {currentLevel.next && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Prossimo livello</span>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>
              {totalPoints}/{currentLevel.next}
            </span>
          </div>
          <div style={{ 
            background: '#e0e0e0', 
            height: '6px', 
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              background: currentLevel.color, 
              height: '100%', 
              width: `${(totalPoints / currentLevel.next) * 100}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div style={{ 
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '8px',
        padding: '0.8rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: '500' }}>
          {totalPoints < 50 
            ? '¡Ottimo inizio! Continua così! 🌟'
            : totalPoints < 150
            ? '¡Stai facendo progressi fantastici! 🎉'
            : totalPoints < 300
            ? '¡Ya hablas bastante bien! 👏'
            : '¡Eres increíble! ¡Sigue así! 🚀'
          }
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;