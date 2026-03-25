import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Bell, 
  BellOff, 
  Globe, 
  Target, 
  User, 
  Download,
  Trash2,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Bookmark,
  Award
} from 'lucide-react';
import { useApp, useSettings } from '../context/AppContext';

const Settings = ({ onNavigate }) => {
  const { state, actions } = useApp();
  const { settings, toggleDarkMode, setAudioEnabled, setNotificationsEnabled } = useSettings();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showExportConfirm, setShowExportConfirm] = useState(false);

  const handleDailyGoalChange = (minutes) => {
    actions.setDailyGoal(minutes);
  };

  const exportData = () => {
    try {
      const exportData = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        userData: state
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `aprende-espanol-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      setShowExportConfirm(false);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Errore durante l\'esportazione dei dati');
    }
  };

  const resetAllData = () => {
    if (showResetConfirm) {
      actions.resetAllData();
      setShowResetConfirm(false);
      alert('Tutti i dati sono stati resettati');
    } else {
      setShowResetConfirm(true);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        new Notification('¡Excelente!', {
          body: 'Le notifiche sono ora attive. Ti ricorderemo di praticare!',
          icon: '/icons/icon-192x192.png'
        });
      }
    }
  };

  const calculateStats = () => {
    const totalWords = state.vocabulary.completedWords.size;
    const totalConversations = state.conversation.totalConversations;
    const totalGrammarRules = state.grammar.masteredRules.size;
    const totalExperience = (
      totalWords * 2 + 
      totalConversations * 10 + 
      totalGrammarRules * 15
    );
    
    return { totalWords, totalConversations, totalGrammarRules, totalExperience };
  };

  const stats = calculateStats();

  return (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <User size={32} color="#9C27B0" />
        <div>
          <h1>Impostazioni e Profilo</h1>
          <p>Personalizza la tua esperienza di apprendimento</p>
        </div>
      </div>

      {/* User Profile Stats */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>
          <Award size={24} style={{ marginRight: '0.5rem' }} />
          Il Tuo Profilo
        </h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4CAF50' }}>{state.user.level}</div>
            <div className="stat-label">Livello Attuale</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#FF9800' }}>{state.user.currentStreak}</div>
            <div className="stat-label">Giorni Consecutivi</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#2196F3' }}>{stats.totalWords}</div>
            <div className="stat-label">Parole Imparate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#9C27B0' }}>{stats.totalExperience}</div>
            <div className="stat-label">Punti Esperienza</div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>
          <Target size={24} style={{ marginRight: '0.5rem' }} />
          Obiettivi di Studio
        </h2>
        
        <div style={{ 
          background: 'rgba(102, 126, 234, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '12px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Obiettivo Giornaliero</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Obiettivo attuale: {state.user.dailyGoal} minuti al giorno
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[10, 15, 20, 30, 45, 60].map(minutes => (
              <button
                key={minutes}
                onClick={() => handleDailyGoalChange(minutes)}
                className="btn secondary"
                style={{
                  background: state.user.dailyGoal === minutes ? '#667eea' : 'transparent',
                  color: state.user.dailyGoal === minutes ? 'white' : '#667eea',
                  border: `2px solid ${state.user.dailyGoal === minutes ? '#667eea' : '#667eea'}`
                }}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>
          <Globe size={24} style={{ marginRight: '0.5rem' }} />
          Impostazioni App
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {/* Dark Mode */}
          <div className="word-card" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }} onClick={toggleDarkMode}>
            <div>
              <h3 style={{ margin: 0, marginBottom: '0.3rem' }}>
                {settings.darkMode ? '🌙' : '☀️'} Modalità {settings.darkMode ? 'Scura' : 'Chiara'}
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                {settings.darkMode ? 'Attiva la modalità chiara' : 'Attiva la modalità scura'}
              </p>
            </div>
            <button
              className="audio-btn"
              style={{
                background: settings.darkMode ? '#4CAF50' : '#ddd',
                color: settings.darkMode ? 'white' : '#666'
              }}
            >
              {settings.darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Audio */}
          <div className="word-card" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }} onClick={() => setAudioEnabled(!settings.audioEnabled)}>
            <div>
              <h3 style={{ margin: 0, marginBottom: '0.3rem' }}>
                🔊 Audio e Pronuncia
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                {settings.audioEnabled ? 'Audio attivo' : 'Audio disattivato'}
              </p>
            </div>
            <button
              className="audio-btn"
              style={{
                background: settings.audioEnabled ? '#4CAF50' : '#ddd',
                color: settings.audioEnabled ? 'white' : '#666'
              }}
            >
              {settings.audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>

          {/* Notifications */}
          <div className="word-card" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }} onClick={requestNotificationPermission}>
            <div>
              <h3 style={{ margin: 0, marginBottom: '0.3rem' }}>
                🔔 Notifiche
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Promemoria giornalieri per praticare
              </p>
            </div>
            <button
              className="audio-btn"
              style={{
                background: settings.notificationsEnabled ? '#4CAF50' : '#ddd',
                color: settings.notificationsEnabled ? 'white' : '#666'
              }}
            >
              {settings.notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>
          <Bookmark size={24} style={{ marginRight: '0.5rem' }} />
          Gestione Dati
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {/* Export Data */}
          <div className="word-card">
            <h3 style={{ margin: 0, marginBottom: '0.5rem', color: '#4CAF50' }}>
              <Download size={20} style={{ marginRight: '0.5rem' }} />
              Esporta i Tuoi Dati
            </h3>
            <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Crea un backup dei tuoi progressi e impostazioni
            </p>
            {!showExportConfirm ? (
              <button 
                onClick={() => setShowExportConfirm(true)}
                className="btn secondary"
                style={{ width: '100%' }}
              >
                <Download size={16} />
                Esporta Dati
              </button>
            ) : (
              <div>
                <p style={{ color: '#FF9800', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Sei sicuro di voler esportare tutti i tuoi dati?
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={exportData} className="btn" style={{ background: '#4CAF50' }}>
                    Sì, Esporta
                  </button>
                  <button 
                    onClick={() => setShowExportConfirm(false)} 
                    className="btn secondary"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Data */}
          <div className="word-card">
            <h3 style={{ margin: 0, marginBottom: '0.5rem', color: '#f44336' }}>
              <Trash2 size={20} style={{ marginRight: '0.5rem' }} />
              Resetta Tutti i Dati
            </h3>
            <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚠️ Cancella tutti i progressi e ricomincia da capo
            </p>
            {!showResetConfirm ? (
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="btn secondary"
                style={{ color: '#f44336', borderColor: '#f44336', width: '100%' }}
              >
                <RotateCcw size={16} />
                Resetta Dati
              </button>
            ) : (
              <div>
                <p style={{ color: '#f44336', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  ⚠️ ATTENZIONE: Questa azione cancellerà TUTTI i tuoi progressi permanentemente. Sei sicuro?
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={resetAllData} 
                    className="btn" 
                    style={{ background: '#f44336' }}
                  >
                    Sì, Resetta Tutto
                  </button>
                  <button 
                    onClick={() => setShowResetConfirm(false)} 
                    className="btn secondary"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>
          <HelpCircle size={24} style={{ marginRight: '0.5rem' }} />
          Informazioni
        </h2>
        
        <div className="word-card">
          <h3 style={{ margin: 0, marginBottom: '1rem' }}>Aprende Español v{state.app.version}</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            L'app completa per imparare lo spagnolo progettata specificamente per italiani.
          </p>
          
          <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
            <p><strong>Data iscrizione:</strong> {new Date(state.user.joinDate).toLocaleDateString('it-IT')}</p>
            <p><strong>Ultimo accesso:</strong> {state.user.lastActiveDate ? new Date(state.user.lastActiveDate).toLocaleDateString('it-IT') : 'Oggi'}</p>
            <p><strong>Streak più lungo:</strong> {state.user.longestStreak} giorni</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn secondary"
              style={{ fontSize: '0.9rem' }}
              onClick={() => window.open('https://github.com/your-repo', '_blank')}
            >
              <ExternalLink size={16} />
              GitHub
            </button>
            <button 
              className="btn secondary" 
              style={{ fontSize: '0.9rem' }}
              onClick={() => window.open('mailto:support@aprendeespanol.com', '_blank')}
            >
              <ExternalLink size={16} />
              Supporto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;