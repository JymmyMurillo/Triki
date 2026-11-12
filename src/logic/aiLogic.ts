import type { Board, Player } from "../types/game.types";
import { checkWinner } from "./gameLogic";

// ==========================================
// Obtener las posiciones disponibles del tablero
// ==========================================

export function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }

    return moves;
  }, []);
}

// ==========================================
// NIVEL FÁCIL: MOVIMIENTO ALEATORIO
// ==========================================

// Seleccionar un movimiento aleatorio
export function getRandomMove(board: Board): number | null {
  const availableMoves = getAvailableMoves(board);

  // No existen movimientos disponibles
  if (availableMoves.length === 0) {
    return null;
  }

  // Seleccionar una posición aleatoria
  const randomIndex = Math.floor(Math.random() * availableMoves.length);

  return availableMoves[randomIndex];
}

// ==========================================
// BUSCAR UN MOVIMIENTO GANADOR
// ==========================================

function findWinningMove(board: Board, player: Player): number | null {
  const availableMoves = getAvailableMoves(board);

  for (const position of availableMoves) {
    const simulatedBoard = [...board];

    // Simular el movimiento del jugador
    simulatedBoard[position] = player;

    // Comprobar si el movimiento produce una victoria
    if (checkWinner(simulatedBoard) === player) {
      return position;
    }
  }

  return null;
}

// ==========================================
// NIVEL MEDIO: INTELIGENCIA ESTRATÉGICA
// ==========================================

export function getMediumMove(board: Board, cpuPlayer: Player): number | null {
  // No realizar movimientos si la partida terminó
  if (checkWinner(board) !== null) {
    return null;
  }

  // 1. Intentar ganar
  const winningMove = findWinningMove(board, cpuPlayer);

  if (winningMove !== null) {
    return winningMove;
  }

  // Identificar al oponente
  const opponent: Player = cpuPlayer === "X" ? "O" : "X";

  // 2. Intentar bloquear al oponente
  const blockingMove = findWinningMove(board, opponent);

  if (blockingMove !== null) {
    return blockingMove;
  }

  // 3. Si no hay amenazas, jugar aleatoriamente
  return getRandomMove(board);
}
