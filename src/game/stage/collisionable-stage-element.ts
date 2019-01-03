import StageElement from "./stage-element";
import ICollisionable from "../interfaces/collisionable";
import { Boundary, BoundaryTypes } from "../interfaces/boundary";

export default abstract class CollisionableStageElement extends StageElement implements ICollisionable {

    constructor(
        canvas: HTMLCanvasElement,
        xPos: number,
        yPos: number,
        weight: number,
        height: number) {
        super(canvas, xPos, yPos, weight, height);
    }

   getBoundary(): Boundary{
    return {
        x: this.xPos,
        y: this.yPos,
        h: this.height,
        w: this.weight,
        readio: 0,
        type: BoundaryTypes.RECTANGULE_BOUNDARY
    }
   }

    isCollision(other: ICollisionable): boolean {
        switch (other.getBoundary().type) {
            case BoundaryTypes.RECTANGULE_BOUNDARY:
                return this.isCollisionRectanguleBoundary(other.getBoundary())
                break;
            case BoundaryTypes.CIRCLE_BOUNDARY:
                break;
        }
        return false;
    }

    private isCollisionRectanguleBoundary(o: Boundary): boolean {
        if (this.getBoundary().type === BoundaryTypes.RECTANGULE_BOUNDARY) {     
            let myBounds = this.getBoundary()
            if (myBounds.x < o.x + o.w &&
                myBounds.x + myBounds.w > o.x &&
                myBounds.y < o.y + o.h &&
                myBounds.h + myBounds.y > o.y) {                
                return true;
            }
        }
        return false
    }



}