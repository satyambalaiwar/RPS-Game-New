import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Target } from 'lucide-react'

const ScoreBoard = ({ score, streak, bestStreak }) => {
    const totalGames = score.user + score.computer + score.ties
    const winRate = totalGames > 0 ? ((score.user / totalGames) * 100).toFixed(1) : 0

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {/* Total Score */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Total Games</h3>
                        <p className="text-3xl font-bold text-game-primary">{totalGames}</p>
                    </div>
                    <Target className="text-game-primary" size={32} />
                </div>
            </motion.div>

            {/* Wins */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Wins</h3>
                        <p className="text-3xl font-bold text-green-400">{score.user}</p>
                    </div>
                    <Trophy className="text-green-400" size={32} />
                </div>
            </motion.div>

            {/* Current Streak */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Streak</h3>
                        <p className="text-3xl font-bold text-game-accent">{streak}</p>
                    </div>
                    <Zap className="text-game-accent" size={32} />
                </div>
            </motion.div>

            {/* Best Streak */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Best Streak</h3>
                        <p className="text-3xl font-bold text-game-secondary">{bestStreak}</p>
                    </div>
                    <Trophy className="text-game-secondary" size={32} />
                </div>
            </motion.div>

            {/* Win Rate */}
            {totalGames > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="md:col-span-2 lg:col-span-4 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Win Rate</h3>
                            <p className="text-3xl font-bold text-game-primary">{winRate}%</p>
                        </div>
                        <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${winRate}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-game-primary to-game-secondary rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default ScoreBoard 