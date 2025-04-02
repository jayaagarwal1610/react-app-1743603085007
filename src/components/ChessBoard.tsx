import React, { useState } from 'react';
import Square from './Square';
import { Piece, Position } from '../types';
import { initialBoardState, isValidMove } from '../utils/chess';
import './ChessBoard.css';

const ChessBoard: React.FC = () => {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoardState());
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      // Move the piece if valid
      if (isValidMove(board, selectedPiece, { row, col }, currentPlayer)) {
        const newBoard = [...board.map(row => [...row])];
        newBoard[row][col] = newBoard[selectedPiece.row][selectedPiece.col];
        newBoard[selectedPiece.row][selectedPiece.col] = null;
        
        setBoard(newBoard);
        setSelectedPiece(null);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      } else if (board[row][col]?.color === currentPlayer) {
        // Select a different piece of the same color
        setSelectedPiece({ row, col });
      } else {
        // Invalid move, deselect
        setSelectedPiece(null);
      }
    } else {
      // Select a piece if it belongs to the current player
      if (board[row][col]?.color === currentPlayer) {
        setSelectedPiece({ row, col });
      }
    }
  };

  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0;
        const isSelected = selectedPiece?.row === row && selectedPiece?.col === col;
        
        squares.push(
          <Square
            key={`${row}-${col}`}
            isLight={isLight}
            isSelected={isSelected}
            piece={board[row][col]}
            onClick={() => handleSquareClick(row, col)}
          />
        );
      }
    }
    return squares;
  };

  return (
    <div className="chess-container">
      <div className="player-turn">Current turn: {currentPlayer}</div>
      <div className="chess-board">
        {renderBoard()}
      </div>
    </div>
  );
};

export default ChessBoard;
