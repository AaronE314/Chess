//import { Board } from "/board.js";

let grid;

function setup() {
    createCanvas(600,600);
    background(0);
    grid = new Board();
}

function draw() {
    grid.draw();
}