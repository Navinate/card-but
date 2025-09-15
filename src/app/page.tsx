'use client';

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CardSearch from "@/components/cardsearch";
import { useCardStore } from "@/lib/store";

export default function Home() {
  const selectedCard = useCardStore((state) => state.selectedCard);

  const getCardImageUrl = (): string => {
    if (!selectedCard) return "/shroofus.jpg";
    
    // Handle double-faced cards
    if (selectedCard.card_faces && selectedCard.card_faces[0]?.image_uris) {
      return selectedCard.card_faces[0].image_uris.normal;
    }
    // Handle normal cards
    return selectedCard.image_uris?.normal || "/shroofus.jpg";
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-8 gap-16 p-8">
      <header>
        <div>Search for a card and then describe what changes you want</div>
      </header>
      <main className="flex flex-col gap-4 justify-center items-center w-96">
        <Image
          className="rounded-2xl"
          src={getCardImageUrl()}
          alt={selectedCard ? selectedCard.name : "Selected card"}
          width={672}
          height={936}
        />
        <CardSearch />
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