"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import PolynomialInput from "./polynomial-input"
import ResultCard from "./result-card"
import { newtonRaphson } from "@/lib/utils"

export default function NewtonRaphson() {
  const [coefficients, setCoefficients] = useState<number[]>([1, 0, 0, 0])
  const [initialGuess, setInitialGuess] = useState<string>("1")
  const [maxIterations, setMaxIterations] = useState<string>("100")
  const [tolerance, setTolerance] = useState<string>("1e-10")
  const [result, setResult] = useState<{
    root: number
    iterations: number
    converged: boolean
  } | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleCalculate = () => {
    const guess = Number.parseFloat(initialGuess)
    const maxIter = Number.parseInt(maxIterations)
    const tol = Number.parseFloat(tolerance)

    if (isNaN(guess) || isNaN(maxIter) || isNaN(tol)) {
      alert("Please enter valid numerical values")
      return
    }

    const rootResult = newtonRaphson(coefficients, guess, maxIter, tol)
    setResult(rootResult)
    setHasCalculated(true)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Newton-Raphson Method</h2>
        <p className="text-slate-300">Find a root of a polynomial using the Newton-Raphson method.</p>
      </div>

      <PolynomialInput onChange={setCoefficients} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="initial-guess">Initial Guess</Label>
          <Input
            id="initial-guess"
            type="number"
            value={initialGuess}
            onChange={(e) => setInitialGuess(e.target.value)}
            placeholder="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-iterations">Max Iterations</Label>
          <Input
            id="max-iterations"
            type="number"
            value={maxIterations}
            onChange={(e) => setMaxIterations(e.target.value)}
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tolerance">Tolerance</Label>
          <Input
            id="tolerance"
            type="text"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            placeholder="1e-10"
          />
        </div>
      </div>

      <Button onClick={handleCalculate}>Find Root</Button>

      {hasCalculated && result && (
        <div className="space-y-4">
          <ResultCard title="Root Found" className={result.converged ? "border-green-600" : "border-yellow-600"}>
            x = {result.root.toFixed(10)}
          </ResultCard>

          <ResultCard title="Iterations">{result.iterations}</ResultCard>

          <ResultCard title="Convergence Status" className={result.converged ? "border-green-600" : "border-red-600"}>
            {result.converged ? "Converged" : "Did not converge"}
          </ResultCard>
        </div>
      )}
    </div>
  )
}

