import Drawable from "./interfaces/drawable";
import Stage from "./stage/stage";
import Player from "./player/player";
import CollisionableStageElement from "./stage/collisionable-stage-element";
import ICollisionable from "./interfaces/collisionable";

export default class Game extends Drawable {

    private gameOver: boolean = false;
    constructor(canvas: HTMLCanvasElement, public stage: Stage, public player: Player) {
        super(canvas);
        this.movePlayer();
    }

    collision(c: ICollisionable): boolean {
        for (let x of this.stage.elements) {
            if (x instanceof CollisionableStageElement) {
                if (c.isCollision(x) && c !== x) {
                    return true;
                }
            }
        }
        return false;
    }

    getCollisionElem(c: ICollisionable): CollisionableStageElement {
        for (let x of this.stage.elements) {
            if (x instanceof CollisionableStageElement) {
                if (c.isCollision(x)) {
                    return x;
                }
            }
        }
    }

    private lifeTextDraw() {
        this.context.beginPath()
        this.context.font = "30px Arial";
        this.context.fillText(`Life: ${this.player.life}`, 20, 30);


    }

    draw() {
        if (this.isPlayerDeath()) {
            this.drawGameOver();
        }else {
            this.stage.draw()
            this.player.draw();
            this.lifeTextDraw();
        }   
        requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.draw();
        })
    }

    isPlayerDeath() {
        return this.player.life <= 0;
    }

    drawGameOver() {
        this.context.beginPath()
        this.context.font = "120px Arial";
        this.context.fillText(`You Lose!!!`, this.canvas.width / 2 - 120, this.canvas.height / 2);
    }

    private movePlayer() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                this.player.movRight();
            }
            if (event.key === "ArrowLeft") {
                this.player.movLeft();
            }
            console.log(event)
            if (event.key === "ArrowUp") {
                this.player.jump();
            }
            if (event.code === "Space") {
                console.log("disparo")
                this.player.shoot();
            }
        })
    }
}