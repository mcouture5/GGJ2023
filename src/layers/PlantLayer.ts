import { DISPLAY_SIZE, MATRIX, OBSTACLES, PLOTS, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Compost } from '../objects/Compost';
import { Dog } from '../objects/Dog';
import { House } from '../objects/House';
import { IPlant, Plant } from '../objects/Plant';
import { Well } from '../objects/Well';
import { GameScene } from "../scenes/GameScene";

export class PlantLayer extends Phaser.GameObjects.Container {
    private availablePlots = [...PLOTS];
    private sowTimer: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
    }

    create() {
        this.sowIfAvailable();
    }

    update() {
    }

    private sowIfAvailable() {
        // Timer will run the entire game scene.
        this.sowTimer = this.scene.time.delayedCall((Math.random() * 1000) + 1000,
                () => {
                    this.growPlant();
                    this.sowTimer.destroy();
                    this.sowIfAvailable();
                }
        )
    }

    private growPlant() {
        if (this.availablePlots.length) {
            let nextTileIndex = Math.floor(Math.random() * this.availablePlots.length);
            let nextTile = this.availablePlots.splice(nextTileIndex, 1)[0];
            let plant: Plant = new Plant(this.scene, nextTile[0], nextTile[1]);
            this.add(plant);
            GameManager.getInstance().registerPlant(plant);
        }
    }

    public plantRemoved(plant: IPlant) {
        this.availablePlots.push([plant.position.x, plant.position.y]);
    }
}
