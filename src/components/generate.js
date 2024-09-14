"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Chart } from "@/utils/chart"
import { ModeToggle } from "@/utils/themeToggle"

export default function Generate() {
  const [generatedImage, setGeneratedImage] = useState("/placeholder.png");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
        if (generatedImage && generatedImage.startsWith('blob:')) {
            URL.revokeObjectURL(generatedImage);
        } 
        
        const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Create a high quality art in country style and warm, fuzzy colour scheme. The image should evoke a relaxing and calm  mood"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.blob();
      console.log(data);
      const image = URL.createObjectURL(data);
      setGeneratedImage(image);
      console.log(image);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col pt-20 md:pt-8 min-h-screen lg:flex-row  items-center content-center justify-center gap-40 p-4 md:p-8 bg-background">
      <div className="absolute top-0 right-0 p-6">
        <ModeToggle />
      </div>
      <div className="flex flex-col min-h-max gap-6 w-full max-w-[400px] md:max-w-[500px] aspect-square rounded-lg">
        <img
          src={generatedImage}
          alt="Playlist Cover Art"
          width="500"
          height="500"
          className="w-full h-full object-cover"
          style={{ aspectRatio: "500/500", objectFit: "cover" }}
        />
        <div className="flex items-center justify-center">
          <Button onClick={handleGenerate} size="lg" className="text-white mr-4">
            Regenerate
          </Button>
          <Button size="lg" className="text-white ml-4">
            Set as cover
          </Button>
        </div>
      </div>
      <div className="w-full max-w-[400px] space-y-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">
            Playlist Name
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>120 Tracks</span>
            <Separator orientation="vertical" className="h-4" />
            <span>7h 24m</span>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Playlist Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Danceability</div>
              <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Energy</div>
              <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Speechiness</div>
              <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Acousticness</div>
              <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Instrumentalness</div>
                <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Liveness</div>
                <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Valence</div>
                <div className="font-medium">0.7</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Tempo</div>
                <div className="font-medium">0.7</div>
            </div>
          </CardContent>
        </Card>
        <Chart />
      </div>
    </div>
  );
}