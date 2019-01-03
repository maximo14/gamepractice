export interface Boundary {
    type: number;
    x: number;
    y: number;
    w: number;
    h: number;
    readio: number
}
export class BoundaryTypes{
    public static readonly RECTANGULE_BOUNDARY: number = 1;
    public static readonly CIRCLE_BOUNDARY: number = 2; 
}