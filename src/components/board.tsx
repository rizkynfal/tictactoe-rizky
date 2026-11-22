import type { Board as BoardType, GameResult, Player } from "@/lib/game";
import { Square } from "./square";

interface BoardProps {
  board: BoardType;
  current: Player;
  result: GameResult;
  onPlay: (index: number) => void;
}

export function Board({ board, current, result, onPlay }: BoardProps) {
  const winningLine = result.status === "won" ? result.line : [];
  const gameOver = result.status !== "playing";

  return (
    <div role="group" aria-label="Tic-tac-toe board" className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {board.map((value, i) => (
        <Square
          key={i}
          index={i}
          value={value}
          current={current}
          isWinning={winningLine.includes(i)}
          isLosing={result.status === "won" && value !== null && value !== result.winner}
          disabled={gameOver}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
}
