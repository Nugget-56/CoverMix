"use client"

import { useState, useEffect } from "react";
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


const chartConfig = {
  desktop: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export function Chart() {
  const [chartData, setChartData] = useState([
    { Stat: "Danceability", Value: 0.5 },
    { Stat: "Energy", Value: 0.5 },
    { Stat: "Speechiness", Value: 0.5 },
    { Stat: "Acousticness", Value: 0.5 },
    { Stat: "Instrumentalness", Value: 0.5 },
    { Stat: "Loudness", Value: 0.5 },
    { Stat: "Valence", Value: 0.5 },
    { Stat: "Tempo", Value: 0.5 },
  ]);

  useEffect(() => {
    const playlistFeatures = JSON.parse(localStorage.getItem('playlistFeatures'));
    setChartData([
      { Stat: "Danceability", Value: playlistFeatures.averageFeatures.danceability || 0 },
      { Stat: "Energy", Value: playlistFeatures.averageFeatures.energy || 0 },
      { Stat: "Speechiness", Value: playlistFeatures.averageFeatures.speechiness || 0 },
      { Stat: "Acousticness", Value: playlistFeatures.averageFeatures.acousticness },
      { Stat: "Instrumentalness", Value: playlistFeatures.averageFeatures.instrumentalness || 0 },
      { Stat: "Loudness", Value: playlistFeatures.averageFeatures.loudness / -60|| 0 },
      { Stat: "Valence", Value: playlistFeatures.averageFeatures.valence || 0 },
      { Stat: "Tempo", Value: (playlistFeatures.averageFeatures.tempo / 200)|| 0 },
    ]);
  }, []);

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
          className="mx-auto max-h-[400px] aspect-[6/4]"
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
