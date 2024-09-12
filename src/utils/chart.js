"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartData = [
  { Stat: "Danceability", Value: 0.5 },
  { Stat: "Energy", Value: 0.5 },
  { Stat: "Speechiness", Value: 0.5 },
  { Stat: "Acousticness", Value: 0.5 },
  { Stat: "Instrumentalness", Value: 0.5 },
  { Stat: "Liveness", Value: 0.5 },
  { Stat: "Valence", Value: 0.5 },
  { Stat: "Tempo", Value: 0.5 },
]

const chartConfig = {
  desktop: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export function Chart() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardDescription>
            Playlist characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="Stat" />
            <PolarGrid />
            <Radar
              dataKey="Value"
              fill="var(--color-desktop)"
              fillOpacity={0.7}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
