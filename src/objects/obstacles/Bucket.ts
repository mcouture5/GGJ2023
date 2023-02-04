import { TILE_SIZE } from "../../constants";
import { GameManager } from "../../GameManager";
import { Harvest } from "../plants/Harvest";
import { Obstacle } from "./Obstacle";

export class Bucket extends Obstacle {
    protected text: Phaser.GameObjects.Text;
    placedHarvest: Harvest;

    constructor(scene: Phaser.Scene, position: number[], matrix: number[][], key: string, textX: number) {
        super(scene, position, matrix, key);
        this.setVisible(false);
        this.text = this.scene.add.text( textX, TILE_SIZE + 60, '', {
            fontFamily: 'Ace',
            fontSize: '50px',
            color: '#000'
        }).setOrigin(0.5, 0);
    }

    update(): void {
    }

    public interactWith(harvest?: Harvest): void {
        if (this.placedHarvest && !harvest) {
            this.removeHarvest(this.placedHarvest);
        } else if (!this.placedHarvest && harvest) {
            this.addHarvest(harvest);
        }
    }

    public addHarvest(harvest: Harvest) {
        GameManager.getInstance().placeHarvestOntoBucket(harvest, this);
        this.placedHarvest = harvest;
        this.text.setText(harvest.text);
    }

    public removeHarvest(harvest: Harvest) {
        GameManager.getInstance().pickupHarvestFromBucket(this.placedHarvest, this);
        this.placedHarvest = null;
        this.text.setText('');
    }
}
