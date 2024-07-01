import HerbEater from './HerbEater.js';

class Duck extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "grass";
    }
    eating(food) {
        if (food instanceof Grass) {
            console.log(`${this.name} is eating some ${this.food}`);
        }
    }
    move() {
        console.log('The duck is moving');
    }
    eaten() {
        console.log('The duck was eaten');
    }

}