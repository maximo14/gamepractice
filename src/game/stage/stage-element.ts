import Drawable from "../interfaces/drawable";

export default class StageElement extends Drawable {

    constructor(
        canvas: HTMLCanvasElement,
        protected xPos: number,
        protected yPos: number,
        protected weight: number,
        protected height: number) {
        super(canvas);
    }
}