VERTICAL_LINES = 200;
VIEW_WIDTH = 0.9;

mapGrid = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#","#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", " ", " "," ", "#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", "#", " ", " ", "#", "#", "#"," ", "#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", "#", "#", "#", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", "#", " ", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", " ", " ", " ", " ", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", " ", "#","#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", " ", "#","#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", " ", " "," ", "#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", "#", " ", " ", "#", "#", "#"," ", "#", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", "#", "#", "#", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", "#", " ", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", "#", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", " ", " ", " ", " ", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", " ", "#"," ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#","#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
];

class Player {
    constructor(x, y, angle, speed, rotationSpeed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.rotationSpeed = rotationSpeed;
    }

    castRay(rayStartX, rayStartY, angle, length, stepSize, sqSize, lineIndex) {
        let dx = Math.cos(angle) * stepSize;
        let dy = Math.sin(angle) * stepSize;

        var rayX = rayStartX;
        var rayY = rayStartY;
        fill(0);
        while (
            (rayStartX - rayX) * (rayStartX - rayX) +
            (rayStartY - rayY) * (rayStartY - rayY) <
            length * length
            ) {
            try {
                rayX += dx;
                rayY += dy;
                if (mapGrid[Math.floor(rayY)][Math.floor(rayX)] === "#") {
                    //Calculate how far along the ray is from total distance
                    var normalisedDistance =
                        ((rayStartX - rayX) * (rayStartX - rayX) +
                            (rayStartY - rayY) * (rayStartY - rayY)) /
                        (length * length);

                    let intersectAxis = this.getIntersectAxis(rayX, rayY, dx, dy);
                    let intersectAngle = intersectAxis.x == 1 ? HALF_PI : 0;

                    let relativeAngle = normalise(
                        intersectAngle - angle + (intersectAngle - angle > PI
                            ? -TWO_PI
                            : (intersectAngle - angle < -PI
                                ? TWO_PI
                                : 0)),-TWO_PI,TWO_PI);

                    fill(0, 0, 255 * (1 - normalisedDistance) * relativeAngle);
                    rect(
                        lineIndex * LINE_WIDTH,
                        (height * normalisedDistance) / 2,
                        LINE_WIDTH,
                        height * (1 - normalisedDistance)
                    );

                    return true;
                }
            } catch (e) {
                print(e);
                return false;
            }
        }
        return false;
    }

    getIntersectAxis(rayX, rayY, dx, dy) {
        return createVector(
            Math.abs(Math.floor(rayX) - Math.floor(rayX - dx)),
            Math.abs(Math.floor(rayY) - Math.floor(rayY - dy))
        );
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.angle -= this.rotationSpeed * deltaTime;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.angle += this.rotationSpeed * deltaTime;
        }

        if (keyIsDown(UP_ARROW)) {
            p.x += Math.cos(this.angle) * this.speed * deltaTime;
            p.y += Math.sin(this.angle) * this.speed * deltaTime;
        }
        if (keyIsDown(DOWN_ARROW)) {
            p.x -= Math.cos(this.angle) * this.speed * deltaTime;
            p.y -= Math.sin(this.angle) * this.speed * deltaTime;
        }
    }

    draw(sqWidth) {
        this.move();

        // ray casting
        let rightAngleToPlayer = this.angle + HALF_PI;
        let lineSpace = VIEW_WIDTH / VERTICAL_LINES;

        var lineIndex = 0;
        for (var x = -VIEW_WIDTH / 2; x < VIEW_WIDTH / 2; x += lineSpace) {
            this.castRay(
                p.x + Math.cos(rightAngleToPlayer) * x,
                p.y + Math.sin(rightAngleToPlayer) * x,
                this.angle,
                11,
                0.01,
                sqWidth,
                lineIndex
            );

            lineIndex++;
        }
    }
}

function normalise(value, minimum, maximum){
    return (value-minimum)/(maximum-minimum);
}

function setup() {
    createCanvas(800, 500);

    p = new Player(1.5, 1.5, 0, 0.001, 0.001);

    LINE_WIDTH = width / VERTICAL_LINES;
}

function draw() {
    noStroke();

    background(100,220,250);

    fill(100);
    rect(0, height / 2, width, height);
    sqWidth = width / mapGrid.length;

    let length = mapGrid.length;

    p.draw(sqWidth);
}
