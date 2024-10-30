'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from 'lucide-react'

interface WinnerPodiumProps {
  topTeams: any[]
}

export function WinnerPodium({ topTeams }: WinnerPodiumProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {topTeams.map((team, index) => {
        const icon = index === 0 ? <Trophy className="w-12 h-12 text-yellow-500" /> :
                  index === 1 ? <Medal className="w-10 h-10 text-gray-400" /> :
                  <Award className="w-8 h-8 text-orange-400" />
        return (
          <motion.div
            key={team.teamName}
            className="flex flex-col justify-end"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="bg-white shadow-lg border-t-4 border-[#5CBDB9] h-full flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold flex items-center justify-between">
                  <span className="mr-2">{index + 1}.</span>
                  {icon}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">{team.teamName}</h3>
                <p className="text-lg mb-4 text-gray-600">{team.member}</p>
                <Badge variant="secondary" className="bg-[#5CBDB9] text-white text-lg px-4 py-2">
                  {team.totalPoints} points
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}