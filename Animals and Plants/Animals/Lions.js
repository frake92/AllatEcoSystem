import Carnivore from './Carnivores.js';
import { HerbEater } from './HerbEater.js';

class Lion extends Carnivore {
    constructor(name) {
        super(name);
        this.food.concat(["cat", "deer", "dog", "duck", "elephant", "rabbit", "voles", "wolf"]);
    }
    eating(food) {
        super(food)
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The Lion was eaten');
    }
}