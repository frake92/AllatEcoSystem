import Carnivores from '../Carnivores'

class Cat extends Carnivores{
    constructor(name){
        super(name);
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