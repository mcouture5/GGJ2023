import { PREFIX_POS } from '../../constants';
import { Bucket } from './Bucket';

export class PrefixBucket extends Bucket {
    
    constructor(scene: Phaser.Scene) {
        super(scene, {x: 1, y: 2}, PREFIX_POS, '');
    }

    update(): void {
    }

}
