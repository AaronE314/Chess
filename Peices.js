
class Piece {

    constructor(i, j, black) {
        this.SIZE = 75;
        this.index = {i: i, j: j};
        this.pos = {x: i*this.SIZE, y: j*this.SIZE};
        this.black = black;
        this.image = image;
        this.moving = false;
        this.addToGrid(i,j);
    }

    getImage(x, w, h) {
        if (this.black) {
            this.image = spriteSheet.get(x,85,w,h);
        } else {
            this.image = spriteSheet.get(x,0,w,h);
        }
    }

    draw() {
        if (this.moving) {
            image(this.image, mouseX-(this.SIZE/2), mouseY-(this.SIZE/2), this.SIZE, this.SIZE);
        } else {
            image(this.image, this.pos.x, this.pos.y, this.SIZE, this.SIZE);
        }
        
    }

    move() {
        this.moving = false;
        if (this.isValidMove()) { 
            let pi = this.index.i;
            let pj = this.index.j;
            this.index.i = Math.floor(mouseX / this.SIZE);
            this.index.j = Math.floor(mouseY / this.SIZE);
            this.pos.x = this.index.i * this.SIZE;
            this.pos.y = this.index.j * this.SIZE;
            this.addToGrid(pi, pj);
        }
    }

    isValidMove() {
        return !(mouseX > this.SIZE*board.SIZE || mouseY > this.SIZE*board.SIZE); 
    }

    create() {

    }

    addToGrid(pi, pj) {
        board.grid[pi][pj] = null;
        board.grid[this.index.i][this.index.j] = this;
    }

    clicked() {
        if (mouseX < (this.pos.x+this.SIZE) && mouseX > this.pos.x && mouseY > this.pos.y && mouseY < (this.pos.y + this.SIZE)) {
            this.moving = true;
        }
    }

    emptySpot(i, j) {
        
        if (board.withinBounds(i,j)) {
            if (board.grid[i][j] === null) {
                return true;
            }
            return this.checkHit(i,j);
        }

        return false;
    }

    checkHit(i ,j) {
        if (board.grid[i][j] !== null && board.grid[i][j].black !== this.black) {
            board.grid[i][j] == null;
            return true;
        }
        return false;
    }

    piece(i, j) {
        if (!board.withinBounds(i, j) || board.grid[i][j] !== null) {
            return true;
        }

        return false;
    }

    diagonalMove(i, j) {

        let ul = true, ur = true, dr = true, dl = true;
        for (let k = 1; k < board.SIZE; k++) {
            if (ul && (this.index.i - k === i && this.index.j - k === j) && this.emptySpot(i,j)) {
                return true;
            }
            if (this.piece(this.index.i-k, this.index.j-k)) {
                ul = false;
            }
            if (dr && (this.index.i - k === i && this.index.j + k === j) && this.emptySpot(i,j))  {
                return true;
            }
            if (this.piece(this.index.i-k, this.index.j+k)) {
                dr = false;
            }
            if (ur && (this.index.i + k === i && this.index.j - k === j)  && this.emptySpot(i,j)) {
                return true;
            }
            if (this.piece(this.index.i+k, this.index.j-k)) {
                ur = false;
            }
            if (dl && (this.index.i + k === i && this.index.j + k === j) && this.emptySpot(i,j)) {
                return true;
            }
            if (this.piece(this.index.i+k, this.index.j+k)) {
                dl = false;
            }
        }
    
        return false;
    }
    
    horizontalVerticalMove(i, j) {
    
        if (i === this.index.i || j === this.index.j) {
            let s = (i < this.index.i) ? -1 : 1;
            
            for (let k = s; k<board.SIZE; k+=s) {
                if ((i === this.index.i+k && j === this.index.j) && this.emptySpot(i,j)) {
                    return true;
                } 
                if (this.piece(this.index.i+k,this.index.j)) {
                    break;
                }
            }
            s = (j < this.index.j) ? -1 : 1;
            for (let k = s; k<board.SIZE; k+=s) {
                if ((i === this.index.i && j === this.index.j+k) && this.emptySpot(i,j)) {
                    return true;
                }
                if (this.piece(this.index.i,this.index.j+k)) {
                    break;
                }   
            }
        }
    
        return false
    }

}

class King extends Piece {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(0,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);
            if ((Math.abs(i-this.index.i) <= 1 && Math.abs(j-this.index.j) <=1) && this.emptySpot(i,j)) {
                return true;
            }
        }

        return false;
    }
}

class Queen extends Piece {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            if (this.horizontalVerticalMove(i, j)) {
                return true;
            }

            if (this.diagonalMove(i, j)) {
                return true;
            }
            
        }

        return false;
    }
}

class Rook extends Piece {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(4*85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            if (this.horizontalVerticalMove(i, j)) {
                return true;
            }

        }

        return false;
    }
}

class Bishop extends Piece {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(2*85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            if (this.diagonalMove(i, j)) {
                return true;
            }

        }

        return false;
    }
}

class Pawn extends Piece {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(5*85,85,85);
        this.firstMove = true;
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);
            let val = this.black ? 1 : -1;
            if (((j-this.index.j === val || (j-this.index.j === 2*val && this.firstMove)) && i===this.index.i) && this.emptySpot(i,j)) {
                this.firstMove = false;
                return true;
            }
        }

        return false;
    }
}

class Knight extends Piece {

    constructor(x, y, black) {
        super(x,y, black);
        this.getImage(3*85,85,85);
    }

    isValidMove() {
        if (super.isValidMove()) {
            let i = Math.floor(mouseX / this.SIZE);
            let j = Math.floor(mouseY / this.SIZE);

            for (let k = -2; k <= 2; k ++) {
                if (k === 0) {
                    continue;
                }
                let l = 3 - Math.abs(k);

                if ((this.index.i + k === i && this.index.j + l === j) && this.emptySpot(this.index.i+k,this.index.j+l)) {
                    return true;
                }
                if ((this.index.i + k === i && this.index.j - l === j) && this.emptySpot(this.index.i+k,this.index.j-l)) {
                    return true;
                }
            }
        }

        return false;
    }
}