"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import PolynomialInput from "./polynomial-input"
import ResultCard from "./result-card"
import { evaluatePolynomial } from "@/lib/utils"

export default function PolynomialEvaluator() {
  const [coefficients, setCoefficients] = useState<number[]>([1, 0, 0, 0])
  const [x, setX] = useState<string>("")
  const [result, setResult] = useState<number | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleEvaluate = () => {
    const xValue = Number.parseFloat(x)
    if (!isNaN(xValue)) {
      const evaluationResult = evaluatePolynomial(coefficients, xValue)
      setResult(evaluationResult)
      setHasCalculated(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Evaluate Polynomial at a Point</h2>
        <p className="text-slate-300">Enter the polynomial coefficients and the point to evaluate.</p>
      </div>

      <PolynomialInput onChange={setCoefficients} />

      <div className="space-y-2">
        <Label htmlFor="x-value">Evaluation Point (x)</Label>
        <Input
          id="x-value"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          placeholder="Enter x value"
        />
      </div>

      <Button onClick={handleEvaluate} disabled={x === ""}>
        Evaluate Polynomial
      </Button>

      {hasCalculated && (
        <ResultCard title="Evaluation Result">
          P({x}) = {result !== null ? result.toFixed(6) : "Error"}
        </ResultCard>
      )}
    </div>
  )
}

