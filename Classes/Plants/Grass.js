class Grass extends Plants {
    constructor(type) {
        type = "grass";
        super(type);
    }
    eaten() {
        console.log('The grass was eaten');
    }
}