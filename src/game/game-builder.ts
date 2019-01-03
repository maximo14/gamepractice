import Stage from "./stage/stage";
import StageElement from "./stage/stage-element";
import Player from "./player/player";
import Plataform from "./stage/plataform";
import Game from "./game";
import Enemy from "./enemies/enemy";

export default class GameBuilder { 
    private stageElements: StageElement[] = [];
    private player: Player;  

    constructor(private canvas: HTMLCanvasElement) {
    
    }

    makePlataform(x: number, y: number, w: number, h: number): GameBuilder {
        this.stageElements.push(new Plataform(this.canvas, x, y, w, h))
        return this;
    }

    makePlayer(x: number, y: number, w: number, h: number): GameBuilder {
       this.player = new Player(this.canvas, x, y, w, h, 100, 10, 4, 2);
        return this;
    }

    makeEnemy(x: number, y: number, w: number, h: number,maxMoveLeft?:number,maxMoveRight?:number): GameBuilder{
        this.stageElements.push(new Enemy(this.canvas,x,y,w,h, maxMoveLeft))
        return this
    }

    private setGameInEnemies(game: Game){
        this.stageElements.forEach(elem =>{ 
            if (elem instanceof Enemy) elem.game = game;
        })
    }

    build(): Game{
       let game = new Game(this.canvas,new Stage(this.canvas,this.stageElements),this.player)       
       this.player.game = game;       
       this.setGameInEnemies(game);
       return game;
    }
}