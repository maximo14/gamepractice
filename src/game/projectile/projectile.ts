import CollisionableStageElement from "../stage/collisionable-stage-element";
import { Boundary, BoundaryTypes } from "../interfaces/boundary";
import Game from "../game";
import Plataform from "../stage/plataform";
import Enemy from "../enemies/enemy";

export default class Projectile extends CollisionableStageElement {
    public static readonly RIGHT_DIR: number = 1;
    public static readonly LEFT_DIR: number = -1;

    constructor(canvas: HTMLCanvasElement,
        xPos: number,
        yPos: number,
        weight: number,
        height: number,
        private direcction: number,
        private velocity: number,
        public game?: Game) {
        super(canvas, xPos, yPos, weight, height);

    }
    getBoundary(): Boundary {
        return {
            x: this.xPos,
            y: this.yPos,
            w: this.weight,
            h: this.height,
            readio: 0,
            type: BoundaryTypes.RECTANGULE_BOUNDARY
        }
    }

    private move() {
        this.xPos += (this.direcction) * this.velocity;
    }

    private acction() {
        const elem = this.game.getCollisionElem(this)
        if (elem) {
            if (elem instanceof Plataform) {
                this.xPos = this.canvas.width + 100;
            }
            if (elem instanceof Enemy) {
                this.xPos = this.canvas.width + 100;
                elem.delete();
            }

        }
    }

    draw() {
        this.context.beginPath();
        this.context.fillRect(this.xPos, this.yPos, this.weight, this.height);
        this.context.fillStyle = "#0095DD";
        this.context.stroke();
        this.move();
        this.acction();
    }

}