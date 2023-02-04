import { TILE_SIZE } from "../../constants";
import { GameManager } from "../../GameManager";
import { Harvest } from "../plants/Harvest";
import { Obstacle } from "./Obstacle";

export class Bucket extends Obstacle {
    protected textObject: Phaser.GameObjects.Text;
    private text: string = '';
    placedHarvest: Harvest;

    constructor(scene: Phaser.Scene, position: number[], matrix: number[][], key: string, textX: number) {
        super(scene, position, matrix, key);
        this.sprite.setVisible(false);
        this.textObject = new Phaser.GameObjects.Text(this.scene, textX, -60, 'test', {
            fontFamily: 'Ace',
            fontSize: '50px',
            color: '#000'
        }).setOrigin(0.5, 0);
        this.add(this.textObject);
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
        this.textObject.setText(harvest.text);
        this.text = harvest.text;
    }

    public removeHarvest(harvest: Harvest) {
        GameManager.getInstance().pickupHarvestFromBucket(this.placedHarvest, this);
        this.placedHarvest = null;
        this.textObject.setText('');
        this.text = '';
    }

    public getText() {
        return this.text;
    }

    public clear() {
        this.placedHarvest.destroy();
        this.placedHarvest = null;
        this.text = '';
        this.textObject.setText('');
    }
}
