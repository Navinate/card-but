import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-8 gap-16 p-8">
			<header>
				<div>Search for a card and then describe what changes you want</div>
			</header>
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
        <Button>Search</Button>
			</main>
			<footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center">
				Footer
			</footer>
		</div>
	);
}
