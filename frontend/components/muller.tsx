"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import PolynomialInput from "./polynomial-input"
import ResultCard from "./result-card"
import { muller } from "@/lib/utils"

export default function Muller() {
  const [coefficients, setCoefficients] = useState<number[]>([1, 0, 0, 0])
  const [x0, setX0] = useState<string>("0")
  const [x1, setX1] = useState<string>("1")
  const [x2, setX2] = useState<string>("2")
  const [maxIterations, setMaxIterations] = useState<string>("100")
  const [tolerance, setTolerance] = useState<string>("1e-10")
  const [result, setResult] = useState<{
    root: number
    iterations: number
    converged: boolean
  } | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleCalculate = () => {
    const x0Value = Number.parseFloat(x0)
    const x1Value = Number.parseFloat(x1)
    const x2Value = Number.parseFloat(x2)
    const maxIter = Number.parseInt(maxIterations)
    const tol = Number.parseFloat(tolerance)

    if (isNaN(x0Value) || isNaN(x1Value) || isNaN(x2Value) || isNaN(maxIter) || isNaN(tol)) {
      alert("Please enter valid numerical values")
      return
    }

    const rootResult = muller(coefficients, x0Value, x1Value, x2Value, maxIter, tol)
    setResult(rootResult)
    setHasCalculated(true)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Müller's Method</h2>
        <p className="text-slate-300">
          Find a root of a polynomial using Müller's method, which can find complex roots.
        </p>
      </div>

      <PolynomialInput onChange={setCoefficients} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="x0">Initial Point x₀</Label>
          <Input id="x0" type="number" value={x0} onChange={(e) => setX0(e.target.value)} placeholder="0" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="x1">Initial Point x₁</Label>
          <Input id="x1" type="number" value={x1} onChange={(e) => setX1(e.target.value)} placeholder="1" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="x2">Initial Point x₂</Label>
          <Input id="x2" type="number" value={x2} onChange={(e) => setX2(e.target.value)} placeholder="2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

