// slide to see how detailY works
let detailY;
function setup() {
    createCanvas(100, 100, WEBGL);
    detailY = createSlider(2, 24, 6);
    detailY.position(10, height + 5);
    detailY.style('width', '80px');
    describe(
        'a rotating white ellipsoid with limited Y detail, with a slider that adjusts detailY'
    );
}

function draw() {
    background(205, 105, 9);
    rotateY(millis() / 1000);
    ellipsoid(30, 40, 40, 12, detailY.value());
}