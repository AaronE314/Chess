

class Board {

    constructor() {
        this.SIZE = 8;
        this.rows = height / this.SIZE;
        this.col = width / this.SIZE;
        this.grid = new Array(this.SIZE);
        this.createGrid();
    }

    createGrid() {
        for (let i = 0; i < this.SIZE; i++) {
            this.grid[i] = new Array(this.SIZE);
            for (let j = 0; j < this.SIZE; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    draw() {
        noStroke();
        for (let i = 0; i<this.SIZE; i++) {
            for (let j = 0; j<this.SIZE; j++) {
                fill((i+j)%2===1 ? color(17,18,12) : color(222,206,173)); 
                rect(i*this.rows,j*this.col,this.rows,this.col);
            }
        }
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(0,0,width,height);
    }

    setPoint(i,j) {
        this.grid[i][j] = 1;
    }

    handleClick() {

    }
}