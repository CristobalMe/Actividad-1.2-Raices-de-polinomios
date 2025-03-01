"use client"

import { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Trash2, Plus } from "lucide-react"
import { polynomialToString } from "@/lib/utils"

interface PolynomialInputProps {
  onChange: (coefficients: number[]) => void
  defaultDegree?: number
  label?: string
}

export default function PolynomialInput({ onChange, defaultDegree = 3, label = "Polynomial" }: PolynomialInputProps) {
  const [degree, setDegree] = useState(defaultDegree)
  const [coefficients, setCoefficients] = useState<string[]>(Array(defaultDegree + 1).fill(""))

  useEffect(() => {
    const numericCoefficients = coefficients.map((c) => Number.parseFloat(c) || 0)
    onChange(numericCoefficients)
  }, [coefficients, onChange])

  const handleCoefficientChange = (index: number, value: string) => {
    const newCoefficients = [...coefficients]
    newCoefficients[index] = value
    setCoefficients(newCoefficients)
  }

  const increaseDegree = () => {
    setDegree((prev) => prev + 1)
    setCoefficients((prev) => ["", ...prev])
  }

  const decreaseDegree = () => {
    if (degree > 0) {
      setDegree((prev) => prev - 1)
      setCoefficients((prev) => prev.slice(1))
    }
  }

  const numericCoefficients = coefficients.map((c) => Number.parseFloat(c) || 0)
  const polynomialString = polynomialToString(numericCoefficients)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <div className="flex items-center space-x-2">
          <Button type="button" variant="outline" size="sm" onClick={decreaseDegree} disabled={degree === 0}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-300">Degree: {degree}</span>
          <Button type="button" variant="outline" size="sm" onClick={increaseDegree}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {coefficients.map((coef, index) => (
          <div key={index} className="space-y-1">
            <Label htmlFor={`coef-${index}`} className="text-xs">
              {degree - index === 0 ? "Constant" : `x^${degree - index}`}
            </Label>
            <Input
              id={`coef-${index}`}
              type="number"
              value={coef}
              onChange={(e) => handleCoefficientChange(index, e.target.value)}
              placeholder="0"
            />
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-900 rounded-md">
        <Label className="text-xs mb-1 block">Current Polynomial</Label>
        <div className="font-mono text-indigo-400">{polynomialString || "0"}</div>
      </div>
    </div>
  )
}

