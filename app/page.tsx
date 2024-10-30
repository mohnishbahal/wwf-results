'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Countdown from 'react-countdown'
import Confetti from 'react-confetti'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Medal, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

// Define interfaces for our data structures
interface CategoryData {
  conceptName: string
  categoryName: string
  revenuePoints: number
  marginPoints: number
  ordersPoints: number
  totalPoints: number
}

interface LeaderboardEntry {
  teamName: string
  revenuePoints: number
  marginPoints: number
  ordersPoints: number
  totalPoints: number
  member: string
}

const leaderboardData: LeaderboardEntry[] = [
  { teamName: "White Wednesday Warrior", revenuePoints: 69, marginPoints: 71, ordersPoints: 76, totalPoints: 216, member: "Atul Mishra" },
  { teamName: "WWS Savvy Sellers", revenuePoints: 82, marginPoints: 80, ordersPoints: 50, totalPoints: 212, member: "Anusha" },
  { teamName: "Supply Chain Punters", revenuePoints: 64, marginPoints: 66, ordersPoints: 63, totalPoints: 193, member: "Sahil Arora" },
  { teamName: "Jai WWS", revenuePoints: 61, marginPoints: 62, ordersPoints: 66, totalPoints: 189, member: "Jai" },
  { teamName: "Shopping Basket", revenuePoints: 62, marginPoints: 62, ordersPoints: 59, totalPoints: 183, member: "Saurabh Heda" },
  { teamName: "Stockpile Squad", revenuePoints: 56, marginPoints: 60, ordersPoints: 67, totalPoints: 183, member: "Deepesh" },
  { teamName: "JP_FL", revenuePoints: 54, marginPoints: 60, ordersPoints: 65, totalPoints: 179, member: "Jijesh Pillai" },
  { teamName: "North Star", revenuePoints: 60, marginPoints: 60, ordersPoints: 48, totalPoints: 168, member: "Nitesh" },
  { teamName: "KKR", revenuePoints: 51, marginPoints: 56, ordersPoints: 56, totalPoints: 163, member: "Kartikey" },
  { teamName: "AM", revenuePoints: 59, marginPoints: 58, ordersPoints: 42, totalPoints: 159, member: "Aniket" },
  { teamName: "SM WWF", revenuePoints: 55, marginPoints: 53, ordersPoints: 48, totalPoints: 156, member: "Swetaleena" },
  { teamName: "SuperSaver", revenuePoints: 51, marginPoints: 52, ordersPoints: 43, totalPoints: 146, member: "Akshaya" },
  { teamName: "Category Champions", revenuePoints: 49, marginPoints: 56, ordersPoints: 40, totalPoints: 145, member: "Ankita" },
  { teamName: "Top Tier Trio", revenuePoints: 41, marginPoints: 41, ordersPoints: 52, totalPoints: 134, member: "Divek" },
  { teamName: "So far So good", revenuePoints: 37, marginPoints: 39, ordersPoints: 43, totalPoints: 119, member: "Inchara" }
]

const categories = ['totalPoints', 'revenuePoints', 'marginPoints', 'ordersPoints'] as const
type Category = typeof categories[number]

const categoryNames: Record<Category, string> = {
  totalPoints: 'Total Points',
  revenuePoints: 'Revenue Points',
  marginPoints: 'Margin Points',
  ordersPoints: 'Order Points'
}

export default function TeamPerformanceDashboard() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const categories = ['totalPoints', 'revenuePoints', 'marginPoints', 'ordersPoints'] as const
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/W1%20Points-3zMSxdO3d5ZZUSrES28yUkLT0cDWCp.csv')
    const text = await response.text()
    const rows = text.split('\n').slice(1) // Remove header row
    
    const validData = rows
      .map(row => {
        const [conceptName, categoryName, revenuePoints, marginPoints, ordersPoints, totalPoints] = row.split(',')
        if (!conceptName || !categoryName) return null
        
        return {
          conceptName: conceptName.trim(),
          categoryName: categoryName.trim(),
          revenuePoints: Number(revenuePoints) || 0,
          marginPoints: Number(marginPoints) || 0,
          ordersPoints: Number(ordersPoints) || 0,
          totalPoints: Number(totalPoints) || 0
        }
      })
      .filter((item): item is CategoryData => item !== null)
    
    setCategoryData(validData)
  } catch (error) {
    console.error('Error fetching category data:', error)
  }
}

    fetchData()
  }, [])

  const handleReveal = () => {
    setIsCountingDown(true)
  }

  const handleCountdownComplete = () => {
    setIsCountingDown(false)
    setShowConfetti(true)
    setIsRevealed(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
  }

  const renderLeaderboard = (category: Category) => {
    const sortedData = [...leaderboardData].sort((a, b) => b[category] - a[category])
    return (
      <Card className="bg-white shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0A3641]">{categoryNames[category]} Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#5CBDB9] bg-opacity-10">
                  <TableHead className="w-16 text-[#0A3641]">Rank</TableHead>
                  <TableHead className="w-2/5 text-[#0A3641]">Team Name</TableHead>
                  <TableHead className="w-1/4 text-[#0A3641]">Manager</TableHead>
                  <TableHead className="w-1/5 text-right text-[#0A3641]">{categoryNames[category]}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((team, index) => (
                  <TableRow key={team.teamName} className="hover:bg-[#5CBDB9] hover:bg-opacity-5 transition-colors">
                    <TableCell className="font-medium w-16">
                      {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                      {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                      {index === 2 && <Award className="w-5 h-5 text-orange-400" />}
                      {index > 2 && index + 1}
                    </TableCell>
                    <TableCell className="w-2/5 font-medium">{team.teamName}</TableCell>
                    <TableCell className="w-1/4">{team.member}</TableCell>
                    <TableCell className="w-1/5 text-right">
                      <Badge variant="secondary" className="bg-[#5CBDB9] text-white">{team[category]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }

  const renderCategoryPerformance = () => {
    const sortedData = [...categoryData].sort((a, b) => b.totalPoints - a.totalPoints)
    return (
      <Card className="bg-white shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0A3641]">Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#5CBDB9] bg-opacity-10">
                  <TableHead className="w-1/4 text-[#0A3641]">Concept Name</TableHead>
                  <TableHead className="w-1/4 text-[#0A3641]">Category Name</TableHead>
                  <TableHead className="text-right text-[#0A3641]">Revenue Points</TableHead>
                  <TableHead className="text-right text-[#0A3641]">Margin Points</TableHead>
                  <TableHead className="text-right text-[#0A3641]">Orders Points</TableHead>
                  <TableHead className="text-right text-[#0A3641]">Total Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((category, index) => (
                  <TableRow key={index} className="hover:bg-[#5CBDB9] hover:bg-opacity-5 transition-colors">
                    <TableCell className="font-medium">{category.conceptName}</TableCell>
                    <TableCell>{category.categoryName}</TableCell>
                    <TableCell className="text-right">{category.revenuePoints}</TableCell>
                    <TableCell className="text-right">{category.marginPoints}</TableCell>
                    <TableCell className="text-right">{category.ordersPoints}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="bg-[#5CBDB9] text-white">{category.totalPoints}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    )
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
            className
