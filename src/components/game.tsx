"use client";

import { useGame } from "@/hooks/use-game";
import { PLAYERS } from "@/lib/game";
import { Board } from "./board";
import { ScoreBoard } from "./score-board";
import { Status } from "./status";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function Game() {
  const { board, current, starter, result, score, moves, play, newGame, resetAll } = useGame();
  const gameOver = result.status !== "playing";

  return (
    // On phones the status sits above the board; on desktop it moves to the right column.
    <div className="grid w-full items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:grid-rows-[auto_1fr] lg:gap-x-6">
      <div className="lg:col-start-2 lg:row-start-1">
        <Status current={current} result={result} />
      </div>

      <Card className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <CardContent className="space-y-4">
          <Board board={board} current={current} result={result} onPlay={play} />
          <p className="text-center text-xs font-medium text-muted-foreground">
            {PLAYERS[starter].name} started this round · move {Math.min(moves + (gameOver ? 0 : 1), 9)} of 9
          </p>
        </CardContent>
      </Card>

      <div className="space-y-5 lg:col-start-2 lg:row-start-2">
        <ScoreBoard score={score} />
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" onClick={newGame} className={gameOver ? "animate-nudge" : undefined}>
            New Game
          </Button>
          <Button size="lg" variant="outline" onClick={resetAll}>
            Reset All
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          The starting cat switches every round. New Game keeps the score; Reset All clears it.
        </p>
      </div>
    </div>
  );
}
