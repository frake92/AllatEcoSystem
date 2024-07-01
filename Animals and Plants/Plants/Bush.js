class Bush extends Plants {
    constructor(type) {
        type = "bush";
        super(type);
    }
    eaten() {
        console.log('The bush was eaten');
    }
}