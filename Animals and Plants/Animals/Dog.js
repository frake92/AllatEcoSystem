import Carnivores from '../Carnivores'

class Dog extends Carnivores{
    constructor(name){
        super(name);
        this.food.concat(["deer", "duck", "rabbit", "voles", "cat"])
    }
    eating(food){
        super(food)
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    isDead(){
        return false;
    }
}