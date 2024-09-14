import { Separator } from "@/components/ui/separator"

export default function Footer() {
    return (
    <footer className="w-full z-20 py-6 mt-10 text-sm text-center text-muted-foreground">
      <Separator />
      <div className="flex flex-col justify-center items-start mt-2 p-4 space-y-6">
        <div id="login" className="font-bold">
          CoverMix
        </div>
        <a href="/privacy-policy" target="_blank" className="underline">
          Privacy Policy
        </a>
        <a href="https://github.com/Nugget-56/CoverMix" target="_blank" className="underline">
          GitHub
        </a>
        <div className="text-start">
          We are using 
          <a href="https://huggingface.co/black-forest-labs/FLUX.1-schnell" target="_blank" className="underline p-1">
            FLUX.1-schnell
          </a> 
          for image generation
        </div>
      </div>
    </footer>
  )
}