import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { Plant } from './plants/Plant';

interface DogContext {
    idle: string;
    walk: string;
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
            idle: 'lab-idle',
            walk: 'lab-walk'
        },
        1: {
            idle: 'phin-idle',
            walk: 'phin-walk'
        }
    };
    
    constructor(params: IDog) {
        super(params.scene, params.tileX * TILE_SIZE, params.tileY * TILE_SIZE, Dog.DOG_CONTEXT[params.id].walk, 0);
        this.tileX = params.tileX;
        this.tileY = params.tileY;
        this.dogId = params.id;
        this.setOrigin(0, 0);
        // switch to idle animation
        this.play(Dog.DOG_CONTEXT[this.dogId].idle, true);
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

        // flip dog if needed
        if (this.tileX < this.waitingToMove.x) {
            this.setFlipX(true);
        } else if (this.tileX > this.waitingToMove.x) {
            this.setFlipX(false);
        }

        if (!playAnimation) {
            // instantly teleport to the new position
            this.setX(this.waitingToMove.x * TILE_SIZE);
            this.setY(this.waitingToMove.y * TILE_SIZE);
            this.tileX = this.waitingToMove.x;
            this.tileY = this.waitingToMove.y;
            // done moving
            this.waitingToMove = null;
            callback && callback();
        } else {
            // switch to walk animation
            this.play(Dog.DOG_CONTEXT[this.dogId].walk, true);
            //this.play(Dog.DOG_CONTEXT[this.dogId].walk);
            // tween over to the new position
            this.scene.tweens.add({
                targets: this,
                x: { from: this.x, to: this.waitingToMove.x * TILE_SIZE },
                y: { from: this.y, to: this.waitingToMove.y * TILE_SIZE },
                duration: 250,
                onComplete: () => {
                    // update tileX/tileY
                    this.tileX = this.waitingToMove.x;
                    this.tileY = this.waitingToMove.y;
                    // switch to idle animation
                    this.play(Dog.DOG_CONTEXT[this.dogId].idle, true);
                    //this.play(Dog.DOG_CONTEXT[this.dogId].idle);
                    // done moving
                    this.waitingToMove = null;
                    callback && callback();
                }
            });
        }
    }

    /**
     * When the player wants to move to x,y but are currently not allowed,
     * the dog should at least look in the direction of x,y.
     */
    public lookAt(x: number, y: number) {
        // flip dog if needed
        if (this.tileX < x) {
            this.setFlipX(true);
        } else if (this.tileX > x) {
            this.setFlipX(false);
        }
    }

    /**
     * Triggered when the SHIP button is interacted with.
     */
    public testWord() {
        if (!this.canMove()) return;
        // Jump to press the button
        this.waitingToMove = {x: this.x, y: this.y - 40};
        this.scene.tweens.add({
            targets: this,
            y: { from: this.y, to: this.waitingToMove.y },
            duration: 50,
            onComplete: () => {
                this.waitingToMove = {x: this.x, y: this.y + 40};
                this.scene.tweens.add({
                    targets: this,
                    y: { from: this.y, to: this.waitingToMove.y },
                    duration: 50,
                    onComplete: () => {
                        this.waitingToMove = null;
                    }
                });
            }
        });
    }
}
