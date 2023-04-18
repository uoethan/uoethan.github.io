// draw a spinning cone
// with radius 40 and height 70
function setup() {
    createCanvas(500, 500, WEBGL);
    describe('a rotating white cone');
}

function draw() {
    background(200);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    cone(40, 70);
}