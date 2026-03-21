import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

const GrammarGuide = ({ onNavigate }) => {
  const [selectedRule, setSelectedRule] = useState('gender');
  const [completedRules, setCompletedRules] = useState(new Set());

  const grammarRules = {
    gender: {
      title: 'Genere dei Sostantivi',
      difficulty: 'Facile',
      icon: '⚡',
      shortcut: 'Regola -A/-O: 99% funziona',
      explanation: 'A differenza dell\'italiano, lo spagnolo è molto più prevedibile nel genere.',
      rules: [
        {
          rule: 'Parole che finiscono in -A = Femminili',
          examples: ['la casa', 'la mesa', 'la ventana'],
          exceptions: ['el día', 'el problema', 'el drama'],
          memoryTrick: '🏠 Casa è femminile in entrambe le lingue'
        },
        {
          rule: 'Parole che finiscono in -O = Maschili',
          examples: ['el gato', 'el libro', 'el hermano'],
          exceptions: ['la mano', 'la foto (fotografía)', 'la moto (motocicleta)'],
          memoryTrick: '📖 Libro è maschile in entrambe le lingue'
        },
        {
          rule: 'Parole che finiscono in -CIÓN = Femminili',
          examples: ['la estación', 'la canción', 'la información'],
          exceptions: 'Nessuna!',
          memoryTrick: '🎵 -CIÓN = sempre femminile, come -zione in italiano'
        }
      ],
      practiceQuiz: [
        { word: 'problema', gender: 'el', why: 'Eccezione: origine greca' },
        { word: 'mesa', gender: 'la', why: 'Finisce in -a' },
        { word: 'canción', gender: 'la', why: 'Finisce in -ción' }
      ]
    },
    articles: {
      title: 'Articoli Determinativi',
      difficulty: 'Facile',
      icon: '📝',
      shortcut: 'Più semplice dell\'italiano!',
      explanation: 'Lo spagnolo ha meno variazioni degli articoli rispetto all\'italiano.',
      rules: [
        {
          rule: 'Maschile Singolare: EL',
          examples: ['el hombre', 'el árbol', 'el agua (eccezione)'],
          exceptions: 'el agua (parola femminile ma usa EL per suono)',
          memoryTrick: '👨 EL per tutto il maschile singolare'
        },
        {
          rule: 'Femminile Singolare: LA',
          examples: ['la mujer', 'la casa', 'la universidad'],
          exceptions: 'el agua, el águila (per evitare suono difficile)',
          memoryTrick: '👩 LA per tutto il femminile singolare'
        },
        {
          rule: 'Plurali: LOS (maschile), LAS (femminile)',
          examples: ['los hombres', 'las mujeres', 'los coches'],
          exceptions: 'Nessuna eccezione importante',
          memoryTrick: '👥 Aggiungi S agli articoli per il plurale'
        }
      ],
      practiceQuiz: [
        { word: 'agua', article: 'el', why: 'Eccezione per il suono: el agua' },
        { word: 'casas', article: 'las', why: 'Femminile plurale' },
        { word: 'problema', article: 'el', why: 'Maschile singolare' }
      ]
    },
    ser_estar: {
      title: 'SER vs ESTAR',
      difficulty: 'Medio',
      icon: '🤔',
      shortcut: 'SER = caratteristiche permanenti, ESTAR = stati temporanei',
      explanation: 'La differenza più importante tra italiano e spagnolo nei verbi "essere".',
      rules: [
        {
          rule: 'SER: Caratteristiche permanenti o identificazione',
          examples: ['Soy italiano', 'Es médico', 'La mesa es verde'],
          exceptions: 'Usato anche per eventi: La fiesta es mañana',
          memoryTrick: '🏷️ SER = "Sono" per sempre (carattere, professione, nazionalità)'
        },
        {
          rule: 'ESTAR: Stati temporanei o posizione',
          examples: ['Estoy cansado', 'Está en casa', 'El café está caliente'],
          exceptions: 'Usato per morte: Está muerto',
          memoryTrick: '📍 ESTAR = "STare" (posizione, stato momentaneo)'
        },
        {
          rule: 'Aggettivi che cambiano significato',
          examples: ['Ser listo (intelligente) / Estar listo (pronto)', 'Ser bueno (brava persona) / Estar bueno (gustoso/attraente)'],
          exceptions: 'Alcuni aggettivi esistono solo con uno dei due',
          memoryTrick: '🎭 Stesso aggettivo, significato diverso!'
        }
      ],
      practiceQuiz: [
        { sentence: 'Mi hermano ___ médico', answer: 'es', why: 'Professione = caratteristica (SER)' },
        { sentence: 'Hoy ___ muy cansado', answer: 'estoy', why: 'Stato temporaneo (ESTAR)' },
        { sentence: 'Esta comida ___ muy buena', answer: 'está', why: 'Gusto = stato temporaneo (ESTAR)' }
      ]
    },
    past_tenses: {
      title: 'Passato: Pretérito vs Imperfecto',
      difficulty: 'Medio',
      icon: '⏰',
      shortcut: 'Pretérito = azione completata, Imperfetto = azione abituale',
      explanation: 'Simile all\'italiano passato prossimo vs imperfetto, ma regole più chiare.',
      rules: [
        {
          rule: 'PRETÉRITO: Azioni completate in momento specifico',
          examples: ['Ayer comí paella', 'Viajé a España el año pasado', 'Terminé el libro'],
          exceptions: 'Usato anche per serie di azioni completate',
          memoryTrick: '✅ PRETÉRITO = momento preciso, azione finita'
        },
        {
          rule: 'IMPERFECTO: Azioni abituali o descrizioni nel passato',
          examples: ['Cuando era niño, jugaba fútbol', 'Mientras estudiaba, escuchaba música'],
          exceptions: 'Usato per età: Tenía 20 años',
          memoryTrick: '🔄 IMPERFECTO = "usavo fare", "ero solito"'
        },
        {
          rule: 'Marcatori temporali ti aiutano',
          examples: ['Ayer, anoche, el lunes → Pretérito', 'Siempre, cada día, mientras → Imperfecto'],
          exceptions: 'Alcuni marcatori possono essere usati con entrambi',
          memoryTrick: '📅 Parole come "ieri" → Pretérito, "sempre" → Imperfecto'
        }
      ],
      practiceQuiz: [
        { sentence: 'Cuando era pequeño, _____ (jugar) en el parque', answer: 'jugaba', why: 'Azione abituale nel passato (Imperfecto)' },
        { sentence: 'Ayer _____ (comer) en un restaurante italiano', answer: 'comí', why: 'Azione specifica completata (Pretérito)' },
        { sentence: 'Mientras _____ (estudiar), sonó el teléfono', answer: 'estudiaba', why: 'Azione in corso interrotta (Imperfecto)' }
      ]
    },
    subjunctive: {
      title: 'Congiuntivo: Quando si usa',
      difficulty: 'Avanzato',
      icon: '🎯',
      shortcut: 'Dubbio, emozione, opinione → Congiuntivo',
      explanation: 'Simile all\'italiano ma con regole più sistematiche.',
      rules: [
        {
          rule: 'Dopo verbi di emozione',
          examples: ['Me alegro de que vengas', 'Espero que tengas suerte', 'Temo que llueva'],
          exceptions: 'Se il soggetto è lo stesso, si usa infinito',
          memoryTrick: '😊 Emozioni = Congiuntivo (come in italiano)'
        },
        {
          rule: 'Dopo verbi di dubbio o negazione',
          examples: ['Dudo que venga', 'No creo que sea verdad', 'Es posible que llegue tarde'],
          exceptions: 'Creo que + indicativo (certezza)',
          memoryTrick: '❓ Dubbio = Congiuntivo (forse, non credo)'
        },
        {
          rule: 'Dopo espressioni impersonali',
          examples: ['Es importante que estudies', 'Es necesario que vengas', 'Es mejor que esperes'],
          exceptions: 'Es verdad que + indicativo',
          memoryTrick: '💭 "È importante che" = sempre congiuntivo'
        }
      ],
      practiceQuiz: [
        { sentence: 'Espero que _____ (tener) un buen día', answer: 'tengas', why: 'Verbo di emozione (espero)' },
        { sentence: 'Creo que _____ (venir) mañana', answer: 'viene', why: 'Creo que + indicativo (certezza)' },
        { sentence: 'Es necesario que _____ (hablar) con él', answer: 'hables', why: 'Espressione impersonale' }
      ]
    },
    direct_pronouns: {
      title: 'Pronomi Diretti',
      difficulty: 'Medio',
      icon: '👉',
      shortcut: 'Posizione diversa dall\'italiano!',
      explanation: 'Funzionano come in italiano ma con posizione diversa nel verbo.',
      rules: [
        {
          rule: 'Prima del verbo coniugato',
          examples: ['Lo veo (Lo vedo)', 'La compré (L\'ho comprata)', 'Los visitamos (Li visitiamo)'],
          exceptions: 'Nella frase negativa restano prima del verbo',
          memoryTrick: '⬅️ Sempre PRIMA del verbo principale'
        },
        {
          rule: 'Attaccati all\'infinito, gerundio e imperativo',
          examples: ['Quiero verla', 'Estoy leyéndolo', 'Cómpralo'],
          exceptions: 'Con perífrasi puoi metterli prima: La quiero ver',
          memoryTrick: '📎 Si "attaccano" a infinito e gerundio'
        },
        {
          rule: 'Forme: me, te, lo/la, nos, os, los/las',
          examples: ['Me llama (mi chiama)', 'Te veo (ti vedo)', 'Nos visitan (ci visitano)'],
          exceptions: 'Lo può riferirsi anche a "usted"',
          memoryTrick: '👥 Stesso ordine delle persone: me, te, lo/la...'
        }
      ],
      practiceQuiz: [
        { sentence: '¿Ves a María? Sí, _____ veo', answer: 'la', why: 'María = femminile → la' },
        { sentence: 'Quiero comprar_____ (el libro)', answer: 'lo', why: 'Con infinito si attacca: comprarlo' },
        { sentence: '_____ llamé ayer (a ti)', answer: 'te', why: 'A ti = te' }
      ]
    }
  };

  const ruleKeys = Object.keys(grammarRules);
  const currentRule = grammarRules[selectedRule];

  const toggleRuleCompletion = (ruleKey) => {
    const newCompleted = new Set(completedRules);
    if (newCompleted.has(ruleKey)) {
      newCompleted.delete(ruleKey);
    } else {
      newCompleted.add(ruleKey);
    }
    setCompletedRules(newCompleted);
  };

  return (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <GraduationCap size={32} color="#FF9800" />
        <div>
          <h1>Grammar Shortcut Guide</h1>
          <p>Regole grammaticali essenziali con scorciatoie e trucchi per la memoria</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedRules.size / ruleKeys.length) * 100}%` }}
          ></div>
        </div>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Progresso: {completedRules.size}/{ruleKeys.length} regole completate
        </p>
      </div>

      {/* Rule Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Scegli una regola grammaticale:</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          {ruleKeys.map(ruleKey => {
            const rule = grammarRules[ruleKey];
            const isCompleted = completedRules.has(ruleKey);
            return (
              <button
                key={ruleKey}
                onClick={() => setSelectedRule(ruleKey)}
                className={`module-card ${selectedRule === ruleKey ? 'active' : ''}`}
                style={{ 
                  background: selectedRule === ruleKey ? 'rgba(255, 152, 0, 0.1)' : 'white',
                  border: selectedRule === ruleKey ? '2px solid #FF9800' : '1px solid #ddd',
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{rule.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem', color: '#FF9800' }}>{rule.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 0.5rem' }}>
                      Difficoltà: {rule.difficulty}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic', margin: 0 }}>
                      {rule.shortcut}
                    </p>
                  </div>
                  {isCompleted && (
                    <CheckCircle size={20} color="#4CAF50" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rule Content */}
      <div className="grammar-rule">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, color: '#FF9800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {currentRule.icon} {currentRule.title}
          </h2>
          <button
            onClick={() => toggleRuleCompletion(selectedRule)}
            style={{
              background: completedRules.has(selectedRule) ? '#4CAF50' : '#ddd',
              color: completedRules.has(selectedRule) ? 'white' : '#666',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {completedRules.has(selectedRule) ? <CheckCircle size={16} /> : <BookOpen size={16} />}
            {completedRules.has(selectedRule) ? 'Completato' : 'Segna come studiato'}
          </button>
        </div>

        <div style={{ 
          background: 'rgba(255, 193, 7, 0.2)', 
          border: '1px solid #FFC107', 
          borderRadius: '8px', 
          padding: '1rem', 
          marginBottom: '2rem' 
        }}>
          <h3 style={{ margin: '0 0 0.5rem', color: '#F57F17', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚡ Scorciatoia:
          </h3>
          <p style={{ margin: 0, fontWeight: '600' }}>{currentRule.shortcut}</p>
        </div>

        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#555' }}>
          {currentRule.explanation}
        </p>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {currentRule.rules.map((rule, index) => (
            <div 
              key={index} 
              style={{ 
                background: 'white', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '1.5rem' 
              }}
            >
              <h3 style={{ color: '#FF9800', marginBottom: '1rem' }}>{rule.rule}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ color: '#4CAF50', margin: '0 0 0.5rem' }}>✅ Esempi:</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {rule.examples.map((example, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{example}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 style={{ color: '#f44336', margin: '0 0 0.5rem' }}>⚠️ Eccezioni:</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{rule.exceptions}</p>
                </div>
              </div>
              
              <div style={{ 
                background: 'rgba(33, 150, 243, 0.1)', 
                border: '1px solid rgba(33, 150, 243, 0.3)', 
                borderRadius: '8px', 
                padding: '1rem',
                marginTop: '1rem'
              }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#1976D2' }}>🧠 Trucco per la memoria:</h4>
                <p style={{ margin: 0, fontStyle: 'italic' }}>{rule.memoryTrick}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Quiz */}
        <div style={{ 
          background: 'rgba(76, 175, 80, 0.1)', 
          border: '1px solid rgba(76, 175, 80, 0.3)', 
          borderRadius: '12px', 
          padding: '2rem',
          marginTop: '3rem'
        }}>
          <h3 style={{ margin: '0 0 1.5rem', color: '#388E3C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎯 Esercizi di Pratica
          </h3>
          
          {currentRule.practiceQuiz.map((quiz, index) => (
            <div 
              key={index}
              style={{ 
                background: 'white', 
                borderRadius: '8px', 
                padding: '1.5rem', 
                marginBottom: '1rem',
                border: '1px solid rgba(76, 175, 80, 0.2)'
              }}
            >
              {quiz.sentence ? (
                <>
                  <p style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>
                    <strong>Completa:</strong> {quiz.sentence}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ padding: '0.3rem 0.8rem', background: '#4CAF50', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
                      {quiz.answer}
                    </span>
                    <span style={{ color: '#666' }}>{quiz.why}</span>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>
                    <strong>{quiz.word}:</strong> quale articolo/genere?
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ padding: '0.3rem 0.8rem', background: '#4CAF50', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
                      {quiz.gender || quiz.article}
                    </span>
                    <span style={{ color: '#666' }}>{quiz.why}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div style={{ margin: '3rem 0', padding: '2rem', background: 'rgba(255, 152, 0, 0.1)', borderRadius: '12px' }}>
        <h2>📚 Consigli per studiare la grammatica</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Un po' alla volta:</strong> Studia una regola per volta, non tutte insieme</li>
          <li><strong>Pratica attiva:</strong> Crea frasi tue utilizzando le regole apprese</li>
          <li><strong>Confronta con l'italiano:</strong> nota similitudini e differenze</li>
          <li><strong>Usa i trucchi:</strong> le scorciatoie ti aiutano a ricordare meglio</li>
          <li><strong>Non memorizzare tutto:</strong> concentrati su pattern e logica</li>
          <li><strong>Ripassi regolari:</strong> torna sulle regole dopo qualche giorno</li>
        </ul>
      </div>
    </div>
  );
};

export default GrammarGuide;