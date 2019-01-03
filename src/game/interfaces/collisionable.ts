import { Boundary } from "./boundary";

export default interface ICollisionable {
    getBoundary(): Boundary;
    isCollision(other: ICollisionable): boolean;
}



