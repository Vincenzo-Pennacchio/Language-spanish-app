import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, Timer } from 'lucide-react';

const InteractiveQuiz = ({ questions, title, description, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 secondi per domanda
  const [timerActive, setTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [timeLeft, timerActive, showFeedback]);

  const handleTimeUp = () => {
    setShowFeedback(true);
    setTimerActive(false);
    // Salva risposta come sbagliata quando il tempo scade
    const newAnswer = {
      questionIndex: currentQuestionIndex,
      selectedAnswer: '',
      isCorrect: false,
      timeUp: true
    };
    setAnswers([...answers, newAnswer]);
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer && timeLeft > 0) return;
    
    setTimerActive(false);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const newAnswer = {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      isCorrect,
      timeSpent: 30 - timeLeft
    };
    
    setAnswers([...answers, newAnswer]);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete({
          score,
          totalQuestions: questions.length,
          answers,
          percentage: Math.round((score / questions.length) * 100)
        });
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setAnswers([]);
    setShowFeedback(false);
    setQuizCompleted(false);
    setScore(0);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const getScoreMessage = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage >= 90) return { text: "¡Excelente! Sei quasi un esperto!", color: "#4CAF50", emoji: "🏆" };
    if (percentage >= 75) return { text: "¡Muy bien! Ottimo lavoro!", color: "#8BC34A", emoji: "⭐" };
    if (percentage >= 60) return { text: "¡Bien! Continua così!", color: "#FF9800", emoji: "👍" };
    return { text: "Continua a praticare, puoi farcela!", color: "#ff5722", emoji: "💪" };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="content-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{scoreMessage.emoji}</div>
          <h2 style={{ color: scoreMessage.color, marginBottom: '1rem' }}>
            Quiz Completato!
          </h2>
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: scoreMessage.color }}>
                {score}/{questions.length}
              </div>
              <div className="stat-label">Risposte Corrette</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: scoreMessage.color }}>
                {percentage}%
              </div>
              <div className="stat-label">Percentuale</div>
            </div>
          </div>
          <p style={{ fontSize: '1.2rem', color: scoreMessage.color, marginBottom: '2rem' }}>
            {scoreMessage.text}
          </p>
          <button onClick={resetQuiz} className="btn">
            <RefreshCw size={18} />
            Riprova Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Trophy size={24} color="#FF9800" />
          {title}
        </h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>{description}</p>
        
        {/* Progress bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Domanda {currentQuestionIndex + 1} di {questions.length}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Timer size={16} />
              {timeLeft}s
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Timer indicator */}
        <div style={{ height: '4px', background: '#e0e0e0', borderRadius: '2px', marginBottom: '2rem' }}>
          <div 
            style={{ 
              width: `${(timeLeft / 30) * 100}%`,
              height: '100%',
              background: timeLeft > 10 ? '#4CAF50' : timeLeft > 5 ? '#FF9800' : '#f44336',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div style={{ 
        background: 'rgba(102, 126, 234, 0.1)', 
        padding: '2rem', 
        borderRadius: '16px', 
        marginBottom: '2rem',
        border: '2px solid rgba(102, 126, 234, 0.2)'
      }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>
          {currentQuestion.question}
        </h3>
        
        {currentQuestion.hint && (
          <p style={{ 
            color: '#666', 
            fontStyle: 'italic', 
            marginBottom: '1.5rem',
            padding: '0.8rem',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '8px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            💡 Suggerimento: {currentQuestion.hint}
          </p>
        )}

        {/* Options */}
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          {currentQuestion.options.map((option, index) => {
            let backgroundColor = 'white';
            let borderColor = '#ddd';
            let textColor = '#333';
            
            if (showFeedback) {
              if (option === currentQuestion.correctAnswer) {
                backgroundColor = '#e8f5e8';
                borderColor = '#4CAF50';
                textColor = '#2e7d32';
              } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                backgroundColor = '#ffeaea';
                borderColor = '#f44336';
                textColor = '#c62828';
              }
            } else if (option === selectedAnswer) {
              backgroundColor = 'rgba(102, 126, 234, 0.1)';
              borderColor = '#667eea';
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                style={{
                  padding: '1rem 1.5rem',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '12px',
                  background: backgroundColor,
                  color: textColor,
                  textAlign: 'left',
                  cursor: showFeedback ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: '500',
                  position: 'relative'
                }}
              >
                <span style={{ marginRight: '1rem' }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showFeedback && option === currentQuestion.correctAnswer && (
                  <CheckCircle 
                    size={20} 
                    color="#4CAF50" 
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                )}
                {showFeedback && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <XCircle 
                    size={20} 
                    color="#f44336" 
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div style={{ 
            padding: '1.5rem',
            borderRadius: '12px',
            background: answers[answers.length - 1]?.isCorrect ? 
              'rgba(76, 175, 80, 0.1)' : 
              'rgba(244, 67, 54, 0.1)',
            border: `1px solid ${answers[answers.length - 1]?.isCorrect ? '#4CAF50' : '#f44336'}`,
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {answers[answers.length - 1]?.isCorrect ? (
                <CheckCircle size={20} color="#4CAF50" />
              ) : (
                <XCircle size={20} color="#f44336" />
              )}
              <strong>
                {answers[answers.length - 1]?.isCorrect ? '¡Correcto!' : 'Sbagliato!'}
              </strong>
            </div>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {!showFeedback ? (
            <button 
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer && timeLeft > 0}
              className="btn"
              style={{ 
                opacity: (!selectedAnswer && timeLeft > 0) ? 0.6 : 1,
                cursor: (!selectedAnswer && timeLeft > 0) ? 'not-allowed' : 'pointer'
              }}
            >
              Conferma Risposta
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="btn">
              {currentQuestionIndex < questions.length - 1 ? 'Prossima Domanda' : 'Completa Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz;