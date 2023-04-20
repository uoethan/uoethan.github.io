var p;

function setup()  {
    createCanvas(640,360);
    // Make a new Pendulum with an origin position and armlength
    p = new Pendulum(createVector(width/2,0),175);
    holding = false;

}

function draw() {
    background(51);
    if(!holding){
        p.go();
    }else{
        p.angle = -createVector(320,0).angleBetween(createVector(mouseX,mouseY))-HALF_PI+PI-HALF_PI/2;
    }
    p.display();
}

function mousePressed(){
    if(ptInCircle(createVector(mouseX,mouseY),p.position,p.ballr)){
        holding = true;
    }
}

function mouseReleased(){
    if(holding){
        holding = false;
    }
}

function Pendulum(origin_, r_) {
    // Fill all variables
    this.origin = origin_.copy();
    this.position = createVector();
    this.r = r_;
    this.angle = PI/4;

    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995;   // Arbitrary damping
    this.ballr = 48.0;      // Arbitrary ball radius

    this.go = function() {
        this.update();
    };

    // Function to update position
    this.update = function() {
        var gravity = 0.4;                                               // Arbitrary constant
        this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);  // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
        this.aVelocity += this.aAcceleration;                            // Increment velocity
        this.aVelocity *= this.damping;                                  // Arbitrary damping
        this.angle += this.aVelocity;                                    // Increment angle
    };

    this.display = function() {
        this.position.set(this.r*sin(this.angle), this.r*cos(this.angle), 0);         // Polar to cartesian conversion
        this.position.add(this.origin);                                               // Make sure the position is relative to the pendulum's origin

        stroke(255);
        strokeWeight(2);
        // Draw the arm
        line(this.origin.x, this.origin.y, this.position.x, this.position.y);
        ellipseMode(CENTER);
        fill(127);
        // Draw the ball
        ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
    };
}

function ptInCircle(pt, center, r) {

    const lhs = Math.pow(center.x - pt.x, 2) + Math.pow(center.y - pt.y, 2);
    const rhs = Math.pow(r, 2);

    return lhs < rhs;
}