function setup() {
    downForce = 0;
    letterPos = createVector(50,375);
    movingLetter = false;
    score = 0;

    createCanvas(500, 500);
}

function draw() {
    //I understand this is inefficient, it's just a little easter egg.
    noStroke();
    background(50,200,255);//sky
    drawBackground();

    drawPostbox();
    drawBin();

    drawLetter(letterPos.x,letterPos.y);

    if(movingLetter){
        letterPos.x+=movedX;
        letterPos.y+=movedY;
        downForce = 0
    }else{
        letterPos.y+=downForce;
        if(letterPos.y>=375){
            letterPos.y = 375;
            downForce = 0;
        }else{
            downForce++;
        }
    }
    resetLetter = false;
    if(letterPos.x<375&&letterPos.x+100>375&&letterPos.y<160&&letterPos.y+75>160){
        resetLetter = true;
        score++;
    }

    if(letterPos.x<125&&letterPos.x+100>125&&letterPos.y<250&&letterPos.y+75>250){
        resetLetter = true;
        score--;
    }

    if(resetLetter){
        movingLetter = false;
        letterPos = createVector(50,375);
    }

    //score
    textSize(32);
    textFont('Arial');
    fill(0)
    text(score,10,32);
}

function drawBackground(){
    fill(0,255,0);
    rect(0,275,500,225);//grass
    fill(150,150,150);
    rect(0,400,500,100);//pavement
    fill(200,228,0);
    circle(500,0,250);//sun rays
    fill(255,255,0);
    circle(500,0,200);//sun
}

function drawPostbox(){
    //postbox
    fill(255,0,0);
    rect(300,100,150,25);//top
    rect(325,125,100,250);//cylinder
    fill(0,0,0);
    rect(315,375,120,75);//base
    rect(330,150,90,20);//hole
    fill(245,245,220);
    rect(370,138,10,10)//marker
    rect(350,185,50,60);//sheet
}

function drawBin(){
    //bin
    fill(0,150,0);
    circle(125,250,75);//top
    fill(0,0,0);
    circle(125,250,50);
    fill(0,150,0);
    quad(75,250,100,350,150,350,175,250);//body
}

function drawLetter(x,y){
    //letter
    fill(100,100,220);
    rect(x,y,100,75);
    stroke(150);
    line(x,y,x+50,y+30);
    line(x+50,y+30,x+100,y);
}

function mousePressed(){
    if(!movingLetter&&mouseX>letterPos.x&&mouseX<letterPos.x+100&&mouseY>letterPos.y&&mouseY<letterPos.y+75){
        movingLetter = true;
    }
}

function mouseReleased(){
    if(movingLetter){
        movingLetter = false;
    }
}