"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { getPlaylistTracks, getAudioFeatures } from "@/utils/spotifyApi";
import { analyzePlaylistFeatures } from "@/utils/playlistAnalysis";
import { generateCoverArtPrompt } from "@/utils/coverArtPrompt";

export default function playlistLink({setIsLoggedIn}) {
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const spotifyPlaylistRegex = /^(https?:\/\/)?(open\.spotify\.com\/playlist\/|spotify:playlist:)([a-zA-Z0-9]+)(.*)$/;

    const handleLogout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('playlistFeatures');
      setIsLoggedIn(false);
    }

    const handleGenerate = async (e) => {
      e.preventDefault();

      if(!spotifyPlaylistRegex.test(playlistUrl)) {
        setIsInvalid(true);
        return;
      }

      setIsInvalid(false);
      setIsLoading(true);

      const accessToken = localStorage.getItem('access_token');
      const playlistId = playlistUrl.split('/').pop().split('?')[0];

      const playlistTracks = await getPlaylistTracks(playlistId, accessToken);
      const audioFeatures = await getAudioFeatures(playlistTracks, accessToken);
      const playlistFeatures = analyzePlaylistFeatures(audioFeatures);

      localStorage.setItem('playlistFeatures', JSON.stringify(playlistFeatures));

      router.push('/generate');

      const prompt = generateCoverArtPrompt(playlistFeatures);
      console.log(prompt);

      generateImage(prompt);
      
      setIsLoading(false);
    }
    
    return(
      <div className="flex w-full flex-col items-center space-y-6">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row w-full max-w-md md:items-start items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col w-full">
            <Input 
              onChange={(e) => setPlaylistUrl(e.target.value)} 
              type="text" 
              placeholder="Enter Spotify playlist URL" 
              className={`h-10 peer ${isInvalid ? 'border-red-500' : ''}`}
              value={playlistUrl}
            />
            {isInvalid && <span className="pl-1 text-red-500 text-sm">
              Please enter a valid Spotify playlist URL
            </span>}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </form>
        <div className="text-gray-400 text-sm">
          Or
        </div>
        <Button variant="spotifyConnected" onClick={handleLogout}>
          <img className="mr-2" src="/Spotify.png" alt="Spotify" width="20" height="20" /> 
          Disconnect
        </Button>
      </div>
    )
}