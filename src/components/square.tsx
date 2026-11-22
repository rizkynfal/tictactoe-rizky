import type { Cell, Player } from "@/lib/game";
import { PLAYERS } from "@/lib/game";
import { cn } from "@/lib/utils";
import { CatFace, type Mood } from "./cat-face";

interface SquareProps {
  index: number;
  value: Cell;
  current: Player;
  isWinning: boolean;
  isLosing: boolean;
  disabled: boolean;
  onPlay: (index: number) => void;
}

export function Square({ index, value, current, isWinning, isLosing, disabled, onPlay }: SquareProps) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const label = value
    ? `Row ${row}, column ${col}: ${PLAYERS[value].name}`
    : `Row ${row}, column ${col}: empty. Place ${PLAYERS[current].name}`;

  const mood: Mood = isWinning ? "happy" : isLosing ? "sad" : "normal";

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled || value !== null}
      onClick={() => onPlay(index)}
      className={cn(
        "group relative aspect-square rounded-2xl border-2 border-border bg-cell p-2 transition-all sm:p-3",
        "shadow-[0_4px_0_0_var(--color-border)] outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
        value === null && !disabled && "cursor-pointer hover:-translate-y-0.5 hover:bg-cell-hover",
        value === null && disabled && "cursor-not-allowed",
        isWinning && value === "boni" && "animate-win border-boni bg-boni-soft shadow-[0_4px_0_0_var(--color-boni)]",
        isWinning && value === "beni" && "animate-win border-beni bg-beni-soft shadow-[0_4px_0_0_var(--color-beni)]",
      )}
    >
      {value ? (
        <span className="block h-full w-full animate-pop">
          <CatFace player={value} mood={mood} />
        </span>
      ) : (
        !disabled && (
          <span className="block h-full w-full opacity-0 transition-opacity group-hover:opacity-25 group-focus-visible:opacity-25">
            <CatFace player={current} />
          </span>
        )
      )}
    </button>
  );
}
