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
        { spanish: 'perdón', italian: 'scusa', pronunciation: 'per-DOHN', tip: 'Accento sulla O' },
        { spanish: '¿Cómo estás?', italian: 'Come stai?', pronunciation: 'KOH-moh ehs-TAHS', tip: 'Domanda informale' },
        { spanish: 'Muy bien', italian: 'Molto bene', pronunciation: 'mooy bee-EHN', tip: 'Risposta standard' },
        { spanish: 'Encantado/a', italian: 'Piacere', pronunciation: 'ehn-kahn-TAH-doh/dah', tip: 'Al primo incontro' },
        { spanish: '¿Qué tal?', italian: 'Come va?', pronunciation: 'keh tahl', tip: 'Saluto informale' },
        { spanish: 'Nos vemos', italian: 'Ci vediamo', pronunciation: 'nohs VEH-mohs', tip: 'Saluto di commiato' }
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
        { spanish: 'esposo', italian: 'marito', pronunciation: 'ehs-POH-soh', tip: 'Più formale di "marido"' },
        { spanish: 'esposa', italian: 'moglie', pronunciation: 'ehs-POH-sah', tip: 'Termine formale' },
        { spanish: 'tío', italian: 'zio', pronunciation: 'TEE-oh', tip: 'Accento sulla I' },
        { spanish: 'tía', italian: 'zia', pronunciation: 'TEE-ah', tip: 'Accento sulla I' },
        { spanish: 'primo', italian: 'cugino', pronunciation: 'PREE-moh', tip: 'Falso amico!' },
        { spanish: 'prima', italian: 'cugina', pronunciation: 'PREE-mah', tip: 'Non significa "prima"!' }
      ]
    },
    food: {
      name: 'Cibo e Bevande',
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
        { spanish: 'cerveza', italian: 'birra', pronunciation: 'ther-VEH-thah', tip: 'Z come TH in Spagna' },
        { spanish: 'vino', italian: 'vino', pronunciation: 'VEE-noh', tip: 'V pronunciata come B' },
        { spanish: 'café', italian: 'caffè', pronunciation: 'kah-FEH', tip: 'Accento sull\'ultima sillaba' },
        { spanish: 'té', italian: 'tè', pronunciation: 'teh', tip: 'Semplice come in italiano' },
        { spanish: 'azúcar', italian: 'zucchero', pronunciation: 'ah-THOO-kar', tip: 'Z come TH in Spagna' },
        { spanish: 'sal', italian: 'sale', pronunciation: 'sahl', tip: 'Senza E finale' }
      ]
    },
    time: {
      name: 'Tempo e Date',
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
        { spanish: 'tarde', italian: 'pomeriggio', pronunciation: 'TAR-deh', tip: 'Anche "tardi"' },
        { spanish: 'lunes', italian: 'lunedì', pronunciation: 'LOO-nehs', tip: 'Senza accento' },
        { spanish: 'martes', italian: 'martedì', pronunciation: 'MAR-tehs', tip: 'Senza accento' },
        { spanish: 'miércoles', italian: 'mercoledì', pronunciation: 'mee-ER-koh-lehs', tip: 'Accento sulla E' },
        { spanish: 'jueves', italian: 'giovedì', pronunciation: 'HWEH-vehs', tip: 'J suona come H' },
        { spanish: 'viernes', italian: 'venerdì', pronunciation: 'vee-ER-nehs', tip: 'Senza accento finale' }
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
        { spanish: 'gris', italian: 'grigio', pronunciation: 'grees', tip: 'Come "grease" inglese' },
        { spanish: 'morado', italian: 'viola', pronunciation: 'moh-RAH-doh', tip: 'Colore diverso dall\'italiano' },
        { spanish: 'marrón', italian: 'marrone', pronunciation: 'mah-RROHN', tip: 'RR forte' },
        { spanish: 'dorado', italian: 'oro/dorato', pronunciation: 'doh-RAH-doh', tip: 'Come "oro"' },
        { spanish: 'plateado', italian: 'argento', pronunciation: 'plah-teh-AH-doh', tip: 'Come "plata"' },
        { spanish: 'transparente', italian: 'trasparente', pronunciation: 'trans-pah-REN-teh', tip: 'Quasi identico' }
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
        { spanish: 'diez', italian: 'dieci', pronunciation: 'dyeth', tip: 'Z come TH in Spagna' },
        { spanish: 'once', italian: 'undici', pronunciation: 'OHN-theh', tip: 'C come TH in Spagna' },
        { spanish: 'doce', italian: 'dodici', pronunciation: 'DOH-theh', tip: 'C come TH in Spagna' },
        { spanish: 'veinte', italian: 'venti', pronunciation: 'VEYN-teh', tip: 'EI come in spagnolo' },
        { spanish: 'cien', italian: 'cento', pronunciation: 'thyen', tip: 'C come TH in Spagna' },
        { spanish: 'mil', italian: 'mille', pronunciation: 'meel', tip: 'Senza LE finale' }
      ]
    },
    body: {
      name: 'Corpo Umano',
      words: [
        { spanish: 'cabeza', italian: 'testa', pronunciation: 'kah-BEH-thah', tip: 'Z come TH in Spagna' },
        { spanish: 'cara', italian: 'viso', pronunciation: 'KAH-rah', tip: 'Semplice come in italiano' },
        { spanish: 'ojo', italian: 'occhio', pronunciation: 'OH-hoh', tip: 'J come H aspirata' },
        { spanish: 'nariz', italian: 'naso', pronunciation: 'nah-REETH', tip: 'Z come TH in Spagna' },
        { spanish: 'boca', italian: 'bocca', pronunciation: 'BOH-kah', tip: 'Senza doppia C' },
        { spanish: 'diente', italian: 'dente', pronunciation: 'DYEN-teh', tip: 'IE come in spagnolo' },
        { spanish: 'cuello', italian: 'collo', pronunciation: 'KWEH-lyoh', tip: 'UE + LL come LY' },
        { spanish: 'brazo', italian: 'braccio', pronunciation: 'BRAH-thoh', tip: 'Z come TH in Spagna' },
        { spanish: 'mano', italian: 'mano', pronunciation: 'MAH-noh', tip: 'Identico ma femminile!' },
        { spanish: 'dedo', italian: 'dito', pronunciation: 'DEH-doh', tip: 'Diverso dall\'italiano' },
        { spanish: 'pierna', italian: 'gamba', pronunciation: 'pee-ER-nah', tip: 'IE come in spagnolo' },
        { spanish: 'pie', italian: 'piede', pronunciation: 'pee-EH', tip: 'Senza DE finale' },
        { spanish: 'corazón', italian: 'cuore', pronunciation: 'koh-rah-THOHN', tip: 'Z come TH + accento finale' },
        { spanish: 'estómago', italian: 'stomaco', pronunciation: 'ehs-TOH-mah-goh', tip: 'Accento sulla O' },
        { spanish: 'espalda', italian: 'schiena', pronunciation: 'ehs-PAHL-dah', tip: 'Completamente diverso' }
      ]
    },
    house: {
      name: 'Casa e Oggetti',
      words: [
        { spanish: 'casa', italian: 'casa', pronunciation: 'KAH-sah', tip: 'Identico' },
        { spanish: 'habitación', italian: 'camera', pronunciation: 'ah-bee-tah-THYOHN', tip: 'Parola lunga, accento finale' },
        { spanish: 'cocina', italian: 'cucina', pronunciation: 'koh-THEE-nah', tip: 'C come TH in Spagna' },
        { spanish: 'baño', italian: 'bagno', pronunciation: 'BAH-nyoh', tip: 'Ñ come GN italiano' },
        { spanish: 'salón', italian: 'soggiorno', pronunciation: 'sah-LOHN', tip: 'Accento sull\'ultima sillaba' },
        { spanish: 'dormitorio', italian: 'camera da letto', pronunciation: 'dor-mee-TOH-ree-oh', tip: 'Parola lunga' },
        { spanish: 'mesa', italian: 'tavolo', pronunciation: 'MEH-sah', tip: 'Femminile in spagnolo' },
        { spanish: 'silla', italian: 'sedia', pronunciation: 'SEE-lyah', tip: 'LL come LY italiano' },
        { spanish: 'cama', italian: 'letto', pronunciation: 'KAH-mah', tip: 'Completamente diverso' },
        { spanish: 'ventana', italian: 'finestra', pronunciation: 'vehn-TAH-nah', tip: 'Diverso dall\'italiano' },
        { spanish: 'puerta', italian: 'porta', pronunciation: 'PWER-tah', tip: 'UE come in spagnolo' },
        { spanish: 'televisión', italian: 'televisione', pronunciation: 'teh-leh-bee-SYOHN', tip: 'Quasi identico' },
        { spanish: 'teléfono', italian: 'telefono', pronunciation: 'teh-LEH-foh-noh', tip: 'Accento sulla E' },
        { spanish: 'ordenador', italian: 'computer', pronunciation: 'or-deh-nah-DOHR', tip: 'Termine spagnolo!' },
        { spanish: 'frigorífico', italian: 'frigorifero', pronunciation: 'free-goh-REE-fee-koh', tip: 'Quasi identico' }
      ]
    },
    emotions: {
      name: 'Emozioni e Stati d\'Animo',
      words: [
        { spanish: 'feliz', italian: 'felice', pronunciation: 'feh-LEETH', tip: 'Z come TH in Spagna' },
        { spanish: 'triste', italian: 'triste', pronunciation: 'TREES-teh', tip: 'Identico' },
        { spanish: 'contento', italian: 'contento', pronunciation: 'kon-TEHN-toh', tip: 'Identico' },
        { spanish: 'enfadado', italian: 'arrabbiato', pronunciation: 'ehn-fah-DAH-doh', tip: 'Diverso dall\'italiano' },
        { spanish: 'cansado', italian: 'stanco', pronunciation: 'kan-SAH-doh', tip: 'Falso amico parziale' },
        { spanish: 'nervioso', italian: 'nervoso', pronunciation: 'ner-vee-OH-soh', tip: 'Quasi identico' },
        { spanish: 'tranquilo', italian: 'tranquillo', pronunciation: 'tran-KEE-loh', tip: 'Senza doppia L' },
        { spanish: 'preocupado', italian: 'preoccupato', pronunciation: 'preh-oh-koo-PAH-doh', tip: 'Una C in meno' },
        { spanish: 'sorprendido', italian: 'sorpreso', pronunciation: 'sor-pren-DEE-doh', tip: 'Forma diversa' },
        { spanish: 'aburrido', italian: 'annoiato', pronunciation: 'ah-boo-RREE-doh', tip: 'RR forte' },
        { spanish: 'emocionado', italian: 'emozionato', pronunciation: 'eh-moh-thyoh-NAH-doh', tip: 'C come TH in Spagna' },
        { spanish: 'asustado', italian: 'spaventato', pronunciation: 'ah-suhs-TAH-doh', tip: 'Diverso dall\'italiano' },
        { spanish: 'confundido', italian: 'confuso', pronunciation: 'kon-fuhn-DEE-doh', tip: 'Forma più lunga' },
        { spanish: 'orgulloso', italian: 'orgoglioso', pronunciation: 'or-goo-LYOH-soh', tip: 'LL come LY italiano' },
        { spanish: 'avergonzado', italian: 'imbarazzato', pronunciation: 'ah-ver-gon-THAH-doh', tip: 'Z come TH in Spagna' }
      ]
    }
  };

  const categories = Object.keys(vocabularyData);
  const currentWords = vocabularyData[selectedCategory]?.words || [];
  
  // Calculate total words across all categories
  const totalWords = Object.values(vocabularyData).reduce((sum, category) => sum + category.words.length, 0);
  
  const toggleWordCompletion = (word) => {
    const newCompleted = new Set(completedWords);
    if (newCompleted.has(word.spanish)) {
      newCompleted.delete(word.spanish);
    } else {
      newCompleted.add(word.spanish);
    }
    setCompletedWords(newCompleted);
  };

  const progress = totalWords > 0 ? (completedWords.size / totalWords) * 100 : 0;

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
          <p>Oltre {totalWords} parole essenziali per conversazioni quotidiane in spagnolo</p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Progresso: {completedWords.size}/{totalWords} parole ({Math.round(progress)}%)
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