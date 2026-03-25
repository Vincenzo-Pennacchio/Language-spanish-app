import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action types
const actionTypes = {
  // User data
  UPDATE_VOCABULARY_PROGRESS: 'UPDATE_VOCABULARY_PROGRESS',
  UPDATE_CONVERSATION_PROGRESS: 'UPDATE_CONVERSATION_PROGRESS',
  UPDATE_GRAMMAR_PROGRESS: 'UPDATE_GRAMMAR_PROGRESS',
  UPDATE_PRONUNCIATION_PROGRESS: 'UPDATE_PRONUNCIATION_PROGRESS',
  UPDATE_PHRASES_PROGRESS: 'UPDATE_PHRASES_PROGRESS',
  UPDATE_GAMES_PROGRESS: 'UPDATE_GAMES_PROGRESS',
  
  // Settings
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_AUDIO_ENABLED: 'SET_AUDIO_ENABLED',
  SET_NOTIFICATIONS_ENABLED: 'SET_NOTIFICATIONS_ENABLED',
  SET_DAILY_GOAL: 'SET_DAILY_GOAL',
  
  // User profile
  SET_USER_LEVEL: 'SET_USER_LEVEL',
  ADD_ACHIEVEMENT: 'ADD_ACHIEVEMENT',
  UPDATE_STREAK: 'UPDATE_STREAK',
  SET_LAST_ACTIVE: 'SET_LAST_ACTIVE',
  
  // App state
  SET_CURRENT_MODULE: 'SET_CURRENT_MODULE',
  SET_LOADING: 'SET_LOADING',
  RESET_ALL_DATA: 'RESET_ALL_DATA'
};

// Initial state
const initialState = {
  // User progress
  vocabulary: {
    completedWords: new Set(),
    masteredCategories: new Set(),
    totalTimeSpent: 0
  },
  conversation: {
    completedConversations: new Set(),
    conversationStreak: 0,
    totalConversations: 0
  },
  grammar: {
    masteredRules: new Set(),
    completedQuizzes: new Set(),
    totalScore: 0
  },
  pronunciation: {
    masteredSounds: new Set(),
    practiceTime: 0,
    accuracy: 0
  },
  phrases: {
    favoritesPhrases: new Set(),
    masteredPhrases: new Set(),
    categoryProgress: {}
  },
  games: {
    highScores: {},
    gamesPlayed: 0,
    totalPoints: 0
  },
  
  // User profile
  user: {
    level: 'Principiante',
    experience: 0,
    achievements: [],
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    joinDate: new Date().toISOString(),
    dailyGoal: 15, // minutes
    weeklyGoal: 105 // 15 * 7
  },
  
  // Settings
  settings: {
    darkMode: false,
    language: 'it',
    audioEnabled: true,
    notificationsEnabled: true,
    autoPlayAudio: true,
    showTranslations: true,
    showPronunciation: true,
    difficulty: 'intermediate'
  },
  
  // App state
  app: {
    currentModule: 'home',
    loading: false,
    lastSync: null,
    version: '1.0.0'
  }
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_VOCABULARY_PROGRESS:
      return {
        ...state,
        vocabulary: {
          ...state.vocabulary,
          ...action.payload
        }
      };
      
    case actionTypes.UPDATE_CONVERSATION_PROGRESS:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          ...action.payload
        }
      };
      
    case actionTypes.UPDATE_GRAMMAR_PROGRESS:
      return {
        ...state,
        grammar: {
          ...state.grammar,
          ...action.payload
        }
      };
      
    case actionTypes.UPDATE_PRONUNCIATION_PROGRESS:
      return {
        ...state,
        pronunciation: {
          ...state.pronunciation,
          ...action.payload
        }
      };
      
    case actionTypes.UPDATE_PHRASES_PROGRESS:
      return {
        ...state,
        phrases: {
          ...state.phrases,
          ...action.payload
        }
      };
      
    case actionTypes.UPDATE_GAMES_PROGRESS:
      return {
        ...state,
        games: {
          ...state.games,
          ...action.payload
        }
      };
      
    case actionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        settings: {
          ...state.settings,
          darkMode: !state.settings.darkMode
        }
      };
      
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        settings: {
          ...state.settings,
          language: action.payload
        }
      };
      
    case actionTypes.SET_AUDIO_ENABLED:
      return {
        ...state,
        settings: {
          ...state.settings,
          audioEnabled: action.payload
        }
      };
      
    case actionTypes.SET_NOTIFICATIONS_ENABLED:
      return {
        ...state,
        settings: {
          ...state.settings,
          notificationsEnabled: action.payload
        }
      };
      
    case actionTypes.SET_DAILY_GOAL:
      return {
        ...state,
        user: {
          ...state.user,
          dailyGoal: action.payload,
          weeklyGoal: action.payload * 7
        }
      };
      
    case actionTypes.SET_USER_LEVEL:
      return {
        ...state,
        user: {
          ...state.user,
          level: action.payload.level,
          experience: action.payload.experience || state.user.experience
        }
      };
      
    case actionTypes.ADD_ACHIEVEMENT:
      return {
        ...state,
        user: {
          ...state.user,
          achievements: [...state.user.achievements, action.payload]
        }
      };
      
    case actionTypes.UPDATE_STREAK:
      return {
        ...state,
        user: {
          ...state.user,
          currentStreak: action.payload,
          longestStreak: Math.max(state.user.longestStreak, action.payload)
        }
      };
      
    case actionTypes.SET_LAST_ACTIVE:
      return {
        ...state,
        user: {
          ...state.user,
          lastActiveDate: action.payload
        }
      };
      
    case actionTypes.SET_CURRENT_MODULE:
      return {
        ...state,
        app: {
          ...state.app,
          currentModule: action.payload
        }
      };
      
    case actionTypes.SET_LOADING:
      return {
        ...state,
        app: {
          ...state.app,
          loading: action.payload
        }
      };
      
    case actionTypes.RESET_ALL_DATA:
      return {
        ...initialState,
        user: {
          ...initialState.user,
          joinDate: state.user.joinDate
        }
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    // Load state from localStorage
    try {
      const savedState = localStorage.getItem('aprendeEspanolState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        // Convert Sets back from arrays
        if (parsed.vocabulary?.completedWords)
          parsed.vocabulary.completedWords = new Set(parsed.vocabulary.completedWords);
        if (parsed.vocabulary?.masteredCategories)
          parsed.vocabulary.masteredCategories = new Set(parsed.vocabulary.masteredCategories);
        if (parsed.conversation?.completedConversations)
          parsed.conversation.completedConversations = new Set(parsed.conversation.completedConversations);
        if (parsed.grammar?.masteredRules)
          parsed.grammar.masteredRules = new Set(parsed.grammar.masteredRules);
        if (parsed.grammar?.completedQuizzes)
          parsed.grammar.completedQuizzes = new Set(parsed.grammar.completedQuizzes);
        if (parsed.pronunciation?.masteredSounds)
          parsed.pronunciation.masteredSounds = new Set(parsed.pronunciation.masteredSounds);
        if (parsed.phrases?.favoritesPhrases)
          parsed.phrases.favoritesPhrases = new Set(parsed.phrases.favoritesPhrases);
        if (parsed.phrases?.masteredPhrases)
          parsed.phrases.masteredPhrases = new Set(parsed.phrases.masteredPhrases);
        
        return { ...initial, ...parsed };
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
    return initial;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = {
        ...state,
        // Convert Sets to arrays for JSON serialization
        vocabulary: {
          ...state.vocabulary,
          completedWords: Array.from(state.vocabulary.completedWords),
          masteredCategories: Array.from(state.vocabulary.masteredCategories)
        },
        conversation: {
          ...state.conversation,
          completedConversations: Array.from(state.conversation.completedConversations)
        },
        grammar: {
          ...state.grammar,
          masteredRules: Array.from(state.grammar.masteredRules),
          completedQuizzes: Array.from(state.grammar.completedQuizzes)
        },
        pronunciation: {
          ...state.pronunciation,
          masteredSounds: Array.from(state.pronunciation.masteredSounds)
        },
        phrases: {
          ...state.phrases,
          favoritesPhrases: Array.from(state.phrases.favoritesPhrases),
          masteredPhrases: Array.from(state.phrases.masteredPhrases)
        }
      };
      
      localStorage.setItem('aprendeEspanolState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [state]);

  // Calculate user level based on experience
  useEffect(() => {
    const calculateLevel = (experience) => {
      if (experience < 100) return { level: 'Principiante', badge: '🌱' };
      if (experience < 300) return { level: 'Elementare', badge: '🌿' };
      if (experience < 600) return { level: 'Intermedio', badge: '🌳' };
      if (experience < 1000) return { level: 'Intermedio-Alto', badge: '🏔️' };
      if (experience < 1500) return { level: 'Avanzato', badge: '⭐' };
      return { level: 'Esperto', badge: '🏆' };
    };

    const totalExperience = (
      state.vocabulary.completedWords.size * 2 +
      state.conversation.totalConversations * 10 +
      state.grammar.masteredRules.size * 15 +
      state.pronunciation.masteredSounds.size * 8 +
      state.phrases.masteredPhrases.size * 5 +
      state.games.totalPoints * 0.1
    );

    if (totalExperience !== state.user.experience) {
      const newLevelInfo = calculateLevel(totalExperience);
      if (newLevelInfo.level !== state.user.level) {
        dispatch({
          type: actionTypes.SET_USER_LEVEL,
          payload: { level: newLevelInfo.level, experience: totalExperience }
        });
      }
    }
  }, [state.vocabulary.completedWords.size, state.conversation.totalConversations, 
      state.grammar.masteredRules.size, state.pronunciation.masteredSounds.size,
      state.phrases.masteredPhrases.size, state.games.totalPoints]);

  // Update daily streak
  useEffect(() => {
    const today = new Date().toDateString();
    const lastActive = state.user.lastActiveDate ? new Date(state.user.lastActiveDate).toDateString() : null;
    
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();
      
      let newStreak = 1;
      if (lastActive === yesterdayString) {
        newStreak = state.user.currentStreak + 1;
      } else if (lastActive && lastActive !== today) {
        newStreak = 1; // Reset streak if more than a day has passed
      }
      
      dispatch({ type: actionTypes.UPDATE_STREAK, payload: newStreak });
      dispatch({ type: actionTypes.SET_LAST_ACTIVE, payload: new Date().toISOString() });
    }
  }, [state.user.lastActiveDate, state.user.currentStreak]);

  // Action creators
  const actions = {
    updateVocabularyProgress: (payload) =>
      dispatch({ type: actionTypes.UPDATE_VOCABULARY_PROGRESS, payload }),
    
    updateConversationProgress: (payload) =>
      dispatch({ type: actionTypes.UPDATE_CONVERSATION_PROGRESS, payload }),
    
    updateGrammarProgress: (payload) =>
      dispatch({ type: actionTypes.UPDATE_GRAMMAR_PROGRESS, payload }),
    
    updatePronunciationProgress: (payload) =>
      dispatch({ type: actionTypes.UPDATE_PRONUNCIATION_PROGRESS, payload }),
    
    updatePhrasesProgress: (payload) =>
      dispatch({ type: actionTypes.UPDATE_PHRASES_PROGRESS, payload }),
    
    updateGamesProgress: (payload) =>
      dispatch({ type: actionTypes.UPDATE_GAMES_PROGRESS, payload }),
    
    toggleDarkMode: () =>
      dispatch({ type: actionTypes.TOGGLE_DARK_MODE }),
    
    setLanguage: (language) =>
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: language }),
    
    setAudioEnabled: (enabled) =>
      dispatch({ type: actionTypes.SET_AUDIO_ENABLED, payload: enabled }),
    
    setNotificationsEnabled: (enabled) =>
      dispatch({ type: actionTypes.SET_NOTIFICATIONS_ENABLED, payload: enabled }),
    
    setDailyGoal: (minutes) =>
      dispatch({ type: actionTypes.SET_DAILY_GOAL, payload: minutes }),
    
    addAchievement: (achievement) =>
      dispatch({ type: actionTypes.ADD_ACHIEVEMENT, payload: achievement }),
    
    setCurrentModule: (module) =>
      dispatch({ type: actionTypes.SET_CURRENT_MODULE, payload: module }),
    
    setLoading: (loading) =>
      dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    
    resetAllData: () =>
      dispatch({ type: actionTypes.RESET_ALL_DATA })
  };

  const value = {
    state,
    actions,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Selectors for common data
export const useUserLevel = () => {
  const { state } = useApp();
  return state.user.level;
};

export const useUserProgress = () => {
  const { state } = useApp();
  const totalWords = state.vocabulary.completedWords.size;
  const totalConversations = state.conversation.totalConversations;
  const totalGrammarRules = state.grammar.masteredRules.size;
  const totalSounds = state.pronunciation.masteredSounds.size;
  const totalPhrases = state.phrases.masteredPhrases.size;
  
  return {
    totalWords,
    totalConversations,
    totalGrammarRules,
    totalSounds,
    totalPhrases,
    level: state.user.level,
    streak: state.user.currentStreak,
    experience: state.user.experience
  };
};

export const useSettings = () => {
  const { state, actions } = useApp();
  return {
    settings: state.settings,
    toggleDarkMode: actions.toggleDarkMode,
    setLanguage: actions.setLanguage,
    setAudioEnabled: actions.setAudioEnabled,
    setNotificationsEnabled: actions.setNotificationsEnabled
  };
};