"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"
import { generateImage } from "@/utils/coverMix/generateApi"
import { generateCoverArtPrompt } from "@/utils/coverMix/coverArtPrompt"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Chart } from "@/utils/chart"
import { ModeToggle } from "@/components/theme/themeToggle"
import { Loader2 } from "lucide-react"

export default function Generate() {
  const [generatedImage, setGeneratedImage] = useState("/placeholder.png");
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [characteristics, setCharacteristics] = useState({
    mood: "",
    energy: "", 
    acousticness: "",
    tempo: "",
    instrumentalness: "",
    intensity: ""
  })
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    const playlistFeatures = JSON.parse(localStorage.getItem('playlistFeatures'));
    const characteristics = playlistFeatures.characteristics;
    const prompt = generateCoverArtPrompt(playlistFeatures);
    const generatedImage = localStorage.getItem('imageURL');

    setPlaylist(playlist);
    setCharacteristics(characteristics);
    setPrompt(prompt);
    setGeneratedImage(generatedImage);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    if (generatedImage && generatedImage.startsWith('blob:')) {
        URL.revokeObjectURL(generatedImage);
    } 
    const newImage = await generateImage(prompt);
    setGeneratedImage(newImage);
    setIsLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="flex flex-col pt-20 min-h-screen lg:flex-row items-center justify-center gap-20 lg:gap-40 p-4 lg:pt-6 bg-background">
      <div className="flex flex-col min-h-max gap-10 w-full max-w-[400px] md:max-w-[500px] rounded-lg">
        {isLoading ? (
          <div className="flex w-full aspect-square items-center justify-center border-[1px] border-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Image
            src={generatedImage}
            alt="Playlist Cover Art"
            width="500"
            height="500"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "500/500", objectFit: "cover" }}
            onError={() => setGeneratedImage("/placeholder.png")}
            priority
          />
        )}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <Button onClick={handleGenerate} size="lg" disabled={isLoading}>
            {isLoading ? "Generating..." : "Regenerate"}
          </Button>
          {/*<Button variant="spotify" size="lg" disabled={isLoading}>Set as cover</Button>*/}
        </div>
        <div className="flex items-center gap-4 md:gap-6 justify-center">
          Not liking what you see?
          <Button variant="secondary" disabled={isLoading}>Edit prompt</Button>
        </div>
      </div>
      <div className="w-full max-w-[500px] space-y-4">
        <div className="grid gap-2 rounded-sm bg-[url('/gradient.jpg')] bg-cover p-3 text-black">
          <h1 className="text-3xl font-bold">
            {playlist.name}
          </h1>
          <div className="flex items-center gap-2">
            <span>{playlist.totalTracks} Tracks</span>
          </div>
        </div>
        <Card>
          <CardHeader >
            <CardTitle className="flex flex-row gap-4 space-y-0">
              Playlist Stats 
              <div className="underline">Info</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Mood</div>
              <div className="font-medium">{characteristics.mood}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Energy</div>
              <div className="font-medium">{characteristics.energy}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Acousticness</div>
              <div className="font-medium">{characteristics.acousticness}</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Instrumentalness</div>
                <div className="font-medium">{characteristics.instrumentalness}</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Tempo</div>
                <div className="font-medium">{characteristics.tempo}</div>
            </div>
            <div className="flex items-center justify-between"> 
                <div className="text-muted-foreground">Intensity</div>
                <div className="font-medium">{characteristics.intensity}</div>
            </div>
          </CardContent>
        </Card>
        <Chart />
      </div>
    </div>
  );
}