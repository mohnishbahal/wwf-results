'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CategoryPerformanceProps {
  data: any[]
}

export function CategoryPerformance({ data }: CategoryPerformanceProps) {
  const sortedData = [...data].sort((a, b) => b.totalPoints - a.totalPoints)

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