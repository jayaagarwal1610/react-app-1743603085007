import React from 'react';
import { Piece as PieceType } from '../types';
import './Square.css';

interface SquareProps {
  isLight: boolean;
  isSelected: boolean;
  piece: PieceType | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ isLight, isSelected, piece, onClick }) => {
  const getClassName = () => {
    let className = 'square';
    className += isLight ? ' light' : ' dark';
    if (isSelected) className += ' selected';
    return className;
  };

  return (
    <div className={getClassName()} onClick={onClick}>
      {piece && (
        <div className={`piece ${piece.color}`}>
          {getPieceSymbol(piece.type)}
        </div>
      )}
    </div>
  );
};

const getPieceSymbol = (type: string): string => {
  const symbols: { [key: string]: string } = {
    pawn: '♟',
    rook: '♜',
    knight: '♞',
    bishop: '♝',
    queen: '♛',
    king: '♚'
  };
  return symbols[type] || '';
};

export default Square;