import { Colors } from "../Colors"
import { Figure, FigureNames } from "./Figure"
import blackBishopLogo from "../../assets/bb.png"
import whiteBishopLogo from "../../assets/wb.png"
import { Cell } from "../Cell"

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackBishopLogo : whiteBishopLogo
    this.name = FigureNames.BISHOP
  }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyDiagonal(target)) return true;
        return false;
    }
}
