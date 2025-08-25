import { Colors } from "./Colors";

export interface Player {
    id: string;
    name: string;
    color: Colors;
    rating?: number;
    isHuman: boolean;
}

export class Player {
    constructor(color: Colors, name?: string, rating?: number, isHuman: boolean = true) {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.color = color;
        this.name = name || (color === Colors.WHITE ? "White" : "Black");
        this.rating = rating;
        this.isHuman = isHuman;
    }
}