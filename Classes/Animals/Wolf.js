import Carnivores from '../Carnivores'

class Wolf extends Carnivores{
    constructor(name){
        super(name);
        this.food.concat(["duck", "rabbit", "voles", "deer", "dog", "cat"]);
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