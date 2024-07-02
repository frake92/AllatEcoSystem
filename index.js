import Cat from './Animals and Plants/Animals/Cat.js';
import Deer from './Animals and Plants/Animals/Deer.js';
import Dog from './Animals and Plants/Animals/Dog.js';
import Duck from './Animals and Plants/Animals/Duck.js';
import Elephant from './Animals and Plants/Animals/Elephant.js';
import Fly from './Animals and Plants/Animals/Fly.js';
import Lion from './Animals and Plants/Animals/Lion.js';
import Rabbit from './Animals and Plants/Animals/Rabbit.js';
import Voles from './Animals and Plants/Animals/Voles.js';
import Wolf from './Animals and Plants/Animals/Wolf.js';

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

    // Entity class with updated interaction logic
class Entity {
    constructor(x, y, sprite, width, height, speedX = 0, speedY = 0, isHerbivore = false, isCarnivore = false) {
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
        this.speedX = speedX;
        this.speedY = speedY;
        this.moving = false;
        this.movementInterval = this.randomMovementInterval();
        this.lastMovementTime = Date.now();
        this.directionChangeInterval = this.randomDirectionChangeInterval();
        this.lastDirectionChange = Date.now();
        this.direction = { x: 0, y: 0 };
        this.isHerbivore = isHerbivore;
        this.isCarnivore = isCarnivore;
    }

    randomMovementInterval() {
        return Math.floor(Math.random() * (5000 - 1000)) + 1000; // Random interval between 1 and 5 seconds
    }

    randomDirectionChangeInterval() {
        return Math.floor(Math.random() * (3000 - 1000)) + 1000; // Random interval between 1 and 3 seconds
    }

    getY2() {
        return this.y + this.height + 1;
    }

    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update() {
        const now = Date.now();
    
        if (this.moving) {
            this.x += this.speedX * this.direction.x;
            this.y += this.speedY * this.direction.y;
    
            // Handle horizontal boundaries
            if (this.x < 0) {
                this.x = 0;
                this.direction.x = -this.direction.x;
            } else if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
                this.direction.x = -this.direction.x;
            }
    
            // Handle vertical boundaries
            if (this.y < 0) {
                this.y = 0;
                this.direction.y = -this.direction.y;
            } else if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
                this.direction.y = -this.direction.y;
            }
        }
    
        // Change movement status based on interval
        if (now - this.lastMovementTime > this.movementInterval) {
            this.moving = !this.moving;
            this.lastMovementTime = now;
            this.movementInterval = this.randomMovementInterval();
            this.direction = { 
                x: getRandomInt(-1, 2), // Direction can be -1, 0, or 1
                y: getRandomInt(-1, 2)  // Direction can be -1, 0, or 1
            };
        }
    
        // Change direction based on direction change interval
        if (now - this.lastDirectionChange > this.directionChangeInterval) {
            this.direction = { 
                x: getRandomInt(-1, 2), 
                y: getRandomInt(-1, 2)  
            };
            this.lastDirectionChange = now;
            this.directionChangeInterval = this.randomDirectionChangeInterval();
        }
    
        if (this.isCarnivore) {
            // Handle carnivore behavior
            allEntities.forEach(entity => {
                if (this !== entity && entity.isHerbivore && isOverlap(this, entity)) {
                    // Carnivore eats herbivore
                    allEntities.splice(allEntities.indexOf(entity), 1);
                }
            });
        } else if (this.isHerbivore) {
            // Handle herbivore behavior
            allEntities.forEach(entity => {
                if (this !== entity && !entity.isHerbivore && !entity.isCarnivore && isOverlap(this, entity)) {
                    // Herbivore consumes plant
                    allEntities.splice(allEntities.indexOf(entity), 1);
                }
            });
        }
    }
}    


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getOverlapArea(entity, otherEntity) {
        const x1 = Math.max(entity.x, otherEntity.x);
        const y1 = Math.max(entity.y, otherEntity.y);
        const x2 = Math.min(entity.x + entity.width, otherEntity.x + otherEntity.width);
        const y2 = Math.min(entity.y + entity.height, otherEntity.y + otherEntity.height);
        const width = Math.max(0, x2 - x1);
        const height = Math.max(0, y2 - y1);
        return width * height;
    }
    
    function isOverlap(entity, otherEntity) {
        const overlapArea = getOverlapArea(entity, otherEntity);
        return overlapArea > 0;
    }

    function spawnEntities(entityCount, spritePaths, defaultWidth, defaultHeight, isHerbivore, isCarnivore) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            const x = getRandomInt(0, canvas.width - defaultWidth);
            const y = getRandomInt(0, canvas.height - defaultHeight);
            const sprite = spritePaths[getRandomInt(0, spritePaths.length)];
            const speedX = isHerbivore || isCarnivore ? getRandomInt(1, 3) : 0;
            const speedY = isHerbivore || isCarnivore ? getRandomInt(1, 3) : 0;
            const entity = new Entity(x, y, sprite, defaultWidth, defaultHeight, speedX, speedY, isHerbivore, isCarnivore);
            entities.push(entity);
        }
        return entities;
    }

    const tree = ['Sprites/Plants/Tree.png'];
    const grass = [
        'Sprites/Plants/Grass1.png',
        'Sprites/Plants/Grass2.png',
        'Sprites/Plants/Grass3.png',
    ];
    const bush = ['Sprites/Plants/Bush.png'];
    const rabbitSprites = ['Sprites/Animals/Rabbit.png'];
    const voleSprites = ['Sprites/Animals/Voles.png'];
    const wolfSprites = ['Sprites/Animals/Wolf.png'];
    const lionSprites = ['Sprites/Animals/Lion.png'];
    const dogSprites = ['Sprites/Animals/Dog.png'];
    const elephantBig = ['Sprites/Animals/Elephant.png'];

    const treeEntities = spawnEntities(8, tree, 350, 450, false, false);
    const bushEntities = spawnEntities(5, bush, 120, 140, false, false);
    const grassEntities = spawnEntities(20, grass, 30, 30, false, false);
    const rabbitEntities = spawnEntities(4, rabbitSprites, 100, 60, true, false);
    const voleEntities = spawnEntities(6, voleSprites, 80, 50, true, false);
    const wolfEntities = spawnEntities(3, wolfSprites, 150, 100, false, true);
    const lionEntities = spawnEntities(2, lionSprites, 200, 120, false, true);
    const dogEntities = spawnEntities(2, dogSprites, 120, 80, false, true);
    const elephantEntities = spawnEntities(2, elephantBig, 400, 300, true, false);
    

    const allEntities = [
        ...treeEntities,
        ...bushEntities,
        ...grassEntities,
        ...rabbitEntities,
        ...voleEntities,
        ...wolfEntities,
        ...lionEntities,
        ...dogEntities,
        ...elephantEntities
    ];

    console.log(`Total entities created: ${allEntities.length}`);

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawEntities(entities) {
        clearCanvas();

        // Group entities by size category
        const smallEntities = entities.filter(entity => entity.width < 121 && entity.height < 141);
        const mediumEntities = entities.filter(entity => entity.width >= 150 && entity.width < 300 && entity.height >= 100 && entity.height < 200);
        const largeEntities = entities.filter(entity => entity.width >= 300 || entity.height >= 200);

        // Sort within each size group based on depth
        const sortedEntities = [...largeEntities, ...mediumEntities, ...smallEntities];
        sortedEntities.sort((a, b) => a.getY2() - b.getY2());

        // Draw entities in sorted order
        sortedEntities.forEach(entity => {
            entity.draw();
        });
    }

    function deleteDeadEntities(entities) {
        for (let i = entities.length - 1; i >= 0; i--) {
            if (entities[i].isDead()) {
                entities.splice(i, 1);
            }
        }
    }

    function animate() {
        allEntities.forEach(entity => entity.update());
        drawEntities(allEntities);
        requestAnimationFrame(animate);
        deleteDeadEntities(allEntities);

    }

    animate();  // Start the animation
});
