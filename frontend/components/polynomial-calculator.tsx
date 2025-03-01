"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import PolynomialEvaluator from "./polynomial-evaluator"
import DerivativeEvaluator from "./derivative-evaluator"
import LinearDivision from "./linear-division"
import QuadraticDivision from "./quadratic-division"
import NewtonRaphson from "./newton-raphson"
import Muller from "./muller"
import NewtonDeflation from "./newton-deflation"

export default function PolynomialCalculator() {
  const [activeTab, setActiveTab] = useState("evaluate")

  return (
    <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-slate-900 p-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            <TabsTrigger value="evaluate" className="data-[state=active]:bg-indigo-600">
              Evaluate
            </TabsTrigger>
            <TabsTrigger value="derivative" className="data-[state=active]:bg-indigo-600">
              Derivative
            </TabsTrigger>
            <TabsTrigger value="linear" className="data-[state=active]:bg-indigo-600">
              Linear Division
            </TabsTrigger>
            <TabsTrigger value="quadratic" className="data-[state=active]:bg-indigo-600">
              Quadratic Division
            </TabsTrigger>
            <TabsTrigger value="newton" className="data-[state=active]:bg-indigo-600">
              Newton-Raphson
            </TabsTrigger>
            <TabsTrigger value="muller" className="data-[state=active]:bg-indigo-600">
              Müller
            </TabsTrigger>
            <TabsTrigger value="deflation" className="data-[state=active]:bg-indigo-600">
              Newton + Deflation
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="evaluate" className="mt-0">
            <PolynomialEvaluator />
          </TabsContent>
          <TabsContent value="derivative" className="mt-0">
            <DerivativeEvaluator />
          </TabsContent>
          <TabsContent value="linear" className="mt-0">
            <LinearDivision />
          </TabsContent>
          <TabsContent value="quadratic" className="mt-0">
            <QuadraticDivision />
          </TabsContent>
          <TabsContent value="newton" className="mt-0">
            <NewtonRaphson />
          </TabsContent>
          <TabsContent value="muller" className="mt-0">
            <Muller />
          </TabsContent>
          <TabsContent value="deflation" className="mt-0">
            <NewtonDeflation />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

