import Carnivores from '../Carnivores'

class Cat extends Carnivores{
    constructor(name){
        super(name);
        this.food.concat(["duck", "rabbit", "voles"]);
    }
    eating(food){
        super(food);
    }
    moving() {
        super();
    }
    isDead(){
        super();
    }
}