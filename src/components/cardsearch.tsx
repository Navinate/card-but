'use client';
import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { CardData } from '@/lib/interfaces';
import { useCardStore } from '@/lib/store';

export default function CardSearch() {
  const setSelectedCard = useCardStore((state) => state.setSelectedCard);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<CardData[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchCard = async (cardName: string) => {
    if (!cardName.trim()) return;
   
    setLoading(true);
    setSearchResults([]);
    setShowDropdown(false);
    
    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(cardName)}&order=relevance`);
      
      if (response.ok) {
        const searchData = await response.json();
        if (searchData.data && searchData.data.length > 0) {
          const results = searchData.data.slice(0, 10);
          
          if (results.length === 1) {
            // Auto-select if only one result
            const singleResult = results[0];
            setQuery(singleResult.name);
            setSelectedCard(singleResult);
            console.log('Single result auto-selected:', singleResult);
          } else {
            // Show dropdown for multiple results
            setSearchResults(results);
            setShowDropdown(true);
            console.log('Multiple results found:', results);
          }
        } else {
          console.log('No cards found');
        }
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Hide dropdown when typing
    setShowDropdown(false);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set loading state for typing feedback
    if (value.trim()) {
      setLoading(true);
      // Auto-search after 500ms of no typing
      timeoutRef.current = setTimeout(() => {
        searchCard(value);
      }, 500);
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  };

  const handleCardSelect = (card: CardData) => {
    setQuery(card.name);
    setSelectedCard(card);
    setShowDropdown(false);
    setSearchResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Clear timeout and search immediately
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      searchCard(query);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4">
      <div className="relative" ref={dropdownRef}>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a Magic card..."
          className="pr-10"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
        
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {searchResults.map((card, index) => (
              <div
                key={card.id || index}
                onClick={() => handleCardSelect(card)}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 flex items-center gap-3"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{card.name}</div>
                  <div className="text-xs text-gray-500">
                    {card.set_name} • {card.type_line}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Type a card name and press Enter or wait for auto-search
      </p>
    </div>
  );
}