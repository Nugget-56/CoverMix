import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "next/link"

export default function playlistLink() {

    return(
      <div className="flex w-full flex-col items-center space-y-4">
        <form className="flex flex-col w-full max-w-md items-center space-y-4">
          <Input type="text" placeholder="Enter Spotify playlist URL" className="h-12"/>
          <Button type="submit">Generate</Button>
        </form>
        <div className="text-gray-400 text-sm">
          Or
        </div>
        <Button variant="spotifyConnected">
          <img className="mr-2" src="/Spotify.png" alt="Spotify" width="20" height="20" /> 
          Disconnect
        </Button>
      </div>
    )
}