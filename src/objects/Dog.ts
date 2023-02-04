import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { Plant } from './plants/Plant';

interface DogContext {
    idle: string;
    dig: string;
}

export interface IDog {
    scene: Phaser.Scene;
    tileX: number;
    tileY: number;
    id: number;
}

export class Dog extends Phaser.GameObjects.Sprite  {

    private tileX;
    private tileY;
    private dogId = 0;
    private waitingToMove: any;

    // Dog info
    public static DOG_CONTEXT: { [key: number ]: DogContext} = {
        0: {
            idle: 'orange_idle',
            dig: 'orange_dig'
        },
        1: {
            idle: 'white_idle',
            dig: 'white_dig'
        },
    };
    
    constructor(params: IDog) {
        super(params.scene, params.tileX * TILE_SIZE, params.tileY * TILE_SIZE, 'lab-walk', 0);
        this.tileX = params.tileX;
        this.tileY = params.tileY;
        this.dogId = params.id;
        this.setOrigin(0, 0);
    }

    update(): void {
    }

    public canMove() {
        return !this.waitingToMove;
    }

    /**
     * Moves to the tile based x-y coordinates. Ex: passing in 1,1 will move to screen location 32,32 (or whatever tile size is set).
     * 
     * The movement occurs after the animation has finished playing. During that time, input will be blocked.
     * 
     * @param callback invoked after the dig animation is complete.
     */
    public moveTo(x: number, y: number, playAnimation: boolean, callback?: () => void) {
        this.waitingToMove = { x: x, y: y };

        /*
        if (this.tileX < this.waitingToMove.x) {
            this.setFlipX(true);
        } else if (this.tileX > this.waitingToMove.x) {
            this.setFlipX(false);
        }
         */

        if (!playAnimation) {
            this.doMove();
            callback && callback();
        } else {
            this.play('lab_walk', true);
            this.doMove();
            callback && callback();
            //this.play(Dog.DOG_CONTEXT[this.dogId].dig);
        }
    }

    private doMove() {
        this.setX(this.waitingToMove.x * TILE_SIZE);
        this.setY(this.waitingToMove.y * TILE_SIZE);
        this.tileX = this.waitingToMove.x;
        this.tileY = this.waitingToMove.y;

        // Done moving
        this.waitingToMove = null;

        // Start idling
        //this.play(Dog.DOG_CONTEXT[this.dogId].idle);
    }

    public faceLeft() {

    }
    
    public faceRight() {
        
    }

    public faceUp() {
        
    }

    public faceDown() {
        
    }

}
