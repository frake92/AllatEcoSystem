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
        constructor(x, y, sprite, width, height, speedX = 0, speedY = 0) {
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

    function spawnEntities(entityCount, spritePaths, defaultWidth, defaultHeight, isAnimal = false) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            const x = getRandomInt(0, canvas.width - defaultWidth);
            const y = getRandomInt(0, canvas.height - defaultHeight);
            const sprite = spritePaths[getRandomInt(0, spritePaths.length)];
            const speedX = isAnimal ? getRandomInt(1, 3) : 0;
            const speedY = isAnimal ? getRandomInt(1, 3) : 0;
            const entity = new Entity(x, y, sprite, defaultWidth, defaultHeight, speedX, speedY);
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
    const carrot = ['Sprites/Plants/Carrot.png'];

    const smallAnimalSprites = [
        'Sprites/Animals/Fly.png',
        'Sprites/Animals/Rabbit.png',
        'Sprites/Animals/Cat.png',
        'Sprites/Animals/Voles.png'
    ];
    const Doggoandetc = [
        'Sprites/Animals/Dog.png',
        'Sprites/Animals/Wolf.png',
    ];
    const animalSprites = [
        'Sprites/Animals/Deer.png',
        'Sprites/Animals/Lion.png'
    ];
    const elephantBig = ['Sprites/Animals/Elephant.png']

    const treeEntities = spawnEntities(0, tree, 350, 450);
    const bushEntities = spawnEntities(0, bush, 120, 140);
    const grassEntities = spawnEntities(0, grass, 30, 30);
    const carrotEntities = spawnEntities(0, carrot, 60, 60);
    const smallAnimalEntities = spawnEntities(0, smallAnimalSprites, 120, 80, true);
    const animalEntities = spawnEntities(10, animalSprites, 270, 150, true);
    const elephantEntities = spawnEntities(10, elephantBig, 400, 300, true);
    const dogNwolfEntities = spawnEntities(0, Doggoandetc, 200, 120, true);
    const allEntities = [...treeEntities, ...carrotEntities, ...grassEntities, ...animalEntities, ...smallAnimalEntities, ...bushEntities, ...elephantEntities, ...dogNwolfEntities];

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
    /*
    function deleteDeadEntities(entities)
    {
        for (let i = 0; i < entities.length; i++) {
            if(entities[i].isDead())
            {
                entities.splice(i, 1);
            }
        }
    }
*/
function isEatable(entity, otherEntity) {
    const overlapArea = getOverlapArea(entity, otherEntity);
    if (overlapArea > 0) {
        if (entity instanceof Elephant && (otherEntity instanceof Bush || otherEntity instanceof Tree)) {
            entity.eating(otherEntity);
            removeEntity(otherEntity); 
            return true;
        } else if (entity instanceof Deer && (otherEntity instanceof Bush || otherEntity instanceof Grass)) {
            entity.eating(otherEntity); 
            removeEntity(otherEntity); 
            return true;
        } else if (entity instanceof Lion && otherEntity instanceof HerbEater)
            {
            entity.eating(otherEntity); 
            removeEntity(otherEntity); 
            return true;
        }

        return false;
    }
    return false;
}

function removeEntity(entity) {
    if(isEatable())
        {
            const index = allEntities.indexOf(entity);
            if (index !== -1) {
                allEntities.splice(index, 1);
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
