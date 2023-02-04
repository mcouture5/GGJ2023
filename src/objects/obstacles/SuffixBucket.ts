import { SUFFIX_POS, TILE_SIZE } from '../../constants';
import { Harvest } from '../plants/Harvest';
import { Bucket } from './Bucket';

export class SuffixBucket extends Bucket {

    constructor(scene: Phaser.Scene) {
        super(scene, [4,2], SUFFIX_POS, '', 5 * TILE_SIZE + 16);
    }

    update(): void {
    }

}
