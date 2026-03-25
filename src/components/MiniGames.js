import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Zap, Target, Shuffle, Check, X } from 'lucide-react';

const MiniGames = ({ onNavigate }) => {
  const [selectedGame, setSelectedGame] = useState('wordmatch');
  const [gameState, setGameState] = useState('menu');

  const games = {
    wordmatch: {
      name: 'Abbinamento Parole',
      description: 'Abbina le parole spagnole con la traduzione italiana',
      icon: '🔗',
      difficulty: 'Facile'
    },
    quicktranslate: {
      name: 'Traduzione Lampo',
      description: 'Traduci il più velocemente possibile',
      icon: '⚡',
      difficulty: 'Medio'
    },
    listenandfind: {
      name: 'Ascolta e Trova',
      description: 'Ascolta la parola e trovala tra le opzioni',
      icon: '👂',
      difficulty: 'Medio'
    },
    buildsentence: {
      name: 'Costruisci la Frase',
      description: 'Riordina le parole per formare una frase corretta',
      icon: '🏗️',
      difficulty: 'Avanzato'
    }
  };

  const renderGameMenu = () => (
    <div className="content-container">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Torna alla Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Target size={32} color="#4CAF50" />
        <div>
          <h1>Mini-Giochi Educativi</h1>
          <p>Impara divertendoti con questi giochi interattivi!</p>
        </div>
      </div>

      <div className="modules-grid">
        {Object.entries(games).map(([gameId, game]) => (
          <div 
            key={gameId}
            className="module-card"
            onClick={() => {
              setSelectedGame(gameId);
              setGameState('playing');
            }}
          >
            <h3 style={{ color: '#4CAF50' }}>
              <span style={{ fontSize: '2rem', marginRight: '0.5rem' }}>{game.icon}</span>
              {game.name}
            </h3>
            <p>{game.description}</p>
            
            <div style={{ 
              display: 'inline-block', 
              padding: '0.3rem 0.8rem',
              background: game.difficulty === 'Facile' ? '#4CAF50' : 
                         game.difficulty === 'Medio' ? '#FF9800' : '#f44336',
              color: 'white',
              borderRadius: '20px',
              fontSize: '0.8rem',
              marginBottom: '1rem'
            }}>
              {game.difficulty}
            </div>
            
            <button className="btn">
              Gioca Ora
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (gameState === 'menu') {
    return renderGameMenu();
  }

  return (
    <div className="content-container">
      <button 
        className="back-btn" 
        onClick={() => setGameState('menu')}
      >
        <ArrowLeft size={20} />
        Torna ai Giochi
      </button>
      
      {selectedGame === 'wordmatch' && <WordMatchGame />}
      {selectedGame === 'quicktranslate' && <QuickTranslateGame />}
      {selectedGame === 'listenandfind' && <ListenAndFindGame />}
      {selectedGame === 'buildsentence' && <BuildSentenceGame />}
    </div>
  );
};

// Word Match Game Component
const WordMatchGame = () => {
  const [pairs] = useState([
    { spanish: 'casa', italian: 'casa' },
    { spanish: 'agua', italian: 'acqua' },
    { spanish: 'gato', italian: 'gatto' },
    { spanish: 'libro', italian: 'libro' },
    { spanish: 'tiempo', italian: 'tempo' },
    { spanish: 'amigo', italian: 'amico' },
    { spanish: 'comida', italian: 'cibo' },
    { spanish: 'trabajo', italian: 'lavoro' }
  ]);

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  const initializeGame = () => {
    const allCards = [];
    pairs.forEach((pair, index) => {
      allCards.push(
        { id: `spanish-${index}`, text: pair.spanish, type: 'spanish', pairId: index },
        { id: `italian-${index}`, text: pair.italian, type: 'italian', pairId: index }
      );
    });
    setCards(shuffleArray(allCards));
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (card) => {
    if (!gameStarted) setGameStarted(true);
    
    if (selectedCards.length === 2) return;
    if (selectedCards.some(selected => selected.id === card.id)) return;
    if (matchedPairs.includes(card.pairId)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      
      if (newSelected[0].pairId === newSelected[1].pairId && 
          newSelected[0].type !== newSelected[1].type) {
        // Match found
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, card.pairId]);
          setSelectedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const getCardStyle = (card) => {
    const isSelected = selectedCards.some(selected => selected.id === card.id);
    const isMatched = matchedPairs.includes(card.pairId);
    const isWrongSelection = selectedCards.length === 2 && 
      isSelected && 
      (selectedCards[0].pairId !== selectedCards[1].pairId || 
       selectedCards[0].type === selectedCards[1].type);

    return {
      padding: '1rem',
      margin: '0.5rem',
      borderRadius: '12px',
      cursor: 'pointer',
      textAlign: 'center',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      background: isMatched ? '#e8f5e8' : 
                 isSelected ? (isWrongSelection ? '#ffeaea' : '#e3f2fd') :
                 card.type === 'spanish' ? '#fff3e0' : '#f3e5f5',
      border: isMatched ? '2px solid #4CAF50' :
              isSelected ? (isWrongSelection ? '2px solid #f44336' : '2px solid #2196F3') :
              '2px solid #ddd',
      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
      opacity: isMatched ? 0.8 : 1
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isGameComplete = matchedPairs.length === pairs.length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '2rem' }}>🔗</span>
        <div>
          <h2>Abbinamento Parole</h2>
          <p>Abbina le parole spagnole con la loro traduzione italiana</p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-value">{formatTime(timeElapsed)}</div>
          <div className="stat-label">Tempo</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{moves}</div>
          <div className="stat-label">Mosse</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{matchedPairs.length}/{pairs.length}</div>
          <div className="stat-label">Abbinamenti</div>
        </div>
      </div>

      {isGameComplete && (
        <div style={{ 
          background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
          color: 'white',
          padding: '2rem',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h3>🎉 Congratulazioni!</h3>
          <p>Hai completato il gioco in {moves} mosse e {formatTime(timeElapsed)}!</p>
          <button 
            onClick={initializeGame}
            className="btn"
            style={{ background: 'white', color: '#4CAF50', marginTop: '1rem' }}
          >
            Gioca Ancora
          </button>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '0.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={getCardStyle(card)}
          >
            {card.text}
            <div style={{ 
              fontSize: '0.7rem', 
              color: '#666', 
              marginTop: '0.5rem' 
            }}>
              {card.type === 'spanish' ? '🇪🇸' : '🇮🇹'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Translate Game Component
const QuickTranslateGame = () => {
  const [words] = useState([
    { spanish: 'hola', italian: 'ciao' },
    { spanish: 'gracias', italian: 'grazie' },
    { spanish: 'por favor', italian: 'per favore' },
    { spanish: 'lo siento', italian: 'mi dispiace' },
    { spanish: 'buenas noches', italian: 'buonanotte' },
    { spanish: 'hasta luego', italian: 'a dopo' },
    { spanish: 'de nada', italian: 'prego' },
    { spanish: 'perdón', italian: 'scusa' }
  ]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(60);
    setCurrentWordIndex(0);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const currentWord = words[currentWordIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentWord.italian.toLowerCase();
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('¡Correcto! ✅');
    } else {
      setFeedback(`❌ Corretto: ${currentWord.italian}`);
    }

    setTimeout(() => {
      setCurrentWordIndex((currentWordIndex + 1) % words.length);
      setUserAnswer('');
      setFeedback('');
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameActive && userAnswer.trim()) {
      checkAnswer();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem' }}>⚡</span>
        <div>
          <h2>Traduzione Lampo</h2>
          <p>Traduci il più velocemente possibile in 60 secondi!</p>
        </div>
      </div>

      {!gameActive && timeLeft === 60 ? (
        <div>
          <button onClick={startGame} className="btn" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            <Zap size={20} />
            Inizia Gioco
          </button>
        </div>
      ) : (
        <div>
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: timeLeft > 10 ? '#4CAF50' : '#f44336' }}>
                {timeLeft}s
              </div>
              <div className="stat-label">Tempo Rimasto</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{score}</div>
              <div className="stat-label">Punteggio</div>
            </div>
          </div>

          {gameActive ? (
            <div>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '3rem',
                borderRadius: '20px',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  {words[currentWordIndex].spanish}
                </h3>
                <p>Traduci in italiano:</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi la traduzione..."
                  style={{
                    padding: '1rem',
                    fontSize: '1.2rem',
                    borderRadius: '12px',
                    border: '2px solid #ddd',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                  }}
                  autoFocus
                />
              </div>

              <button 
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="btn"
                style={{ opacity: !userAnswer.trim() ? 0.5 : 1 }}
              >
                Conferma
              </button>

              {feedback && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: feedback.includes('✅') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  fontSize: '1.2rem'
                }}>
                  {feedback}
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
              color: 'white',
              padding: '2rem',
              borderRadius: '16px'
            }}>
              <h3>🎉 Tempo Scaduto!</h3>
              <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
                Punteggio finale: {score} parole corrette!
              </p>
              <button 
                onClick={startGame}
                className="btn"
                style={{ background: 'white', color: '#4CAF50' }}
              >
                Gioca Ancora
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Placeholder components for other games
const ListenAndFindGame = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <span style={{ fontSize: '3rem' }}>👂</span>
    <h2>Ascolta e Trova</h2>
    <p>Questo gioco sarà disponibile presto!</p>
  </div>
);

const BuildSentenceGame = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <span style={{ fontSize: '3rem' }}>🏗️</span>
    <h2>Costruisci la Frase</h2>
    <p>Questo gioco sarà disponibile presto!</p>
  </div>
);

export default MiniGames;