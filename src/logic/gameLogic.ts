import type { Board, GameState, Player } from "../types/game.types";

// Combinaciones posibles para ganar
export const WINNING_COMBINATIONS: number[][] = [
  // Filas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Columnas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonales
  [0, 4, 8],
  [2, 4, 6],
];

// Crear un tablero vacío
export function createInitialBoard(): Board {
  return Array(9).fill(null);
}

// Crear el estado inicial de una partida
export function createInitialGameState(): GameState {
  return {
    board: createInitialBoard(),
    currentPlayer: "X",
    status: "playing",
    winner: null,
  };
}

// Identificar si existe un ganador
export function checkWinner(board: Board): Player | null {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;

    const value = board[a];

    if (value !== null && value === board[b] && value === board[c]) {
      return value;
    }
  }

  return null;
}

// Identificar si el tablero está lleno
export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

// Realizar un movimiento
export function makeMove(gameState: GameState, position: number): GameState {
  // No permitir movimientos si la partida terminó
  if (gameState.status !== "playing") {
    return gameState;
  }

  // Validar que la posición esté dentro del tablero
  if (!Number.isInteger(position) || position < 0 || position > 8) {
    return gameState;
  }

  // No permitir seleccionar una casilla ocupada
  if (gameState.board[position] !== null) {
    return gameState;
  }

  // Crear una copia del tablero
  const newBoard = [...gameState.board];

  // Registrar el movimiento
  newBoard[position] = gameState.currentPlayer;

  // Comprobar si existe un ganador
  const winner = checkWinner(newBoard);

  // Comprobar si existe empate
  const draw = !winner && isDraw(newBoard);

  // Determinar el estado de la partida
  const status = winner ? "won" : draw ? "draw" : "playing";

  // Cambiar de jugador únicamente si la partida continúa
  const nextPlayer =
    status === "playing"
      ? gameState.currentPlayer === "X"
        ? "O"
        : "X"
      : gameState.currentPlayer;

  return {
    board: newBoard,
    currentPlayer: nextPlayer,
    status,
    winner,
  };
}
