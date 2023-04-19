// draw a spinning box
// with width, height and depth of 50
function setup() {
    createCanvas(100, 100, WEBGL);
    describe('a white box rotating in 3D space');
}

function draw() {
    background(200);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(50);
}