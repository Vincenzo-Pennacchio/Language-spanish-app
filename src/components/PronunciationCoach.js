import React, { useState } from 'react';
import { ArrowLeft, Mic, Volume2, Play, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react';

const PronunciationCoach = ({ onNavigate }) => {
  const [selectedSound, setSelectedSound] = useState('rr');
  const [masteredSounds, setMasteredSounds] = useState(new Set());
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);

  // Text-to-speech function
  const speakText = (text, lang = 'es-ES', rate = 0.7) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      speechSynthesis.speak(utterance);
    }
  };

  const pronunciationData = {
    rr: {
      title: 'RR (Erre múltiple)',
      difficulty: 'Molto Difficile',
      italianEquivalent: 'Non esiste in italiano - molto più forte della R italiana',
      mouthPosition: 'Punta della lingua contro il palato, far vibrare con forza',
      commonMistake: 'Gli italiani pronunciano una R troppo debole',
      practiceWords: [
        { word: 'perro', translation: 'cane', tip: 'Contrasta con "pero" (ma)' },
        { word: 'carro', translation: 'auto', tip: 'Vibrazione forte e lunga' },
        { word: 'ferrocarril', translation: 'ferrovia', tip: 'Due RR diverse nel same word' },
        { word: 'desarrollo', translation: 'sviluppo', tip: 'RR in mezzo alla parola' },
        { word: 'guerra', translation: 'guerra', tip: 'Dopo consonante' }
      ],
      exercises: [
        'Ripeti "ra-ra-ra" sempre più veloce',
        'Alterna "pero" e "perro" 10 volte',
        'Pronuncia "rrrrrr" per 5 secondi di fila'
      ],
      culturalNote: 'La RR forte è distintiva: dire "pero" invece di "perro" cambia il significato!'
    },
    j: {
      title: 'J (Jota)',
      difficulty: 'Difficile', 
      italianEquivalent: 'Come "CHI" aspirato, simile alla H inglese in "house"',
      mouthPosition: 'Gola rilassata, aria che passa con attrito',
      commonMistake: 'Gli italiani spesso usano il suono di "GI" italiano',
      practiceWords: [
        { word: 'jamón', translation: 'prosciutto', tip: 'Non dire "giamòn"!' },
        { word: 'trabajo', translation: 'lavoro', tip: 'Molto comune, impara bene' },
        { word: 'reloj', translation: 'orologio', tip: 'J finale, importante' },
        { word: 'joven', translation: 'giovane', tip: 'All\'inizio della parola' },
        { word: 'naranja', translation: 'arancia', tip: 'J in mezzo alla parola' }
      ],
      exercises: [
        'Respira sulla mano dicendo "ja-ja-ja"',
        'Ripeti "trabajo" 20 volte lentamente',
        'Alterna "giorno" (italiano) e "jamón" (spagnolo)'
      ],
      culturalNote: 'Il suono J varia molto tra regioni, ma sempre aspirato!'
    },
    z_c: {
      title: 'Z/C (Zeta/Ce)',
      difficulty: 'Medio',
      italianEquivalent: 'Come "TH" inglese in "think" (solo in Spagna)',
      mouthPosition: 'Lingua tra i denti, aria che passa',
      commonMistake: 'Gli italiani usano il suono "TS" italiano',
      practiceWords: [
        { word: 'cena', translation: 'cena', tip: 'Come "thena" inglese' },
        { word: 'zapatos', translation: 'scarpe', tip: 'Inizia con TH' },
        { word: 'corazón', translation: 'cuore', tip: 'TH finale' },
        { word: 'cerveza', translation: 'birra', tip: 'Due TH nella stessa parola' },
        { word: 'gracias', translation: 'grazie', tip: 'TH finale comune' }
      ],
      exercises: [
        'Metti la lingua tra i denti e soffia',
        'Ripeti "za-ze-zi-zo-zu" con TH',
        'Confronta "cena" spagnola vs italiana'
      ],
      culturalNote: 'In America Latina si pronuncia come S normale!'
    },
    ñ: {
      title: 'Ñ (Eñe)',
      difficulty: 'Facile',
      italianEquivalent: 'Identico al "GN" italiano di "gnocchi"',
      mouthPosition: 'Identico all\'italiano',
      commonMistake: 'Gli italiani lo fanno perfetto!',
      practiceWords: [
        { word: 'español', translation: 'spagnolo', tip: 'Come "gnolo"' },
        { word: 'niño', translation: 'bambino', tip: 'Come "nigno"' },
        { word: 'año', translation: 'anno', tip: 'Come "agno"' },
        { word: 'baño', translation: 'bagno', tip: 'Come "bagno" italiano!' },
        { word: 'pequeño', translation: 'piccolo', tip: 'Finale della parola' }
      ],
      exercises: [
        'Ripeti parole italiane con GN',
        'Alterna "anno" e "año"',
        'Pronuncia "ña-ñe-ñi-ño-ñu"'
      ],
      culturalNote: 'La Ñ è il simbolo dello spagnolo - impara a scriverla!'
    },
    ll: {
      title: 'LL (Elle doppia)',
      difficulty: 'Medio',
      italianEquivalent: 'Come "LI" italiano in "figlio"',
      mouthPosition: 'Lingua al palato come "LI" italiano',
      commonMistake: 'Pronunciare come L normale',
      practiceWords: [
        { word: 'paella', translation: 'paella', tip: 'Come "paelia"' },
        { word: 'calle', translation: 'strada', tip: 'Come "calie"' },
        { word: 'llave', translation: 'chiave', tip: 'All\'inizio: "liave"' },
        { word: 'pollo', translation: 'pollo', tip: 'Come "polio"' },
        { word: 'llamar', translation: 'chiamare', tip: 'Come "liamar"' }
      ],
      exercises: [
        'Ripeti "figlio" poi "pollo"',
        'Alterna "calle" e "cale"',
        'Pronuncia "lla-lle-lli-llo-llu"'
      ],
      culturalNote: 'In Argentina si pronuncia come "SH" inglese!'
    },
    v: {
      title: 'V (Uve)',
      difficulty: 'Medio',
      italianEquivalent: 'Come B italiana - non V italiana!',
      mouthPosition: 'Labbra che si toccano, come B',
      commonMistake: 'Pronunciare come V italiana (denti-labbro)',
      practiceWords: [
        { word: 'vino', translation: 'vino', tip: 'Suona come "bino"' },
        { word: 'vivir', translation: 'vivere', tip: 'Due B-sound' },
        { word: 'Valencia', translation: 'Valencia', tip: 'Come "Balencia"' },
        { word: 'verde', translation: 'verde', tip: 'Come "berde"' },
        { word: 'volver', translation: 'tornare', tip: 'Come "bolber"' }
      ],
      exercises: [
        'Chiudi le labbra per V spagnola',
        'Ripeti "vino" vs "bino" - stessa pronuncia',
        'Alterna V italiana e spagnola'
      ],
      culturalNote: 'B e V suonano identiche in spagnolo!'
    },
    x: {
      title: 'X (Equis)',
      difficulty: 'Medio',
      italianEquivalent: 'Come "S" normale (in molte parole)',
      mouthPosition: 'Varia: S normale o KS',
      commonMistake: 'Sempre pronunciare come KS inglese',
      practiceWords: [
        { word: 'México', translation: 'Messico', tip: 'Si pronuncia "Mésico"' },
        { word: 'exacto', translation: 'esatto', tip: 'Qui sì: "eksacto"' },
        { word: 'taxi', translation: 'taxi', tip: 'Come KS: "taksi"' },
        { word: 'extraño', translation: 'strano', tip: 'Come KS: "ekstragno"' },
        { word: 'oxígeno', translation: 'ossigeno', tip: 'Come KS' }
      ],
      exercises: [
        'Impara quale X è S e quale KS',
        'Ripeti "México" come "Mésico"',
        'Contrasta "exacto" (KS) vs "México" (S)'
      ],
      culturalNote: 'Molti nomi geografici messicani usano X come S!'
    },
    g_j: {
      title: 'G + E/I (Ge/Gi)',
      difficulty: 'Difficile',
      italianEquivalent: 'Come J spagnola - aspirata, non "GE" italiana',
      mouthPosition: 'Gola rilassata, soffio forte',
      commonMistake: 'Pronunciare come GE/GI italiano',
      practiceWords: [
        { word: 'gente', translation: 'gente', tip: 'Come "hente" aspirato' },
        { word: 'girar', translation: 'girare', tip: 'Come "hirar" aspirato' },
        { word: 'general', translation: 'generale', tip: 'Come "heneral"' },
        { word: 'urgente', translation: 'urgente', tip: 'GE aspirato finale' },
        { word: 'gimnasio', translation: 'palestra', tip: 'Come "himnasio"' }
      ],
      exercises: [
        'Respira forte su "ge-gi"',
        'Alterna "gente" italiana vs spagnola',
        'Ripeti "ja-ge-ji-gi" - stesso suono'
      ],
      culturalNote: 'GUE/GUI mantengono il suono G normale!'
    },
    d_final: {
      title: 'D finale',
      difficulty: 'Medio',
      italianEquivalent: 'Molto più debole della D italiana, quasi TH',
      mouthPosition: 'Lingua rilassata, tocco leggero',
      commonMistake: 'D troppo forte come in italiano',
      practiceWords: [
        { word: 'Madrid', translation: 'Madrid', tip: 'D finale debolissima' },
        { word: 'ciudad', translation: 'città', tip: 'D quasi muta' },
        { word: 'verdad', translation: 'verità', tip: 'D finale molto debole' },
        { word: 'universidad', translation: 'università', tip: 'D sussurrata' },
        { word: 'felicidad', translation: 'felicità', tip: 'D appena accennata' }
      ],
      exercises: [
        'Pronuncia D finale sempre più debole',
        'Sussurra la D di "Madrid"',
        'Confronta D finale vs iniziale'
      ],
      culturalNote: 'Molti spagnoli "mangiano" completamente la D finale!'
    },
    ch: {
      title: 'CH (Che)',
      difficulty: 'Facile',
      italianEquivalent: 'Identico al "CI" italiano di "ciao"',
      mouthPosition: 'Identico all\'italiano',
      commonMistake: 'Gli italiani lo pronunciano perfetto!',
      practiceWords: [
        { word: 'mucho', translation: 'molto', tip: 'Come "muccio"' },
        { word: 'coche', translation: 'auto', tip: 'Come "cocce"' },
        { word: 'noche', translation: 'notte', tip: 'Come "nocce"' },
        { word: 'chocolate', translation: 'cioccolato', tip: 'Due CH = due "C"' },
        { word: 'chico', translation: 'ragazzo', tip: 'Come "cicco"' }
      ],
      exercises: [
        'Ripeti "ciao" poi "noche"',
        'Alterna "mucho" e "muccio"',
        'Pronuncia "cha-che-chi-cho-chu"'
      ],
      culturalNote: 'CH era considerata una lettera separata fino al 1994!'
    },
    b_soft: {
      title: 'B dolce (tra vocali)',
      difficulty: 'Medio',
      italianEquivalent: 'Più debole della B italiana, labbra non si toccano',
      mouthPosition: 'Labbra vicine ma non chiuse',
      commonMistake: 'B troppo forte come in italiano',
      practiceWords: [
        { word: 'cabeza', translation: 'testa', tip: 'B dolce in mezzo' },
        { word: 'saber', translation: 'sapere', tip: 'B dolce finale' },
        { word: 'lobo', translation: 'lupo', tip: 'B dolce tra vocali' },
        { word: 'probable', translation: 'probabile', tip: 'Due B diverse!' },
        { word: 'árbol', translation: 'albero', tip: 'B dopo consonante = forte' }
      ],
      exercises: [
        'Pronuncia B senza chiudere le labbra',
        'Soffia leggermente tra le labbra',
        'Confronta "lobo" vs "Barcelona"'
      ],
      culturalNote: 'La B dolce è molto caratteristica dello spagnolo!'
    },
    s_aspiration: {
      title: 'S finale (aspirata)',
      difficulty: 'Avanzato',
      italianEquivalent: 'Come H inglese invece di S (in alcune regioni)',
      mouthPosition: 'Soffio di aria invece di S',
      commonMistake: 'Pronunciare S sempre chiara',
      practiceWords: [
        { word: 'casas', translation: 'case', tip: 'In Andalusia: "casah"' },
        { word: 'más', translation: 'più', tip: 'A volte: "mah"' },
        { word: 'vamos', translation: 'andiamo', tip: 'Spesso: "vamoh"' },
        { word: 'nosotros', translation: 'noi', tip: 'Finale aspirata' },
        { word: 'buenos días', translation: 'buongiorno', tip: 'Entrambe le S aspirate' }
      ],
      exercises: [
        'Respira invece di dire S finale',
        'Ascolta spagnoli del sud parlare',
        'Alterna S chiara vs aspirata'
      ],
      culturalNote: 'Tipico del sud della Spagna e tutta l\'America Latina!'
    },
    y_final: {
      title: 'Y finale',
      difficulty: 'Facile',
      italianEquivalent: 'Come "I" italiana',
      mouthPosition: 'Identico alla I italiana',
      commonMistake: 'Pronunciare come Y consonante',
      practiceWords: [
        { word: 'muy', translation: 'molto', tip: 'Come "mui"' },
        { word: 'soy', translation: 'sono', tip: 'Come "soi"' },
        { word: 'hoy', translation: 'oggi', tip: 'Come "oi"' },
        { word: 'estoy', translation: 'sto/sono', tip: 'Come "estoi"' },
        { word: 'rey', translation: 're', tip: 'Come "rei"' }
      ],
      exercises: [
        'Ripeti "muy" come "mui"',
        'Alterna Y consonante vs finale',
        'Pronuncia "ai-ei-oi-ui"'
      ],
      culturalNote: 'La Y finale è sempre vocale, mai consonante!'
    },
    stress_patterns: {
      title: 'Accenti (Stress)',
      difficulty: 'Avanzato',
      italianEquivalent: 'Regole diverse dall\'italiano',
      mouthPosition: 'Enfasi sulla sillaba corretta',
      commonMistake: 'Applicare regole dell\'accento italiano',
      practiceWords: [
        { word: 'teléfono', translation: 'telefono', tip: 'Accento su E, non O' },
        { word: 'médico', translation: 'medico', tip: 'Accento su E, come italiano' },
        { word: 'hablar', translation: 'parlare', tip: 'Accento su AR finale' },
        { word: 'útil', translation: 'utile', tip: 'Accento su U' },
        { word: 'perfección', translation: 'perfezione', tip: 'Accento su ON' }
      ],
      exercises: [
        'Impara le regole degli accenti',
        'Confronta con parole italiane simili',
        'Enfatizza la sillaba accentata'
      ],
      culturalNote: 'Gli accenti scritti sono obbligatori quando servono!'
    }
  };

  const soundKeys = Object.keys(pronunciationData);
  const currentSound = pronunciationData[selectedSound];
  const currentWord = currentSound.practiceWords[currentPracticeIndex];

  const toggleSoundMastery = (soundKey) => {
    const newMastered = new Set(masteredSounds);
    if (newMastered.has(soundKey)) {
      newMastered.delete(soundKey);
    } else {
      newMastered.add(soundKey);
    }
    setMasteredSounds(newMastered);
  };

  const nextPracticeWord = () => {
    setCurrentPracticeIndex((prev) => 
      prev < currentSound.practiceWords.length - 1 ? prev + 1 : 0
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Facile': return '#4CAF50';
      case 'Medio': return '#FF9800';
      case 'Difficile': return '#FF5722';
      case 'Molto Difficile': return '#f44336';
      case 'Avanzato': return '#9C27B0';
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
        <Mic size={32} color="#E91E63" />
        <div>
          <h1>Pronunciation Coach</h1>
          <p>I 15 suoni spagnoli più difficili per gli italiani - con guide dettagliate</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(masteredSounds.size / soundKeys.length) * 100}%` }}
          ></div>
        </div>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Suoni padroneggiati: {masteredSounds.size}/{soundKeys.length} ({Math.round((masteredSounds.size / soundKeys.length) * 100)}%)
        </p>
      </div>

      {/* Sound Selection Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Seleziona un suono da praticare:</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          {soundKeys.map(soundKey => {
            const sound = pronunciationData[soundKey];
            const isMastered = masteredSounds.has(soundKey);
            const isSelected = selectedSound === soundKey;
            return (
              <button
                key={soundKey}
                onClick={() => {
                  setSelectedSound(soundKey);
                  setCurrentPracticeIndex(0);
                }}
                className={`module-card ${isSelected ? 'active' : ''}`}
                style={{ 
                  background: isSelected ? 'rgba(233, 30, 99, 0.1)' : (isMastered ? 'rgba(76, 175, 80, 0.05)' : 'white'),
                  border: isSelected ? '2px solid #E91E63' : (isMastered ? '2px solid #4CAF50' : '1px solid #ddd'),
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#E91E63', fontSize: '1.1rem' }}>
                    {sound.title}
                  </h3>
                  {isMastered && (
                    <CheckCircle size={20} color="#4CAF50" />
                  )}
                </div>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ 
                    background: getDifficultyColor(sound.difficulty), 
                    color: 'white', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem' 
                  }}>
                    {sound.difficulty}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: '1.4' }}>
                  {sound.italianEquivalent}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sound Details */}
      <div style={{ 
        background: 'rgba(233, 30, 99, 0.1)', 
        border: '1px solid rgba(233, 30, 99, 0.3)', 
        borderRadius: '16px', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ margin: '0 0 1rem', color: '#E91E63', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              🎯 {currentSound.title}
              <span style={{ 
                background: getDifficultyColor(currentSound.difficulty), 
                color: 'white', 
                padding: '0.3rem 1rem', 
                borderRadius: '20px', 
                fontSize: '0.9rem' 
              }}>
                {currentSound.difficulty}
              </span>
            </h2>
          </div>
          <button
            onClick={() => toggleSoundMastery(selectedSound)}
            style={{
              background: masteredSounds.has(selectedSound) ? '#4CAF50' : '#ddd',
              color: masteredSounds.has(selectedSound) ? 'white' : '#666',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {masteredSounds.has(selectedSound) ? <CheckCircle size={16} /> : <Mic size={16} />}
            {masteredSounds.has(selectedSound) ? 'Padroneggiato!' : 'Segna come appreso'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ color: '#E91E63', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🇮🇹 Equivalente Italiano
            </h3>
            <p style={{ margin: 0, fontSize: '1rem', background: 'white', padding: '1rem', borderRadius: '8px' }}>
              {currentSound.italianEquivalent}
            </p>
          </div>

          <div>
            <h3 style={{ color: '#E91E63', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👄 Posizione della Bocca
            </h3>
            <p style={{ margin: 0, fontSize: '1rem', background: 'white', padding: '1rem', borderRadius: '8px' }}>
              {currentSound.mouthPosition}
            </p>
          </div>

          <div>
            <h3 style={{ color: '#f44336', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ Errore Comune
            </h3>
            <p style={{ margin: 0, fontSize: '1rem', background: '#ffebee', padding: '1rem', borderRadius: '8px', border: '1px solid #ffcdd2' }}>
              {currentSound.commonMistake}
            </p>
          </div>
        </div>

        {/* Interactive Practice */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ margin: '0 0 1.5rem', color: '#E91E63', textAlign: 'center' }}>
            🎤 Pratica Interattiva
          </h3>
          
          <div style={{ 
            background: '#f8f9fa', 
            borderRadius: '12px', 
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem', color: '#333', fontSize: '2rem' }}>
                  {currentWord.word}
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '1.2rem' }}>
                  {currentWord.translation}
                </p>
              </div>
              <button 
                onClick={() => speakText(currentWord.word)}
                className="audio-btn"
                style={{ width: '60px', height: '60px' }}
              >
                <Volume2 size={24} />
              </button>
            </div>
            
            <div style={{ 
              background: 'rgba(233, 30, 99, 0.1)', 
              borderRadius: '8px', 
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <p style={{ margin: 0, fontStyle: 'italic', color: '#E91E63' }}>
                💡 {currentWord.tip}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => speakText(currentWord.word, 'es-ES', 0.5)}
                className="btn secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Volume2 size={16} />
                Lento
              </button>
              <button 
                onClick={() => speakText(currentWord.word, 'es-ES', 0.8)}
                className="btn secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Volume2 size={16} />
                Normale
              </button>
              <button 
                onClick={nextPracticeWord}
                className="btn"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RotateCcw size={16} />
                Prossima Parola
              </button>
            </div>
          </div>

          {/* Practice Words List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {currentSound.practiceWords.map((word, index) => (
              <div 
                key={index}
                onClick={() => setCurrentPracticeIndex(index)}
                style={{ 
                  background: index === currentPracticeIndex ? 'rgba(233, 30, 99, 0.1)' : '#f0f0f0', 
                  border: index === currentPracticeIndex ? '2px solid #E91E63' : '1px solid #ddd',
                  borderRadius: '8px', 
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.3rem', color: '#333' }}>{word.word}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{word.translation}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(word.word);
                    }}
                    className="audio-btn"
                    style={{ width: '35px', height: '35px' }}
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <div style={{ 
          background: 'rgba(255, 152, 0, 0.1)', 
          border: '1px solid rgba(255, 152, 0, 0.3)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ margin: '0 0 1rem', color: '#FF9800' }}>💪 Esercizi di Allenamento</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            {currentSound.exercises.map((exercise, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{exercise}</li>
            ))}
          </ul>
        </div>

        {/* Cultural Note */}
        <div style={{ 
          background: 'rgba(33, 150, 243, 0.1)', 
          border: '1px solid rgba(33, 150, 243, 0.3)', 
          borderRadius: '8px', 
          padding: '1.5rem'
        }}>
          <h3 style={{ margin: '0 0 0.5rem', color: '#1976D2' }}>🇪🇸 Nota Culturale</h3>
          <p style={{ margin: 0, fontStyle: 'italic' }}>{currentSound.culturalNote}</p>
        </div>
      </div>

      {/* General Tips */}
      <div style={{ margin: '3rem 0', padding: '2rem', background: 'rgba(233, 30, 99, 0.1)', borderRadius: '12px' }}>
        <h2>🎯 Consigli Generali per la Pronuncia</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
          <div>
            <h3>🎧 Allenamento dell'Orecchio</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Ascolta ogni suono lentamente prima</li>
              <li>Confronta sempre con l'italiano</li>
              <li>Registra te stesso e riascolta</li>
              <li>Non aver paura di esagerare all'inizio</li>
            </ul>
          </div>
          <div>
            <h3>👄 Pratica Fisica</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Osservati allo specchio mentre pratichi</li>
              <li>Usa le mani per controllare il fiato</li>
              <li>Pratica i movimenti anche senza suono</li>
              <li>Inizia lentamente, poi accelera</li>
            </ul>
          </div>
          <div>
            <h3>📅 Routine Quotidiana</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Dedica 10-15 minuti ogni giorno</li>
              <li>Concentrati su 1-2 suoni per settimana</li>
              <li>Ripeti parole di uso comune</li>
              <li>Celebra i piccoli miglioramenti</li>
            </ul>
          </div>
          <div>
            <h3>🗣️ Contestualizzazione</h3>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Usa i suoni in frasi complete</li>
              <li>Pratica con dialoghi dell'app</li>
              <li>Cerca di parlare con nativi online</li>
              <li>Non fissarti troppo sulla perfezione</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationCoach;