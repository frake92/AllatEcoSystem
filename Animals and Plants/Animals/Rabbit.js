import HerbEater from './HerbEater.js';
import { Carrot, Grass } from '../Plants/Carrot.js';

class Rabbit extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "carrot or grass";
    }
    eating(food) {
        if (food instanceof Carrot || food instanceof Grass) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The rabbit was eaten');
    }
}