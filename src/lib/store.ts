import { create } from 'zustand';
import { CardData } from '@/lib/interfaces';

interface CardStore {
  selectedCard: CardData | null;
  setSelectedCard: (card: CardData | null) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  selectedCard: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
}));