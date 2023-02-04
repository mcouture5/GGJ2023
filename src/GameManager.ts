import { DogLayer } from "./layers/DogLayer";
import { FarmLayer } from "./layers/FarmLayer";
import { PlantLayer } from "./layers/PlantLayer";
import { Dog } from "./objects/Dog";
import { Bucket } from "./objects/obstacles/Bucket";
import { IObstacle } from "./objects/obstacles/Obstacle";
import { PrefixBucket } from "./objects/obstacles/PrefixBucket";
import { SuffixBucket } from "./objects/obstacles/SuffixBucket";
import { Plant } from "./objects/plants/Plant";
import { Harvest } from "./objects/plants/Harvest";

/**
 * Responsible for handling interactions between all layers.
 */
export class GameManager {
    private static instance: GameManager;
    private _dogPosition: number[] = [7,7];

    private neighbors: {left?: IObstacle, right?: IObstacle, above?: IObstacle, below?: IObstacle, under?: Plant} = {};
    private obstacles: IObstacle[] = [];
    private plants: Plant[] = [];

    public farmLayer: FarmLayer;
    public plantLayer: PlantLayer;
    public dogLayer: DogLayer;

    public dog: Dog;
    
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
    public registerDog(dog: Dog) {
        this.dog = dog;
    }

    public registerPlant(plant: Plant) {
        this.plants.push(plant);
        this.checkNeighbors();
    }

    public placeHarvestOntoBucket(harvest: Harvest, bucket: Bucket) {
        this.dogLayer.dropHarvest();
        this.farmLayer.placeHarvestOnto(harvest, bucket);
    }

    public pickupHarvestFromBucket(harvest: Harvest, bucket: Bucket) {
        this.dogLayer.pickupHarvest(harvest);
        this.farmLayer.removeHarvestFrom(harvest, bucket);
    }

    /**
     * Does all the heavy lifting (LOL) when harvesting a plant.
     */
    public harvestPlant(plant: Plant) {
        this.dogLayer.setHoldingPlant(plant);
        this.neighbors.under = undefined;
        this.plants.splice(this.plants.indexOf(plant), 1);
        this.plantLayer.plantRemoved(plant, true);
    }

    /**
     * If plant underneath dog, remove plant without harvesting.
     */
    public peeOnPlant() {
        // get plant underneath dog
        let plant: Plant = this.neighbors?.under;
        // STOP if no plant
        if (!plant) {
            return;
        }
        // remove plant without harvesting
        this.neighbors.under = undefined;
        this.plants.splice(this.plants.indexOf(plant), 1);
        this.plantLayer.plantRemoved(plant, false);
    }

    /**
     * If plant underneath dog, kick dirt on it to speed up its growth.
     */
    public kickDirtOnPlant() {
        this.neighbors?.under?.kickDirtOnPlant();
    }

    public destroyHarvest(harvest: Harvest) {
        this.dogLayer.destroyHarvest();
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

    public interactWith(harvest?: Harvest) {
        this.neighbors?.left?.interactWith(harvest);
        this.neighbors?.right?.interactWith(harvest);
        this.neighbors?.above?.interactWith(harvest);
        this.neighbors?.below?.interactWith(harvest);
        this.neighbors?.under?.interactWith(harvest);
    }
}
