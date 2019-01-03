export default class Ball {
    private context: CanvasRenderingContext2D;
    private dx: number;
    private dy: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private x: number,
        private y: number,
        private radio: number = 50,
        private speed = 5) {
        this.context = this.canvas.getContext('2d')
        this.dx = this.speed;
        this.dy = this.speed;
    }

    drawBall() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.context.fillStyle = "#0095DD";
        this.context.fill()
        this.context.stroke();
        this.context.closePath();
        this.y += this.dy;
        this.x += this.dx;
        if (this.y >= this.canvas.height - this.radio) {
            this.dy = -this.speed;
        }
        if (this.x >= this.canvas.width - this.radio) {
            this.dx = -this.speed;
        }
        if (this.y <= this.radio) {
            this.dy = this.speed
        }
        if (this.x <= this.radio) {
            this.dx = this.speed;
        }
    }

    draw() {
        this.drawBall();
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
        })
    }

}