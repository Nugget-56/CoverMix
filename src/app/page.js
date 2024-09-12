"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import localFont from 'next/font/local'
import { ModeToggle } from "@/utils/themeToggle"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { redirectToSpotifyAuthorize, getAccessTokenFromStorage } from "@/utils/spotifyAuth";
import PlaylistLink from "@/utils/views/playlistLink";

const clashLight = localFont({ src:'/../../public/fonts/ClashDisplay-Light.woff2' })
const clashReg = localFont({ src:'/../../public/fonts/ClashDisplay-Regular.woff2' })
const clashMed = localFont({ src:'/../../public/fonts/ClashDisplay-Medium.woff2' })

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getAccessTokenFromStorage();
    setIsLoggedIn(!!accessToken);
  }, []); 

  useEffect(() => {
    const blob = document.querySelector(".blob");

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;

      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
    <div className="fixed min-h-screen w-full overflow-hidden">
      <div className="blob h-[200px] aspect-square absolute top-0 left-1/2 z-10 rounded-full"></div>
      <div className="blur h-full w-full absolute z-10"></div>
    </div>

    <div className={`absolute top-0 left-0 p-4 text-xl z-10 text-gray-400 underline ${clashMed.className}`}>
      CoverMix
    </div>

    <div className="absolute top-0 right-0 z-20 p-4">
      <ModeToggle />
    </div>

    <div className={`flex flex-col z-10 items-center justify-center min-h-max w-screen bg-background text-foreground `}>
      <div className={`z-20 space-y-6 px-4 ${clashReg.className}`}>
        <div className="text-center mt-20 pt-6">
          <h1 className={`text-4xl p-2 font-bold font-clash tracking-tight ${clashMed.className}`}>
            Make cover art for your playlist
          </h1>
          <h2 className={`text-xl mt-4 m-2 p-2 text-muted-foreground ${clashLight.className}`}>
            Paste your Spotify playlist URL and we'll create a custom cover art for you based on the songs in it
          </h2>
        </div>
        <div className="flex flex-col text-2xl items-center gap-1 justify-center min-w-min max-w-full">
          <div className="bg-card rounded-lg overflow-hidden aspect-square max-w-[300px]">
            <div className="flex flex-col justify-center roller-text">
              <Image
                src="/landingImages/dance.jpeg"
                alt="Cover Art for a danceable playlist"
                width="300"
                height="300"
                className="object-cover w-full h-full roller-img"
              />
              <Image
                src="/landingImages/electronic.jpeg"
                alt="Cover Art for an electronic playlist"
                width="300"
                height="300"
                className="object-cover w-full h-full roller-img"
              />
              <Image
                src="/landingImages/chill.jpeg"
                alt="Cover Art for a chill playlist"
                width="300"
                height="300"
                className="object-cover w-full h-full roller-img"
              />
              <Image
                src="/landingImages/upbeat.png"
                alt="Cover Art for an upbeat playlist"
                width="300"
                height="300"
                className="object-cover w-full h-full roller-img"
              />
              <Image
                src="/landingImages/instrumental.png"
                alt="Cover Art for an instrumental playlist"
                width="300"
                height="300"
                className="object-cover w-full h-full roller-img"
              />
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-center text-xl">
          <h3 className="font-bold min-w-max">Your playlist is</h3>
            <div className="h-10 min-w-35 overflow-hidden">
              <div className="flex flex-col font-bold justify-center items-center roller-text">
                <div className="p-1 text-orange-500">Danceable</div>
                <div className="p-1 text-yellow-500">Electronic</div>
                <div className="p-1 text-blue-500">Chill</div>
                <div className="p-1 text-green-500">Upbeat</div>
                <div className="p-1 text-red-500">Instrumental</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center p-2">
          <h1 className={`text-3xl p-2 font-bold font-clash tracking-tight ${clashLight.className}`}>
            Also get stats for your playlist
          </h1>
          <h2 className={`text-xl mt-4 m-2 p-2 text-muted-foreground ${clashLight.className}`}>
            Paste your Spotify playlist URL and we'll create a custom cover art for you based on the songs in it
          </h2>
        </div>
        <div className="flex flex-col  justify-center p-4 items-center gap-2 text-xl">
          {isLoggedIn ? (
            <>
              <PlaylistLink />
            </>
          ) : (
            <>
              <div className="flex gap-4 items-center">
                <div>Get started</div>
                <Button variant="spotify" onClick={redirectToSpotifyAuthorize}>
                  <img className="mr-2" src="/Spotify.png" alt="Spotify" width="20" height="20" /> 
                  Connect
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
