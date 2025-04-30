"use client"

import * as React from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContext {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContext | null>(null)

function ChartContainer({
  children,
  config,
}: {
  children: React.ReactNode
  config: ChartConfig
}) {
  return <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
}

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer")
  }
  return context
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      name: string
      [key: string]: any
    }
  }>
  label?: string
}

function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          <span className="font-bold text-muted-foreground">{payload[0]?.payload.name}</span>
        </div>
        {payload.map((data) => {
          const name = data.name as string
          const configKey = Object.keys(config).find((key) => key.toLowerCase() === name.toLowerCase())

          if (!configKey) {
            return null
          }

          return (
            <div key={name} className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">{config[configKey].label}</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ background: config[configKey].color }} />
                <span className="font-bold">{data.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    content?: React.ReactNode
  }
>(({ content, ...props }, ref) => {
  return <div ref={ref} {...props} />
})
ChartTooltip.displayName = "ChartTooltip"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
