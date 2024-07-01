document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('ecosystemCanvas');
    const ctx = canvas.getContext('2d');

    function setupCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
            this.sprite.onerror = () => {
                console.error(`Failed to load image: ${sprite}`);
            };
        }

        draw() {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function spawnEntities(entityCount, spritePaths, defaultWidth, defaultHeight) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            // Ensure entities fit within the canvas
            const x = getRandomInt(0, canvas.width - defaultWidth);
            const y = getRandomInt(0, canvas.height - defaultHeight);
            const sprite = spritePaths[getRandomInt(0, spritePaths.length)];
            const entity = new Entity(x, y, sprite, defaultWidth, defaultHeight);
            entities.push(entity);
        }
        return entities;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawEntities(entities) {
        clearCanvas();
        entities.forEach(entity => {
            // Ensure the image is loaded before drawing
            if (entity.sprite.complete) {
                entity.draw();
            } else {
                entity.sprite.onload = () => entity.draw();
            }
        });
    }

    const tree = [
        'Sprites/Plants/Tree.png',
    ];
    const grass = [
        'Sprites/Plants/Eatable_grass.png',
    ];
    const bush = ['Sprites/Plants/Bush.png',];
    const carrot = ['Sprites/Plants/Carrot.png'];

    const smallAnimalSprites = [
        'Sprites/Animals/Fly.png',
        'Sprites/Animals/Duck.png',
        'Sprites/Animals/Rabbit.png',
        'Sprites/Animals/Cat.png',
        'Sprites/Animals/Dog.png',
        'Sprites/Animals/Wolf.png',
        'Sprites/Animals/Voles.png'
    ];
    const animalSprites = [

        'Sprites/Animals/Deer.png',
        'Sprites/Animals/Lion.png'
    ];
    const elephantBig = ['Sprites/Animals/Elephant.png']

    const treeEntities = spawnEntities(1, tree, 300, 400); //okés
    const bushEntities = spawnEntities(1, bush, 100, 120); 
    const grassEntities = spawnEntities(1, grass, 150, 100); 
    const carrotEntities = spawnEntities(1, carrot, 100, 50); 
    const animalEntities = spawnEntities(1, smallAnimalSprites, 100, 50); 
    const smallAnimalEntities = spawnEntities(1, animalSprites, 100, 50); 
    const elephantEntities = spawnEntities(1, elephantBig, 100, 50); 
    const allEntities = [...treeEntities, ...carrotEntities, ...grassEntities, ...animalEntities, ...smallAnimalEntities, ...bushEntities, ...elephantEntities];

    drawEntities(allEntities);
});
