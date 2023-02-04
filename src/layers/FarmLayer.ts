import { DISPLAY_SIZE, MATRIX, OBSTACLES, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Bucket } from '../objects/obstacles/Bucket';
import { Compost } from '../objects/obstacles/Compost';
import { House } from '../objects/obstacles/House';
import { PrefixBucket } from '../objects/obstacles/PrefixBucket';
import { ShipButton } from '../objects/obstacles/ShipButton';
import { SuffixBucket } from '../objects/obstacles/SuffixBucket';
import { Well } from '../objects/obstacles/Well';
import { Harvest } from '../objects/plants/Harvest';
import WordService from '../WordService';

export class FarmLayer extends Phaser.GameObjects.Container {
    private house: House;
    private compost: Compost;
    private well: Well;
    private prefixBucket: PrefixBucket;
    private suffixBucket: SuffixBucket;

    // Words and stuff
    private root: Phaser.GameObjects.Text;
    private wordService: WordService;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
        this.wordService = GameManager.getInstance().getWordService();
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

        this.root = new Phaser.GameObjects.Text(this.scene, 3 * TILE_SIZE + 60, TILE_SIZE + 60, this.wordService.currentRoot, {
            fontFamily: 'Ace',
            fontSize: '50px',
            color: '#000'
        }).setOrigin(0.5, 0);
        this.add(this.root);

        // The matrix is always there, you just need to see it.
        //this.createMatrix();
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

    public testWord() {
        this.wordService.testWord(this.prefixBucket.getText(), this.suffixBucket.getText());
    }

    public wordSuccess() {
        //this.remove(harvest, false);
        this.prefixBucket.clear();
        this.suffixBucket.clear();
    }

    public onNextRoot() {
        this.root.setText(this.wordService.currentRoot);
    }
}
