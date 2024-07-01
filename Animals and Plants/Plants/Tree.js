class Tree extends Plants {
    constructor(type) {
        type = "tree";
        super(type);
    }
    eaten() {
        console.log('The tree was eaten');
    }
}