import { GameManager } from "../../GameManager";
import { Harvest } from "../plants/Harvest";
import { Obstacle } from "./Obstacle";

export class Bucket extends Obstacle {

    placedHarvest: Harvest;

    constructor(scene: Phaser.Scene, position: {x: number, y: number}, matrix: number[][], key: string) {
        super(scene, position, matrix, key);
    }

    update(): void {
    }

    public interactWith(harvest?: Harvest): void {
        if (this.placedHarvest && !harvest) {
            GameManager.getInstance().pickupHarvestFromBucket(this.placedHarvest, this);
            this.placedHarvest = null;
        } else if (!this.placedHarvest && harvest) {
            GameManager.getInstance().placeHarvestOntoBucket(harvest, this);
            this.placedHarvest = harvest;
        }
    }
}
