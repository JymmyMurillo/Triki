import { describe, it, expect, vi, afterEach } from "vitest";

import { getAvailableMoves, getMediumMove, getRandomMove } from "./aiLogic";

import type { Board } from "../types/game.types";

// ==========================================
// OBTENER MOVIMIENTOS DISPONIBLES
// ==========================================

describe("getAvailableMoves", () => {
  it("should return all positions on an empty board", () => {
    const board: Board = Array(9).fill(null);

    expect(getAvailableMoves(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should return only empty positions", () => {
    const board: Board = ["X", null, "O", null, "X", null, "O", null, null];

    expect(getAvailableMoves(board)).toEqual([1, 3, 5, 7, 8]);
  });

  it("should return an empty array when the board is full", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

    expect(getAvailableMoves(board)).toEqual([]);
  });
});

// ==========================================
// MOVIMIENTO ALEATORIO DE LA CPU
// ==========================================

describe("getRandomMove", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a valid position on an empty board", () => {
    const board: Board = Array(9).fill(null);

    const move = getRandomMove(board);

    expect(move).not.toBeNull();
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(8);
  });

  it("should return only an available position", () => {
    const board: Board = ["X", null, "O", null, "X", null, "O", null, null];

    const move = getRandomMove(board);

    expect([1, 3, 5, 7, 8]).toContain(move);
  });

  it("should return null when the board is full", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

    expect(getRandomMove(board)).toBeNull();
  });

  it("should select the first available position when random is zero", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const board: Board = ["X", null, "O", null, "X", null, "O", null, null];

    expect(getRandomMove(board)).toBe(1);
  });

  it("should select the last available position when random is near one", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999);

    const board: Board = ["X", null, "O", null, "X", null, "O", null, null];

    expect(getRandomMove(board)).toBe(8);
  });
});
  // ==========================================
// NIVEL MEDIO: INTELIGENCIA ESTRATÉGICA
// ==========================================

describe('getMediumMove', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should prioritize winning over blocking', () => {
    const board: Board = [
      'O', 'O', null,
      'X', 'X', null,
      null, null, null,
    ];

    expect(getMediumMove(board, 'O')).toBe(2);
  });

  it('should win when a winning move is available', () => {
    const board: Board = [
      'O', 'O', null,
      'X', null, null,
      'X', null, null,
    ];

    expect(getMediumMove(board, 'O')).toBe(2);
  });

  it('should block the opponent from winning', () => {
    const board: Board = [
      'X', 'X', null,
      'O', null, null,
      null, 'O', null,
    ];

    expect(getMediumMove(board, 'O')).toBe(2);
  });

  it('should detect a winning move for player X', () => {
    const board: Board = [
      'X', null, 'O',
      'X', 'O', null,
      null, null, null,
    ];

    expect(getMediumMove(board, 'X')).toBe(6);
  });

  it('should select a random available move when there are no threats', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const board: Board = [
      'X', null, null,
      null, 'O', null,
      null, null, null,
    ];

    expect(getMediumMove(board, 'O')).toBe(1);
  });

  it('should return null when the board is full', () => {
    const board: Board = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X',
    ];

    expect(getMediumMove(board, 'O')).toBeNull();
  });

  it('should return null when the game already has a winner', () => {
    const board: Board = [
      'X', 'X', 'X',
      'O', 'O', null,
      null, null, null,
    ];

    expect(getMediumMove(board, 'O')).toBeNull();
  });

  it('should not modify the original board', () => {
    const board: Board = [
      'X', 'X', null,
      'O', null, null,
      null, 'O', null,
    ];

    const originalBoard = [...board];

    getMediumMove(board, 'O');

    expect(board).toEqual(originalBoard);
  });
});