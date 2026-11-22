import { PLAYERS, getRecord, type Player, type Score } from "@/lib/game";
import { cn } from "@/lib/utils";
import { CatFace } from "./cat-face";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Stat({ label, value, tone }: { label: string; value: number; tone: "win" | "lose" | "draw" }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-background/70 px-2 py-1.5">
      <span
        className={cn(
          "text-xl font-extrabold tabular-nums",
          tone === "win" && "text-win",
          tone === "lose" && "text-lose",
          tone === "draw" && "text-draw",
        )}
      >
        {value}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

function PlayerRow({ player, score }: { player: Player; score: Score }) {
  const record = getRecord(score, player);
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 p-3",
        player === "boni" ? "border-boni/60 bg-boni-soft" : "border-beni/60 bg-beni-soft",
      )}
    >
      <div className="h-12 w-12 shrink-0">
        <CatFace player={player} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("font-extrabold leading-tight", player === "boni" ? "text-boni-ink" : "text-beni-ink")}>
          {PLAYERS[player].name}
        </p>
        <p className="truncate text-xs text-muted-foreground">{PLAYERS[player].tagline}</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <Stat label="Win" value={record.wins} tone="win" />
        <Stat label="Lose" value={record.losses} tone="lose" />
        <Stat label="Draw" value={record.draws} tone="draw" />
      </div>
    </div>
  );
}

export function ScoreBoard({ score }: { score: Score }) {
  const total = score.boni + score.beni + score.draws;
  return (
    <Card>
      <CardHeader className="flex items-baseline justify-between">
        <CardTitle>Score Board</CardTitle>
        <span className="text-xs font-semibold text-muted-foreground">
          {total} {total === 1 ? "game" : "games"} played
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <PlayerRow player="boni" score={score} />
        <PlayerRow player="beni" score={score} />
      </CardContent>
    </Card>
  );
}
