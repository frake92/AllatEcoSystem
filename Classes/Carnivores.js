import Creatures from './Creatures.js';
import '../index.js';

class Carnivores extends Creatures {
    constructor(name) {
        super();
        this.name = name;
        this.food = ["meat"];
    }
    eating(food) {
        if(this.food.includes(food)){
            console.log(`${this.name} eats ${food}`);
        }
    }
    moving() {
        if(!this.isDead){
            console.log(`${this.name} is moving`);
        }
        else{
            console.log(`${this.name} is not moving`);
        }
    }
    isDead() {
        return false;
    }
}