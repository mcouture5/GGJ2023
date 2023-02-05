import { TILE_SIZE } from "../../constants";
import { GameManager } from "../../GameManager";
import { Harvest } from "../plants/Harvest";
import { Obstacle } from "./Obstacle";

export class Bucket extends Obstacle {
    protected textObject: Phaser.GameObjects.Text;
    private text: string = '';
    private xOffset: number = 0;
    placedHarvest: Harvest;
    private coinParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;

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
        
        this.coinParticles = this.scene.add.particles('coin');
        this.add(this.coinParticles);
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
        this.placedHarvest.setY(this.y + 75);
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

    public wordSuccess(matchesTicket?: boolean) {
        let numParticles: number = 10;
        let count: number = 1;
        if (matchesTicket) {
            numParticles = 40;
            count = 3;
        }
        this.placedHarvest && this.coinParticles.createEmitter({
            x: {min: 100, max: 120},
            y: 75,
            lifespan: 2200,
            bounce: 0.2,
            gravityY: 100,
            accelerationX: 0,
            maxVelocityX: 12,
            bounds: {x: -1000, y: 0, width: 2000, height: 120},
            speed: { min: 100, max: 150 },
            angle: { min: 70, max: 110 },
            scale: { start: 0.25, end: 0.15 },
            maxParticles: numParticles
        }).flow(60, count);
        this.placedHarvest && this.placedHarvest.destroy();
        this.placedHarvest = null;
        this.text = '';
        this.textObject.setText('');
    }
}
