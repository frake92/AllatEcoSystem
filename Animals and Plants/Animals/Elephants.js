import HerbEater from './HerbEater.js';
import { Bush } from '../Plants/Bush.js';
import { Tree } from '../Plants/Tree.js';

class Elephant extends HerbEater {
    constructor(name) {
        super(name);
        this.food = ["tree", "bush"];
    }
    eating(food) {
        if (food instanceof Bush || food instanceof Tree) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
        else {
            console.log(`${this.name} is not eating ${food.name}`);
        }
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The elephant was eaten');
    }
}