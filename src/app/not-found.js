import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-10 justify-center h-screen">
      <h1 className="text-xl">404</h1>
      <h2 className="text-5xl font-bold">Page Not Found</h2>
      <Button variant="outline" className="bg-transparent">
        <Link href="/">Home</Link>
      </Button>
      <img src="/cat.png" alt="Cat" className="w-[500px] rounded-[15px]" />
    </div>
  );
}