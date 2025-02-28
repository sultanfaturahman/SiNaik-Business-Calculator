"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Download } from "lucide-react"

interface CalculationRecord {
  type: string
  date: string
  inputs: Record<string, any>
  results: Record<string, any>
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("all")
  const [calculationType, setCalculationType] = useState("all")

  // Mock data - replace with actual data from your database
  const calculations: CalculationRecord[] = [
    {
      type: "Gross Profit",
      date: "2024-03-20",
      inputs: { revenue: 1000, costOfGoodsSold: 600 },
      results: { grossProfit: 400, profitMargin: 40 }
    },
    // Add more records
  ]

  const exportToCSV = () => {
    const headers = ["Type", "Date", "Inputs", "Results"]
    const csvData = calculations.map(calc => [
      calc.type,
      calc.date,
      JSON.stringify(calc.inputs),
      JSON.stringify(calc.results)
    ])

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "calculations-report.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Calculation Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="space-x-4">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border rounded p-2"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <select
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value)}
                className="border rounded p-2"
              >
                <option value="all">All Calculations</option>
                <option value="gross-profit">Gross Profit</option>
                <option value="price-per-unit">Price per Unit</option>
                <option value="discount">Discount</option>
              </select>
            </div>
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Inputs</TableHead>
                <TableHead>Results</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculations.map((calc, index) => (
                <TableRow key={index}>
                  <TableCell>{calc.date}</TableCell>
                  <TableCell>{calc.type}</TableCell>
                  <TableCell>
                    {Object.entries(calc.inputs).map(([key, value]) => (
                      <div key={key}>{`${key}: ${value}`}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {Object.entries(calc.results).map(([key, value]) => (
                      <div key={key}>{`${key}: ${value}`}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 