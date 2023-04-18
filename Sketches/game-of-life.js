let timer = 0;

let playing = false;

const numberOfRows = 25;
let sqWidth = 500/numberOfRows;

let lastX = -1;
let lastY = -1;

function next_turn(){
    new_area = [];
    for(let y=0;y<numberOfRows;y++){
        new_area[y] = [];
        for(let x=0;x<numberOfRows;x++){
            let numNeighbours = 0;
            for(let dy=-1;dy<=1;dy++){
                for(let dx=-1;dx<=1;dx++){
                    if(x+dx>=0&&x+dx<numberOfRows&&y+dy>=0&&y+dy<numberOfRows&&(dx!==0||dy!==0)){
                        numNeighbours+=area[y+dy][x+dx];
                    }
                }
            }

            if(((numNeighbours===2||numNeighbours===3)&&area[y][x]===1)||(numNeighbours===3&&area[y][x]===0)){
                new_area[y][x]=1;
            }else{
                new_area[y][x]=0;
            }
        }
    }
    area=new_area
}

function setup() {
    createCanvas(500, 500);

    area = []

    for(let y=0;y<numberOfRows;y++){
        area[y] = [];
        for(let x=0;x<numberOfRows;x++){
            area[y][x] = round(random());
        }
    }
}

function draw() {
    background(255,255,255)

    fill(0);
    if(playing){
        if (millis() >= 500+timer) {
            timer = millis();
            next_turn();
        }

    }

    for(let y=0;y<numberOfRows;y++){
        if(!playing){
            line(y*sqWidth,0,y*sqWidth,500);
            line(0,y*sqWidth,500,y*sqWidth);
        }

        for(let x=0;x<numberOfRows;x++){
            if(area[y][x]===1){
                square(x*sqWidth,y*sqWidth,sqWidth,playing?sqWidth/4:0);
            }
        }
    }

}

function mouseClicked(){
    if(!playing){
        let changeX = floor((mouseX/500)*numberOfRows);
        let changeY = floor((mouseY/500)*numberOfRows);

        area[changeY][changeX] = abs(area[changeY][changeX]-1);
    }
}

function keyPressed() {
    if (keyCode === 32) {
        playing = !playing;
    }

    if(keyCode === 8 && !playing){
        for(let y=0;y<numberOfRows;y++){
            for(let x=0;x<numberOfRows;x++){
                area[y][x] = 0;
            }
        }
    }
}