import HerbEater from './HerbEater.js';
import Grass from '../Plants/Grass.js';

class Duck extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "grass";
    }
    eating(food) {
        if (food instanceof Grass) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
        else {
            console.log(`${this.name} is not eating ${food.name}`);
        }
    }
    move() {
        console.log('The duck is moving');
    }
    eaten() {
        console.log('The duck was eaten');
    }

}