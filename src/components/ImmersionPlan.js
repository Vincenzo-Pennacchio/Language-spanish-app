import React, { useState } from 'react';
import { ArrowLeft, Globe, Calendar, Clock, Play, CheckCircle, Star, Volume2 } from 'lucide-react';

const ImmersionPlan = ({ onNavigate }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [completedDays, setCompletedDays] = useState(new Set());
  
  const immersionPlan = {
    1: {
      theme: 'Fondamenta e Primi Contatti',
      focus: 'Abituarsi ai suoni e al ritmo dello spagnolo',
      days: [
        {
          day: 1,
          title: 'Benvenuto nel mondo spagnolo!',
          activities: [
            { type: 'Ascolto', duration: '30 min', task: 'SpanishWithVicente - "Lezioni per Principianti" (YouTube)', difficulty: 'Facile', description: 'Video specifici per italiani con spiegazioni chiare' },
            { type: 'Lettura', duration: '15 min', task: 'Leggi articoli semplici su Lingolia Spanish', difficulty: 'Facile', description: 'Grammatica di base con esempi' },
            { type: 'Parlato', duration: '10 min', task: 'Ripeti le prime 20 parole del vocabolario ad alta voce', difficulty: 'Facile', description: 'Pratica di pronuncia di base' },
            { type: 'Obiettivo', duration: '', task: 'Impara 5 nuove parole', difficulty: '', description: 'Concentrati su saluti e presentazioni' }
          ],
          culturalNote: 'In Spagna si mangia molto più tardi che in Italia: pranzo alle 14-15 e cena alle 21-22!'
        },
        {
          day: 2,
          title: 'I suoni dello spagnolo',
          activities: [
            { type: 'Ascolto', duration: '25 min', task: 'Podcast "Españolistos" - episodi per principianti', difficulty: 'Medio', description: 'Podcast perfetto per italiani con spiegazioni chiare' },
            { type: 'Pratica', duration: '20 min', task: 'Esercizi di pronuncia: R, J, Z/C', difficulty: 'Medio', description: 'Suoni che gli italiani trovano difficili' },
            { type: 'Conversazione', duration: '10 min', task: 'Prova il simulatore di conversazione dell\'app', difficulty: 'Facile', description: 'Prime frasi di presentazione' },
            { type: 'Obiettivo', duration: '', task: 'Padroneggia la differenza tra R e RR', difficulty: '', description: 'Esercitati con "pero" vs "perro"' }
          ],
          culturalNote: 'La "siesta" non è un mito! Molti negozi chiudono dalle 14:00 alle 17:00.'
        },
        {
          day: 3,
          title: 'Prime frasi utili',
          activities: [
            { type: 'Video', duration: '35 min', task: 'SpanishPod101 - "25 frasi che devi sapere"', difficulty: 'Facile', description: 'Frasi essenziali per sopravvivere in Spagna' },
            { type: 'Scrittura', duration: '15 min', task: 'Scrivi 5 frasi di presentazione personale', difficulty: 'Facile', description: 'Nome, età, nazionalità, hobby' },
            { type: 'Ascolto', duration: '15 min', task: 'Musica spagnola: Jesse & Joy, Manu Chao', difficulty: 'Facile', description: 'Abituarsi al ritmo della lingua' },
            { type: 'Obiettivo', duration: '', task: 'Memorizza le forme base di ser e estar', difficulty: '', description: 'La differenza più importante dall\'italiano' }
          ],
          culturalNote: 'Gli spagnoli sono molto più diretti degli italiani nel fare domande personali!'
        },
        {
          day: 4,
          title: 'Conversazioni quotidiane',
          activities: [
            { type: 'Video', duration: '30 min', task: 'Canal "Butterfly Spanish" - conversazioni del bar', difficulty: 'Medio', description: 'Situazioni reali con sottotitoli' },
            { type: 'Pratica', duration: '20 min', task: 'Simula ordinare al bar/ristorante', difficulty: 'Medio', description: 'Pratica essenziale per viaggiare' },
            { type: 'Vocabolario', duration: '15 min', task: 'Parole del cibo e delle bevande', difficulty: 'Facile', description: 'Vocabolario pratico e utile' },
            { type: 'Obiettivo', duration: '', task: 'Sapere ordinare un caffè in spagnolo', difficulty: '', description: '"Un café con leche, por favor"' }
          ],
          culturalNote: 'In Spagna il "café" è espresso. Se vuoi caffè americano, chiedi "café americano"!'
        },
        {
          day: 5,
          title: 'Orientarsi nella città',
          activities: [
            { type: 'Video', duration: '25 min', task: 'ProfeDeELE - "Cómo preguntar direcciones"', difficulty: 'Medio', description: 'Chiedere e dare indicazioni stradali' },
            { type: 'Pratica', duration: '20 min', task: 'Google Maps in spagnolo + vai al modulo Frasi utili', difficulty: 'Medio', description: 'Pratica con tecnologia vera' },
            { type: 'Ascolto', duration: '20 min', task: 'Radio spagnola online: Cadena SER', difficulty: 'Medio-Avanzato', description: 'Anche se non capisci tutto, abituati al ritmo' },
            { type: 'Obiettivo', duration: '', task: 'Sapere chiedere "Dov\'è...?" in 3 modi diversi', difficulty: '', description: '¿Dónde está?, ¿Cómo llego a?, ¿Me puede ayudar?' }
          ],
          culturalNote: 'Gli spagnoli spesso danno indicazioni molto dettagliate, con punti di riferimento!'
        },
        {
          day: 6,
          title: 'Shopping e numeri',
          activities: [
            { type: 'Video', duration: '30 min', task: 'SpanishDict - "Números y compras"', difficulty: 'Facile', description: 'Numeri, prezzi e shopping' },
            { type: 'Pratica', duration: '25 min', task: 'Simula comprare vestiti/souvenir', difficulty: 'Medio', description: 'Taglie, colori, prezzi' },
            { type: 'Videoclip', duration: '10 min', task: 'Video musicali spagnoli con sottotitoli', difficulty: 'Medio', description: 'Divertiti mentre impari!' },
            { type: 'Obiettivo', duration: '', task: 'Conta fino a 100 senza errori', difficulty: '', description: 'Pratica prezzi e numeri di telefono' }
          ],
          culturalNote: 'In Spagna si usa spesso "¿Cuánto vale?" invece di "¿Cuánto cuesta?" per chiedere il prezzo.'
        },
        {
          day: 7,
          title: 'Revisione settimanale',
          activities: [
            { type: 'Ripasso', duration: '30 min', task: 'Riascolta i contenuti della settimana che hai trovato difficili', difficulty: 'Vario', description: 'Consolidamento attivo' },
            { type: 'Test', duration: '20 min', task: 'Quiz di autovalutazione nel modulo Vocabolario', difficulty: 'Vario', description: 'Verifica i tuoi progressi' },
            { type: 'Creativo', duration: '15 min', task: 'Scrivi un breve diario della tua settimana in spagnolo', difficulty: 'Medio', description: 'Usa le parole che hai imparato' },
            { type: 'Obiettivo', duration: '', task: 'Pianifica la settimana prossima', difficulty: '', description: 'Cosa vuoi migliorare?' }
          ],
          culturalNote: 'Celebra i piccoli progressi! Ogni parola nuova è un passo avanti.'
        }
      ]
    },
    2: {
      theme: 'Conversazioni e Situazioni Reali',
      focus: 'Aumentare fiducia nel parlato e situazioni pratiche',
      days: [
        {
          day: 8,
          title: 'Al hotel e trasporti',
          activities: [
            { type: 'Video', duration: '35 min', task: 'Canal Lingoda - "En el hotel"', difficulty: 'Medio', description: 'Check-in, problemi, richieste' },
            { type: 'Roleplay', duration: '20 min', task: 'Simula check-in hotel e problemi comuni', difficulty: 'Medio', description: 'Pratica situazioni reali' },
            { type: 'Ascolto', duration: '10 min', task: 'Annunci stazione/metro Madrid (YouTube)', difficulty: 'Avanzato', description: 'Abituarsi agli annunci pubblici' },
            { type: 'Obiettivo', duration: '', task: 'Gestire una prenotazione hotel in spagnolo', difficulty: '', description: 'Dal check-in ai problemi' }
          ],
          culturalNote: 'In Spagna è comune chiedere "¿Hay WiFi?" negli hotel, anche se oggi è quasi ovunque.'
        }
      ]
    },
    3: {
      theme: 'Cultura e Espressioni',
      focus: 'Linguaggio più naturale e comprensione culturale',
      days: [
        {
          day: 15,
          title: 'Slang e modi di dire',
          activities: [
            { type: 'Video', duration: '40 min', task: 'SpanishMojo - "20 Expresiones que usamos cada día"', difficulty: 'Avanzato', description: 'Espressioni che senti davvero per strada' },
            { type: 'Pratica', duration: '25 min', task: 'Usa il modulo Banca Frasi dell\'app', difficulty: 'Medio', description: 'Espressioni colloquiali autentiche' }
          ]
        }
      ]
    },
    4: {
      theme: 'Fluidità e Perfezionamento',
      focus: 'Conversazioni lunghe e comprensione avanzata',
      days: [
        {
          day: 22,
          title: 'Dibattiti e opinioni',
          activities: [
            { type: 'Podcast', duration: '45 min', task: 'Radio Ambulante - episodi brevi', difficulty: 'Avanzato', description: 'Storie reali dall\'America Latina' },
            { type: 'Pratica', duration: '30 min', task: 'Dibattito con te stesso su temi d\'attualità', difficulty: 'Avanzato', description: 'Esprimi opinioni complesse' }
          ]
        }
      ]
    }
  };

  const currentWeekData = immersionPlan[selectedWeek];
  const maxWeeks = Object.keys(immersionPlan).length;

  const toggleDayCompletion = (day) => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedDays(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Facile': return '#4CAF50';
      case 'Medio': return '#FF9800';
      case 'Medio-Avanzato': return '#FF5722';
      case 'Avanzato': return '#f44336';
      default: return '#666';
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'Ascolto': return '🎧';
      case 'Video': return '🎥';
      case 'Lettura': return '📚';
      case 'Parlato': return '🗣️';
      case 'Pratica': return '✍️';
      case 'Conversazione': return '💬';
      case 'Obiettivo': return '🎯';
      case 'Scrittura': return '✏️';
      case 'Vocabolario': return '📝';
      case 'Videoclip': return '🎵';
      case 'Ripasso': return '🔄';
      case 'Test': return '✅';
      case 'Creativo': return '🎨';
      case 'Roleplay': return '🎭';
      case 'Podcast': return '📻';
      default: return '📖';
    }
  };

  return (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Globe size={32} color="#9C27B0" />
        <div>
          <h1>Immersion Without Travel</h1>
          <p>Piano di immersione spagnola di 30 giorni da seguire comodamente da casa</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-value">{completedDays.size}</div>
          <div className="stat-label">Giorni Completati</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{selectedWeek}</div>
          <div className="stat-label">Settimana Attuale</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round((completedDays.size / 30) * 100)}%</div>
          <div className="stat-label">Progresso Totale</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">30</div>
          <div className="stat-label">Giorni Totali</div>
        </div>
      </div>

      {/* Week Selection */}
      <div style={{ marginBottom: '3rem' }}>
        <h2>Seleziona la settimana:</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {Array.from({length: maxWeeks}, (_, i) => i + 1).map(week => {
            const weekData = immersionPlan[week];
            const isActive = selectedWeek === week;
            return (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`module-card ${isActive ? 'active' : ''}`}
                style={{ 
                  background: isActive ? 'rgba(156, 39, 176, 0.1)' : 'white',
                  border: isActive ? '2px solid #9C27B0' : '1px solid #ddd',
                  minWidth: '250px',
                  textAlign: 'left'
                }}
              >
                <h3 style={{ color: '#9C27B0', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={20} />
                  Settimana {week}
                </h3>
                <p style={{ margin: '0 0 0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                  {weekData?.theme || 'Prossimamente...'}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>
                  {weekData?.focus || 'Contenuto in preparazione'}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Week Content */}
      {currentWeekData && (
        <div>
          <div style={{ 
            background: 'rgba(156, 39, 176, 0.1)', 
            border: '1px solid rgba(156, 39, 176, 0.3)', 
            borderRadius: '12px', 
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ margin: '0 0 1rem', color: '#9C27B0' }}>
              Settimana {selectedWeek}: {currentWeekData.theme}
            </h2>
            <p style={{ margin: 0, fontSize: '1.1rem', color: '#555' }}>
              <strong>Focus:</strong> {currentWeekData.focus}
            </p>
          </div>

          {/* Daily Activities */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            {currentWeekData.days.map((dayData) => {
              const isCompleted = completedDays.has(dayData.day);
              return (
                <div 
                  key={dayData.day}
                  style={{ 
                    background: isCompleted ? 'rgba(76, 175, 80, 0.05)' : 'white',
                    border: isCompleted ? '2px solid #4CAF50' : '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '2rem',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem', color: '#9C27B0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} />
                        Giorno {dayData.day}: {dayData.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleDayCompletion(dayData.day)}
                      style={{
                        background: isCompleted ? '#4CAF50' : '#ddd',
                        color: isCompleted ? 'white' : '#666',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isCompleted ? <CheckCircle size={20} /> : <Calendar size={20} />}
                    </button>
                  </div>

                  {/* Activities */}
                  <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                    {dayData.activities.map((activity, index) => (
                      <div 
                        key={index}
                        style={{ 
                          background: activity.type === 'Obiettivo' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(247, 247, 247, 0.8)',
                          border: `1px solid ${activity.type === 'Obiettivo' ? 'rgba(255, 193, 7, 0.3)' : '#eee'}`,
                          borderRadius: '8px',
                          padding: '1.5rem',
                          borderLeft: `4px solid ${getDifficultyColor(activity.difficulty)}`
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{getActivityIcon(activity.type)}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                              <h4 style={{ margin: 0, color: '#333' }}>{activity.type}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {activity.duration && (
                                  <span style={{ 
                                    background: '#667eea', 
                                    color: 'white', 
                                    padding: '0.2rem 0.6rem', 
                                    borderRadius: '12px', 
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                  }}>
                                    <Clock size={12} />
                                    {activity.duration}
                                  </span>
                                )}
                                {activity.difficulty && (
                                  <span style={{ 
                                    background: getDifficultyColor(activity.difficulty), 
                                    color: 'white', 
                                    padding: '0.2rem 0.6rem', 
                                    borderRadius: '12px', 
                                    fontSize: '0.8rem'
                                  }}>
                                    {activity.difficulty}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p style={{ margin: '0.5rem 0', fontWeight: '600', color: '#555' }}>
                              {activity.task}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cultural Note */}
                  <div style={{ 
                    background: 'rgba(33, 150, 243, 0.1)', 
                    border: '1px solid rgba(33, 150, 243, 0.3)', 
                    borderRadius: '8px', 
                    padding: '1rem'
                  }}>
                    <h4 style={{ margin: '0 0 0.5rem', color: '#1976D2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🇪🇸 Curiosità Culturale
                    </h4>
                    <p style={{ margin: 0, fontStyle: 'italic' }}>{dayData.culturalNote}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resources and Tips */}
      <div style={{ margin: '3rem 0', padding: '2rem', background: 'rgba(156, 39, 176, 0.1)', borderRadius: '12px' }}>
        <h2>🎯 Consigli per il successo dell'immersione</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h3>⏰ Gestione del tempo</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Dedica 60-90 minuti al giorno</li>
              <li>Meglio poco ogni giorno che tanto una volta</li>
              <li>Usa i tempi morti (trasporti, pausa pranzo)</li>
              <li>Weekend: rilassati ma non fermarti</li>
            </ul>
          </div>
          <div>
            <h3>🎧 Ottimizza l'ascolto</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Ascolta anche senza capire tutto</li>
              <li>Usa velocità 0.75x se troppo veloce</li>
              <li>Sottotitoli in spagnolo, mai in italiano</li>
              <li>Ripeti frasi che ti colpiscono</li>
            </ul>
          </div>
          <div>
            <h3>💬 Pratica attiva</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Parla ad alta voce, anche da solo</li>
              <li>Registra te stesso e riascoltati</li>
              <li>Non aver paura degli errori</li>
              <li>Usa HelloTalk per chattare con nativi</li>
            </ul>
          </div>
          <div>
            <h3>📚 Risorse extra</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Netflix con audio spagnolo</li>
              <li>Spotify: playlist "Spanish Pop"</li>
              <li>Instagram: segui account spagnoli</li>
              <li>Cambia il telefono in spagnolo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Motivation */}
      <div style={{ 
        background: 'linear-gradient(135deg, #FF9800, #F57C00)', 
        borderRadius: '12px', 
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Star size={24} />
          Motivazione di Emergenza!
        </h2>
        <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.95 }}>
          Ricorda: ogni attività completata ti avvicina al tuo obiettivo di parlare spagnolo con sicurezza. 
          Non devi essere perfetto, devi solo essere costante. ¡Tú puedes hacerlo! 🚀
        </p>
      </div>
    </div>
  );
};

export default ImmersionPlan;