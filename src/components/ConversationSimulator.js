import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Send, Volume2, RefreshCw } from 'lucide-react';

const ConversationSimulator = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState('valencia');
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  // Text-to-speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const conversationTemplates = {
    valencia: {
      name: 'Parlando di Valencia',
      description: 'Una conversazione sulla tua esperienza a Valencia',
      steps: [
        {
          assistant: '¡Hola! He oído que has estado en Valencia. ¿Cómo fue tu experiencia allí?',
          translation: 'Ciao! Ho sentito che sei stato a Valencia. Com\'è stata la tua esperienza lì?',
          expectedResponse: 'Valencia è bellissima / Mi è piaciuta molto Valencia',
          hints: ['Valencia es muy bonita', 'Me gustó mucho Valencia', 'Fue una experiencia increíble']
        },
        {
          assistant: '¡Qué bien! ¿Cuánto tiempo estuviste allí?',
          translation: 'Che bello! Quanto tempo sei rimasto lì?',
          expectedResponse: 'Tempo di permanenza',
          hints: ['Estuve una semana', 'Pasé dos meses allí', 'Viví allí durante tres meses']
        },
        {
          assistant: '¿Qué es lo que más te gustó de la ciudad?',
          translation: 'Cosa ti è piaciuto di più della città?',
          expectedResponse: 'Aspetto preferito di Valencia',
          hints: ['La playa es hermosa', 'La comida es deliciosa', 'La gente es muy amable']
        },
        {
          assistant: '¿Probaste la paella auténtica? ¡Es el plato más famoso de Valencia!',
          translation: 'Hai assaggiato la paella autentica? È il piatto più famoso di Valencia!',
          expectedResponse: 'Esperienza con la paella',
          hints: ['Sí, estaba deliciosa', 'No, pero quiero probarla', 'La probé y me encantó']
        },
        {
          assistant: '¿Visitaste la Ciudad de las Artes y las Ciencias?',
          translation: 'Hai visitato la Città delle Arti e delle Scienze?',
          expectedResponse: 'Visita ai monumenti',
          hints: ['Sí, es impresionante', 'No tuve tiempo', 'Es muy moderna y bonita']
        }
      ]
    },
    daily_life: {
      name: 'Vita Quotidiana in Spagna',
      description: 'Conversazione sulla routine quotidiana durante il soggiorno',
      steps: [
        {
          assistant: '¿Cómo era tu rutina diaria en España?',
          translation: 'Com\'era la tua routine quotidiana in Spagna?',
          expectedResponse: 'Descrizione della routine',
          hints: ['Me levantaba temprano', 'Desayunaba café y tostadas', 'Salía a caminar por la ciudad']
        },
        {
          assistant: '¿A qué hora desayunabas normalmente?',
          translation: 'A che ora facevi colazione normalmente?',
          expectedResponse: 'Orario colazione',
          hints: ['Desayunaba a las ocho', 'Sobre las nueve de la mañana', 'Muy temprano, a las siete']
        },
        {
          assistant: '¿Qué comías para el desayuno?',
          translation: 'Cosa mangiavi a colazione?',
          expectedResponse: 'Cibo per colazione',
          hints: ['Tostadas con tomate', 'Café con leche y bollería', 'Zumo de naranja y cereales']
        },
        {
          assistant: '¿Salías mucho durante el día para explorar?',
          translation: 'Uscivi molto durante il giorno per esplorare?',
          expectedResponse: 'Attività diurne',
          hints: ['Sí, me gustaba caminar', 'Visitaba museos y parques', 'Exploraba diferentes barrios']
        },
        {
          assistant: '¿Cómo era la hora de la siesta? ¿La respetabas?',
          translation: 'Com\'era l\'ora della siesta? La rispettavi?',
          expectedResponse: 'Esperienza con la siesta',
          hints: ['Al principio me costó', 'Es muy relajante', 'No estaba acostumbrado']
        }
      ]
    },
    opinions: {
      name: 'Opinioni sulla Spagna',
      description: 'Condividi le tue impressioni e opinioni sulla cultura spagnola',
      steps: [
        {
          assistant: '¿Qué diferencias notaste entre Italia y España?',
          translation: 'Che differenze hai notato tra l\'Italia e la Spagna?',
          expectedResponse: 'Confronto culturale',
          hints: ['La comida es diferente', 'Los horarios son distintos', 'La gente es más extrovertida']
        },
        {
          assistant: '¿Cómo te pareció el clima del país?',
          translation: 'Come ti è sembrato il clima del paese?',
          expectedResponse: 'Impressioni sul clima',
          hints: ['Hace más calor que en Italia', 'El clima es perfecto', 'Hay menos humedad']
        },
        {
          assistant: '¿Qué piensas de la cultura española?',
          translation: 'Cosa pensi della cultura spagnola?',
          expectedResponse: 'Opinioni sulla cultura',
          hints: ['Es muy rica y diversa', 'Me encanta la música', 'Las tradiciones son interesantes']
        },
        {
          assistant: '¿Te costó mucho entender el acento español?',
          translation: 'Ti è stato difficile capire l\'accento spagnolo?',
          expectedResponse: 'Difficoltà linguistiche',
          hints: ['Al principio sí', 'No mucho, es similar al italiano', 'Poco a poco me acostumbré']
        },
        {
          assistant: '¿Volverías a España? ¿Por qué?',
          translation: 'Torneresti in Spagna? Perché?',
          expectedResponse: 'Intenzioni future',
          hints: ['Sí, me encantó', 'Quiero conocer más ciudades', 'Definitivamente volvería']
        }
      ]
    }
  };

  const currentTemplate = conversationTemplates[selectedTopic];
  const currentConversationStep = currentTemplate.steps[currentStep];

  const startConversation = () => {
    setConversation([]);
    setCurrentStep(0);
    const firstMessage = {
      type: 'assistant',
      text: currentTemplate.steps[0].assistant,
      translation: currentTemplate.steps[0].translation
    };
    setConversation([firstMessage]);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = {
      type: 'user',
      text: userInput
    };

    const newConversation = [...conversation, userMessage];

    // Simulate assistant response with feedback
    let feedback = '';
    let nextResponse = '';

    if (currentStep < currentTemplate.steps.length - 1) {
      // Provide encouragement and move to next step
      feedback = '¡Muy bien! ';
      const nextStep = currentTemplate.steps[currentStep + 1];
      nextResponse = nextStep.assistant;
      
      const assistantMessage = {
        type: 'assistant',
        text: feedback + nextResponse,
        translation: nextStep.translation
      };

      setConversation([...newConversation, assistantMessage]);
      setCurrentStep(currentStep + 1);
    } else {
      // End conversation
      const finalMessage = {
        type: 'assistant',
        text: '¡Excelente conversación! Has hecho un gran progreso. ¿Quieres practicar otro tema?',
        translation: 'Conversazione eccellente! Hai fatto grandi progressi. Vuoi praticare un altro argomento?'
      };
      setConversation([...newConversation, finalMessage]);
    }

    setUserInput('');
  };

  const resetConversation = () => {
    setConversation([]);
    setCurrentStep(0);
    setUserInput('');
  };

  return (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <MessageCircle size={32} color="#2196F3" />
        <div>
          <h1>Daily Conversation Simulator</h1>
          <p>Pratica conversazioni reali in spagnolo sui tuoi viaggi ed esperienze</p>
        </div>
      </div>

      {/* Topic Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Scegli un argomento di conversazione:</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {Object.keys(conversationTemplates).map(topicKey => (
            <button
              key={topicKey}
              onClick={() => {
                setSelectedTopic(topicKey);
                resetConversation();
              }}
              className={`btn ${selectedTopic === topicKey ? '' : 'secondary'}`}
              style={{ minWidth: '200px' }}
            >
              {conversationTemplates[topicKey].name}
            </button>
          ))}
        </div>
        <p style={{ color: '#666', margin: '1rem 0' }}>
          {currentTemplate.description}
        </p>
      </div>

      {/* Conversation Area */}
      <div style={{ 
        background: '#f8f9fa', 
        borderRadius: '12px', 
        padding: '1.5rem', 
        marginBottom: '2rem',
        minHeight: '400px',
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        {conversation.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <MessageCircle size={48} color="#ccc" />
            <p style={{ color: '#666', marginTop: '1rem' }}>
              Clicca "Inizia Conversazione" per cominciare a praticare!
            </p>
            <button onClick={startConversation} className="btn" style={{ marginTop: '1rem' }}>
              Inizia Conversazione
            </button>
          </div>
        ) : (
          <>
            {conversation.map((message, index) => (
              <div 
                key={index}
                className={`conversation-bubble ${message.type}`}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: '500' }}>{message.text}</p>
                    {message.translation && (
                      <p style={{ 
                        margin: '0.5rem 0 0', 
                        fontSize: '0.9rem', 
                        opacity: 0.8,
                        fontStyle: 'italic'
                      }}>
                        {message.translation}
                      </p>
                    )}
                  </div>
                  {message.type === 'assistant' && (
                    <button
                      onClick={() => speakText(message.text)}
                      className="audio-btn"
                      style={{ marginLeft: '1rem' }}
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input Area */}
      {conversation.length > 0 && currentStep < currentTemplate.steps.length && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h3>💭 Suggerimenti di risposta:</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {currentConversationStep?.hints.map((hint, index) => (
                <button
                  key={index}
                  onClick={() => setUserInput(hint)}
                  className="btn secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="userInput" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                La tua risposta in spagnolo:
              </label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Scrivi la tua risposta qui..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '2px solid #ddd',
                  fontSize: '1rem',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!userInput.trim()}
              className="btn"
              style={{ height: 'fit-content', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Send size={18} />
              Invia
            </button>
          </div>
        </div>
      )}

      {/* Reset button */}
      {conversation.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={resetConversation} className="btn secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}>
            <RefreshCw size={18} />
            Ricomincia Conversazione
          </button>
        </div>
      )}

      {/* Tips */}
      <div style={{ margin: '3rem 0', padding: '2rem', background: 'rgba(33, 150, 243, 0.1)', borderRadius: '12px' }}>
        <h2>💡 Consigli per la conversazione</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Non preoccuparti degli errori:</strong> È normale sbagliare mentre impari</li>
          <li><strong>Usa le traduzioni:</strong> Leggi le traduzioni per capire meglio il contesto</li>
          <li><strong>Ascolta la pronuncia:</strong> Clicca i pulsanti audio per sentire come si pronuncia</li>
          <li><strong>Prova variazioni:</strong> Non usare sempre i suggerimenti, sperimenta con le tue parole</li>
          <li><strong>Pratica regolarmente:</strong> Ripeti le conversazioni per migliorare la fluidità</li>
        </ul>
      </div>
    </div>
  );
};

export default ConversationSimulator;