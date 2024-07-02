

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
        constructor(x, y, sprite, width, height, speedX = 0, speedY = 0, isHerbivore = false, isCarnivore = false) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.sprite = new Image();
            this.sprite.src = sprite;
            this.sprite.onload = () => {
                console.log(`Image loaded: ${sprite}`);
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
            this.food = [];
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
            console.log(`Drawing entity at (${this.x}, ${this.y}) with size (${this.width}, ${this.height})`);
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

            if (this.isCarnivore || this.isHerbivore) {
                // Handle carnivore and herbivore behavior
                allEntities.forEach(entity => {
                    if (this !== entity && isOverlap(this, entity)) {
                        if (this.food.includes(entity.constructor.name)) {
                            // Entity can be eaten
                            allEntities.splice(allEntities.indexOf(entity), 1);
                        }
                    }
                });
            }
        }
    }
    
    class Carnivores extends Entity {
        constructor(x, y, sprite, width, height, speedX, speedY) {
            super(x,y,sprite,width,height, speedX, speedY, false, true);
        }
    }
    
    class HerbEater extends Entity {
        constructor(x, y, sprite, width, height, speedX, speedY) {
            super(x,y,sprite,width,height, speedX, speedY, true, false);
        }
    }
    
    class Plants extends Entity{
        constructor(x,y,sprite,widht,height) {
            super(x,y,sprite, widht,height,0,0,false,false)
        }
    }
    
    class Bush extends Plants { 
        constructor(x,y) {
            super(x,y,'Sprites/Plants/Bush.png',120,140);
        }
    }
    
    class Carrot extends Plants { 
        constructor(x,y) {
            super(x,y,'Sprites/Plants/Carrot.png',50,50);
        }
    }
    
    class Grass extends Plants { 
        constructor(x,y) {
            super(x,y,'Sprites/Plants/Grass1.png',30,30);
        }
    }
    
    class Tree extends Plants { 
        constructor(x,y) {
            super(x,y,'Sprites/Plants/Tree.png',350,450);
        }
    }
    
    class Cat extends Carnivores{
        constructor(x, y, speedX, speedY){
            super(x,y,'Sprites/Animals/Cat.png',100,60,speedX,speedY);
            this.food=["duck", "rabbit", "voles"];
        }
    }
    
    class Deer extends HerbEater { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Deer.png',200,130,speedX,speedY);
            this.food=["bush", "grass"];
        }
    }
    
    class Dog extends Carnivores{ 
        constructor(x, y, speedX, speedY){
            super(x,y,'Sprites/Animals/Dog.png',120,80,speedX,speedY);
            this.food.concat(["deer", "duck", "rabbit", "voles", "cat"])
        }
    }
    
    class Duck extends HerbEater { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Duck.png',200,130,speedX,speedY);
            this.food = ["grass"];
        }
    }
    
    class Elephant extends HerbEater { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Elephant.png',400,300,speedX,speedY);
            this.food=["tree", "bush"];
        }
    }
    
    class Fly extends HerbEater { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Fly.png',20,13,speedX,speedY);
            this.food= [ "grass"];
        }
    }
    
    class Lion extends Carnivores { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Lion.png',200,120,speedX,speedY);
            this.food=["cat", "deer", "dog", "duck", "elephant", "rabbit", "voles", "wolf"];
        }
    }
    
    class Rabbit extends HerbEater { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Rabbit.png',100,60,speedX,speedY);
            this.food = ["carrot", "grass"];
        }
    }
    
    class Vole extends HerbEater { 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Voles.png',80,50,speedX,speedY);
            this.food = ["grass"];
        }
    }
    
    class Wolf extends Carnivores{ 
        constructor(x, y, speedX, speedY) {
            super(x,y,'Sprites/Animals/Wolf.png',150,100,speedX,speedY);
            this.food.concat(["duck", "rabbit", "voles", "deer", "dog", "cat"]);
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

    function spawnAnimal(entityClass, entityCount) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            const x = getRandomInt(0, canvas.width);
            const y = getRandomInt(0, canvas.height);
            const speedX = getRandomInt(1, 3);
            const speedY = getRandomInt(1, 3);
            const entity = new entityClass(x, y, speedX, speedY);
            entities.push(entity);
        }
        return entities;
    }

    function spawnPlant(entityClass, entityCount) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            const x = getRandomInt(0, canvas.width);
            const y = getRandomInt(0, canvas.height);
            const entity = new entityClass(x, y);
            entities.push(entity);
        }
        return entities;
    }

    const catEntities = spawnAnimal(Cat, 1);
    const deerEntities = spawnAnimal(Deer, 1);
    const dogEntities = spawnAnimal(Dog, 1);
    const duckEntities = spawnAnimal(Duck, 1);
    const elephantEntities = spawnAnimal(Elephant, 1);
    const flyEntites = spawnAnimal(Fly, 1);
    const lionEntities = spawnAnimal(Lion, 1);
    const rabbitEntities = spawnAnimal(Rabbit, 1);
    const voleEntities = spawnAnimal(Vole, 1);
    const wolfEntities = spawnAnimal(Wolf, 1);
    const bushEntities = spawnPlant(Bush, 1);
    const treeEntities = spawnPlant(Tree, 1);
    const grassEntities = spawnPlant(Grass, 20);
    const carrotEntities = spawnPlant(Carrot, 1);

    const allEntities = [
        ...treeEntities,
        ...bushEntities,
        ...grassEntities,
        ...rabbitEntities,
        ...voleEntities,
        ...wolfEntities,
        ...lionEntities,
        ...dogEntities,
        ...elephantEntities,
        ...catEntities,
        ...deerEntities,
        ...duckEntities,
        ...flyEntites,
        ...carrotEntities
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
            if (entities[i].isDead && entities[i].isDead()) {
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