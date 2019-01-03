export default class SnowFlake {
    private context: CanvasRenderingContext2D;
    readonly SNOWFLAKE_TYPE_1 = 1;
    readonly SNOWFLAKE_TYPE_2 = 2;
    readonly SNOWFLAKE_TYPE_3 = 3;

    private img: HTMLImageElement;

    constructor(
        private canvas: HTMLCanvasElement,
        private snowType: number = 1,
        private x: number = 10,
        private dx: number = 1,
        private y: number = -10,
        private dy: number = 2,
        private size: number = 30,
        private w: number = 0.001,
        private dw: number = 0.001

    ) {
        this.context = this.canvas.getContext('2d')
    }

    private loadSnowFlakeType() {
        switch (this.snowType) {
            case this.SNOWFLAKE_TYPE_1:
                this.img = <HTMLImageElement>document.getElementById('snow-flake-1');
                break;
            case this.SNOWFLAKE_TYPE_2:
                this.img = <HTMLImageElement>document.getElementById('snow-flake-2');
                break;
            case this.SNOWFLAKE_TYPE_3:
                this.img = <HTMLImageElement>document.getElementById('snow-flake-1');
                break;
        }
    }

    drawSnowFlake() {
        if (!this.img) {
            this.loadSnowFlakeType();
        }

        this.context.translate(this.x, this.y)
        this.context.rotate(this.w);
        this.context.drawImage(this.img, this.x, this.y, this.size, this.size);
        this.context.rotate(-this.w);
        this.context.translate(-this.x, -this.y)
        this.y += this.dy;
        this.x += this.dx;
        if (this.y >= this.canvas.height) {
            this.y = Math.random() * (-300) + -100;
            this.w = 0.001;
        }
        if (this.x >= this.canvas.width) {
            this.x = Math.random() * (this.canvas.height - 100);
            this.y = Math.random() * (-300) + -100;
            this.w = 0.001;
        }
        if (this.x <= -100) {
            this.x = Math.random() * (this.canvas.height - 100);
            this.y = Math.random() * (-300) + -100;
            this.w = 0.001;
        }

        this.w += this.dw;
    }

    draw() {
        this.drawSnowFlake();
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
        })
    }

}