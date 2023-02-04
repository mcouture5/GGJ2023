import { TILE_SIZE } from "../../constants";
import { GameManager } from "../../GameManager";
import { Harvest } from "../plants/Harvest";
import { Obstacle } from "./Obstacle";

export class Bucket extends Obstacle {
    protected textObject: Phaser.GameObjects.Text;
    private text: string = '';
    private xOffset: number = 0;
    placedHarvest: Harvest;

    constructor(scene: Phaser.Scene, position: number[], matrix: number[][], key: string, textX: number) {
        super(scene, position, matrix, key);
        this.sprite.setVisible(false);
        this.textObject = new Phaser.GameObjects.Text(this.scene, textX, -60, '', {
            fontFamily: 'Ace',
            fontSize: '50px',
            color: '#000'
        }).setOrigin(0.5, 0);
        this.add(this.textObject);
        this.xOffset = textX;
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
        this.placedHarvest.setX(this.x + this.xOffset);
        this.placedHarvest.setY(this.y + 65);
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
        this.placedHarvest && this.placedHarvest.destroy();
        this.placedHarvest = null;
        this.text = '';
        this.textObject.setText('');
    }
}
