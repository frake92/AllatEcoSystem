import HerbEater from './HerbEater.js';

class Vole extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "grass";
    }
    eating(food) {
        if (food instanceof Grass) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    eaten() {
        console.log('The vole was eaten');
    }
}