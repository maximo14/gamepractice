import SnowFlake from "./snowflake";

export default class Snow {
    private context: CanvasRenderingContext2D
    constructor(private canvas: HTMLCanvasElement, private snowFlakeList: SnowFlake[]) {
        this.context = canvas.getContext("2d");
    }

    draw(){
        this.snowFlakeList.forEach(SnowFlake =>{
            SnowFlake.drawSnowFlake();
        })
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
        })
    }
}