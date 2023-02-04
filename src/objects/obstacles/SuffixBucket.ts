import { SUFFIX_POS } from '../../constants';
import { Bucket } from './Bucket';

export class SuffixBucket extends Bucket {

    constructor(scene: Phaser.Scene) {
        super(scene, {x: 5, y: 2}, SUFFIX_POS, '');
    }

    update(): void {
    }

}
