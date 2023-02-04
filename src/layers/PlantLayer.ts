import { PLOTS } from '../constants';
import { GameManager } from '../GameManager';
import { Plant } from '../objects/plants/Plant';
import { Beet } from '../objects/plants/Beet';
import { Carrot } from '../objects/plants/Carrot';
import { Leek } from '../objects/plants/Leek';
import { Onion } from '../objects/plants/Onion';
import { Potato } from '../objects/plants/Potato';
import { Turnip } from '../objects/plants/Turnip';

export class PlantLayer extends Phaser.GameObjects.Container {
    private availablePlots = [...PLOTS];
    private sowTimer: Phaser.Time.TimerEvent;
    private plants: Array<new (scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) => Plant> = [Potato, Carrot, Onion, Leek, Turnip, Beet];

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
            let plant: Plant = new PlantClass(this.scene, nextTile[0], nextTile[1], Math.random() < 0.5);
            this.add(plant);
            plant.create();
            GameManager.getInstance().registerPlant(plant);
            plant.grow();
        }
    }

    public plantRemoved(plant: Plant, playHarvestSound: boolean) {
        plant.harvest(playHarvestSound);
        this.availablePlots.push([...plant.matrixPosition]);
        this.remove(plant, true);
    }

    private getRandomPlant() {
        return this.plants[Math.floor(Math.random() * this.plants.length)];
    }
}
