import Creature from './Creature.js';

class Fly extends HerbEater {
    constructor(name) {
        super(name);
        this.food = "grass";
    }
    move() {
        console.log('The fly is moving');
    }
    eaten() {
        console.log('The fly was eaten');
    }

}