"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import localFont from 'next/font/local'
import { ModeToggle } from "@/components/theme/themeToggle"
import { Button } from "@/components/ui/button"
import { redirectToSpotifyAuthorize, getAccessTokenFromStorage } from "@/utils/spotify/spotifyAuth";
import PlaylistLink from "@/components/coverMix/playlistLink";
import Footer from "@/components/footer"
import { AuthContext } from "@/context/authContext";

const clashLight = localFont({ src:'/../../../public/fonts/ClashDisplay-Light.woff2' })
const clashReg = localFont({ src:'/../../../public/fonts/ClashDisplay-Regular.woff2' })

export default function LandingPage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  /*useEffect(() => {
    function checkLogin() {
      const accessToken = getAccessTokenFromStorage();
      setIsLoggedIn(!!accessToken);
    }
    checkLogin();
    console.log("changed");
  },[]);*/

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
      <div className="blob h-[200px] md:h-[300px] lg:h-[400px] aspect-square absolute top-0 left-1/2  z-10 rounded-full"></div>
      <div className="blur h-full w-full absolute z-10"></div>
    </div>

    <header>
      <div className={`absolute top-0 left-0 p-4 text-2xl lg:text-3xl pt-5 z-10 text-gray-300 underline font-bold ${clashReg.className}`}>
        CoverMix
      </div>

      <div className="flex absolute top-0 right-0 z-20 p-4 gap-4">
        <ModeToggle />
      </div>
    </header>
    <div className={`flex flex-col z-10 items-center justify-center min-h-max w-full   bg-background text-foreground `}>
      <div className={`z-20 space-y-8 px-4 ${clashReg.className}`}>
        <div className="flex flex-col justify-center items-center text-center mt-20 pt-6">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl lg:max-w-[650px] max-w-md p-2 tracking-tight font-bold ${clashReg.className}`}>
            Make cover art for your playlist
          </h1>
          <p className={`text-xl lg:text-2xl tracking-tight max-w-[600px] lg:max-w-[780px] mt-4 m-2 p-2 text-muted-foreground ${clashLight.className}`}>
            Paste your Spotify playlist URL and we'll create a custom cover art for you based on the songs in it
          </p>
        </div>
        <div className="flex flex-col  justify-center p-4 items-center gap-2 text-xl">
          {isLoggedIn === null ? (
            <div>Loading...</div>
          ) : isLoggedIn ? (
            <PlaylistLink setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <div className="flex items-center gap-4">
              <Button size="lg" variant="spotify" onClick={redirectToSpotifyAuthorize}>
              <img className="mr-2" src="/Spotify.png" alt="Spotify" width="20" height="20" /> 
                Connect
              </Button>
              <div>
                To get started
              </div>
            </div>        
          )}
        </div>
        <div className="flex flex-col md:flex-row md:gap-10 text-2xl items-center gap-1 justify-center min-w-min max-w-full">
          <div className="bg-card rounded-lg overflow-hidden aspect-square max-w-[300px]">
            <div className="flex flex-col justify-center roller-text">
              <Image
                src="/landingImages/dance.jpeg"
                alt="Cover Art for a danceable playlist"
                width="300"
                height="300"
                className="object-cover w-full h-full roller-img"
                priority={true}
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
          <div className="flex flex-col md:flex-row justify-center items-center text-xl md:text-2xl">
            <h3 className="font-bold min-w-max pt-3">Your playlist is</h3>
            <div className="h-10 min-w-35 overflow-hidden">
              <div className="flex flex-col font-bold justify-center items-center md:items-start md:mt-[0.4rem] md:ml-1 roller-text">
                <div className="p-1 text-orange-500">Danceable</div>
                <div className="p-1 text-yellow-500">Electronic</div>
                <div className="p-1 text-blue-500">Chill</div>
                <div className="p-1 text-green-500">Upbeat</div>
                <div className="p-1 text-red-500">Instrumental</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-4">
          <p className={`text-3xl p-2 ${clashReg.className}`}>
            also visualize your playlist's musical landscape
          </p>
          <p className={`text-xl mt-4 m-2 p-2 text-muted-foreground ${clashLight.className}`}>
            add stats here///////////
          </p>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
