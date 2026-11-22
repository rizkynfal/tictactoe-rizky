export type Player = "boni" | "beni";
export type Cell = Player | null;
export type Board = Cell[];

export type GameResult =
  | { status: "playing" }
  | { status: "won"; winner: Player; line: number[] }
  | { status: "draw" };

export interface Score {
  boni: number;
  beni: number;
  draws: number;
}

export const PLAYERS: Record<Player, { name: string; tagline: string }> = {
  boni: { name: "Boni", tagline: "The orange troublemaker" },
  beni: { name: "Beni", tagline: "The calm grey genius" },
};

export const WINNING_LINES: readonly number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const EMPTY_SCORE: Score = { boni: 0, beni: 0, draws: 0 };

export function createBoard(): Board {
  return Array<Cell>(9).fill(null);
}

export function otherPlayer(player: Player): Player {
  return player === "boni" ? "beni" : "boni";
}

export function getResult(board: Board): GameResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const mark = board[a];
    if (mark && mark === board[b] && mark === board[c]) {
      return { status: "won", winner: mark, line };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { status: "draw" };
  }
  return { status: "playing" };
}

/** Returns a new board with the move applied, or the same board if the move is not allowed. */
export function playMove(board: Board, index: number, player: Player): Board {
  if (index < 0 || index >= board.length) return board;
  if (board[index] !== null) return board;
  if (getResult(board).status !== "playing") return board;

  const next = [...board];
  next[index] = player;
  return next;
}

export function updateScore(score: Score, result: GameResult): Score {
  if (result.status === "won") {
    return { ...score, [result.winner]: score[result.winner] + 1 };
  }
  if (result.status === "draw") {
    return { ...score, draws: score.draws + 1 };
  }
  return score;
}

/** Win / lose / draw record from one player's point of view. */
export function getRecord(score: Score, player: Player) {
  return {
    wins: score[player],
    losses: score[otherPlayer(player)],
    draws: score.draws,
  };
}
