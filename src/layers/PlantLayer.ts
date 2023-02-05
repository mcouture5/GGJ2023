import { PLOTS } from '../constants';
import { GameManager } from '../GameManager';
import { Plant } from '../objects/plants/Plant';
import { Beet } from '../objects/plants/Beet';
import { Carrot } from '../objects/plants/Carrot';
import { Leek } from '../objects/plants/Leek';
import { Onion } from '../objects/plants/Onion';
import { Potato } from '../objects/plants/Potato';
import { Turnip } from '../objects/plants/Turnip';
import { ShipButton } from '../objects/obstacles/ShipButton';

export class PlantLayer extends Phaser.GameObjects.Container {
    private availablePlots = [...PLOTS];
    private plants: Array<new (scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) => Plant> = [Potato, Carrot, Onion, Leek, Turnip, Beet];
    private shipButton: ShipButton;

    // sounds
    private seedingSound: Phaser.Sound.BaseSound;
    private timeout;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
    }

    create() {
        this.shipButton = new ShipButton(this.scene);
        this.add(this.shipButton);
        GameManager.getInstance().registerObstacle(this.shipButton);
        this.sowPlant();

        this.seedingSound = this.scene.sound.add('seeding', {volume: 0.4});
    }

    update() {
    }

    destroy() {
        clearTimeout(this.timeout);
        super.destroy();
    }

    private sowPlant() {
        let delay = (Math.random() * 1000) + Math.max(750, (15 - this.availablePlots.length) * 200);
        this.timeout = setTimeout(() => {
            this.growPlant()
        }, delay);
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
            this.seedingSound.play();
            this.sowPlant();
        }
    }

    public plantRemoved(plant: Plant, playHarvestSound: boolean) {
        let hadFullField = this.availablePlots.length === 0;
        plant.harvest(playHarvestSound);
        this.availablePlots.push([...plant.matrixPosition]);
        this.remove(plant, true);
        if (hadFullField) this.sowPlant();
    }

    private getRandomPlant() {
        return this.plants[Math.floor(Math.random() * this.plants.length)];
    }
}
