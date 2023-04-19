gravity = 9.81;
airResist = 0.9;

bounceCoefficient = 0.5;

letGoTimerMax = 10000;
letGoTimer = letGoTimerMax;

class Ball{
    constructor(){
        this.diameter = 30;
        this.radius = this.diameter/2

        this.pos = createVector(250,250);
        this.force = createVector(0,0);

        this.weight = 0.2;
    }

    applyGravity(){
        if(!(this.pos.y+1+this.radius>500)){
            this.force.y+=this.weight*gravity;
        }
    }

    applyForces(){
        this.force.x = this.force.x*airResist;
        this.force.y = this.force.y*airResist;

        if(this.pos.y+this.force.y+this.radius>500){
            this.force.y = -this.force.y*bounceCoefficient;
        }

        if(round(this.force.y)===0){
            this.force.y=0;
        }
        this.pos.add(this.force);

    }

    drawBall(){
        ellipse(this.pos.x,this.pos.y,this.diameter,this.diameter);
    }

    tick(){
        this.applyGravity();
        this.applyForces();
    }
}

function setup() {
    ball = new Ball();
    createCanvas(500, 500);
}

function draw() {
    background(220);
    if((mouseIsPressed&&(mouseX-ball.pos.x)*(mouseX-ball.pos.x)+(mouseY-ball.pos.y)*(mouseY-ball.pos.y)<ball.radius)||letGoTimer>0){
        ball.pos.x = mouseX;
        ball.pos.y = mouseY;
    }else{
        ball.tick();
    }

    if(!mouseIsPressed){
        letGoTimer-=millis();
    }
    ball.drawBall();
}

function mouseReleased(){
    letGoTimer = letGoTimerMax;
}