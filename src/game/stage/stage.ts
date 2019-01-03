import Drawable from "../interfaces/drawable";
import StageElement from "./stage-element";

export default class Stage extends Drawable {
   
    constructor(canvas: HTMLCanvasElement, public elements: StageElement[]) {
        super(canvas);
    }

    draw(){
        this.elements.forEach(elem =>{
            elem.draw();
        })
    }
}