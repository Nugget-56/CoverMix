import PlaylistLink from "@/components/coverMix/playlistLink";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/themeToggle";

export default function PlaylistPage() {
  return (
    <>
     <header>
        <div className="absolute top-0 left-0 p-6">
          <Link href="/">
            <Button variant="outline" size="lg" className="mr-4">
              Back
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 p-6">
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <PlaylistLink />
      </main>
    </>
  );
}