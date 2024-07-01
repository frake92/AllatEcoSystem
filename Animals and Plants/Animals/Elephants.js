import HerbEater from './HerbEater.js';
import { Bush } from '../Plants/Bush.js';
import { Tree } from '../Plants/Tree.js';

class Elephant extends HerbEater {
    constructor(name) {
        super(name);
        this.food.concat(["tree", "bush"]);
    }
    eating(food) {
        super(food);
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The elephant was eaten');
        isDead = true;
    }

}