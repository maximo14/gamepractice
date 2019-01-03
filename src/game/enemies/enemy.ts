import CollisionableStageElement from "../stage/collisionable-stage-element";
import Game from "../game";

export default class Enemy extends CollisionableStageElement {

    private gravity: number = 3;
    private direction: number = 1;
    private initXpos: number;
    private initYpos: number;

    constructor(canvas: HTMLCanvasElement,
        xPos: number,
        yPos: number,
        weight: number,
        height: number,
        private maxMovLeft: number = 120,
        private maxMoveRight: number = 40,
        private speedMove: number = 2,
        private damage: number = 10,
        public life?: number,
        public maxSpeed?: number,
        public minSpeed?: number,
        public acceletarion?: number, public game?: Game) {
        super(canvas, xPos, yPos, weight, height);
        this.initXpos = xPos;
        this.initYpos = yPos;
    }

    delete() {
        this.xPos = this.canvas.width + 100;
    }

    private gravityDraw() {
        this.yPos += this.gravity
        if (this.game.collision(this) ||
            this.canvas.height < this.yPos + this.height) {
            this.gravity = 0;
        } else {
            this.gravity = 3;
        }
    }

    private actions() {
        this.move();
        this.attack();
    }

    private attack() {
        if (this.isCollision(this.game.player)) {
            this.game.player.doDamage(this.damage);
        }
    }

    private move() {
        if (this.game.collision(this)) {
            this.xPos += this.direction * this.speedMove;
        }
        if ((this.initXpos - this.maxMovLeft) > this.xPos || this.xPos > (this.maxMoveRight + this.initXpos)) {
            this.direction = -this.direction;
        }
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = "#ff0000";
        this.context.fillRect(this.xPos, this.yPos, this.weight, this.height);
        this.context.stroke();
        this.gravityDraw();
        this.actions();
    }
}  
