import { describe, it, expect } from "vitest";

import {
  WINNING_COMBINATIONS,
  createInitialBoard,
  createInitialGameState,
  checkWinner,
  isDraw,
  makeMove,
} from "./gameLogic";

import type { Board, GameState } from "../types/game.types";

// ==========================================
// CREACIÓN DEL TABLERO
// ==========================================

describe("createInitialBoard", () => {
  it("should create a board with nine empty cells", () => {
    const board = createInitialBoard();

    expect(board).toHaveLength(9);
    expect(board.every((cell) => cell === null)).toBe(true);
  });
});

// ==========================================
// CREACIÓN DEL ESTADO INICIAL
// ==========================================

describe("createInitialGameState", () => {
  it("should create the initial game state correctly", () => {
    const gameState = createInitialGameState();

    expect(gameState).toEqual({
      board: Array(9).fill(null),
      currentPlayer: "X",
      status: "playing",
      winner: null,
    });
  });
});

// ==========================================
// DETECCIÓN DE GANADORES
// ==========================================

describe("checkWinner", () => {
  it("should identify X as the winner", () => {
    const board: Board = ["X", "X", "X", "O", "O", null, null, null, null];

    expect(checkWinner(board)).toBe("X");
  });

  it("should identify O as the winner", () => {
    const board: Board = ["O", "O", "O", "X", "X", null, null, null, null];

    expect(checkWinner(board)).toBe("O");
  });

  it("should return null when there is no winner", () => {
    const board: Board = ["X", "O", null, null, "X", "O", null, null, null];

    expect(checkWinner(board)).toBeNull();
  });

  it.each(WINNING_COMBINATIONS.map((combination) => [combination]))(
    "should detect a winning combination at positions %j",
    (combination) => {
      const board = createInitialBoard();

      combination.forEach((position) => {
        board[position] = "X";
      });

      expect(checkWinner(board)).toBe("X");
    },
  );

  it("should detect all eight winning combinations", () => {
    expect(WINNING_COMBINATIONS).toHaveLength(8);
  });
});

// ==========================================
// DETECCIÓN DE EMPATES
// ==========================================

describe("isDraw", () => {
  it("should identify a draw when the board is full", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

    expect(isDraw(board)).toBe(true);
  });

  it("should return false when the board has empty cells", () => {
    const board: Board = ["X", "O", "X", "X", null, "O", "O", "X", "X"];

    expect(isDraw(board)).toBe(false);
  });
});

// ==========================================
// EJECUCIÓN DE MOVIMIENTOS
// ==========================================

describe("makeMove", () => {
  it("should register the first move for player X", () => {
    const initialState = createInitialGameState();

    const newState = makeMove(initialState, 0);

    expect(newState.board[0]).toBe("X");
    expect(newState.currentPlayer).toBe("O");
    expect(newState.status).toBe("playing");
  });

  it("should alternate players after a valid move", () => {
    const initialState = createInitialGameState();

    const firstMove = makeMove(initialState, 0);
    const secondMove = makeMove(firstMove, 1);

    expect(firstMove.currentPlayer).toBe("O");
    expect(secondMove.currentPlayer).toBe("X");
    expect(secondMove.board[1]).toBe("O");
  });

  it("should not allow a move in an occupied cell", () => {
    const initialState = createInitialGameState();

    const firstMove = makeMove(initialState, 0);
    const secondMove = makeMove(firstMove, 0);

    expect(secondMove).toBe(firstMove);
  });

  it.each([-1, 9, 10, 1.5, NaN])(
    "should reject an invalid position: %s",
    (position) => {
      const initialState = createInitialGameState();

      const newState = makeMove(initialState, position);

      expect(newState).toBe(initialState);
    },
  );

  it("should not allow moves after the game has ended", () => {
    const finishedState: GameState = {
      board: ["X", "X", "X", "O", "O", null, null, null, null],
      currentPlayer: "O",
      status: "won",
      winner: "X",
    };

    const newState = makeMove(finishedState, 5);

    expect(newState).toBe(finishedState);
  });

  it("should update the state when X wins", () => {
    const initialState: GameState = {
      board: ["X", "X", null, "O", "O", null, null, null, null],
      currentPlayer: "X",
      status: "playing",
      winner: null,
    };

    const newState = makeMove(initialState, 2);

    expect(newState.status).toBe("won");
    expect(newState.winner).toBe("X");
    expect(newState.currentPlayer).toBe("X");
  });

  it("should identify a draw after the last move", () => {
    const initialState: GameState = {
      board: ["X", "O", "X", "X", "O", "O", "O", "X", null],
      currentPlayer: "X",
      status: "playing",
      winner: null,
    };

    const newState = makeMove(initialState, 8);

    expect(newState.status).toBe("draw");
    expect(newState.winner).toBeNull();
  });

  it("should not mutate the original game state", () => {
    const initialState = createInitialGameState();
    const originalBoard = [...initialState.board];

    const newState = makeMove(initialState, 0);

    expect(initialState.board).toEqual(originalBoard);
    expect(newState.board).not.toBe(initialState.board);
    expect(initialState.currentPlayer).toBe("X");
  });
});
