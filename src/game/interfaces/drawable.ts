export default class Drawable {
    protected context: CanvasRenderingContext2D;

    constructor(protected canvas: HTMLCanvasElement) {
        this.context = this.canvas.getContext("2d");
    }

    draw(){

    }
}