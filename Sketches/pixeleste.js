let timer = 0;
let gravity = 0.5;
let friction = 0.5;
let restitution = 0.3;

class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);

        this.force = createVector(0, 0);
        this.jumping = true;
        this.gripping = false;

        this.gripTimer = 0;
    }

    launchAt(x, y, power) {
        if (!this.jumping) {
            this.jumping = true;
            this.gripping = false;
            let angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
            let launchForce = createVector(cos(angle) * power, sin(angle) * power);

            this.force.add(launchForce);
        }
    }

    update() {
        let gridCoords = level.getGridCoords(this.pos.x, this.pos.y);

        if (!this.gripping) {
            //floor detection
            if (
                level.wallAt(this.pos.x, this.pos.y + 9 + this.force.y) ||
                level.wallAt(this.pos.x + 9, this.pos.y + 9 + this.force.y)
            ) {
                this.force.y = 0;
                this.force.x *= friction;

                this.jumping = false;

                this.pos.y = gridCoords.y * level.squareSize + 15;
            } else {
                this.force.y += gravity;
            }

            //ceiling detection
            if (
                level.wallAt(this.pos.x, this.pos.y + this.force.y) ||
                level.wallAt(this.pos.x + 9, this.pos.y + this.force.y)
            ) {
                this.force.y = -this.force.y * restitution;

                this.pos.y = gridCoords.y * level.squareSize;
            }

            //left detection
            if (
                level.wallAt(this.pos.x + this.force.x, this.pos.y) ||
                level.wallAt(this.pos.x + this.force.x, this.pos.y + 9)
            ) {
                this.pos.x = gridCoords.x * level.squareSize;

                this.grabWall();
            }

            //right detection
            if (
                level.wallAt(this.pos.x + this.force.x + 9, this.pos.y) ||
                level.wallAt(this.pos.x + this.force.x + 9, this.pos.y + 9)
            ) {
                this.pos.x = gridCoords.x * level.squareSize + 15;

                this.grabWall();
            }
        } else {
            this.gripTimer -= deltaTime;
            if (this.gripTimer <= 0) {
                this.gripping = false;
            }
        }

        this.pos.add(this.force);
    }

    grabWall() {
        this.gripTimer = 1000;

        this.gripping = true;
        this.jumping = false;

        this.force = createVector(0, 0);
    }

    draw() {
        fill(
            this.gripping ? 255 * (this.gripTimer / 1000) :255,
            this.gripping ? 150 - 150 * (this.gripTimer / 1000) :0,
            this.gripping ? 255 - 255 * (this.gripTimer / 1000) : 0
        );
        square(this.pos.x, this.pos.y, 10);
    }
}

class Level {
    constructor() {
        this.spawnPoint = createVector(25,465);

        this.mapArray = [];

        for(var fileLine in level1File)
        {
            print(fileLine);
            let mapLine = [];
            for(var index = 0; index<fileLine.length; index++){

                append(mapLine,fileLine.charAt(index));
            }

            append(this.mapArray,mapLine);
        };

        this.mapWidth = this.mapArray.length;

        this.squareSize = 25;
    }

    getGridCoords(x, y) {
        return createVector(
            floor((x / width) * this.mapWidth),
            floor((y / height) * 20)
        );
    }

    wallAt(x, y) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            let gridCoords = this.getGridCoords(x, y);
            return this.mapArray[gridCoords.y][gridCoords.x] == '1';
        }
        return false;
    }

    draw() {
        fill(200);
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.mapArray[y][x] == "1") {
                    square(x * this.squareSize, y * this.squareSize, this.squareSize);
                }
            }
        }
    }
}

function preload() {
    level1File = loadStrings('level1.txt');
}


function setup() {
    createCanvas(500, 500);

    noStroke();
    level = new Level();

    p = new Player(level.spawnPoint.x,level.spawnPoint.y);
}

function draw() {
    background(0);

    translate(p.pos.x>width/2?-p.pos.x+width/2:0,0);

    level.draw();

    if (millis() >= 1 + timer) {
        p.update();
        timer = millis();
    }

    p.draw();
}

function mouseClicked() {
    p.launchAt(mouseX, mouseY, 12);
}
