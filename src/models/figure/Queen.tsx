import blackQueenLogo from "../../assets/bq.png"
import whiteQueenLogo from "../../assets/wq.png"
import { Cell } from "../Cell"
import { Colors } from "../Colors"
import { Figure, FigureNames } from "./Figure"


export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackQueenLogo : whiteQueenLogo
        this.name = FigureNames.QUEEN
    }
    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyVertical(target)) return true;
        if (this.cell.isEmptyHorizontal(target)) return true;
        if (this.cell.isEmptyDiagonal(target)) return true;
        return false;
    }
}
