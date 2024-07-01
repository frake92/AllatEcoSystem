//Növényevők 
import Creature from './Creature.js';

class HerbEater extends Creature {
    constructor(name) {
        super();
        this.name = name;
        this.food = ["plants"];
    }

    eating() {
        if (this.food.includes(food)) {
            console.log(`${this.name} eats ${food}`);
        }
    }

    moving() {
        if (!this.isDead) {
            console.log(`${this.name} is moving`);
        }
        else {
            console.log(`${this.name} is not moving`);
        }
    }

    isDead() {
        return false;
    }
}
