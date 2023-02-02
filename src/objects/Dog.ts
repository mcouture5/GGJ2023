import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';

interface DogContext {
    idle: string;
    dig: string;
}

export interface IDog {
    scene: Phaser.Scene;
    x: number;
    y: number;
    id: number;
}

export class Dog extends Phaser.GameObjects.Sprite  {

    private xScale = 0.5;
    private yScale = 0.5;

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
        super(params.scene, params.x, params.y, 'hero');
        this.dogId = params.id;
        this.setOrigin(0, 0);
        //this.setScale(this.xScale, this.yScale);
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
            this.setScale(this.xScale, this.yScale);
        } else if (this.tileX > this.waitingToMove.x) {
            this.setScale(this.xScale * -1, this.yScale);
        }
        
        if (this.tileY > this.waitingToMove.y) {
            this.setRotation(-270 * (Math.PI/180));
            this.setScale(this.xScale * -1, this.yScale);
        } else if (this.tileY < this.waitingToMove.y) {
            this.setRotation(270 * (Math.PI/180));
            this.setScale(this.xScale * -1, this.yScale);
        } else {
            this.setRotation(0);
        }
*/
        if (!playAnimation) {
            this.doMove();
            callback && callback();
        } else {
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
