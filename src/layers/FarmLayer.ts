import { DISPLAY_SIZE, MATRIX, OBSTACLES, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Bucket } from '../objects/obstacles/Bucket';
import { Compost } from '../objects/obstacles/Compost';
import { House } from '../objects/obstacles/House';
import { PrefixBucket } from '../objects/obstacles/PrefixBucket';
import { SuffixBucket } from '../objects/obstacles/SuffixBucket';
import { Well } from '../objects/obstacles/Well';
import { Harvest } from '../objects/plants/Harvest';

export class FarmLayer extends Phaser.GameObjects.Container {
    private house: House;
    private compost: Compost;
    private well: Well;
    private prefixBucket: PrefixBucket;
    private suffixBucket: SuffixBucket;

    // Words and stuff
    private root: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
    }

    create() {
        this.house = new House(this.scene);
        this.add(this.house);
        GameManager.getInstance().registerObstacle(this.house);

        this.compost = new Compost(this.scene);
        this.add(this.compost);
        GameManager.getInstance().registerObstacle(this.compost);

        this.well = new Well(this.scene);
        this.add(this.well);
        GameManager.getInstance().registerObstacle(this.well);

        this.prefixBucket = new PrefixBucket(this.scene);
        this.add(this.prefixBucket);
        GameManager.getInstance().registerObstacle(this.prefixBucket);

        this.suffixBucket = new SuffixBucket(this.scene);
        this.add(this.suffixBucket);
        GameManager.getInstance().registerObstacle(this.suffixBucket);

        this.root = new Phaser.GameObjects.Text(this.scene, 3 * TILE_SIZE + 60, TILE_SIZE + 60, 'comfort', {
            fontFamily: 'Ace',
            fontSize: '50px',
            color: '#000'
        }).setOrigin(0.5, 0);
        this.add(this.root);

        // The matrix is always there, you just need to see it.
        this.createMatrix();
    }

    update() {
    }

    private createMatrix() {
        for (let y = 0; y < MATRIX.length; y++) {
            for (let x = 0; x < MATRIX[y].length; x++) {
                let square = new Phaser.GameObjects.Graphics(this.scene);
                square.lineStyle(1, 0x00FF00, 1);
                square.fillStyle(0x000000, 0);
                square.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                square.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                this.add(square);
            }
        }
        
        for (let i = 0; i < OBSTACLES.length; i++) {
            let obstacle = OBSTACLES[i];
            const x = obstacle[0];
            const y = obstacle[1];
            let square = new Phaser.GameObjects.Graphics(this.scene);
            square.lineStyle(4, 0xFF0000, 1);
            square.fillStyle(0x000000, 0);
            square.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            square.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.add(square);
        }
    }

    public placeHarvestOnto(harvest: Harvest, bucket: Bucket) {
        this.add(harvest);
        harvest.setX(bucket.x);
        harvest.setY(bucket.y);
    }
    
    public removeHarvestFrom(harvest: Harvest, bucket: Bucket) {
        this.remove(harvest, false); // no destroy!
    }
}
