import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header>Header</header>
      <main className="flex flex-col gap-4 justify-center items-center w-96">
        <Image
          className="rounded-2xl"
          src="/shroofus.jpg"
          alt="Selected card"
          width={672}
          height={936}
        />
    <Input placeholder="Card Name"></Input>
    <div>BUT...</div>
    <Textarea placeholder="What do you want different?"></Textarea>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
