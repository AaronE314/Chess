
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
                this.grid[i][j] = null;
            }
        }
    }

    draw() {
        noStroke();
        for (let i = 0; i<this.SIZE; i++) {
            for (let j = 0; j<this.SIZE; j++) {
                fill((i+j)%2===1 ? color(209, 139, 71) : color(255, 206, 158));//color(17,18,12) : color(222,206,173)); 
                rect(i*this.rows,j*this.col,this.rows,this.col);
            }
        }
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(0,0,width,height);

        this.drawPieces();
    }

    setPoint(i,j) {
        this.grid[i][j] = 1;
    }

    withinBounds(i, j) {
        return i < this.SIZE && i >= 0 && j < this.SIZE && j >= 0;
    }

    drawPieces() {
        let m = -1;
        let n = -1;
        for (let i = 0; i<this.grid.length; i++) {
            for (let j = 0; j<this.grid[i].length; j++) {
                if (this.grid[i][j] !== null) {
                    if (!this.grid[i][j].moving) {
                        this.grid[i][j].draw();
                    } else {
                        m=i;
                        n=j;
                    }
                }
            }
        }
    
        if (m != -1) {
            stroke(255);
            strokeWeight(2);
            fill(color(229, 225, 18, 40)); 
            rect(this.grid[m][n].index.i*this.rows,this.grid[m][n].index.j*this.col,this.rows,this.col);
            this.grid[m][n].draw();
            m=-1;
        }
        
    }

    clicked() {
        if (mouseX < board.SIZE*board.col || mouseY < board.SIZE*board.row) {
            for (let i = 0; i<this.grid.length; i++) {
                for (let j = 0; j<this.grid[i].length; j++) {
                    if (this.grid[i][j] !== null) {
                        this.grid[i][j].clicked();
                    }
                }
            }
        }
    }

    released() {
        for (let i = 0; i<this.grid.length; i++) {
            for (let j = 0; j<this.grid[i].length; j++) {
                if (this.grid[i][j] !== null) {
                    if (this.grid[i][j].moving) {
                        this.grid[i][j].move();
                    }
                }
            }
        }
    }

    newGame() {
        new Rook(0,0, true);
        new Knight(1,0,true);
        new Bishop(2, 0, true);
        new Queen(3, 0, true);
        new King(4, 0, true);
        new Bishop(5, 0, true);
        new Knight(6,0,true);
        new Rook(7,0, true);
        for (let i = 0; i < 8; i++) {
            new Pawn(i, 1, true);
        }
    
        new Rook(0,7, false);
        new Knight(1,7,false);
        new Bishop(2, 7, false);
        new Queen(3, 7, false);
        new King(4, 7, false);
        new Bishop(5, 7, false);
        new Knight(6,7,false);
        new Rook(7,7, false);
        for (let i = 0; i < 8; i++) {
            new Pawn(i, 6, false);
        }
    }
    
}