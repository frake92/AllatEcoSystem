import HerbEater from './HerbEater.js';
import Carrot from '../Plants/Carrot.js';
import Grass from '../Plants/Grass.js';

class Rabbit extends HerbEater {
    constructor(name) {
        super(name);
        this.food = ["carrot", "grass"];
    }
    eating(food) {
        if (food instanceof Carrot || food instanceof Grass) {
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
        console.log('The rabbit was eaten');
    }
}