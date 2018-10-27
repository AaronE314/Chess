
let grid;
let spritesheet;
let sprite;
let king;

let pieces = [];

function preload() {
    spritesheet = loadImage('assets/ChessPiecesSprite.png');
}

function setup() {
    createCanvas(600,600);
    background(0);
    grid = new Board();

    pieces.push(new Rook(0,0, true));
    pieces.push(new Knight(1,0,true));
    pieces.push(new Bishop(2, 0, true));
    pieces.push(new Queen(3, 0, true));
    pieces.push(new King(4, 0, true));
    pieces.push(new Bishop(5, 0, true));
    pieces.push(new Knight(6,0,true));
    pieces.push(new Rook(7,0, true));
    for (let i = 0; i < 8; i++) {
        pieces.push(new Pawn(i, 1, true));
    }

    pieces.push(new Rook(0,7, false));
    pieces.push(new Knight(1,7,false));
    pieces.push(new Bishop(2, 7, false));
    pieces.push(new Queen(3, 7, false));
    pieces.push(new King(4, 7, false));
    pieces.push(new Bishop(5, 7, false));
    pieces.push(new Knight(6,7,false));
    pieces.push(new Rook(7,7, false));
    for (let i = 0; i < 8; i++) {
        pieces.push(new Pawn(i, 6, false));
    }
    
    
    
    
}

function draw() {
    grid.draw();
    for (let i = 0; i<pieces.length; i++) {
        pieces[i].draw();
    }
}

function mousePressed() {
    if (mouseX < grid.SIZE*grid.col || mouseY < grid.SIZE*grid.row) {
        for (let i = 0; i<pieces.length; i++) {
            pieces[i].clicked();
        }
    }
}

function mouseReleased() {

    for (let i = 0; i<pieces.length; i++) {
        if (pieces[i].moving) {
            pieces[i].move();
        }
    }
}