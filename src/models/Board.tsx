import { Colors } from './Colors'
import { Cell } from './Cell'
import { Bishop } from './figure/Bishop'
import { King } from './figure/King'
import { Knight } from './figure/Knight'
import { Pawn } from './figure/Pawn'
import { Queen } from './figure/Queen'
import { Rook } from './figure/Rook'
import { Figure, FigureNames } from './figure/Figure'

export class Board {
  cells: Cell[][] = [];
  lostBlackFigure: Figure[] = [];
  lostWhiteFigure: Figure[] = [];

  public initCells(): void {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        const isBlack = (i + j) % 2 === 0
        row.push(new Cell(this, j, i, isBlack ? Colors.BLACK : Colors.WHITE, null))
      }
      this.cells.push(row)
    }
  }

  public getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigure = this.lostBlackFigure;
    newBoard.lostWhiteFigure = this.lostWhiteFigure;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        target.available = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  public isKingInCheck(color: Colors): boolean {
    const king = this.getKing(color)
    if (!king) return false

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j]
        if (cell.figure && cell.figure.color !== color) {
          if (cell.figure.canMove(king.cell)) {
            return true
          }
        }
      }
    }
    return false
  }

  public isCheckmate(color: Colors): boolean {
    if (!this.isKingInCheck(color)) return false

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j]
        if (cell.figure && cell.figure.color === color) {
          const moves = this.getAvailableMoves(cell)
          for (const target of moves) {
            const snapshot = this.getCopyBoard()
            snapshot.getCell(cell.x, cell.y).figure?.moveFigure(snapshot.getCell(target.x, target.y))
            if (!snapshot.isKingInCheck(color)) {
              return false
            }
          }
        }
      }
    }
    return true
  }

  private getKing(color: Colors): King | null {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const figure = this.cells[i][j].figure
        if (figure?.name === FigureNames.KING && figure.color === color) {
          return figure as King
        }
      }
    }
    return null
  }

  public getAvailableMoves(cell: Cell): Cell[] {
    const moves: Cell[] = []
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const target = this.cells[i][j]
        if (cell.figure?.canMove(target)) {
          moves.push(target)
        }
      }
    }
    return moves
  }

  public addFigures(): void {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new King(Colors.BLACK, this.getCell(4, 0))
    new Bishop(Colors.BLACK, this.getCell(2, 0))
    new Bishop(Colors.BLACK, this.getCell(5, 0))
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(6, 0))
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.BLACK, this.getCell(7, 0))
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1))
    }

    new Queen(Colors.WHITE, this.getCell(3, 7))
    new King(Colors.WHITE, this.getCell(4, 7))
    new Bishop(Colors.WHITE, this.getCell(2, 7))
    new Bishop(Colors.WHITE, this.getCell(5, 7))
    new Knight(Colors.WHITE, this.getCell(1, 7))
    new Knight(Colors.WHITE, this.getCell(6, 7))
    new Rook(Colors.WHITE, this.getCell(0, 7))
    new Rook(Colors.WHITE, this.getCell(7, 7))
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6))
    }
  }
}
