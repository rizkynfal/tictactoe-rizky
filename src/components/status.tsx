import { PLAYERS, type GameResult, type Player } from "@/lib/game";
import { cn } from "@/lib/utils";
import { CatFace } from "./cat-face";

interface StatusProps {
  current: Player;
  result: GameResult;
}

export function Status({ current, result }: StatusProps) {
  if (result.status === "won") {
    const winner = result.winner;
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center gap-4 rounded-3xl border-2 p-4 animate-pop",
          winner === "boni" ? "border-boni bg-boni-soft" : "border-beni bg-beni-soft",
        )}
      >
        <div className="h-16 w-16 shrink-0">
          <CatFace player={winner} mood="happy" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Winner</p>
          <p className={cn("text-2xl font-extrabold", winner === "boni" ? "text-boni-ink" : "text-beni-ink")}>
            {PLAYERS[winner].name} wins! 🎉
          </p>
        </div>
      </div>
    );
  }

  if (result.status === "draw") {
    return (
      <div role="status" aria-live="polite" className="flex items-center gap-4 rounded-3xl border-2 border-border bg-card p-4 animate-pop">
        <div className="flex shrink-0 -space-x-4">
          <div className="h-14 w-14"><CatFace player="boni" mood="sad" /></div>
          <div className="h-14 w-14"><CatFace player="beni" mood="sad" /></div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Draw</p>
          <p className="text-2xl font-extrabold">Nobody wins 🐾</p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-4 rounded-3xl border-2 p-4 transition-colors",
        current === "boni" ? "border-boni bg-boni-soft" : "border-beni bg-beni-soft",
      )}
    >
      <div key={current} className="h-16 w-16 shrink-0 animate-pop">
        <CatFace player={current} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Now playing</p>
        <p className={cn("text-2xl font-extrabold", current === "boni" ? "text-boni-ink" : "text-beni-ink")}>
          {PLAYERS[current].name}&apos;s turn
        </p>
      </div>
    </div>
  );
}
