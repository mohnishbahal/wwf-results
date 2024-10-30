'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Countdown from 'react-countdown'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { LeaderboardCard } from './components/LeaderboardCard'
import { CategoryPerformance } from './components/CategoryPerformance'
import { WinnerPodium } from './components/WinnerPodium'

const leaderboardData = [
  { teamName: "White Wednesday Warrior", revenuePoints: 69, marginPoints: 71, orderPoints: 76, totalPoints: 216, member: "Atul Mishra" },
  { teamName: "WWS Savvy Sellers", revenuePoints: 82, marginPoints: 80, orderPoints: 50, totalPoints: 212, member: "Anusha" },
  { teamName: "Supply Chain Punters", revenuePoints: 64, marginPoints: 66, orderPoints: 63, totalPoints: 193, member: "Sahil Arora" },
  { teamName: "Jai WWS", revenuePoints: 61, marginPoints: 62, orderPoints: 66, totalPoints: 189, member: "Jai" },
  { teamName: "Shopping Basket", revenuePoints: 62, marginPoints: 62, orderPoints: 59, totalPoints: 183, member: "Saurabh Heda" },
  { teamName: "Stockpile Squad", revenuePoints: 56, marginPoints: 60, orderPoints: 67, totalPoints: 183, member: "Deepesh" },
  { teamName: "JP_FL", revenuePoints: 54, marginPoints: 60, orderPoints: 65, totalPoints: 179, member: "Jijesh Pillai" },
  { teamName: "North Star", revenuePoints: 60, marginPoints: 60, orderPoints: 48, totalPoints: 168, member: "Nitesh" },
  { teamName: "KKR", revenuePoints: 51, marginPoints: 56, orderPoints: 56, totalPoints: 163, member: "Kartikey" },
  { teamName: "AM", revenuePoints: 59, marginPoints: 58, orderPoints: 42, totalPoints: 159, member: "Aniket" },
  { teamName: "SM WWF", revenuePoints: 55, marginPoints: 53, orderPoints: 48, totalPoints: 156, member: "Swetaleena" },
  { teamName: "SuperSaver", revenuePoints: 51, marginPoints: 52, orderPoints: 43, totalPoints: 146, member: "Akshaya" },
  { teamName: "Category Champions", revenuePoints: 49, marginPoints: 56, orderPoints: 40, totalPoints: 145, member: "Ankita" },
  { teamName: "Top Tier Trio", revenuePoints: 41, marginPoints: 41, orderPoints: 52, totalPoints: 134, member: "Divek" },
  { teamName: "So far So good", revenuePoints: 37, marginPoints: 39, orderPoints: 43, totalPoints: 119, member: "Inchara" }
]

const categoryNames = {
  totalPoints: 'Total Points',
  revenuePoints: 'Revenue Points',
  marginPoints: 'Margin Points',
  orderPoints: 'Order Points'
}

export default function TeamPerformanceDashboard() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/W1%20Points-3zMSxdO3d5ZZUSrES28yUkLT0cDWCp.csv')
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').slice(1)
        const parsedData = rows.map(row => {
          const [conceptName, categoryName, revenuePoints, marginPoints, ordersPoints, totalPoints] = row.split(',')
          return {
            conceptName,
            categoryName,
            revenuePoints: parseInt(revenuePoints),
            marginPoints: parseInt(marginPoints),
            ordersPoints: parseInt(ordersPoints),
            totalPoints: parseInt(totalPoints)
          }
        })
        setCategoryData(parsedData)
      })
  }, [])

  const handleReveal = () => setIsCountingDown(true)

  const handleCountdownComplete = () => {
    setIsCountingDown(false)
    setShowConfetti(true)
    setIsRevealed(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const topThreeTeams = [...leaderboardData].sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 3)

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#0A3641] p-8 space-y-12">
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A3641] z-50"
            exit={{ opacity: 0 }}
          >
            <div className="max-w-4xl w-full px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="text-5xl font-bold text-white mb-4">
                  White Wednesday Fantasy League
                </h1>
                <h2 className="text-3xl font-semibold text-[#5CBDB9]">
                  Unveiling the Champions
                </h2>
              </motion.div>
              
              <AnimatePresence>
                {!isCountingDown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-12"
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Winners-cuate-jtCj0NklDZrAHQyRWT4doc4hKsikYN.png"
                      alt="Winners Celebration"
                      width={400}
                      height={400}
                      className="max-w-full h-auto"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isCountingDown ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={handleReveal}
                    className="text-2xl font-bold bg-[#5CBDB9] text-white px-8 py-4 rounded-lg hover:bg-[#4A9E9B] transition-colors"
                  >
                    Reveal Winners
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center items-center h-[400px]"
                >
                  <Countdown
                    date={Date.now() + 5000}
                    renderer={({ seconds }) => (
                      <div className="text-9xl font-bold text-[#5CBDB9]">{seconds}</div>
                    )}
                    onComplete={handleCountdownComplete}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        />
      )}

      {isRevealed && (
        <>
          <motion.h1 
            className="text-5xl font-bold text-center mb-12 text-[#0A3641]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            White Wednesday Fantasy League Results
          </motion.h1>

          <Tabs defaultValue="team" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="team">Team Performance</TabsTrigger>
              <TabsTrigger value="category">Category Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="team">
              <div className="space-y-12">
                <WinnerPodium topTeams={topThreeTeams} />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LeaderboardCard 
                    title="Total Points Leaderboard"
                    data={leaderboardData}
                    category="totalPoints"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {Object.entries(categoryNames).slice(1).map(([category, title], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <LeaderboardCard 
                        title={title}
                        data={leaderboardData}
                        category={category}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value="category">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CategoryPerformance data={categoryData} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}