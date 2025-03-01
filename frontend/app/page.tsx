import PolynomialCalculator from "@/components/polynomial-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Polynomial Calculator</h1>
        <p className="text-center text-slate-300 mb-8">Perform advanced polynomial operations</p>
        <PolynomialCalculator />
      </div>
    </main>
  )
}

