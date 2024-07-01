import HerbEater from './HerbEater.js';
import Grass from '../Plants/Grass.js';

class Deer extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "plants" && "grass";
    }
    eating(food) {
        if (food instanceof Plants || food instanceof Grass) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The deer was eaten');
    }
}