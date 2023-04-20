function setup() {
    createCanvas(500, 500);

    screen = "menu";
    highscore = getItem("highscore");
    if (highscore === null) {
        highscore = 0;
    }

    setupGame();
}

function draw() {
    if (screen === "game") {
        drawGame();
    } else if (screen === "menu") {
        drawMenu();
    } else if (screen === "end game") {
        drawEndGame();
    }
}

function setupGame() {
    lastSecond = second();
    timer = 30000;

    objectIndex = 0;
    widths = [100, 50];

    downForce = 0;
    letterPos = createVector(50, 375);
    movingLetter = false;
    score = 0;
}

function drawGame() {
    //I understand this is inefficient, it's just a little easter egg.
    timer -= deltaTime;
    lastSecond = second();

    drawBackground();

    drawPostbox();
    drawBin();

    if (objectIndex === 0) {
        drawLetter(letterPos.x, letterPos.y);
    } else {
        drawTin(letterPos.x, letterPos.y);
    }

    if (movingLetter) {
        letterPos.x += movedX;
        letterPos.y += movedY;
        downForce = 0;
    } else {
        letterPos.y += downForce;
        if (letterPos.y >= 375) {
            letterPos.y = 375;
            downForce = 0;
        } else {
            downForce++;
        }
    }
    resetLetter = false;
    if (
        letterPos.x < 375 &&
        letterPos.x + widths[objectIndex] > 375 &&
        letterPos.y < 160 &&
        letterPos.y + 75 > 160
    ) {
        resetLetter = true;
        if (objectIndex === 0) {
            score++;
        } else {
            score--;
        }
    }

    if (
        letterPos.x < 125 &&
        letterPos.x + widths[objectIndex] > 125 &&
        letterPos.y < 250 &&
        letterPos.y + 75 > 250
    ) {
        resetLetter = true;
        if (objectIndex === 0) {
            score--;
        } else {
            score++;
        }
    }

    if (resetLetter) {
        movingLetter = false;
        letterPos = createVector(50, 375);
        objectIndex = round(random());
    }

    //score
    textSize(32);
    textFont("Arial");
    fill(0);
    text(score, 10, 32);

    //timer
    text("Time left: " + round(timer / 1000), 10, 490);

    if (timer - 1 <= -1) {
        screen = "end game";
        if (score > highscore) {
            highscore = score;
            storeItem("highscore", score);
        }
    }
}

function drawMenu() {
    drawBackground();

    fill(150);
    rect(150, 200, 200, 100, 25);

    fill(0);
    textSize(75);
    text("Start", 165, 275);
    textSize(32);
    text("Highscore: " + highscore, 165, 385);
}

function drawEndGame() {
    drawBackground();
    fill(0);
    textSize(32);

    text("You Scored: " + score, 150, 275);
    if (score === highscore) {
        text("That's a new highscore!", 90, 305);
    } else {
        text("Highscore: " + highscore, 150, 305);
    }
    textSize(20);
    text("Click anywhere to continue...", 150, 350);
}

function drawBackground() {
    noStroke();
    background(50, 200, 255); //sky

    fill(0, 255, 0);
    rect(0, 275, 500, 225); //grass
    fill(150);
    rect(0, 400, 500, 100); //pavement
    fill(200, 228, 0);
    circle(500, 0, 250); //sun rays
    fill(255, 255, 0);
    circle(500, 0, 200); //sun
}

function drawPostbox() {
    //postbox
    fill(255, 0, 0);
    rect(300, 100, 150, 25, 5, 5, 0, 0); //top
    arc(325, 125, 50, 20, HALF_PI, PI); //top left lip
    arc(425, 125, 50, 20, 0, HALF_PI); //top right lip
    rect(325, 125, 100, 250); //cylinder
    fill(0, 0, 0);
    rect(315, 375, 120, 75, 5, 5, 0, 0); //base
    rect(330, 150, 90, 20); //hole
    fill(245, 245, 220);
    rect(370, 138, 10, 10); //marker
    rect(350, 185, 50, 60); //sheet
}

function drawBin() {
    //bin
    fill(0, 150, 0);
    circle(125, 250, 75); //top
    fill(0, 0, 0);
    circle(125, 250, 50);
    fill(0, 150, 0);
    quad(75, 250, 100, 350, 150, 350, 175, 250); //body
}

function drawLetter(x, y) {
    //letter
    fill(100, 100, 220);
    rect(x, y, 100, 75);
    stroke(150);
    line(x, y, x + 50, y + 30);
    line(x + 50, y + 30, x + 100, y);
}

function drawTin(x, y) {
    fill(200);
    rect(x, y, 50, 75);
    fill(0, 100, 255);
    rect(x, y + 5, 50, 65);
}

function mousePressed() {
    if (screen === "game") {
        if (
            !movingLetter &&
            mouseX > letterPos.x &&
            mouseX < letterPos.x + widths[objectIndex] &&
            mouseY > letterPos.y &&
            mouseY < letterPos.y + 75
        ) {
            movingLetter = true;
        }
    } else if (
        screen === "menu" &&
        mouseX > 150 &&
        mouseX < 350 &&
        mouseY > 200 &&
        mouseY < 300
    ) {
        screen = "game";
        setupGame();
    } else if (screen === "end game") {
        screen = "menu";
    }
}

function mouseReleased() {
    if (screen === "game") {
        if (movingLetter) {
            movingLetter = false;
        }
    }
}
