"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import PolynomialInput from "./polynomial-input"
import ResultCard from "./result-card"
import { newtonRaphson, deflatePolynomial, evaluatePolynomial } from "@/lib/utils"

export default function NewtonDeflation() {
  const [coefficients, setCoefficients] = useState<number[]>([1, 0, 0, 0])
  const [initialGuess, setInitialGuess] = useState<string>("1")
  const [maxRoots, setMaxRoots] = useState<string>("3")
  const [maxIterations, setMaxIterations] = useState<string>("100")
  const [tolerance, setTolerance] = useState<string>("1e-10")
  const [roots, setRoots] = useState<number[]>([])
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleCalculate = () => {
    const guess = Number.parseFloat(initialGuess)
    const maxR = Number.parseInt(maxRoots)
    const maxIter = Number.parseInt(maxIterations)
    const tol = Number.parseFloat(tolerance)

    if (isNaN(guess) || isNaN(maxR) || isNaN(maxIter) || isNaN(tol)) {
      alert("Please enter valid numerical values")
      return
    }

    // Start with the original polynomial
    let currentCoefficients = [...coefficients]
    const foundRoots: number[] = []

    // Find roots and deflate the polynomial
    for (let i = 0; i < maxR && currentCoefficients.length > 1; i++) {
      // Use Newton-Raphson to find a root
      const rootResult = newtonRaphson(currentCoefficients, guess, maxIter, tol)

      if (rootResult.converged) {
        // Check if the root is valid by evaluating the polynomial
        const value = evaluatePolynomial(currentCoefficients, rootResult.root)

        if (Math.abs(value) < tol) {
          foundRoots.push(rootResult.root)

          // Deflate the polynomial using the found root
          currentCoefficients = deflatePolynomial(currentCoefficients, rootResult.root)
        } else {
          break // Root not accurate enough
        }
      } else {
        break // Newton-Raphson did not converge
      }
    }

    setRoots(foundRoots)
    setHasCalculated(true)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Newton-Raphson with Deflation</h2>
        <p className="text-slate-300">
          Find multiple roots of a polynomial using Newton-Raphson method combined with polynomial deflation.
        </p>
      </div>

      <PolynomialInput onChange={setCoefficients} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label htmlFor="max-roots">Maximum Roots to Find</Label>
          <Input
            id="max-roots"
            type="number"
            value={maxRoots}
            onChange={(e) => setMaxRoots(e.target.value)}
            placeholder="3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="max-iterations">Max Iterations per Root</Label>
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

      <Button onClick={handleCalculate}>Find Roots</Button>

      {hasCalculated && (
        <div className="space-y-4">
          <ResultCard title="Number of Roots Found">{roots.length}</ResultCard>

          {roots.length > 0 ? (
            <div className="space-y-2">
              {roots.map((root, index) => (
                <ResultCard key={index} title={`Root ${index + 1}`}>
                  x = {root.toFixed(10)}
                </ResultCard>
              ))}
            </div>
          ) : (
            <ResultCard title="No Roots Found" className="border-yellow-600">
              The algorithm could not find any roots with the given parameters.
            </ResultCard>
          )}
        </div>
      )}
    </div>
  )
}

