import IPlayable from "../interfaces/playable";
import CollisionableStageElement from "../stage/collisionable-stage-element";
import Game from "../game";
import Projectile from "../projectile/projectile";

export default class Player extends CollisionableStageElement implements IPlayable {

    private dy: number = 0;
    private currentYPosition: number = 0;
    private maxJump: number = 150;
    private jumpSpeed: number = 3;
    private gravity: number = 3.5;
    private isJump: boolean = true;
    private projectile: Projectile[] = [];
    private direcctionShot: number = 1;
    private walkSprite: HTMLImageElement[] = []
    private walkSpritePosition: number;

    constructor(canvas: HTMLCanvasElement,
        xPos: number,
        yPos: number,
        weight: number,
        height: number,
        public life?: number,
        public maxSpeed?: number,
        public minSpeed?: number,
        public acceletarion?: number, public game?: Game) {
        super(canvas, xPos, yPos, weight, height);
        for (let i = 1; i <= 10; i++) {
            let img = new Image();
            img.src = `src/game/assets/sprites/cat/walk/Walk (${i}).png`;

            this.walkSprite.push(img);
        }
        this.walkSpritePosition = 0;
    }

    movRight(): void {
        this.xPos += 4;
        this.walkSpritePosition = (this.walkSpritePosition >= 9) ? 0 : this.walkSpritePosition + 1
        this.direcctionShot = Projectile.RIGHT_DIR;
        if (this.game.collision(this)) this.xPos -= 4;

    }
    movLeft(): void {
        this.xPos -= 4;
        this.direcctionShot = Projectile.LEFT_DIR;
        this.walkSpritePosition = (this.walkSpritePosition >= 9) ? 0 : this.walkSpritePosition + 1
        if (this.game.collision(this)) this.xPos += 4;
    }

    jump(): void {
        if (!this.isJump) {
            this.isJump = true;
            this.dy = this.gravity + this.jumpSpeed;
            this.currentYPosition = this.yPos;
        }
    }

    shoot(): void {
        let projectile = new Projectile(this.canvas,
            this.xPos, this.yPos, 5, 5,
            this.direcctionShot, 10, this.game)
        this.projectile.push(projectile);
    }

    doDamage(damagepoint: number) {
        this.life = (this.life > 0) ? this.life - damagepoint : 0;
    }

    private gravityDraw() {
        this.yPos += this.gravity
        if (this.game.collision(this) ||
            this.canvas.height < this.yPos + this.height) {
            this.yPos -= this.gravity
            this.isJump = false;
        }
    }

    private jumpDraw() {
        if (-this.maxJump + this.currentYPosition < this.yPos) {
            this.yPos -= this.dy
            if (this.game.collision(this)) this.dy = 0;
        } else this.dy = 0;
    }

    private shootDraw() {
        if (this.projectile.length !== 0) {
            this.projectile.forEach(proj => {
                proj.draw();
            })
        }
        this.projectile = this.projectile.filter(
            proj => !(proj.getBoundary().x + proj.getBoundary().w > this.canvas.height))
    }

    private PlayerDrawWalk() {
        this.context.drawImage(this.walkSprite[this.walkSpritePosition], this.xPos, this.yPos, this.weight, this.height);
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = "#0095DD";
        this.PlayerDrawWalk();
        this.gravityDraw()
        this.jumpDraw();
        this.shootDraw();
        this.context.closePath();

    }
}