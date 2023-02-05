import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { Plant } from './plants/Plant';
import {GameManager} from "../GameManager";

interface DogContext {
    idle: string;
    walk: string;
    pee: string;
    kick: string;
    'idle-carry': string;
    'walk-carry': string;
    'pee-carry': string;
    'kick-carry': string;
    speed: number; // lower is faster
    bladder: number;
    poo: number;
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
    private isCarrying: boolean;
    private currentAnim: 'idle' | 'walk' | 'pee' | 'kick';
    public bladderMax: number;
    public pooMax: number;

    // Dog info
    public static DOG_CONTEXT: { [key: number ]: DogContext} = {
        0: {
            idle: 'lab-idle',
            walk: 'lab-walk',
            pee: 'lab-pee',
            kick: 'lab-kick',
            'idle-carry': 'lab-idle-carry',
            'walk-carry': 'lab-walk-carry',
            'pee-carry': 'lab-pee-carry',
            'kick-carry': 'lab-kick-carry',
            speed: 130, // fast
            bladder: 3, // not so much pee
            poo: 3 // not so much poo
        },
        1: {
            idle: 'phin-idle',
            walk: 'phin-walk',
            pee: 'phin-pee',
            kick: 'phin-kick',
            'idle-carry': 'phin-idle-carry',
            'walk-carry': 'phin-walk-carry',
            'pee-carry': 'phin-pee-carry',
            'kick-carry': 'phin-kick-carry',
            speed: 220, // slow
            bladder: 9, // lots o pee
            poo: 9 // lots o poo
        }
    };
    
    constructor(params: IDog) {
        super(params.scene, params.tileX * TILE_SIZE, params.tileY * TILE_SIZE, Dog.DOG_CONTEXT[params.id].walk, 0);
        this.tileX = params.tileX;
        this.tileY = params.tileY;
        this.dogId = params.id;
        this.bladderMax = Dog.DOG_CONTEXT[this.dogId].bladder;
        this.pooMax = Dog.DOG_CONTEXT[this.dogId].poo;
        GameManager.getInstance().drink = this.bladderMax;
        GameManager.getInstance().food = this.pooMax;
        GameManager.getInstance().maxDrink = this.bladderMax;
        GameManager.getInstance().maxFood = this.pooMax;
        this.setOrigin(0, 0);
        // switch to idle animation
        this.playAnim('idle');

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (this.currentAnim === 'pee' || this.currentAnim === 'kick') {
                this.playAnim('idle');
            }
        });
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
            this.playAnim('walk');
            // tween over to the new position
            this.scene.tweens.add({
                targets: this,
                x: { from: this.x, to: this.waitingToMove.x * TILE_SIZE },
                y: { from: this.y, to: this.waitingToMove.y * TILE_SIZE },
                duration: Dog.DOG_CONTEXT[this.dogId].speed,
                onComplete: () => {
                    // update tileX/tileY
                    this.tileX = this.waitingToMove.x;
                    this.tileY = this.waitingToMove.y;
                    // switch to idle animation
                    this.playAnim('idle');
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

    public canPee(): boolean {
        return GameManager.getInstance().drink > 0;
    }

    public pee() {
        this.playAnim('pee');
        GameManager.getInstance().drink = Math.max(0, GameManager.getInstance().drink - 1);
    }

    public canKickDirt(): boolean {
        return GameManager.getInstance().food > 0;
    }

    public kickDirt() {
        this.playAnim('kick');
        GameManager.getInstance().food = Math.max(0, GameManager.getInstance().food - 1);
    }

    /**
     * Updates this.isCarrying and tweaks the this.currentAnim to the proper animation.
     */
    public setIsCarrying(isCarrying: boolean) {
        if (this.isCarrying === isCarrying) {
            return;
        }
        this.isCarrying = isCarrying;
        // refresh current animation
        this.playAnim(this.currentAnim);
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

    private playAnim(animKey: 'idle' | 'walk' | 'pee' | 'kick') {
        this.currentAnim = animKey;
        if (this.isCarrying) {
            animKey += '-carry';
        }
        this.play(Dog.DOG_CONTEXT[this.dogId][animKey], true);
    }
}
