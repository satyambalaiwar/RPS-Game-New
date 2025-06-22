import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, HandMetal, Scissors, Cpu, User } from 'lucide-react'

const ResultDisplay = ({ userChoice, computerChoice, result, getResultMessage, getResultColor, isPlaying }) => {
    const getIcon = (choice) => {
        switch (choice) {
            case 'rock':
                return <HandMetal size={48} />
            case 'paper':
                return <Hand size={48} />
            case 'scissors':
                return <Scissors size={48} />
            default:
                return <Hand size={48} />
        }
    }

    const getChoiceColor = (choice) => {
        switch (choice) {
            case 'rock':
                return 'text-red-400'
            case 'paper':
                return 'text-blue-400'
            case 'scissors':
                return 'text-green-400'
            default:
                return 'text-gray-400'
        }
    }

    return (
        <div className="text-center">
            {/* Result Message */}
            <motion.div
                key={result}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="mb-8"
            >
                <h2 className={`text-4xl md:text-6xl font-bold ${getResultColor()} mb-4`}>
                    {getResultMessage()}
                </h2>
            </motion.div>

            {/* Choices Display */}
            <div className="flex justify-center items-center gap-8 md:gap-16 mb-8">
                {/* User Choice */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
                        <div className="flex items-center justify-center mb-2">
                            <User className="text-game-primary mr-2" size={24} />
                            <span className="text-white font-semibold">You</span>
                        </div>
                        <AnimatePresence mode="wait">
                            {userChoice ? (
                                <motion.div
                                    key={userChoice}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className={`${getChoiceColor(userChoice)}`}
                                >
                                    {getIcon(userChoice)}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    className="text-gray-500 text-4xl"
                                >
                                    ?
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <p className="text-white font-semibold mt-2 capitalize">
                            {userChoice || 'Choose'}
                        </p>
                    </div>
                </motion.div>

                {/* VS */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-game-primary to-game-secondary rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">VS</span>
                    </div>
                </motion.div>

                {/* Computer Choice */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
                        <div className="flex items-center justify-center mb-2">
                            <Cpu className="text-game-secondary mr-2" size={24} />
                            <span className="text-white font-semibold">Computer</span>
                        </div>
                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="text-gray-400"
                                >
                                    <Hand size={48} />
                                </motion.div>
                            ) : computerChoice ? (
                                <motion.div
                                    key={computerChoice}
                                    initial={{ scale: 0, rotate: 180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: -180 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className={`${getChoiceColor(computerChoice)}`}
                                >
                                    {getIcon(computerChoice)}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    className="text-gray-500 text-4xl"
                                >
                                    ?
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <p className="text-white font-semibold mt-2 capitalize">
                            {isPlaying ? 'Thinking...' : computerChoice || 'Waiting'}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Result Details */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2">Game Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Your Choice:</span>
                                <p className="text-white font-semibold capitalize">{userChoice}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Computer Choice:</span>
                                <p className="text-white font-semibold capitalize">{computerChoice}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Result:</span>
                                <p className={`font-semibold capitalize ${getResultColor()}`}>
                                    {result === 'win' ? 'Victory!' : result === 'lose' ? 'Defeat' : 'Draw'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ResultDisplay 