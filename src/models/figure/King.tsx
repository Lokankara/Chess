import { Cell } from "../Cell"
import { Colors } from "../Colors"
import { Figure, FigureNames } from "./Figure"
import blackKingLogo from "../../assets/bk.png"
import whiteKingLogo from "../../assets/wk.png"

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackKingLogo : whiteKingLogo
    this.name = FigureNames.KING
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    const dx = Math.abs(this.cell.x - target.x)
    const dy = Math.abs(this.cell.y - target.y)
    if (dx <= 1 && dy <= 1) {
      if (target.figure?.name === FigureNames.KING) return false
      return true
    }
    return false
  }
}
