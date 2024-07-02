import HerbEater from './HerbEater.js';
import Grass from '../Plants/Grass.js';
import Bush from '../Plants/Bush.js';

class Deer extends HerbEater {
    constructor(name) {
        super(name);
        this.food.concat(["bush", "grass"]);
    }
    eating(food) {
        super(food);
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The deer was eaten');
        this.isDead = true;
    }
}