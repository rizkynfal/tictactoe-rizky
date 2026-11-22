"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import {
  EMPTY_SCORE,
  createBoard,
  getResult,
  otherPlayer,
  playMove,
  updateScore,
  type Board,
  type Player,
} from "@/lib/game";
import { scoreStore } from "@/lib/score-store";

export function useGame() {
  const [board, setBoard] = useState<Board>(createBoard);
  const [starter, setStarter] = useState<Player>("boni");
  const score = useSyncExternalStore(scoreStore.subscribe, scoreStore.getSnapshot, scoreStore.getServerSnapshot);

  const result = useMemo(() => getResult(board), [board]);
  const moves = board.filter(Boolean).length;
  // Players alternate, so whoever started moves on even turns.
  const current: Player = moves % 2 === 0 ? starter : otherPlayer(starter);

  const play = useCallback(
    (index: number) => {
      const next = playMove(board, index, current);
      if (next === board) return;
      setBoard(next);
      const nextResult = getResult(next);
      if (nextResult.status !== "playing") {
        scoreStore.set((s) => updateScore(s, nextResult));
      }
    },
    [board, current],
  );

  /** Clears the board and keeps the score. The other cat starts the next round. */
  const newGame = useCallback(() => {
    setBoard(createBoard());
    setStarter((s) => otherPlayer(s));
  }, []);

  /** Clears the board and the score, and Boni starts again. */
  const resetAll = useCallback(() => {
    setBoard(createBoard());
    setStarter("boni");
    scoreStore.set(EMPTY_SCORE);
  }, []);

  return { board, current, starter, result, score, moves, play, newGame, resetAll };
}
