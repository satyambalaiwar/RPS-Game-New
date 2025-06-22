import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Zap, Target, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import BackgroundParticles from './components/BackgroundParticles'
import GameChoice from './components/GameChoice'
import ScoreBoard from './components/ScoreBoard'
import ResultDisplay from './components/ResultDisplay'
import './App.css'

function App() {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [score, setScore] = useState({ user: 0, computer: 0, ties: 0 })
  const [gameHistory, setGameHistory] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  const choices = ['rock', 'paper', 'scissors']

  const playSound = (type) => {
    if (!soundEnabled) return;
    // NOTE real audio needed....................
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABgAAABkYXRhAgAAAAEA');
    audio.play().catch(() => {});
  }

  const determineWinner = (user, computer) => {
    if (user === computer) return 'tie'
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'win'
    }
    return 'lose'
  }

  const playGame = (choice) => {
    setIsPlaying(true)
    setUserChoice(choice)
    
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)]
      setComputerChoice(computerChoice)
      
      const gameResult = determineWinner(choice, computerChoice)
      setResult(gameResult)
      
      setScore(prev => ({
        ...prev,
        [gameResult === 'tie' ? 'ties' : gameResult === 'win' ? 'user' : 'computer']: 
        prev[gameResult === 'tie' ? 'ties' : gameResult === 'win' ? 'user' : 'computer'] + 1
      }))
      
      if (gameResult === 'win') {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
      } else {
        setStreak(0)
      }
      
      setGameHistory(prev => [{
        user: choice,
        computer: computerChoice,
        result: gameResult,
        timestamp: new Date()
      }, ...prev.slice(0, 9)])
      
      playSound(gameResult)
      
      setIsPlaying(false)
    }, 1000)
  }

  const resetGame = () => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult('')
    setScore({ user: 0, computer: 0, ties: 0 })
    setGameHistory([])
    setStreak(0)
    setBestStreak(0)
  }

  const getResultMessage = () => {
    switch (result) {
      case 'win': return 'You Win! 🎉'
      case 'lose': return 'Computer Wins! 😔'
      case 'tie': return "It's a Tie! 🤝"
      default: return 'Choose your weapon!'
    }
  }

  const getResultColor = () => {
    switch (result) {
      case 'win': return 'text-green-400'
      case 'lose': return 'text-red-400'
      case 'tie': return 'text-yellow-400'
      default: return 'text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-darker via-game-dark to-game-primary relative overflow-hidden">
      <BackgroundParticles />
      
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 text-center mb-8"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-orbitron">
          <span className="bg-gradient-to-r from-game-primary via-game-secondary to-game-accent bg-clip-text text-transparent">
            ROCK PAPER SCISSORS
          </span>
        </h1>
        <p className="text-xl text-gray-300 font-light">
          Advanced Edition
        </p>
      </motion.header>

      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 z-20 p-3 bg-game-primary/20 backdrop-blur-sm rounded-full text-white hover:bg-game-primary/40"
      >
        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <ScoreBoard score={score} streak={streak} bestStreak={bestStreak} />

        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/10"
        >
          <ResultDisplay 
            userChoice={userChoice}
            computerChoice={computerChoice}
            result={result}
            getResultMessage={getResultMessage}
            getResultColor={getResultColor}
            isPlaying={isPlaying}
          />

          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {choices.map((choice) => (
              <GameChoice
                key={choice}
                choice={choice}
                onClick={() => playGame(choice)}
                disabled={isPlaying}
                isSelected={userChoice === choice}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div className="text-center mt-8">
          <button
            onClick={resetGame}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-6 py-3 rounded-xl font-semibold"
          >
            <RotateCcw size={20} /> Reset Game
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default App