
let grid;
let spriteSheet;
let sprite;
let king;

let pieces = [];

function preload() {
    spriteSheet = loadImage('assets/ChessPiecesSprite.png');
}

function setup() {
    createCanvas(600,600);
    background(0);
    board = new Board();
    
    board.newGame();
    
}

function draw() {
    board.draw();
}

function mousePressed() {
    board.clicked();
}

function mouseReleased() {
    board.released();
}