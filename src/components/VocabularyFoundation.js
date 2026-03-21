import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Volume2 } from 'lucide-react';

const VocabularyFoundation = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('greetings');
  const [completedWords, setCompletedWords] = useState(new Set());

  // Text-to-speech function
  const speakWord = (text, lang = 'es-ES') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const vocabularyData = {
    greetings: {
      name: 'Saluti e Cortesie',
      words: [
        { spanish: 'hola', italian: 'ciao', pronunciation: 'OH-lah', tip: 'La H è muta, come in italiano "hotel"' },
        { spanish: 'buenos días', italian: 'buongiorno', pronunciation: 'BWAY-nohs DEE-ahs', tip: 'Praticamente identico all\'italiano' },
        { spanish: 'buenas tardes', italian: 'buon pomeriggio', pronunciation: 'BWAY-nahs TAR-dehs', tip: 'Usato dalle 14:00 in poi' },
        { spanish: 'buenas noches', italian: 'buonanotte', pronunciation: 'BWAY-nahs NOH-chehs', tip: 'Per dire addio di sera' },
        { spanish: 'adiós', italian: 'addio/ciao', pronunciation: 'ah-DYOHS', tip: 'La S finale è sempre pronunciata' },
        { spanish: 'hasta luego', italian: 'a dopo', pronunciation: 'AHS-tah LWAY-goh', tip: 'Molto comune, più di "adiós"' },
        { spanish: 'por favor', italian: 'per favore', pronunciation: 'por fah-VOR', tip: 'La R è sempre pronunciata' },
        { spanish: 'gracias', italian: 'grazie', pronunciation: 'GRAH-thyahs', tip: 'In Spagna: TH come in "thin"' },
        { spanish: 'de nada', italian: 'prego', pronunciation: 'deh NAH-dah', tip: 'Risposta a "gracias"' },
        { spanish: 'perdón', italian: 'scusa', pronunciation: 'per-DOHN', tip: 'Accento sulla O' }
      ]
    },
    family: {
      name: 'Famiglia',
      words: [
        { spanish: 'familia', italian: 'famiglia', pronunciation: 'fah-MEE-lyah', tip: 'Quasi identico all\'italiano' },
        { spanish: 'padre', italian: 'padre', pronunciation: 'PAH-dreh', tip: 'Identico, ma pronuncia la E finale' },
        { spanish: 'madre', italian: 'madre', pronunciation: 'MAH-dreh', tip: 'Identico, ma pronuncia la E finale' },
        { spanish: 'hermano', italian: 'fratello', pronunciation: 'er-MAH-noh', tip: 'H muta, come "ermano"' },
        { spanish: 'hermana', italian: 'sorella', pronunciation: 'er-MAH-nah', tip: 'H muta' },
        { spanish: 'hijo', italian: 'figlio', pronunciation: 'EE-hoh', tip: 'H muta, J suona come Y italiana' },
        { spanish: 'hija', italian: 'figlia', pronunciation: 'EE-hah', tip: 'J suona come Y italiana' },
        { spanish: 'abuelo', italian: 'nonno', pronunciation: 'ah-BWAY-loh', tip: 'Termine affettuoso' },
        { spanish: 'abuela', italian: 'nonna', pronunciation: 'ah-BWAY-lah', tip: 'Termine affettuoso' },
        { spanish: 'esposo', italian: 'marito', pronunciation: 'ehs-POH-soh', tip: 'Più formale di "marido"' }
      ]
    },
    food: {
      name: 'Cibo',
      words: [
        { spanish: 'comida', italian: 'cibo', pronunciation: 'koh-MEE-dah', tip: 'Significa anche "pranzo"' },
        { spanish: 'agua', italian: 'acqua', pronunciation: 'AH-gwah', tip: 'GU come in italiano "guanto"' },
        { spanish: 'pan', italian: 'pane', pronunciation: 'pahn', tip: 'Semplice, senza E finale' },
        { spanish: 'carne', italian: 'carne', pronunciation: 'KAR-neh', tip: 'Identico, pronuncia la E' },
        { spanish: 'pescado', italian: 'pesce', pronunciation: 'pehs-KAH-doh', tip: 'Non confondere con "pez" (pesce vivo)' },
        { spanish: 'arroz', italian: 'riso', pronunciation: 'ah-ROHTH', tip: 'In Spagna: Z come TH inglese' },
        { spanish: 'verduras', italian: 'verdure', pronunciation: 'ver-DOO-rahs', tip: 'Termine generico per vegetali' },
        { spanish: 'fruta', italian: 'frutta', pronunciation: 'FROO-tah', tip: 'Singolare in spagnolo' },
        { spanish: 'leche', italian: 'latte', pronunciation: 'LEH-cheh', tip: 'CH come in italiano "ciao"' },
        { spanish: 'cerveza', italian: 'birra', pronunciation: 'ther-VEH-thah', tip: 'Z come TH in Spagna' }
      ]
    },
    time: {
      name: 'Tempo',
      words: [
        { spanish: 'hora', italian: 'ora', pronunciation: 'OH-rah', tip: 'H sempre muta' },
        { spanish: 'día', italian: 'giorno', pronunciation: 'DEE-ah', tip: 'Accento sulla I' },
        { spanish: 'semana', italian: 'settimana', pronunciation: 'seh-MAH-nah', tip: 'Più corto dell\'italiano' },
        { spanish: 'mes', italian: 'mese', pronunciation: 'mehs', tip: 'Senza E finale' },
        { spanish: 'año', italian: 'anno', pronunciation: 'AH-nyoh', tip: 'Ñ come GN italiano' },
        { spanish: 'ayer', italian: 'ieri', pronunciation: 'ah-YER', tip: 'Y come in "yogurt"' },
        { spanish: 'hoy', italian: 'oggi', pronunciation: 'oy', tip: 'Come "oi" italiano senza I' },
        { spanish: 'mañana', italian: 'domani/mattina', pronunciation: 'mah-NYAH-nah', tip: 'Può significare entrambi' },
        { spanish: 'noche', italian: 'notte', pronunciation: 'NOH-cheh', tip: 'CH come in italiano "ciao"' },
        { spanish: 'tarde', italian: 'pomeriggio', pronunciation: 'TAR-deh', tip: 'Anche "tardi"' }
      ]
    },
    colors: {
      name: 'Colori',
      words: [
        { spanish: 'color', italian: 'colore', pronunciation: 'koh-LOR', tip: 'Senza E finale' },
        { spanish: 'blanco', italian: 'bianco', pronunciation: 'BLAHN-koh', tip: 'NC invece di NC+O' },
        { spanish: 'negro', italian: 'nero', pronunciation: 'NEH-groh', tip: 'G dolce come in "gelato"' },
        { spanish: 'rojo', italian: 'rosso', pronunciation: 'ROH-hoh', tip: 'J suona come H aspirata' },
        { spanish: 'azul', italian: 'blu', pronunciation: 'ah-THOOL', tip: 'Z come TH in Spagna' },
        { spanish: 'verde', italian: 'verde', pronunciation: 'VER-deh', tip: 'Identico, pronuncia la E' },
        { spanish: 'amarillo', italian: 'giallo', pronunciation: 'ah-mah-REE-lyoh', tip: 'LL come LY italiano' },
        { spanish: 'naranja', italian: 'arancione', pronunciation: 'nah-RAHN-hah', tip: 'J come H aspirata' },
        { spanish: 'rosa', italian: 'rosa', pronunciation: 'ROH-sah', tip: 'Identico' },
        { spanish: 'gris', italian: 'grigio', pronunciation: 'grees', tip: 'Come "grease" inglese' }
      ]
    },
    numbers: {
      name: 'Numeri',
      words: [
        { spanish: 'uno', italian: 'uno', pronunciation: 'OO-noh', tip: 'Identico' },
        { spanish: 'dos', italian: 'due', pronunciation: 'dohs', tip: 'S finale pronunciata' },
        { spanish: 'tres', italian: 'tre', pronunciation: 'trehs', tip: 'Con S finale' },
        { spanish: 'cuatro', italian: 'quattro', pronunciation: 'KWAH-troh', tip: 'Senza doppia T' },
        { spanish: 'cinco', italian: 'cinque', pronunciation: 'THEEN-koh', tip: 'Senza QUE finale' },
        { spanish: 'seis', italian: 'sei', pronunciation: 'says', tip: 'EI come in "lei"' },
        { spanish: 'siete', italian: 'sette', pronunciation: 'SYEH-teh', tip: 'IE come in "miele"' },
        { spanish: 'ocho', italian: 'otto', pronunciation: 'OH-choh', tip: 'CH come in "ciao"' },
        { spanish: 'nueve', italian: 'nove', pronunciation: 'NWAY-veh', tip: 'UE come "bueno"' },
        { spanish: 'diez', italian: 'dieci', pronunciation: 'dyeth', tip: 'Z come TH in Spagna' }
      ]
    }
  };

  const categories = Object.keys(vocabularyData);
  const currentWords = vocabularyData[selectedCategory]?.words || [];
  
  const toggleWordCompletion = (word) => {
    const newCompleted = new Set(completedWords);
    if (newCompleted.has(word.spanish)) {
      newCompleted.delete(word.spanish);
    } else {
      newCompleted.add(word.spanish);
    }
    setCompletedWords(newCompleted);
  };

  const progress = (completedWords.size / 100) * 100;

  return (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <BookOpen size={32} color="#4CAF50" />
        <div>
          <h1>Fluent Foundation Builder</h1>
          <p>Le 100 parole essenziali per conversazioni quotidiane in spagnolo</p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Progresso: {completedWords.size}/100 parole ({Math.round(progress)}%)
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn ${selectedCategory === category ? '' : 'secondary'}`}
            style={{ minWidth: '150px' }}
          >
            {vocabularyData[category].name}
          </button>
        ))}
      </div>

      <h2 style={{ margin: '2rem 0 1rem', color: '#4CAF50' }}>
        {vocabularyData[selectedCategory]?.name}
      </h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {currentWords.map((word, index) => (
          <div 
            key={index} 
            className={`word-card ${completedWords.has(word.spanish) ? 'completed' : ''}`}
            style={{ 
              background: completedWords.has(word.spanish) ? '#e8f5e8' : 'white',
              border: completedWords.has(word.spanish) ? '2px solid #4CAF50' : '1px solid #ddd'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#667eea', margin: 0, fontSize: '1.5rem' }}>
                    {word.spanish}
                  </h3>
                  <button 
                    className="audio-btn"
                    onClick={() => speakWord(word.spanish)}
                    title="Ascolta pronuncia"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <strong>Italiano:</strong> {word.italian}
                  </div>
                  <div>
                    <strong>Pronuncia:</strong> <em>{word.pronunciation}</em>
                  </div>
                </div>
                
                <div className="pronunciation-tip">
                  <strong>💡 Consiglio:</strong> {word.tip}
                </div>
              </div>
              
              <button
                onClick={() => toggleWordCompletion(word)}
                style={{
                  background: completedWords.has(word.spanish) ? '#4CAF50' : '#ddd',
                  color: completedWords.has(word.spanish) ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                {completedWords.has(word.spanish) ? '✓' : '○'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: '3rem 0', padding: '2rem', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px' }}>
        <h2>🎯 Suggerimenti per memorizzare meglio</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Ripetizione spaziata:</strong> Rivedi le parole completate dopo 1 giorno, 3 giorni, 1 settimana</li>
          <li><strong>Associazioni:</strong> Collega le parole spagnole a quelle italiane simili</li>
          <li><strong>Contesto:</strong> Usa ogni parola in una frase semplice</li>
          <li><strong>Pronuncia:</strong> Ascolta e ripeti ad alta voce ogni parola</li>
          <li><strong>Scrittura:</strong> Scrivi le parole che trovi più difficili</li>
        </ul>
      </div>
    </div>
  );
};

export default VocabularyFoundation;