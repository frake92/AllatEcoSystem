document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('ecosystemCanvas');
    const ctx = canvas.getContext('2d');

    function setupCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(devicePixelRatio, devicePixelRatio);
        ctx.imageSmoothingEnabled = true; 
    }
    
    setupCanvas();
    class Entity {
        constructor(x, y, sprite, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.sprite = new Image();
            this.sprite.src = sprite;
            this.sprite.onload = () => {
                this.draw();
            };
        }

        draw() {
            this.sprite.onload = () => {
                ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            };
        }
    }

    // Example entity
    const exampleEntity = new Entity(1, 1, 'Sprites/Plants/Bush.png', 30, 30);
    const exampleEntity2 = new Entity(30, 3, 'Sprites/Plants/Tree.png', 30, 30);
    exampleEntity.draw();
    exampleEntity2.draw();

    /*
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function spawnEntities(entityCount, spritePaths) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            const x = getRandomInt(0, canvas.width);
            const y = getRandomInt(0, canvas.height);
            const sprite = spritePaths[getRandomInt(0, spritePaths.length)];
            const entity = new Entity(x, y, sprite);
            entity.draw();
            entities.push(entity);
        }
        return entities;
    }

    const plantSprites = [
        'Sprites/Plants/Bush.png',
        'Sprites/Plants/Eatable_grass.png',
        'Sprites/Plants/Tree.png',
        'Sprites/Plants/Carrot.png'
    ];

    const animalSprites = [
        'Sprites/Animals/Fly.png',
        'Sprites/Animals/Duck.png',
        'Sprites/Animals/Rabbit.png',
        'Sprites/Animals/Cat.png',
        'Sprites/Animals/Dog.png',
        'Sprites/Animals/Deer.png',
        'Sprites/Animals/Wolf.png',
        'Sprites/Animals/Lion.png',
        'Sprites/Animals/Elephant.png',
        'Sprites/Animals/Voles.png'
    ];

    const plantEntities = spawnEntities(10, plantSprites);
    const animalEntities = spawnEntities(5, animalSprites);*/
});

