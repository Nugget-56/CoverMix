"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import localFont from 'next/font/local'

const clashLight = localFont({ src:'/../../public/fonts/ClashDisplay-Light.woff2' })
const clashReg = localFont({ src:'/../../public/fonts/ClashDisplay-Regular.woff2' })
const clashMed = localFont({ src:'/../../public/fonts/ClashDisplay-Medium.woff2' })

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [generatedImage, setGeneratedImage] = useState("/placeholder.png");
  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
      <div className={`absolute top-0 left-0 p-4 text-4xl text-gray-400 underline ${clashMed.className}`}>
        CoverMix
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-manrope">
        <div className={`max-w-min w-full space-y-6 px-4 ${clashReg.className}`} >
          <div className="text-center">
            <h1 className={`text-6xl p-2 font-bold font-clash tracking-tight ${clashMed.className}`}>
              Make cover art for your playlist
            </h1>
            <p className={`text-xl m-4 p-2 text-muted-foreground ${clashLight.className}`}>
              Paste your Spotify playlist URL and we'll create a custom cover art for you based on the songs in it
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
              className={`px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${clashMed.className}`}
            >
              Generate
            </button>
          </form>
          <div className="flex text-2xl items-center gap-1 justify-center min-w-min max-w-full">
            <div className="bg-card rounded-lg overflow-hidden aspect-square w-[300px] mr-6">
              <img
                src={generatedImage}
                alt="Playlist Cover Art"
                width="300"
                height="300"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className=" font-bold min-w-max">Your playlist is</h3>
            <div className="h-10 min-w-35 overflow-hidden">
              <div className="flex flex-col font-bold justify-center roller-text">
                <div className="p-1 text-orange-500">Danceable</div>
                <div className="p-1 text-red-600">Energetic</div>
                <div className="p-1 text-green-500">Positive</div>
                <div className="p-1 text-blue-500">Upbeat</div>
                <div className="p-1 text-yellow-500">Happy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
