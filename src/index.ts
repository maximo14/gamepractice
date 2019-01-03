/* css */
import './css/style.scss';
import SnowFlake from './snow/snowflake';
import Snow from './snow/snow';
import GameBuilder from './game/game-builder';

// import Ball from './balls/ball';
// import BallsControler from './balls/ctrBalls';

console.log("hola");
const canvas = <HTMLCanvasElement>document.getElementById('lienzo');
// const list: Ball[] = []
// for (let index = 0; index < 10; index++) {
//     list.push(new Ball(
//         canvas,uniformedRandom(100,200),
//         uniformedRandom(100,300),
//         uniformedRandom(15,60),
//         uniformedRandom(1,10)))
// }

// const controler = new BallsControler(canvas, list);
// controler.draw();

 function uniformedRandom(min: number, max: number): number { 
    return Math.random() * (max - min) + min;
 }

// const list: SnowFlake[] = []
// for (let index = 0; index < 200; index++) {
//     list.push(new SnowFlake(
//         canvas,
//         Math.floor(uniformedRandom(1,3)),
//         uniformedRandom(0,canvas.height-200),
//         uniformedRandom(0,0.4),
//         uniformedRandom(-300,-100),
//         uniformedRandom(1,3),
//         uniformedRandom(20,100)        
//         ))
    
// }

// const snow = new Snow(canvas,list);
// snow.draw();


///// a partir de aca puego hacer un juego
const builder = new GameBuilder(canvas);
builder.makePlataform(0,300,150,50)
       .makePlataform(300,300,100,50)
       .makePlayer(155,300,80,80)
       .makePlataform(300,150,150,50)
       .makeEnemy(325,100,50,50,30,30)
       .makePlataform(100,450,100,50)
       .makeEnemy(100,10,50,50,30)
       .build().draw();
