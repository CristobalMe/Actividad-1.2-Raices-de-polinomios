import type React from "react"
import { cn } from "@/lib/utils"

interface ResultCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ResultCard({ title, children, className }: ResultCardProps) {
  return (
    <div className={cn("bg-slate-900 rounded-lg p-4 border border-slate-700", className)}>
      <h3 className="text-sm font-medium text-slate-300 mb-2">{title}</h3>
      <div className="text-indigo-400 font-mono">{children}</div>
    </div>
  )
}

