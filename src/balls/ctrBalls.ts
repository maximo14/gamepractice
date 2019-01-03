import Ball from "./ball";

export default class BallsControler {
    private context: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement,
        private listBalls: Ball[]) {
        this.context = this.canvas.getContext('2d');
    }

    draw() {
        this.listBalls.forEach(ball =>{
            ball.drawBall();
        })
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
        })
    }
}