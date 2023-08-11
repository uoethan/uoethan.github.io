class Ball{
    constructor(x,y,mass,velocity_x,velocity_y){
        this.x = x;
        this.y = y;
        this.mass = mass === undefined ? 1 : mass;
        this.velocity_x = velocity_x === undefined ? 0 : velocity_x;
        this.velocity_y = velocity_y === undefined ? 0 : velocity_y;
    }

    addForce(force_x, force_y){
        this.velocity_x += force_x;
        this.velocity_y += force_y;
    }

    isColliding(ball){
        var dSquared = (this.x - ball.x) * (this.x - ball.x) + (this.y - ball.y) * (this.y - ball.y);

        return dSquared < 100;//radius is 5, so (5+5)^2 = 100
    }

    bounce(){
        this.velocity_x *= -1;
        this.velocity_y *= -1;
    }

    updatePhysics(){
        this.addForce(this.velocity_x !== 0 ?-AIR_RESISTANCE*(abs(this.velocity_x)/this.velocity_x):0,
            GRAVITY*this.mass);

        if(this.velocity_x<AIR_RESISTANCE&&this.velocity_x>-AIR_RESISTANCE){
            this.velocity_x = 0;
        }

        if(this.y===height-5){
            this.velocity_x += this.velocity_x !== 0 ?-FRICTION*(abs(this.velocity_x)/this.velocity_x):0;
        }

        this.y += this.velocity_y;
        this.x += this.velocity_x;

        if(this.y+5>height){
            this.y = height-5;
            this.velocity_y = -this.velocity_y*(1-RESTITUTION);
        }else if(this.y-5<0){
            this.y = 5;
            this.velocity_y = -this.velocity_y*(1-RESTITUTION);
        }

        if(this.x+5>width){
            this.x = width-5;
            this.velocity_x = -this.velocity_x*(1-RESTITUTION);
        }else if(this.x-5<0){
            this.x = 5;
            this.velocity_x = -this.velocity_x*(1-RESTITUTION);
        }
    }

    draw(){
        circle(this.x,this.y,10);
    }
}

function genBalls(){
    balls = []

    for(var i = 0;i<10;i++)
        balls.push(new Ball(200,200,10,random(-100,100),random(-100,100)));
}

function setup() {
    GRAVITY = 0.1;
    AIR_RESISTANCE = 0.01;
    RESTITUTION = 0.1;
    FRICTION = 0.1;

    createCanvas(400, 400);

    genBalls();
}

function draw() {
    background(220);

    for (var i = 0; i < balls.length; i++) {
        ball = balls[i]
        ball.updatePhysics();

//     Ball collisions work, but bounce function needs work.
//     collided = false;

//     for(var j = 0; j<balls.length; j++){
//       if(i!=j&&ball.isColliding(balls[j])){
//         collided = true;
//       }
//     }

//     if(collided)
//       ball.bounce();
        ball.draw();
    }
}

function keyPressed(){
    if(keyCode === ENTER){
        genBalls();
    }
}