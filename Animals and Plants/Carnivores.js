import Creatures from './Creatures.js';

class Carnivores extends Creatures {
    constructor(name) {
        super();
        this.name = name;
        this.food = ["meat"];
    }
    eating() {
        console.log(`${this.name} is eating some ${this.food}`);
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    isDead() {
        return false;
    }
}