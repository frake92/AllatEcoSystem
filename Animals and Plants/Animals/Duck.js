import HerbEater from './HerbEater.js';
import Grass from '../Plants/Grass.js';

class Duck extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "grass";
    }
    eating(food) {
        super(food);
    }
    move() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The duck was eaten');
        this.isDead = true;
    }

}