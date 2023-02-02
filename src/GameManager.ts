import { DogLayer } from "./layers/DogLayer";
import { FarmLayer } from "./layers/FarmLayer";
import { IObstacle } from "./objects/Obstacle";

export class GameManager {
    private static instance: GameManager;
    private neighbors: {left?: IObstacle, right?: IObstacle, above?: IObstacle, below?: IObstacle} = {};
    private obstacles: IObstacle[] = [];

    private _farmLayer: FarmLayer;
    private _dogLayer: DogLayer;
    
    // Singleton baby
    public static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public set farmLayer(val: FarmLayer) {
        this._farmLayer = val;
    }
    public get farmLayer() {
        return this._farmLayer;
    }
    
    public set dogLayer(val: DogLayer) {
        this._dogLayer = val;
    }
    public get dogLayer() {
        return this._dogLayer;
    }

    public registerObstacle(obstacle: IObstacle) {
        this.obstacles.push(obstacle);
    }

    public getNeighbors(x: number, y: number) {
        this.neighbors = {};
        for (let obstacle of this.obstacles) {
            if (obstacle.isLeftOf(x, y)) {
                this.neighbors.left = obstacle;
            }
            if (obstacle.isRightOf(x, y)) {
                this.neighbors.right = obstacle;
            }
            if (obstacle.isAbove(x, y)) {
                this.neighbors.above = obstacle;
            }
            if (obstacle.isBelow(x, y)) {
                this.neighbors.below = obstacle;
            }
        }
        return this.neighbors;
    }

    public interactWith() {
        this.neighbors?.left?.interactWith();
        this.neighbors?.right?.interactWith();
        this.neighbors?.above?.interactWith();
        this.neighbors?.below?.interactWith();
    }
}
