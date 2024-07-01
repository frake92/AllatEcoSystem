import Carnivores from '../Carnivores'

class Cat extends Carnivores{
    constructor(name){
        super(name);
        this.food.concat(["duck", "rabbit", "voles"]);
    }
    eating(){
        super();
    }
    moving() {
        super();
    }
    isDead(){
        super();
    }
}