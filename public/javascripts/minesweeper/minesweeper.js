var minesweeper;
var cols;
var rows;
var w = 20;
var gameStarted = false;
// Set the date we're counting down to
var totalSeconds = 1;
var Time;
var score ='00:00';

function setup() {
    canvas = createCanvas(401, 401);
    canvas.parent('gameHolder');
    cols = floor(width / w);
    rows = floor(height / w);
    minesweeper = new Minesweeper(w, 40, cols, rows);
    document.getElementById("score").innerHTML = score;
    gameStarted = true;
}

function mousePressed(){
    minesweeper.input(mouseX, mouseY);
}

function draw() {
    background(255);
    for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
            minesweeper.grid[i][j].show();
}


function myTimer() {
    ++totalSeconds;
    score = pad(parseInt(totalSeconds / 60)) + ":" +  pad(totalSeconds % 60);
    document.getElementById("score").innerHTML = score;
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2)
        return "0" + valString;
    else
        return valString;
}