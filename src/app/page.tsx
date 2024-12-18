import Image from "next/image";
import createResumeLogo from "./opengraph-image.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./(main)/Header";

export default function Home() {
  return (
    <>
    <Header />
    <div className="mt-16 md:mt-0 flex flex-col md:flex-row gap-7 min-h-screen items-center justify-around">
      <div className="flex flex-col items-center gap-4">
        <Image src={createResumeLogo} alt="Create Resume" width={400} height={400} />
        <Button>
          <Link href="/resume">Get Started</Link>
        </Button>
      </div>
    </div>
    </>
    
  );
}
