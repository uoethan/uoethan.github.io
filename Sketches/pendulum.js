angle = 0;
velocity = 0;
mass = 2;
gravity = 1;
airResistance = 0.1;
rodLength = 150;

hold = false;

function setup() {
    createCanvas(400, 400);
}

function constrainAngle() {
    angle = (angle + PI) % TAU;
    if (angle < 0) {
        angle += TAU;
    }
    angle = angle - PI;

    if (Math.abs(PI / 2 - angle) < 0.05 && Math.abs(velocity) < 0.5 * mass) {
        angle = PI / 2;
        velocity = 0;
    }
}

function updatePhysics() {
    constrainAngle();
    velocity =
        (velocity + (angle > -PI / 2 && angle < PI / 2 ? 1 : -1) * mass * gravity) *
        (1 - airResistance);
    if (angle == PI / 2) {
        velocity = 0;
    }
    angle += velocity * (deltaTime / 1000);
}

function mouseInCircle() {
    rSquared =
        (mouseX - pendulumX) * (mouseX - pendulumX) +
        (mouseY - pendulumY) * (mouseY - pendulumY);

    return rSquared < 250;
}

function holdingCircle() {
    if (mouseInCircle() && !hold) {
        hold = true;
    }

    if (hold && !mouseIsPressed) {
        hold = false;
    }

    return hold;
}

function draw() {
    background(255);
    pendulumX = 200 + Math.cos(angle) * rodLength;
    pendulumY = 200 + Math.sin(angle) * rodLength;

    if (holdingCircle()) {
        angle = Math.atan2(mouseY - 200, mouseX - 200);
    } else {
        updatePhysics();
    }
    fill(255);
    circle(200, 200, 10);
    line(200, 200, pendulumX, pendulumY);

    circle(pendulumX, pendulumY, 50);
}
