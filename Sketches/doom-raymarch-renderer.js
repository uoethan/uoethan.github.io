class Player {
    constructor(x, y, angle) {
        this.position = createVector(x,y);
        this.angle = angle;
        this.rotationSpeed = 0.001;
        this.speed = 0.01;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.angle -= this.rotationSpeed * deltaTime;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.angle += this.rotationSpeed * deltaTime;
        }

        if (keyIsDown(UP_ARROW)) {
            this.position.x += Math.cos(this.angle) * this.speed * deltaTime;
            this.position.y += Math.sin(this.angle) * this.speed * deltaTime;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.position.x -= Math.cos(this.angle) * this.speed * deltaTime;
            this.position.y -= Math.sin(this.angle) * this.speed * deltaTime;
        }
    }
}

class Shape {
    constructor(x, y, size) {
        this.position = createVector(x, y);
        this.size = size;
    }

    signedDistance(vector) {
        return this.position.dist(vector);
    }
}

class Circle extends Shape {
    signedDistance(vector) {
        return this.position.dist(vector) - this.size;
    }
}

class Square extends Shape {
    signedDistance(vector) {
        const dx = abs(this.x) - this.size;
        const d1 = max(dx, 0);
        const dy = abs(this.y) - this.size;
        const d2 = max(dy, 0);
        return min(max(dx, dy), 0.0) + createVector(d1, d2).mag();
    }
}

class World {
    constructor(playerX, playerY, angle) {
        this.shapes = [];
        this.player = new Player(playerX, playerY, angle);
    }

    addSquare(x, y, size) {
        this.shapes.push(new Square(x, y, size));
    }

    addCircle(x, y, radius) {
        this.shapes.push(new Circle(x, y, radius));
    }

    getClosestDistance(vector) {
        var distance = Infinity;

        for (var shape in this.shapes) {
            shape = this.shapes[shape];
            distance = min(distance, shape.signedDistance(vector));
        }
        return distance;
    }

    castRay(angle, maxDistance, minDistance) {
        var dx = Math.cos(angle);
        var dy = Math.sin(angle);
        var rayPosition = this.player.position;

        var stepNumber = 0;
        while (rayPosition.dist(this.player.position) < maxDistance && stepNumber<MAX_STEPS) {
            var closestDistance = this.getClosestDistance(rayPosition);

            if (closestDistance < minDistance) {
                return rayPosition.dist(this.player.position);
            }

            rayPosition.x = dx * closestDistance;
            rayPosition.y = dy * closestDistance;
            stepNumber++;
        }
        return null;
    }

    draw() {
        this.player.move();

        var lineIndex = 0;
        for (
            var angle = this.player.angle - FOV / 2;
            angle < this.player.angle + FOV / 2;
            angle += STEP_SIZE
        ) {
            var distance = this.castRay(angle,MAX_RAY_LENGTH,MIN_DISTANCE_TO_SHAPE);

            if(distance!=null){
                var normalisedDistance = distance/MAX_RAY_LENGTH;
                fill(0, 0, 255 * (1 - normalisedDistance));
                rect(
                    lineIndex * COLUMN_WIDTH,
                    (height * normalisedDistance) / 2,
                    COLUMN_WIDTH,
                    height * (1 - normalisedDistance)
                );
            }
            lineIndex++;
        }
    }
}

function setup() {
    FOV = HALF_PI;
    VERTICAL_LINES = 100;
    COLUMN_WIDTH = width / VERTICAL_LINES;
    STEP_SIZE = FOV / VERTICAL_LINES;

    MAX_RAY_LENGTH = 100;
    MIN_DISTANCE_TO_SHAPE = 0.01;
    MAX_STEPS = 1000;

    world = new World(0, 0, 0);

    world.addCircle(50, 50, 25);

    createCanvas(600, 400);
}

function draw() {
    background(220);

    world.draw();

    fill(0,255,0);
    textSize(25);
    text("x: "+world.player.position.x+"\ny: "+world.player.position.y+"\nangle: "+world.player.angle,0,25);
}
