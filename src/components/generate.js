"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Chart } from "@/utils/chart"
import { ModeToggle } from "@/utils/themeToggle"
import { useAuth } from "@/hooks/useAuth"

export default function Generate() {
  const [generatedImage, setGeneratedImage] = useState("/placeholder.png");
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState(null);
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
    const characteristics = JSON.parse(localStorage.getItem('playlistFeatures')).characteristics;
    //const generatedImage = JSON.parse(localStorage.getItem('imageURL')).blob;

    setPlaylist(playlist);
    setCharacteristics(characteristics);
    //setGeneratedImage(generatedImage);
  }, []);

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

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col pt-20 md:pt-8 min-h-screen lg:flex-row  items-center content-center justify-center gap-40 p-4 md:p-8 bg-background">
      <div className="absolute top-0 left-0 p-6">
        <Link href="/">
          <Button variant="outline" size="lg" className="text-white mr-4">
            Back
          </Button>
        </Link>
      </div>
      <div className="absolute top-0 right-0 p-6">
        <ModeToggle />
      </div>
      <div className="flex flex-col min-h-max gap-6 w-full max-w-[400px] md:max-w-[500px] aspect-square rounded-lg">
        <Image
          src={generatedImage}
          alt="Playlist Cover Art"
          width="500"
          height="500"
          className="w-full h-full object-cover"
          style={{ aspectRatio: "500/500", objectFit: "cover" }}
          priority
        />
        <div className="flex items-center justify-center">
          <Button onClick={handleGenerate} size="lg" className="text-white mr-4">
            Regenerate
          </Button>
         
        </div>
      </div>
      <div className="w-full max-w-[400px] space-y-4">
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