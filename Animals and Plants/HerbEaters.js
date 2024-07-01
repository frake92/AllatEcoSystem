//Növényevők 
import Creature from './Creature.js';

class HerbEater extends Creature {
    constructor(name) {
        super();
        this.name = name;
        this.food = ["plants"];
    }

    eating() {
        console.log(`${this.name} Éppen eszik egy kis ${this.food}`);
    }

    moving() {
        console.log(`${this.name} Mozgásban van`);
    }

    isDead() {
        return false;
    }
}
