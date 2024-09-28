"use client"

import { useState } from "react"
import { getLikedSongs } from "@/utils/spotify/spotifyApi"
import { Button } from "@/components/ui/button"

export default function SplitterHome() {

  async function handleLikedSongs() {
    const accessToken = localStorage.getItem('access_token');
    const likedSongs = await getLikedSongs(accessToken);
    console.log(likedSongs);
    
  }

  return (
    <div>
      <h1>Splitter Home</h1>
      <Button onClick={handleLikedSongs}>
        Liked Songs
      </Button>
    </div>
  )
}