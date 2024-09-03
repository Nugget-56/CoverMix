"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [generatedImage, setGeneratedImage] = useState("/placeholder.png");
  const [isLoading, setIsLoading] = useState(false);

  //const handleSubmit

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-manrope">
        <div className="max-w-md w-full space-y-6 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Spotify Playlist Cover Art Generator</h1>
            <p className="mt-2 text-muted-foreground">
              Paste your Spotify playlist URL and we'll create a custom cover art for you.
            </p>
          </div>
          <form className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Spotify playlist URL"
              className="flex-1 px-3 py-2 bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Generate
            </button>
          </form>
          <div className="bg-card rounded-lg overflow-hidden aspect-video">
            <img
              src="/placeholder.png"
              alt="Playlist Cover Art"
              width="600"
              height="400"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
