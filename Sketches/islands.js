let noiseScale = 0.03;

let sandThreshold = 0.5;
let grassThreshold = 0.56;
let snowThreshold = 0.7;

let squaresOnWidth = 100;

let area = [];

function generateLand() {
    noiseSeed(millis() + second() + minute() + day() + month() + year());

    area = [];
    for (let y = 0; y < squaresOnWidth; y++) {
        area.push([]);
        for (let x = 0; x < squaresOnWidth; x++) {
            let noiseVal = noise(x * noiseScale, y * noiseScale);
            let col = null;

            if (noiseVal < sandThreshold) {
                noiseVal =
                    normalise(noiseVal, sandThreshold / 10, sandThreshold) +
                    0.2;
                col = color(0, noiseVal * 150, noiseVal * 255);
            } else if (noiseVal < grassThreshold) {
                noiseVal = normalise(
                    noiseVal,
                    sandThreshold + (sandThreshold + grassThreshold) / 4,
                    grassThreshold
                );
                col = color(noiseVal * 237, noiseVal * 201, noiseVal * 175);
            } else if (noiseVal < snowThreshold) {
                noiseVal = normalise(
                    noiseVal,
                    grassThreshold + (grassThreshold + snowThreshold) / 2,
                    snowThreshold
                );
                col = color(noiseVal * 86, noiseVal * 125, noiseVal * 70);
            } else {
                noiseVal = normalise(
                    noiseVal,
                    snowThreshold + (snowThreshold + 1) / 2,
                    1
                );
                col = color(noiseVal * 255, noiseVal * 255, noiseVal * 255);
            }
            area[y].push(col);
        }
    }
}

function drawLand() {
    sqWidth = width / squaresOnWidth;
    for (let y = 0; y < squaresOnWidth; y++) {
        for (let x = 0; x < squaresOnWidth; x++) {
            fill(area[y][x]);
            square(x * sqWidth, y * sqWidth, sqWidth);
        }
    }
}

function normalise(value, minimum, maximum) {
    return (value - minimum) / (maximum - minimum);
}

function getMouseGridPos() {
    return createVector(
        floor((mouseX / width) * squaresOnWidth),
        floor((mouseY / height) * squaresOnWidth)
    );
}

function keyPressed() {
    if (keyCode === ENTER) {
        generateLand();
    }
}

function setup() {
    createCanvas(600, 600);

    noStroke();

    generateLand();
    sqWidth = width / squaresOnWidth;

    button = createButton("Generate Islands");
    button.position(485,760);
    button.mousePressed(generateLand);
}

function draw() {
    drawLand();

    if (mouseIsPressed) {
        let gMouse = getMouseGridPos();
        fill(255, 0, 0);
        square(gMouse.x * sqWidth, gMouse.y * sqWidth, sqWidth);
    }
}
