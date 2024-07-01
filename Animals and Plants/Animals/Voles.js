import HerbEater from './HerbEater.js';
import Grass from '../Plants/Grass.js';

class Vole extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "grass";
    }
    eating(food) {
        super(food);
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The vole was eaten');
        isDead = true;
    }
}