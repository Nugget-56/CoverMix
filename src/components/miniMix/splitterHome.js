"use client"

import { useState, useEffect } from "react"
import { getLikedSongs, splitByDecade, splitByGenre, getPlaylist } from "@/utils/spotify/spotifyApi"
import { Button } from "@/components/ui/button"

export default function SplitterHome() {
  const [decadeData, setDecadeData] = useState({});

  async function handleLikedSongs() {
    const accessToken = localStorage.getItem('access_token');
    const likedSongs = await getLikedSongs(accessToken);
    console.log(likedSongs);
 
    const decadeSplit = await splitByDecade(likedSongs);
    setDecadeData(decadeSplit);

    const artistIds = likedSongs.map(song => song.artist);

    const genreSplit = await getSongGenres(artistIds, accessToken);
    console.log(genreSplit);
  }

  useEffect(() => {
    console.log(decadeData);
  }, [decadeData]);

  return (
    <div>
      <h1>Splitter Home</h1>
      <Button onClick={handleLikedSongs}>
        Liked Songs
      </Button>
      {/*show different decades*/}
    </div>
  )
}