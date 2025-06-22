import React from 'react'
import { motion } from 'framer-motion'
import { Hand, HandMetal, Scissors } from 'lucide-react'

const GameChoice = ({ choice, onClick, disabled, isSelected }) => {
    const getIcon = () => {
        switch (choice) {
            case 'rock':
                return <HandMetal size={40} />
            case 'paper':
                return <Hand size={40} />
            case 'scissors':
                return <Scissors size={40} />
            default:
                return <Hand size={40} />
        }
    }

    const getColor = () => {
        switch (choice) {
            case 'rock':
                return 'from-red-500 to-red-600'
            case 'paper':
                return 'from-blue-500 to-blue-600'
            case 'scissors':
                return 'from-green-500 to-green-600'
            default:
                return 'from-gray-500 to-gray-600'
        }
    }

    const getHoverColor = () => {
        switch (choice) {
            case 'rock':
                return 'hover:from-red-400 hover:to-red-500'
            case 'paper':
                return 'hover:from-blue-400 hover:to-blue-500'
            case 'scissors':
                return 'hover:from-green-400 hover:to-green-500'
            default:
                return 'hover:from-gray-400 hover:to-gray-500'
        }
    }

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`
        relative w-24 h-24 md:w-32 md:h-32 rounded-2xl
        bg-gradient-to-br ${getColor()} ${getHoverColor()}
        text-white font-bold text-lg
        shadow-lg hover:shadow-xl
        transition-all duration-300
        flex flex-col items-center justify-center gap-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected ? 'ring-4 ring-white/50 pulse-glow' : ''}
        backdrop-blur-sm border border-white/20
      `}
        >
            <motion.div
                animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                {getIcon()}
            </motion.div>
            <span className="capitalize font-semibold text-sm md:text-base">
                {choice}
            </span>

            {/* Ripple effect */}
            {isSelected && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-2xl bg-white/20"
                />
            )}
        </motion.button>
    )
}

export default GameChoice 