import CollisionableStageElement from "./collisionable-stage-element";


export default class Plataform extends CollisionableStageElement {

    constructor(
        canvas: HTMLCanvasElement,
        xPos: number,
        yPos: number,
        weight: number,
        height: number) {
        super(canvas, xPos, yPos, weight, height);
    }
    
    private drawBrick() {
        this.context.beginPath();
        let img = new Image()
        img.src = "src/game/assets/plataform/brick.png";
        var ptrn = this.context.createPattern(img, 'repeat')
        ptrn.setTransform({ a: this.height / img.width, d: this.height / img.width })
        this.context.fillStyle = ptrn;
        this.context.fillRect(this.xPos, this.yPos, this.weight, this.height);
        this.context.stroke();
    }

    draw() {
        this.drawBrick();
    }

}