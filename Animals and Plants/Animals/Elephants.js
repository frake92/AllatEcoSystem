import HerbEater from './HerbEater.js';
import { Plants } from '../Plants/Plants.js';
import { Tree } from '../Plants/Tree.js';

class Elephant extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "plants" && "tree";
    }
    eating(food) {
        if (food instanceof Plants || food instanceof Tree) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The elephant was eaten');
    }
}