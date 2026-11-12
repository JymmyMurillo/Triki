import type { Board } from "../types/game.types";

// Obtener las posiciones disponibles del tablero
export function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }

    return moves;
  }, []);
}

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
