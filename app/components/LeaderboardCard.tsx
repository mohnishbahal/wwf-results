'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Medal, Award } from 'lucide-react'

interface LeaderboardCardProps {
  title: string
  data: any[]
  category: string
}

export function LeaderboardCard({ title, data, category }: LeaderboardCardProps) {
  const sortedData = [...data].sort((a, b) => b[category] - a[category])

  return (
    <Card className="bg-white shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#0A3641]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#5CBDB9] bg-opacity-10">
                <TableHead className="w-16 text-[#0A3641]">Rank</TableHead>
                <TableHead className="w-2/5 text-[#0A3641]">Team Name</TableHead>
                <TableHead className="w-1/4 text-[#0A3641]">Manager</TableHead>
                <TableHead className="w-1/5 text-right text-[#0A3641]">{title.split(' ')[0]}</TableHead>
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