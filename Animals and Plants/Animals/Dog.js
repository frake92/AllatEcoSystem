import Carnivores from '../Carnivores'

class Dog extends Carnivores{
    constructor(name){
        super(name);
        this.food.concat(["deer", "duck", "rabbit", "voles", "cat"])
    }
    eating(){
        console.log(`${this.name} is eating ${this.food}`);
    }
    moving() {
        console.log(`${this.name} is moving`);
    }
    isDead(){
        return false;
    }
}