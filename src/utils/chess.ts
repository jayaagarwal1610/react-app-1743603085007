import { Piece, Position } from '../types';

export const initialBoardState = (): (Piece | null)[][] => {
  const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Set up back rows
  const backRowPieces: ('rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'bishop' | 'knight' | 'rook')[] = 
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    
  backRowPieces.forEach((piece, col) => {
    board[0][col] = { type: piece, color: 'black' };
    board[7][col] = { type: piece, color: 'white' };
  });
  
  return board;
};

export const isValidMove = (
  board: (Piece | null)[][],
  from: Position,
  to: Position,
  currentPlayer: 'white' | 'black'
): boolean => {
  // Check if destination is the same as origin
  if (from.row === to.row && from.col === to.col) return false;
  
  const piece = board[from.row][from.col];
  const targetPiece = board[to.row][to.col];
  
  // Check if piece exists and belongs to current player
  if (!piece || piece.color !== currentPlayer) return false;
  
  // Can't capture own pieces
  if (targetPiece && targetPiece.color === currentPlayer) return false;
  
  // Basic move validation based on piece type
  switch (piece.type) {
    case 'pawn': 
      return isValidPawnMove(board, from, to, piece.color);
    case 'rook': 
      return isValidRookMove(board, from, to);
    case 'knight': 
      return isValidKnightMove(from, to);
    case 'bishop': 
      return isValidBishopMove(board, from, to);
    case 'queen': 
      return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
    case 'king': 
      return isValidKingMove(from, to);
    default: 
      return false;
  }
};

const isValidPawnMove = (
  board: (Piece | null)[][],
  from: Position,
  to: Position,
  color: 'white' | 'black'
): boolean => {
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;
  
  // Moving forward
  if (from.col === to.col && board[to.row][to.col] === null) {
    // Single square move
    if (to.row === from.row + direction) return true;
    
    // Double square move from starting position
    if (from.row === startRow && 
        to.row === from.row + 2 * direction && 
        board[from.row + direction][from.col] === null) return true;
  }
  
  // Capturing
  if (Math.abs(from.col - to.col) === 1 && to.row === from.row + direction) {
    return board[to.row][to.col] !== null;
  }
  
  return false;
};

const isValidRookMove = (
  board: (Piece | null)[][],
  from: Position,
  to: Position
): boolean => {
  // Rook moves horizontally or vertically
  if (from.row !== to.row && from.col !== to.col) return false;
  
  const rowStep = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
  const colStep = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);
  
  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;
  
  while (currentRow !== to.row || currentCol !== to.col) {
    if (board[currentRow][currentCol] !== null) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
};

const isValidKnightMove = (from: Position, to: Position): boolean => {
  const rowDiff = Math.abs(from.row - to.row);
  const colDiff = Math.abs(from.col - to.col);
  
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

const isValidBishopMove = (
  board: (Piece | null)[][],
  from: Position,
  to: Position
): boolean => {
  // Bishop moves diagonally
  if (Math.abs(from.row - to.row) !== Math.abs(from.col - to.col)) return false;
  
  const rowStep = to.row > from.row ? 1 : -1;
  const colStep = to.col > from.col ? 1 : -1;
  
  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;
  
  while (currentRow !== to.row && currentCol !== to.col) {
    if (board[currentRow][currentCol] !== null) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
};

const isValidKingMove = (from: Position, to: Position): boolean => {
  const rowDiff = Math.abs(from.row - to.row);
  const colDiff = Math.abs(from.col - to.col);
  
  return rowDiff <= 1 && colDiff <= 1;
};