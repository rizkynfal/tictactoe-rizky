import { describe, expect, it } from "vitest";
import {
  EMPTY_SCORE,
  createBoard,
  getRecord,
  getResult,
  otherPlayer,
  playMove,
  updateScore,
  type Board,
} from "./game";

const b = (cells: string): Board =>
  cells.split("").map((c) => (c === "O" ? "boni" : c === "E" ? "beni" : null));

describe("getResult", () => {
  it("is still playing on an empty board", () => {
    expect(getResult(createBoard())).toEqual({ status: "playing" });
  });

  it("detects a row win", () => {
    expect(getResult(b("OOOEE....")).status).toBe("won");
  });

  it("detects a column win and returns the line", () => {
    expect(getResult(b("E.OE.OE.."))).toEqual({
      status: "won",
      winner: "beni",
      line: [0, 3, 6],
    });
  });

  it("detects a diagonal win", () => {
    expect(getResult(b("O.E.OE..O"))).toMatchObject({ winner: "boni", line: [0, 4, 8] });
    expect(getResult(b("..E.E.E.."))).toMatchObject({ winner: "beni", line: [2, 4, 6] });
  });

  it("detects a draw on a full board with no winner", () => {
    expect(getResult(b("OEOOEEEOO"))).toEqual({ status: "draw" });
  });

  it("prefers a win over a draw when the last move fills the board", () => {
    expect(getResult(b("OEOEOEEOO")).status).toBe("won");
  });
});

describe("playMove", () => {
  it("places a mark without mutating the original board", () => {
    const board = createBoard();
    const next = playMove(board, 4, "boni");
    expect(next[4]).toBe("boni");
    expect(board[4]).toBeNull();
  });

  it("ignores a move on a taken square", () => {
    const board = playMove(createBoard(), 0, "boni");
    expect(playMove(board, 0, "beni")).toBe(board);
  });

  it("ignores moves after the game is won", () => {
    const board = b("OOOEE....");
    expect(playMove(board, 8, "beni")).toBe(board);
  });

  it("ignores out-of-range moves", () => {
    const board = createBoard();
    expect(playMove(board, 9, "boni")).toBe(board);
    expect(playMove(board, -1, "boni")).toBe(board);
  });
});

describe("score", () => {
  it("counts wins and draws", () => {
    let score = EMPTY_SCORE;
    score = updateScore(score, { status: "won", winner: "boni", line: [0, 1, 2] });
    score = updateScore(score, { status: "won", winner: "boni", line: [0, 1, 2] });
    score = updateScore(score, { status: "won", winner: "beni", line: [0, 1, 2] });
    score = updateScore(score, { status: "draw" });
    score = updateScore(score, { status: "playing" });
    expect(score).toEqual({ boni: 2, beni: 1, draws: 1 });
  });

  it("derives win / lose / draw per player", () => {
    const score = { boni: 2, beni: 1, draws: 3 };
    expect(getRecord(score, "boni")).toEqual({ wins: 2, losses: 1, draws: 3 });
    expect(getRecord(score, "beni")).toEqual({ wins: 1, losses: 2, draws: 3 });
  });

  it("switches players", () => {
    expect(otherPlayer("boni")).toBe("beni");
    expect(otherPlayer("beni")).toBe("boni");
  });
});
