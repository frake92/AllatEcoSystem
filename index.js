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

    // Function to log events
    function logEvent(event) {
        const logElement = document.getElementById('log');
        const newLogEntry = document.createElement('li');
        newLogEntry.textContent = event;
        logElement.appendChild(newLogEntry);
    }

    // Function to update statistics
    function updateStatistics() {
        const herbivoreCount = allEntities.filter(entity => entity.isHerbivore).length;
        const carnivoreCount = allEntities.filter(entity => entity.isCarnivore).length;

        document.getElementById('herbivoreCount').textContent = herbivoreCount;
        document.getElementById('carnivoreCount').textContent = carnivoreCount;
    }

    class Entity {
        constructor(name, x, y, sprite, width, height, speedX = 0, speedY = 0, isHerbivore = false, isCarnivore = false, plantType = null, allowedPlantTypes = []) {
            this.name = name;
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
            this.plantType = plantType; // Add plantType property
            this.allowedPlantTypes = allowedPlantTypes; // Add allowedPlantTypes property
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
                        logEvent(`${this.name} ate ${entity.name}`);
                        allEntities.splice(allEntities.indexOf(entity), 1);
                    }
                });
            } else if (this.isHerbivore) {
                // Handle herbivore behavior
                allEntities.forEach(entity => {
                    if (this !== entity && entity.plantType && this.allowedPlantTypes.includes(entity.plantType) && isOverlap(this, entity)) {
                        // Herbivore consumes allowed plant
                        logEvent(`${this.name} ate ${entity.name}`);
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

    function spawnEntities(entityCount, names, spritePaths, defaultWidth, defaultHeight, isHerbivore, isCarnivore, plantType = null, allowedPlantTypes = []) {
        const entities = [];
        for (let i = 0; i < entityCount; i++) {
            const x = getRandomInt(0, canvas.width - defaultWidth);
            const y = getRandomInt(0, canvas.height - defaultHeight);
            const sprite = spritePaths[getRandomInt(0, spritePaths.length)];
            const name = names[i % names.length]; // Cycle through names
            const speedX = isHerbivore || isCarnivore ? getRandomInt(1, 3) : 0;
            const speedY = isHerbivore || isCarnivore ? getRandomInt(1, 3) : 0;
            const entity = new Entity(name, x, y, sprite, defaultWidth, defaultHeight, speedX, speedY, isHerbivore, isCarnivore, plantType, allowedPlantTypes);
            entities.push(entity);
        }
        return entities;
    }

    const treeNames = ['Tree'];
    const grassNames = ['Grass'];
    const bushNames = ['Bush'];
    const rabbitNames = ['Rabbit'];
    const voleNames = ['Vole'];
    const wolfNames = ['Wolf'];
    const lionNames = ['Lion'];
    const dogNames = ['Dog'];
    const elephantNames = ['Elephant'];

    const treeSprites = ['Sprites/Plants/Tree.png'];
    const grassSprites = [
        'Sprites/Plants/Grass1.png',
        'Sprites/Plants/Grass2.png',
        'Sprites/Plants/Grass3.png',
    ];
    const bushSprites = ['Sprites/Plants/Bush.png'];
    const rabbitSprites = ['Sprites/Animals/Rabbit.png'];
    const voleSprites = ['Sprites/Animals/Voles.png'];
    const wolfSprites = ['Sprites/Animals/Wolf.png'];
    const lionSprites = ['Sprites/Animals/Lion.png'];
    const dogSprites = ['Sprites/Animals/Dog.png'];
    const elephantSprites = ['Sprites/Animals/Elephant.png'];

    const treeEntities = spawnEntities(8, treeNames, treeSprites, 350, 450, false, false, 'tree');
    const bushEntities = spawnEntities(5, bushNames, bushSprites, 120, 140, false, false, 'bush');
    const grassEntities = spawnEntities(20, grassNames, grassSprites, 30, 30, false, false, 'grass');
    const rabbitEntities = spawnEntities(4, rabbitNames, rabbitSprites, 100, 60, true, false, null, ['grass', 'bush']);
    const voleEntities = spawnEntities(6, voleNames, voleSprites, 80, 50, true, false, null, ['grass', 'bush']);
    const wolfEntities = spawnEntities(3, wolfNames, wolfSprites, 150, 100, false, true);
    const lionEntities = spawnEntities(2, lionNames, lionSprites, 200, 120, false, true);
    const dogEntities = spawnEntities(2, dogNames, dogSprites, 120, 80, false, true);
    const elephantEntities = spawnEntities(2, elephantNames, elephantSprites, 400, 300, true, false, null, ['grass', 'bush']);

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
        updateStatistics(); // Update statistics on each frame
        requestAnimationFrame(animate);
        deleteDeadEntities(allEntities);
    }

    animate();  // Start the animation
});
