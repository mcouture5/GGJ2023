import { DogLayer } from "./layers/DogLayer";
import { FarmLayer } from "./layers/FarmLayer";
import { PlantLayer } from "./layers/PlantLayer";
import { IObstacle } from "./objects/Obstacle";
import { IPlant, Plant } from "./objects/Plant";

/**
 * Responsible for handling interactions between all layers.
 */
export class GameManager {
    private static instance: GameManager;
    private _dogPosition: number[] = [7,7];

    private neighbors: {left?: IObstacle, right?: IObstacle, above?: IObstacle, below?: IObstacle, under?: IPlant} = {};
    private obstacles: IObstacle[] = [];
    private plants: IPlant[] = [];

    public farmLayer: FarmLayer;
    public plantLayer: PlantLayer;
    public dogLayer: DogLayer;
    
    // Singleton baby
    public static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public set dogPosition(val: number[]) {
        this._dogPosition = val;
        this.checkNeighbors();
    }
    public get dogPosition() {
        return this._dogPosition;
    }
    
    public registerObstacle(obstacle: IObstacle) {
        this.obstacles.push(obstacle);
    }

    public registerPlant(plant: IPlant) {
        this.plants.push(plant);
        this.checkNeighbors();
    }

    public unregisterPlant(plant: IPlant) {
        this.neighbors.under = undefined;
        this.plants.splice(this.plants.indexOf(plant), 1);
        this.plantLayer.plantRemoved(plant);
    }

    public checkNeighbors() {
        let [x,y] = this._dogPosition;
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
        for (let plant of this.plants) {
            if (plant.isUnder(x, y)) {
                this.neighbors.under = plant;
            }
        }
        console.log("Neighbors", this.neighbors);
    }

    public interactWith() {
        this.neighbors?.left?.interactWith();
        this.neighbors?.right?.interactWith();
        this.neighbors?.above?.interactWith();
        this.neighbors?.below?.interactWith();
        this.neighbors?.under?.interactWith();
    }
}
