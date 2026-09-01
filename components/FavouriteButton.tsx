"use client";

import { useTransition } from "react";
import { Star } from "lucide-react";
import { toggleFavorite } from "@/actions/actions";

interface FavoriteButtonProps {
  noteId: number;
  isFavorite: boolean;
}

export default function FavoriteButton({
  noteId,
  isFavorite,
}: FavoriteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleFavorite = () => {
    startTransition(async () => {
      await toggleFavorite(noteId);
    });
  };

  return (
    <button
      type="button"
      onClick={handleFavorite}
      disabled={isPending}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
        isFavorite
          ? "bg-amber-100 text-amber-500 hover:bg-amber-200"
          : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-amber-500"
      } ${
        isPending ? "cursor-wait opacity-50" : ""
      }`}
    >
      <Star
        className="h-4 w-4"
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}