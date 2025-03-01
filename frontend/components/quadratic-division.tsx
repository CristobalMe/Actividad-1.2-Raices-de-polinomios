"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import PolynomialInput from "./polynomial-input"
import ResultCard from "./result-card"
import { dividePoly, polynomialToString } from "@/lib/utils"

export default function QuadraticDivision() {
  const [numerator, setNumerator] = useState<number[]>([1, 0, 0, 0])
  const [denominator, setDenominator] = useState<number[]>([1, 0, 0])
  const [result, setResult] = useState<{
    quotient: number[]
    remainder: number[]
    isFactor: boolean
  } | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleDivide = () => {
    // Ensure the denominator is quadratic (degree 2)
    if (denominator.length !== 3) {
      alert("Please enter a quadratic polynomial (degree 2) for the divisor")
      return
    }

    const divisionResult = dividePoly(numerator, denominator)
    setResult(divisionResult)
    setHasCalculated(true)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Polynomial Division by Quadratic Polynomial</h2>
        <p className="text-slate-300">
          Divide a polynomial by a quadratic polynomial (ax² + bx + c) and check if it's a factor.
        </p>
      </div>

      <PolynomialInput onChange={setNumerator} label="Dividend Polynomial" />

      <PolynomialInput onChange={setDenominator} defaultDegree={2} label="Quadratic Divisor (ax² + bx + c)" />

      <Button onClick={handleDivide}>Perform Division</Button>

      {hasCalculated && result && (
        <div className="space-y-4">
          <ResultCard title="Quotient">{polynomialToString(result.quotient) || "0"}</ResultCard>

          <ResultCard title="Remainder">{polynomialToString(result.remainder) || "0"}</ResultCard>

          <ResultCard title="Is Factor?" className={result.isFactor ? "border-green-600" : "border-red-600"}>
            {result.isFactor ? "Yes, it is a factor" : "No, it is not a factor"}
          </ResultCard>
        </div>
      )}
    </div>
  )
}

