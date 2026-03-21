import React, { useState } from 'react';
import { ArrowLeft, Book, Volume2, Star, Search, Filter } from 'lucide-react';

const PhraseBank = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('conversation');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritesPhrases, setFavoritesPhrases] = useState(new Set());

  // Text-to-speech function
  const speakPhrase = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const phrasesData = {
    conversation: {
      name: 'Riempitivi e Conversazione',
      description: 'Parole e frasi che rendono il discorso naturale',
      phrases: [
        {
          spanish: 'A ver...',
          italian: 'Vediamo un po\'...',
          usage: 'Per iniziare a riflettere su qualcosa',
          context: 'Universale',
          example: 'A ver, ¿qué podemos hacer?',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: '¿Sabes qué?',
          italian: 'Sai cosa?',
          usage: 'Per introdurre un nuovo argomento',
          context: 'Informale',
          example: '¿Sabes qué? Mejor vamos mañana.',
          slangLevel: 'Colloquiale',
          region: 'Ovunque'
        },
        {
          spanish: 'O sea',
          italian: 'Cioè',
          usage: 'Per spiegare o riformulare',
          context: 'Molto comune',
          example: 'O sea, no entiendo nada.',
          slangLevel: 'Colloquiale',
          region: 'Ovunque'
        },
        {
          spanish: 'En plan...',
          italian: 'Tipo...',
          usage: 'Espressione giovane, come "tipo" in italiano',
          context: 'Giovani',
          example: 'Estaba en plan confundido.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'Vale, vale',
          italian: 'Ok, ok',
          usage: 'Conferma, equivale a "OK"',
          context: 'Spagna',
          example: 'Vale, te llamo luego.',
          slangLevel: 'Standard',
          region: 'Spagna'
        },
        {
          spanish: 'Venga, va',
          italian: 'Dai, su',
          usage: 'Per convincere qualcuno',
          context: 'Spagna',
          example: '¡Venga, va! ¡Vamos al cine!',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: 'A lo mejor',
          italian: 'Forse',
          usage: 'Possibilità, dubbio',
          context: 'Universale',
          example: 'A lo mejor llueve mañana.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Bueno...',
          italian: 'Beh...',
          usage: 'Riempitivo, all\'inizio di frase',
          context: 'Universale',
          example: 'Bueno, yo creo que sí.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        }
      ]
    },
    reactions: {
      name: 'Reazioni ed Emozioni',
      description: 'Espressioni per reagire alle situazioni',
      phrases: [
        {
          spanish: '¡Qué fuerte!',
          italian: 'Che roba forte!',
          usage: 'Sorpresa per qualcosa di intenso',
          context: 'Informale',
          example: '¡Qué fuerte lo que me has contado!',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: '¡No me digas!',
          italian: 'Non me lo dire!',
          usage: 'Sorpresa, incredulità',
          context: 'Universale',
          example: '¡No me digas que aprobaste!',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: '¡Qué rollo!',
          italian: 'Che palle!',
          usage: 'Fastidio, noia',
          context: 'Spagna, giovani',
          example: '¡Qué rollo tener que madrugar!',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: '¡Qué guay!',
          italian: 'Che figata!',
          usage: 'Entusiasmo, approvazione',
          context: 'Spagna, giovani',
          example: '¡Qué guay tu nueva camiseta!',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: '¡Qué chulo!',
          italian: 'Che bello!',
          usage: 'Ammiracja per qualcosa di carino',
          context: 'Spagna',
          example: '¡Qué chulo tu nuevo corte de pelo!',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: 'Me da igual',
          italian: 'Mi fa lo stesso',
          usage: 'Indifferenza',
          context: 'Universale',
          example: 'Me da igual ir en coche o andando.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: '¡Qué va!',
          italian: 'Ma va!',
          usage: 'Negazione enfatica',
          context: 'Spagna',
          example: '¿Estás cansado? ¡Qué va!',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: 'Mola mucho',
          italian: 'Spacca',
          usage: 'Significa "è fantastico"',
          context: 'Spagna, giovani',
          example: 'Esta película mola mucho.',
          slangLevel: 'Slang',
          region: 'Spagna'
        }
      ]
    },
    daily: {
      name: 'Vita Quotidiana',
      description: 'Frasi pratiche per situazioni di tutti i giorni',
      phrases: [
        {
          spanish: 'Me pilla lejos',
          italian: 'È troppo lontano per me',
          usage: 'Quando un posto è scomodo da raggiungere',
          context: 'Spagna',
          example: 'Esa tienda me pilla lejos.',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: 'Me pillas',
          italian: 'Mi hai beccato/colto',
          usage: 'Quando qualcuno ti coglie in fallo',
          context: 'Spagna',
          example: '¿Comiendo chocolate? Me pillas.',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: 'Estoy hasta las narices',
          italian: 'Ne ho piene le scatole',
          usage: 'Quando sei stufo di qualcosa',
          context: 'Informale',
          example: 'Estoy hasta las narices del trabajo.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'Me apetece',
          italian: 'Mi va di...',
          usage: 'Desiderio, voglia',
          context: 'Spagna',
          example: 'Me apetece un helado.',
          slangLevel: 'Standard',
          region: 'Spagna'
        },
        {
          spanish: '¿Te apuntas?',
          italian: 'Ci stai?',
          usage: 'Invitare qualcuno a partecipare',
          context: 'Universale',
          example: 'Vamos al cine, ¿te apuntas?',
          slangLevel: 'Colloquiale',
          region: 'Ovunque'
        },
        {
          spanish: 'Me voy pitando',
          italian: 'Scappo/corro via',
          usage: 'Andarsene in fretta',
          context: 'Spagna',
          example: 'Me voy pitando que llego tarde.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'Nos vemos',
          italian: 'Ci vediamo',
          usage: 'Saluto informale',
          context: 'Universale',
          example: 'Bueno, nos vemos mañana.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Que tengas buen día',
          italian: 'Buona giornata',
          usage: 'Augurio educato',
          context: 'Formale/informale',
          example: 'Vale, que tengas buen día.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        }
      ]
    },
    surprise: {
      name: 'Sorpresa e Esclamazioni',
      description: 'Espressioni spontanee e reazioni immediate',
      phrases: [
        {
          spanish: '¡ anda!',
          italian: 'Ma va!',
          usage: 'Sorpresa lieve',
          context: 'Spagna',
          example: '¡Anda! ¡Qué casualidad verte aquí!',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        },
        {
          spanish: 'De locos',
          italian: 'Da pazzi',
          usage: 'Qualcosa di incredibile',
          context: 'Giovani',
          example: 'El concierto estuvo de locos.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'Flipante',
          italian: 'Assurdo/incredibile',
          usage: 'Qualcosa di impressionante',
          context: 'Spagna, giovani',
          example: 'Tu casa nueva está flipante.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: '¡Toma ya!',
          italian: 'Eccolo lì!/Prendilo!',
          usage: 'Sorpresa positiva, celebrazione',
          context: 'Spagna',
          example: '¿Has aprobado? ¡Toma ya!',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'De muerte',
          italian: 'Mortale/fantastico',
          usage: 'Qualcosa di eccezionale',
          context: 'Spagna',
          example: 'La comida estaba de muerte.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: '¡Qué pasada!',
          italian: 'Che roba!',
          usage: 'Ammirazione per qualcosa di impressionante',
          context: 'Spagna',
          example: '¡Qué pasada de coche tienes!',
          slangLevel: 'Colloquiale',
          region: 'Spagna'
        }
      ]
    },
    opinions: {
      name: 'Opinioni e Giudizi',
      description: 'Esprimere quello che pensi in modo naturale',
      phrases: [
        {
          spanish: 'No está mal',
          italian: 'Non c\'è male',
          usage: 'Approvazione moderata',
          context: 'Universale',
          example: 'La película no está mal.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Está chupado',
          italian: 'È una cosa da niente',
          usage: 'Qualcosa di facile',
          context: 'Spagna',
          example: 'El examen está chupado.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'Es un coñazo',
          italian: 'È una palla mortale',
          usage: 'Qualcosa di noioso (un po\' volgare)',
          context: 'Spagna, informale',
          example: 'Esta película es un coñazo.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'Me flipa',
          italian: 'Mi piace un sacco',
          usage: 'Entusiasmo forte',
          context: 'Spagna, giovani',
          example: 'Me flipa esta canción.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: 'No me convence',
          italian: 'Non mi convince',
          usage: 'Dubbio, perplessità',
          context: 'Universale',
          example: 'Este plan no me convence.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Es lo que hay',
          italian: 'È quello che c\'è',
          usage: 'Rassegnazione, accettazione',
          context: 'Universale',
          example: 'No es perfecto, pero es lo que hay.',
          slangLevel: 'Colloquiale',
          region: 'Ovunque'
        }
      ]
    },
    social: {
      name: 'Relazioni Sociali',
      description: 'Frasi per interagire con amici e conoscenti',
      phrases: [
        {
          spanish: '¿Qué tal todo?',
          italian: 'Come va tutto?',
          usage: 'Saluto informale',
          context: 'Universale',
          example: '¡Hola! ¿Qué tal todo?',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Por ahí ando',
          italian: 'Tiro avanti',
          usage: 'Risposta a "come va?"',
          context: 'Informale',
          example: '¿Qué tal? Por ahí ando.',
          slangLevel: 'Colloquiale',
          region: 'Ovunque'
        },
        {
          spanish: 'Date prisa',
          italian: 'Sbrigati',
          usage: 'Sollecitare qualcuno',
          context: 'Universale',
          example: 'Date prisa que llegamos tarde.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'No te rayes',
          italian: 'Non farti paranoie',
          usage: 'Consolare, tranquillizzare',
          context: 'Spagna, giovani',
          example: 'No te rayes, todo irá bien.',
          slangLevel: 'Slang',
          region: 'Spagna'
        },
        {
          spanish: '¿En serio?',
          italian: 'Davvero?',
          usage: 'Conferma, sorpresa',
          context: 'Universale',
          example: '¿En serio has corrido 10 km?',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Quédate tranquilo',
          italian: 'Stai tranquillo',
          usage: 'Rassicurare qualcuno',
          context: 'Universale',
          example: 'Quédate tranquilo, yo me ocupo.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'No te preocupes',
          italian: 'Non ti preoccupare',
          usage: 'Consolare, rassicurare',
          context: 'Universale',
          example: 'No te preocupes por el dinero.',
          slangLevel: 'Standard',
          region: 'Ovunque'
        },
        {
          spanish: 'Déjalo estar',
          italian: 'Lascia perdere',
          usage: 'Suggerire di non insistere',
          context: 'Universale',
          example: 'Déjalo estar, no vale la pena.',
          slangLevel: 'Colloquiale',
          region: 'Ovunque'
        }
      ]
    }
  };

  const categories = Object.keys(phrasesData);
  const currentPhrases = phrasesData[selectedCategory].phrases;

  // Search functionality
  const filteredPhrases = currentPhrases.filter(phrase => 
    phrase.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phrase.italian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phrase.usage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (phraseId) => {
    const newFavorites = new Set(favoritesPhrases);
    if (newFavorites.has(phraseId)) {
      newFavorites.delete(phraseId);
    } else {
      newFavorites.add(phraseId);
    }
    setFavoritesPhrases(newFavorites);
  };

  const getSlangLevelColor = (level) => {
    switch(level) {
      case 'Standard': return '#4CAF50';
      case 'Colloquiale': return '#FF9800';
      case 'Slang': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Book size={32} color="#607D8B" />
        <div>
          <h1>Real-World Phrase Bank</h1>
          <p>50 frasi autentiche che gli spagnoli usano davvero - niente spagnolo da libro di testo!</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input
            type="text"
            placeholder="Cerca frasi per parola o significato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 3rem',
              border: '2px solid #ddd',
              borderRadius: '25px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      {/* Category Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Categorie:</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          {categories.map(categoryKey => {
            const category = phrasesData[categoryKey];
            const isSelected = selectedCategory === categoryKey;
            return (
              <button
                key={categoryKey}
                onClick={() => setSelectedCategory(categoryKey)}
                className={`module-card ${isSelected ? 'active' : ''}`}
                style={{ 
                  background: isSelected ? 'rgba(96, 125, 139, 0.1)' : 'white',
                  border: isSelected ? '2px solid #607D8B' : '1px solid #ddd',
                  textAlign: 'left'
                }}
              >
                <h3 style={{ color: '#607D8B', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                  {category.name}
                </h3>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  {category.description}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#999' }}>
                  {category.phrases.length} frasi
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Category Info */}
      <div style={{ 
        background: 'rgba(96, 125, 139, 0.1)', 
        border: '1px solid rgba(96, 125, 139, 0.3)', 
        borderRadius: '12px', 
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ margin: '0 0 0.5rem', color: '#607D8B' }}>
          {phrasesData[selectedCategory].name}
        </h2>
        <p style={{ margin: 0, fontSize: '1rem' }}>
          {phrasesData[selectedCategory].description}
        </p>
      </div>

      {/* Phrases List */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredPhrases.map((phrase, index) => {
          const phraseId = `${selectedCategory}-${index}`;
          const isFavorite = favoritesPhrases.has(phraseId);
          
          return (
            <div 
              key={index}
              className="phrase-item"
              style={{ 
                background: isFavorite ? 'rgba(255, 193, 7, 0.1)' : 'white',
                border: `1px solid ${isFavorite ? '#FFC107' : '#e0e0e0'}`,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#607D8B', fontSize: '1.3rem' }}>
                      {phrase.spanish}
                    </h3>
                    <button 
                      onClick={() => speakPhrase(phrase.spanish)}
                      className="audio-btn"
                      style={{ width: '35px', height: '35px' }}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                  
                  <p style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: '#333', fontWeight: '500' }}>
                    🇮🇹 {phrase.italian}
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorite(phraseId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isFavorite ? '#FFC107' : '#ddd',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <Star size={24} fill={isFavorite ? '#FFC107' : 'none'} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.3rem', color: '#666', fontSize: '0.9rem' }}>💬 QUANDO SI USA:</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{phrase.usage}</p>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 0.3rem', color: '#666', fontSize: '0.9rem' }}>🌍 CONTESTO:</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{phrase.context}</p>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 0.3rem', color: '#666', fontSize: '0.9rem' }}>📍 REGIONE:</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{phrase.region}</p>
                </div>
              </div>

              <div style={{ 
                background: 'rgba(247, 247, 247, 0.8)', 
                borderRadius: '8px', 
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#333', fontSize: '0.9rem' }}>📝 ESEMPIO:</h4>
                <p style={{ margin: 0, fontSize: '1rem', fontStyle: 'italic' }}>{phrase.example}</p>
              </div>

              <div style={{ display: 'flex', justify: 'center', alignItems: 'center' }}>
                <span style={{ 
                  background: getSlangLevelColor(phrase.slangLevel), 
                  color: 'white', 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: '15px', 
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {phrase.slangLevel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPhrases.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          <Search size={48} color="#ddd" />
          <p style={{ margin: '1rem 0 0', fontSize: '1.1rem' }}>
            Nessuna frase trovata per "{searchTerm}"
          </p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
            Prova con altri termini di ricerca o cambia categoria.
          </p>
        </div>
      )}

      {/* Legend */}
      <div style={{ 
        background: 'rgba(96, 125, 139, 0.1)', 
        borderRadius: '12px', 
        padding: '2rem',
        marginTop: '3rem'
      }}>
        <h2>🏷️ Legenda Livelli di Formalità</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: '#4CAF50', padding: '0.3rem 0.8rem', borderRadius: '15px', color: 'white', fontSize: '0.8rem' }}>
              Standard
            </span>
            <span>Sicuro da usare ovunque</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: '#FF9800', padding: '0.3rem 0.8rem', borderRadius: '15px', color: 'white', fontSize: '0.8rem' }}>
              Colloquiale
            </span>
            <span>Con amici e familiari</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: '#f44336', padding: '0.3rem 0.8rem', borderRadius: '15px', color: 'white', fontSize: '0.8rem' }}>
              Slang
            </span>
            <span>Solo in contesti molto informali</span>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div style={{ margin: '3rem 0', padding: '2rem', background: 'rgba(96, 125, 139, 0.1)', borderRadius: '12px' }}>
        <h2>💡 Consigli per l'uso delle frasi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
          <div>
            <h3>🎯 Contestualizzazione</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Osserva sempre il contesto nella descrizione</li>
              <li>Inizia con frasi "Standard" se non sei sicuro</li>
              <li>Lo slang varia molto tra generazioni</li>
              <li>Ascolta come le usano i nativi</li>
            </ul>
          </div>
          <div>
            <h3>🗣️ Pratica Attiva</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Aggiungi le frasi preferite ai favoriti</li>
              <li>Usa ogni frase in 3 situazioni diverse</li>
              <li>Registrati mentre le pronunci</li>
              <li>Prova variazioni con parole diverse</li>
            </ul>
          </div>
          <div>
            <h3>📚 Apprendimento Progressivo</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Inizia con le categorie più universali</li>
              <li>Impara 5-7 frasi nuove a settimana</li>
              <li>Ripassa quelle già studiate regolarmente</li>
              <li>Nota le differenze regionali</li>
            </ul>
          </div>
          <div>
            <h3>🌍 Aspetti Culturali</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Ogni frase riflette una mentalità</li>
              <li>Le reazioni variano tra regioni</li>
              <li>Osserva il linguaggio del corpo</li>
              <li>Rispetta i livelli di formalità</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cultural Warning */}
      <div style={{ 
        background: 'linear-gradient(135deg, #FF5722, #F44336)', 
        borderRadius: '12px', 
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          ⚠️ Attenzione Culturale!
        </h2>
        <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.95 }}>
          Alcune espressioni possono suonare strane se usate male. Quando sei in dubbio, osserva prima 
          come le usano i nativi, poi inizia a usarle gradualmente. Il contesto è tutto! 🇪🇸
        </p>
      </div>
    </div>
  );
};

export default PhraseBank;