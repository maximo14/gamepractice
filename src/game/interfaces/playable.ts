export default interface IPlayable {
    life?: number;
    maxSpeed?: number,
    minSpeed?: number,
    acceletarion?: number,
    movRight(): void;
    movLeft(): void;
    jump(): void;
    shoot(): void;
}