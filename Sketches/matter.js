// Import some stuff from matter.js
const { Engine, World, Bodies, Body, Vector, SAT } = Matter;

// Our world and engine
let world, engine;

// An array of all bodies
let bodies = [];

// A class for all bodies displayed in p5.js
class _Body {
    constructor(body){
        this.body = body;

        // Add the body to the world
        World.add(world, this.body);
    }
    draw(){
        // Draw the body by its vertices
        fill(100);
        let pos = this.body.position;
        let angle = this.body.angle;
        beginShape();
        for(var i = 0; i < this.body.vertices.length; i++){
            vertex(this.body.vertices[i].x, this.body.vertices[i].y);
        }
        endShape();
    }

}

function setup(){
    // Setting up our p5.js environment
    createCanvas(800, 400);
    angleMode(RADIANS);
    rectMode(CENTER);
    noStroke();

    // Configuring and creating our matter world and engine
    engine = Engine.create({
        gravity: {
            y: 2.5
        }
    });
    world = engine.world;
    Matter.Runner.run(engine);

    // This is the floor.  Any bodies with the isStatic property means something unmoving, like a solid wall
    bodies.push(new _Body(Bodies.rectangle(width/2, height - 15, width, 30, {isStatic: true})));
}


function draw(){
    background(200);

    if(frameCount % 10 === 0){ // Every ten frames, add a new body.
        bodies.push(new _Body(Bodies.rectangle(random(0, width), 50, random(10, 50), random(10, 50))))
    }

    bodies.forEach(body => body.draw()); // Draw every body
}