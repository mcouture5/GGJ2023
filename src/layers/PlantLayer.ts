import { DISPLAY_SIZE, FIXES, MATRIX, OBSTACLES, PLANT_TYPES, PLOTS, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Compost } from '../objects/Compost';
import { Dog } from '../objects/Dog';
import { House } from '../objects/House';
import { Plant } from '../objects/Plant';
import { Beet } from '../objects/plants/Beet';
import { Carrot } from '../objects/plants/Carrot';
import { Leek } from '../objects/plants/Leek';
import { Onion } from '../objects/plants/Onion';
import { Potato } from '../objects/plants/Potato';
import { Turnip } from '../objects/plants/Turnip';
import { Well } from '../objects/Well';
import { GameScene } from "../scenes/GameScene";

export class PlantLayer extends Phaser.GameObjects.Container {
    private availablePlots = [...PLOTS];
    private sowTimer: Phaser.Time.TimerEvent;
    private plants: Array<new (sscene: Phaser.Scene, x: number, y: number) => Plant> = [Potato, Carrot, Onion, Leek, Turnip, Beet];

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
            let PlantClass = this.getRandomPlant();
            let plant: Plant = new PlantClass(this.scene, nextTile[0], nextTile[1]);
            this.add(plant);
            GameManager.getInstance().registerPlant(plant);
            plant.grow();
        }
    }

    public plantRemoved(plant: Plant) {
        this.availablePlots.push([plant.matrixPosition.x, plant.matrixPosition.y]);
    }

    private getRandomPlant() {
        return this.plants[Math.floor(Math.random() * this.plants.length)];
    }
    
    private getRandomFix() {
        return FIXES[Math.floor(Math.random() * FIXES.length)];
    }
}
