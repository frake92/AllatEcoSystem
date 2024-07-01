import Carnivore from './Carnivores.js';
import { HerbEater } from './HerbEater.js';

class Lion extends Carnivore {
    constructor(name) {
        super(name);
        this.food = "HerbEater";
    }
    eating(food) {
        if (food instanceof HerbEater) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The Lion was eaten');
    }
}