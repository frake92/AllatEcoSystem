import HerbEater from './HerbEater.js';
import Grass from '../Plants/Grass.js';
import Bush from '../Plants/Bush.js';

class Deer extends HerbEater {
    constructor(name) {
        super(name);
        this.food = ["bush", "grass"];
    }
    eating(food) {
        if (food instanceof Bush || food instanceof Grass) {
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
        console.log('The deer was eaten');
    }
}