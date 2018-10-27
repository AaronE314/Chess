

class Board {

    constructor() {
        this.SIZE = 8;
        this.rows = height / this.SIZE;
        this.col = width / this.SIZE;
    }

    draw() {
        noStroke();
        for (let i = 0; i<this.col; i++) {
            for (let j = 0; j<this.rows; j++) {
                fill((i+j)%2===1 ? color(17,18,12) : color(222,206,173)); 
                rect(i*this.rows,j*this.col,this.rows,this.col);
            }
        }
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(0,0,width,height);
    }
}