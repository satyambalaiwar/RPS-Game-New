import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Zap, Target, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import BackgroundParticles from './components/BackgroundParticles'
import GameChoice from './components/GameChoice'
import ScoreBoard from './components/ScoreBoard'
import ResultDisplay from './components/ResultDisplay'
import jackSparrowBGM from './assets/Jack Sparrow BGM.mp3'
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
  const [bgMusicPlaying, setBgMusicPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  const bgMusicRef = useRef(null)
  const choices = ['rock', 'paper', 'scissors']

  // Handle user interaction to enable audio
  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true)
      if (soundEnabled && bgMusicRef.current) {
        bgMusicRef.current.play().catch(() => { })
        setBgMusicPlaying(true)
      }
    }
  }

  // Initialize background music
  useEffect(() => {
    bgMusicRef.current = new Audio(jackSparrowBGM)
    bgMusicRef.current.loop = true
    bgMusicRef.current.volume = 0.3

    // Auto-play background music when sound is enabled
    if (soundEnabled && !bgMusicPlaying) {
      bgMusicRef.current.play().catch(() => {
        // Auto-play might be blocked by browser
        console.log('Auto-play blocked by browser')
      })
      setBgMusicPlaying(true)
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause()
        bgMusicRef.current = null
      }
    }
  }, [])

  // Handle sound toggle
  useEffect(() => {
    if (bgMusicRef.current) {
      if (soundEnabled) {
        bgMusicRef.current.play().catch(() => { })
        setBgMusicPlaying(true)
      } else {
        bgMusicRef.current.pause()
        setBgMusicPlaying(false)
      }
    }
  }, [soundEnabled])

  const playSound = (type) => {
    if (!soundEnabled) return;

    // Create a new audio instance for sound effects
    const audio = new Audio(jackSparrowBGM)
    audio.volume = 0.2
    audio.currentTime = 0

    // Play different parts of the audio based on game result
    switch (type) {
      case 'win':
        audio.currentTime = 30 // Play from 30 seconds for win
        break
      case 'lose':
        audio.currentTime = 60 // Play from 60 seconds for lose
        break
      case 'tie':
        audio.currentTime = 90 // Play from 90 seconds for tie
        break
      default:
        audio.currentTime = 0
    }

    audio.play().catch(() => { })
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
    handleUserInteraction() // Enable audio on first interaction
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
    <div className="min-h-screen bg-gradient-to-br from-game-darker via-game-dark to-game-primary relative overflow-hidden rounded-3xl m-4 border border-white/10 shadow-2xl">
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
          Advanced Edition • Jack Sparrow Theme 🏴‍☠️
        </p>
      </motion.header>

      <motion.button
        onClick={() => {
          handleUserInteraction()
          setSoundEnabled(!soundEnabled)
        }}
        className="absolute top-4 right-4 z-20 p-3 bg-game-primary/20 backdrop-blur-sm rounded-full text-white hover:bg-game-primary/40 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={soundEnabled ? "Mute Audio" : "Unmute Audio"}
      >
        <motion.div
          animate={{
            rotate: soundEnabled ? 0 : 180,
            scale: bgMusicPlaying ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.div>
        {bgMusicPlaying && soundEnabled && (
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <ScoreBoard score={score} streak={streak} bestStreak={bestStreak} />

        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/10"
        >
          {!hasUserInteracted && soundEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4 text-sm text-gray-400"
            >
              🎵 Click any choice to start the Jack Sparrow soundtrack! 🏴‍☠️
            </motion.div>
          )}

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

        {/* Signature */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12 mb-8"
        >
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
            <p className="text-sm text-gray-400 font-light">
              Made with ❤️ by <span className="text-game-primary font-medium">Satyam Balaiwar</span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default App